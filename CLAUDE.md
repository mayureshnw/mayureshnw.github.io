# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal blog and portfolio site for Mayuresh Waykole (https://mayureshwaykole.com), focused on software engineering topics including Distributed Systems, Observability, and AIOps. The site uses the PaperMod theme and is deployed via GitHub Pages.

## Essential Commands

### Local Development
```bash
# Install Hugo (if not already installed)
brew install hugo

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
hugo new content/posts/post-title.md

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
- **Main branch for PRs**: `root`

### Directory Structure
```
content/
  posts/          # Blog post markdown files
  archives.md     # Archive page configuration
archetypes/
  default.md      # Template for new posts with author, tags, date, TOC settings
layouts/          # Custom layout overrides (currently empty, inherits from theme)
static/           # Static assets served directly
public/           # Generated site output (gitignored)
posts/
  posts.json      # Legacy posts metadata
```

### Content Format
All blog posts are in `content/posts/` as markdown files with YAML frontmatter:
```yaml
---
author: "Mayuresh Waykole"
title: 'Post Title'
tags: [Tag1, Tag2, Tag3]
categories: [engineering]
description: ""
date: 2025-05-18T02:28:00.000Z
draft: false
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
- **Current branch**: `dev`
- **Main deployment branch**: `main` (triggers GitHub Pages deployment)
- **PR target branch**: `root`
- `public/` folder is gitignored (generated content)

### Hugo Version
The deployment workflow uses Hugo Extended v0.147.3. Keep this consistent for local development to avoid build discrepancies.

### Content Guidelines
- Posts should be categorized under `categories: [engineering]` to appear in the Engineering menu
- Always set `draft: false` when ready to publish
- Use meaningful tags for discoverability
- ShowToc/TocOpen controls table of contents visibility
