# Mayuresh Waykole

Personal site and engineering blog built with Hugo and repo-owned layouts, partials, and CSS.

## Stack

- Hugo Extended `0.147.3`
- Repo-owned Hugo templates, partials, and CSS assets
- GitHub Pages deployment from this repository

## Branch and deployment model

- `main` is the canonical branch for day-to-day development.
- Open pull requests against `main`.
- Pushes to `main` trigger the GitHub Pages deployment workflow in `.github/workflows/hugo.yaml`.

## Local setup

1. Install Hugo Extended `0.147.3` locally.
2. Clone the repository.

## Local development

- Preview including drafts:

  ```bash
  hugo server -D
  ```

- Preview published content only:

  ```bash
  hugo server
  ```

- Production build:

  ```bash
  hugo --gc --minify
  ```

The generated site is written to `public/`.

## Publishing guardrails

- Validate post frontmatter and repo-local markdown links before publishing:

  ```bash
  python scripts/validate_publishing.py
  ```

- The deploy workflow now runs the same validation on pull requests to `main` before building the site.
- Use `.github/new-post-checklist.md` when drafting or polishing a post, and the PR template checklist before merging publishing changes.

## Publishing metadata contract

Create new posts with:

```bash
hugo new content/posts/post-title/index.md
```

The archetype standardizes the frontmatter below.
Posts belong in page bundles under `content/posts/<slug>/index.md`; reserve top-level `content/*.md` files for standalone pages such as `about.md` and `archives.md`.

### Required on every post

| Field | Guidance |
| --- | --- |
| `title` | Clear working title. Update it before publishing. |
| `description` | Required summary for SEO and social previews. Keep it concise and specific. |
| `date` | Original publish date. |
| `lastmod` | Last meaningful update date. Keep it in sync when revising published posts. |
| `draft` | `true` while in progress, `false` when ready to publish. |
| `categories` | Keep this as `categories: [engineering]` until navigation is expanded beyond the current Engineering section. |
| `tags` | Populate before publishing with specific keywords and technologies for search/discovery. |
| `ShowToc` / `TocOpen` | Control table-of-contents visibility and default state. |

### Optional when relevant

| Field | Guidance |
| --- | --- |
| `series` | Use for a named multi-post sequence. Leave blank for standalone posts. |
| `featured` | Set to `true` only when a post should be treated as editorially highlighted. |
| `canonicalURL` | Use when the canonical version lives elsewhere. |
| `aliases` | Old paths that should redirect to the current post URL. |
| `cover.image` / `cover.alt` | Use when a post has a hero/cover image; always include meaningful alt text when an image is set. |

### How `tags` and `series` differ

- `tags` are granular keywords such as technologies, patterns, or problem spaces.
- `series` groups posts that belong to the same narrative or multi-part run.

### Tag and naming conventions

- Keep `tags` concise and reader-facing. Prefer 3-6 tags that describe the main technologies, patterns, or problem spaces in the post.
- Use consistent display casing for `tags` (for example `OpenTelemetry`, `Prompt Engineering`, `Technical Debt`) instead of sentence fragments or long summary phrases.
- Prefer lower-case kebab-case filenames or folders for new content (for example `content/posts/thread-pool-starvation/index.md`). Leave legacy filenames and URLs alone unless a dedicated migration also adds the right `aliases`.

### Current discovery surfaces

- Keep `categories: [engineering]` on posts so they continue to appear under the existing Engineering navigation.
- Keep `series` lightweight and manual for now; use `content/series/` for curated landing pages until there is enough real series content to justify stronger automation.

### Phase 2 editorial notes

- `featured: true` adds the Featured badge to shared post cards and boosts a post in related-reading selections.
- Post-page connect and related-reading surfaces are driven by `layouts/partials/site/post-supplemental.html`, while the About page positioning copy lives in `content/about.md`.

### Metadata ownership audit snapshot

- The repo owns the base layout shell plus the shared `head`, `header`, and `footer` partials used by the site chrome.
- Open Graph, Twitter cards, JSON-LD, canonical-link behavior, page-image helpers, and RSS are now repo-owned under `layouts/partials/` and `layouts/_default/`.
- The site now emits a repo-owned JSON Feed (`feed.json`) for the homepage plus section and term archives via `hugo.yaml`, `layouts/index.jsonfeed.json`, and `layouts/_default/*jsonfeed.json`.
- Default social previews now fall back to `static/images/social-preview.png` via `params.images` when a page does not define its own `cover.image` or other page image.
- Shared light-theme primitives now live directly in `assets/css/` and `layouts/partials/`, so the site no longer requires a third-party theme submodule to build.
