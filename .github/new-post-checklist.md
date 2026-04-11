# New post checklist

- Create the post as a page bundle with `hugo new content/posts/<slug>/index.md`.
- Replace placeholder copy before publishing, especially `title`, `description`, `draft`, and `lastmod`.
- Keep `categories: [engineering]` and add 3-6 reader-facing `tags`.
- Check any local links, images, and `cover.alt` text if a cover image is set.
- Preview with `hugo server -D`.
- Before opening or merging a publishing PR, run `python scripts/validate_publishing.py` and `hugo --gc --minify`.
