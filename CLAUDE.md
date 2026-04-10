# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal blog and portfolio site for Mayuresh Waykole (https://mayureshwaykole.com), focused on software engineering topics including Distributed Systems, Observability, and AIOps. The site uses the PaperMod theme and is deployed via GitHub Pages.

## Essential Commands

### Local Development
```bash
# Install Hugo Extended v0.147.3 (match CI)
# https://github.com/gohugoio/hugo/releases/tag/v0.147.3

# Start development server with drafts
hugo server -D

# Start development server (published content only)
hugo server

# Build the site (output goes to public/)
hugo --gc --minify
```

### Content Management
```bash
# Create a new post using the archetype
hugo new content/posts/post-title/index.md

# Update theme submodule
git submodule update --init --recursive
git submodule update --remote --merge
```

### Deployment
The site auto-deploys to GitHub Pages on push to `main` branch via `.github/workflows/hugo.yaml`. The workflow:
- Uses Hugo version 0.147.3 (extended)
- Builds with `--gc --minify` flags
- Deploys to GitHub Pages from `./public` directory

## Architecture

### Site Configuration
- **Main config**: `hugo.yaml` - contains site metadata, menu structure, theme settings, social links, and Google Analytics
- **Base URL**: https://mayureshwaykole.com/
- **Theme**: PaperMod (via git submodule in `themes/PaperMod/`)
- **Main branch for PRs**: `main`

### Directory Structure
```
content/
  about.md        # Standalone site page
  archives.md     # Standalone archive/list page
  posts/          # Page bundles for blog posts (content/posts/post-name/index.md)
archetypes/
  default.md      # Template for new posts with author, tags, date, TOC settings
layouts/          # Custom layout overrides (currently empty, inherits from theme)
static/           # Static assets served directly
public/           # Generated site output (gitignored)
```

### Content Format
All blog posts live in `content/posts/<bundle-name>/index.md` page bundles. Top-level `content/*.md` files are reserved for standalone/list pages (for example `about.md` or `archives.md`). Posts should not be placed directly under `content/`.
```yaml
---
author: "Mayuresh Waykole"
title: 'Post Title'
description: "1-2 sentence summary for search and social previews."
date: 2025-05-18T02:28:00.000Z
lastmod: 2025-05-18T02:28:00.000Z
draft: true
categories: [engineering]
tags: [Tag1, Tag2, Tag3]
topics: [Distributed Systems]
series: ""
featured: false
canonicalURL: ""
aliases: []
cover:
  image: ""
  alt: ""
ShowToc: true
TocOpen: true
---
```

### Theme Customization
- The site uses PaperMod theme as a git submodule
- Custom configurations are in `hugo.yaml` under `params:`
- Theme updates require: `git submodule update --remote --merge`
- Never modify files inside `themes/PaperMod/` directly; use Hugo's override system via `layouts/`

### Menu Structure
Site navigation (defined in `hugo.yaml`):
- Archives (`/archives/`)
- Tags (`/tags/`)
- Engineering category (`/categories/engineering/`)

## Important Notes

### Git Workflow
- **Canonical development branch**: `main`
- **Main deployment branch**: `main` (triggers GitHub Pages deployment)
- **PR target branch**: `main`
- `public/` folder is gitignored (generated content)

### Hugo Version
The deployment workflow uses Hugo Extended v0.147.3. Keep this consistent for local development to avoid build discrepancies.

### Content Guidelines
- Posts should be categorized under `categories: [engineering]` to appear in the Engineering menu
- `description`, `date`, `lastmod`, `draft`, `tags`, `topics`, `ShowToc`, and `TocOpen` should be present on every post
- `topics` should use only these Phase 1 pillar values: `Distributed Systems`, `Observability`, `AIOps / AI Engineering`, `Reliability / Architecture`, `Engineering Leadership`
- `tags` are granular discovery terms; `topics` are curated pillar labels; `series` is for a named multi-part sequence
- `series`, `featured`, `canonicalURL`, `aliases`, and `cover` fields are optional and should be filled only when relevant
- Always set `draft: false` when ready to publish
