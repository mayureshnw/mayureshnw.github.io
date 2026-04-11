from __future__ import annotations

import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT_ROOT = REPO_ROOT / "content"
POSTS_ROOT = CONTENT_ROOT / "posts"
STATIC_ROOT = REPO_ROOT / "static"
DOCS_TO_SCAN = [
    REPO_ROOT / "README.md",
    REPO_ROOT / ".github" / "pull_request_template.md",
    REPO_ROOT / ".github" / "new-post-checklist.md",
]
REQUIRED_FIELDS = [
    "title",
    "description",
    "date",
    "lastmod",
    "draft",
    "categories",
    "tags",
    "ShowToc",
    "TocOpen",
]
MARKDOWN_LINK_PATTERN = re.compile(r"(!?\[[^\]]*\])\(([^)]+)\)")


def load_frontmatter(markdown_file: Path) -> tuple[dict[str, object], list[str]]:
    lines = markdown_file.read_text(encoding="utf-8").splitlines()
    if len(lines) < 3 or lines[0].strip() != "---":
        raise ValueError("missing YAML frontmatter block")

    try:
        closing_index = next(index for index in range(1, len(lines)) if lines[index].strip() == "---")
    except StopIteration as exc:
        raise ValueError("frontmatter block is not terminated") from exc

    frontmatter_lines = lines[1:closing_index]
    frontmatter: dict[str, object] = {}
    current_parent: str | None = None

    for raw_line in frontmatter_lines:
        if not raw_line.strip() or raw_line.lstrip().startswith("#"):
            continue

        if raw_line.startswith("  ") and current_parent:
            child_match = re.match(r"^\s{2}([A-Za-z0-9_]+):\s*(.*)$", raw_line)
            if child_match:
                parent = frontmatter.setdefault(current_parent, {})
                if isinstance(parent, dict):
                    parent[child_match.group(1)] = parse_scalar(child_match.group(2))
            continue

        match = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", raw_line)
        if not match:
            current_parent = None
            continue

        key, raw_value = match.groups()
        current_parent = key
        if raw_value == "":
            frontmatter[key] = {}
            continue

        frontmatter[key] = parse_scalar(raw_value)

    return frontmatter, lines[closing_index + 1 :]


def parse_scalar(raw_value: str) -> object:
    value = raw_value.strip()
    if value.startswith("[") and value.endswith("]"):
        inner = value[1:-1].strip()
        if not inner:
            return []
        return [strip_quotes(item.strip()) for item in inner.split(",")]

    lowered = value.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False

    return strip_quotes(value)


def strip_quotes(value: str) -> str:
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def validate_post(markdown_file: Path) -> list[str]:
    errors: list[str] = []

    try:
        frontmatter, _ = load_frontmatter(markdown_file)
    except ValueError as exc:
        return [f"{relative(markdown_file)}: {exc}"]

    for field in REQUIRED_FIELDS:
        if field not in frontmatter:
            errors.append(f"{relative(markdown_file)}: missing required frontmatter field '{field}'")

    if errors:
        return errors

    title = str(frontmatter["title"]).strip()
    description = str(frontmatter["description"]).strip()
    categories = coerce_list(frontmatter["categories"])
    tags = coerce_list(frontmatter["tags"])
    is_draft = bool(frontmatter["draft"])

    if not title:
        errors.append(f"{relative(markdown_file)}: title must not be empty")
    if not description:
        errors.append(f"{relative(markdown_file)}: description must not be empty")
    if not str(frontmatter["date"]).strip():
        errors.append(f"{relative(markdown_file)}: date must not be empty")
    if not str(frontmatter["lastmod"]).strip():
        errors.append(f"{relative(markdown_file)}: lastmod must not be empty")
    if "engineering" not in categories:
        errors.append(f"{relative(markdown_file)}: categories must include 'engineering'")

    if not is_draft:
        if description.startswith("TODO:"):
            errors.append(f"{relative(markdown_file)}: published posts cannot keep the default TODO description")
        if not tags:
            errors.append(f"{relative(markdown_file)}: published posts must set at least one tag")

    return errors


def validate_links(markdown_file: Path) -> list[str]:
    errors: list[str] = []
    text = markdown_file.read_text(encoding="utf-8")

    for _, raw_target in MARKDOWN_LINK_PATTERN.findall(text):
        target = raw_target.strip()
        if not target:
            continue

        candidate = target.split()[0].strip("<>")
        candidate = candidate.split("#", 1)[0].split("?", 1)[0]
        if not candidate or is_external(candidate):
            continue

        if not resolve_link_target(markdown_file, candidate):
            errors.append(f"{relative(markdown_file)}: broken local link '{target}'")

    return errors


def is_external(target: str) -> bool:
    lowered = target.lower()
    return lowered.startswith(("http://", "https://", "mailto:", "tel:"))


def resolve_link_target(source_file: Path, target: str) -> bool:
    if target.startswith("/"):
        return any(path_exists(candidate) for candidate in hugo_candidates(target))

    source_dir = source_file.parent
    direct_candidate = (source_dir / target).resolve()
    if path_exists(direct_candidate):
        return True

    if direct_candidate.suffix:
        return False

    return any(path_exists(candidate) for candidate in [
        direct_candidate / "index.md",
        direct_candidate / "_index.md",
        direct_candidate / "index.html",
    ])


def hugo_candidates(target: str) -> list[Path]:
    normalized = target.strip("/")
    base_content = CONTENT_ROOT / normalized
    base_static = STATIC_ROOT / normalized
    candidates = [
        CONTENT_ROOT / f"{normalized}.md",
        base_content / "index.md",
        base_content / "_index.md",
        base_static,
        base_static / "index.html",
    ]
    return candidates


def path_exists(candidate: Path) -> bool:
    return candidate.exists()


def coerce_list(value: object) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return []


def relative(path: Path) -> str:
    return str(path.relative_to(REPO_ROOT)).replace("\\", "/")


def collect_markdown_files() -> list[Path]:
    markdown_files = list(CONTENT_ROOT.rglob("*.md"))
    markdown_files.extend(path for path in DOCS_TO_SCAN if path.exists())
    return sorted(set(markdown_files))


def main() -> int:
    errors: list[str] = []

    for post_file in sorted(POSTS_ROOT.glob("*/index.md")):
        errors.extend(validate_post(post_file))

    for markdown_file in collect_markdown_files():
        errors.extend(validate_links(markdown_file))

    if errors:
        print("Publishing validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Publishing validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
