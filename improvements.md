# Blog Platform Improvements

## Objective

Evolve the site from a simple Hugo blog into a lightweight publishing platform optimized for:

- consistent technical blogging
- low-friction publishing
- stronger personal brand
- long-term maintainability

This document focuses on the tech stack, structure, publishing workflow, and site architecture, not on blog post content.

Phase 1 note: the operating model, metadata contract, taxonomy prep, and page-bundle migration have now been applied. References below to flat `content/posts/*.md` posts describe the original starting point for this improvement plan, not the current publishing layout.

## Current Assessment

The current site is a solid MVP:

- Hugo-based
- PaperMod theme via git submodule
- simple `content/posts/*.md` structure
- minimal archetype
- GitHub Pages deployment through GitHub Actions

This is a good starting point, but it is still optimized for "having a blog" rather than "running a durable technical publishing system."

Key limitations today:

- flat content structure for posts
- little control over brand-critical layouts
- no asset pipeline structure
- no custom layout system yet
- weakly defined metadata contract
- inconsistent naming/tagging conventions
- branch/deployment/docs ambiguity
- dependence on theme defaults for important user-facing surfaces

## Core Recommendation

Keep Hugo.

Do not replatform to a heavier stack unless there is a very specific future requirement that Hugo cannot support. Hugo is still the right choice for a technical blog and personal brand site because it is:

- fast
- cheap to host
- easy to version in Git
- durable over time
- well-suited for writing-first workflows

The main work should be in restructuring the site and owning more of the presentation and publishing flow.

## Recommended Changes

### 1. Treat the repo as a publishing platform, not just a blog

The repository should make writing, previewing, publishing, and evolving the site easy and repeatable.

That means:

- stronger conventions
- clear local setup
- reproducible publishing workflow
- custom ownership of important site surfaces

### 2. Stabilize and document the operating model

The repo should have one clear source of truth for:

- active development branch
- production deployment branch
- PR target branch
- local development steps
- Hugo version

This should be consistent across:

- workflow files
- README
- project documentation

The goal is to remove ambiguity from publishing and maintenance.

### 3. Move from flat markdown files to page bundles

Replace:

```text
content/posts/post-name.md
```

With:

```text
content/posts/post-name/
  index.md
  cover.png
  diagram-1.png
  diagram-2.png
```

Why this matters:

- keeps post assets co-located with the post
- makes screenshots and diagrams easier to manage
- simplifies social image and cover image handling
- scales better for technical posts with visuals

### 4. Define a proper metadata contract

Frontmatter should be treated as structured publishing metadata, not just a few optional fields.

Recommended fields:

- `title`
- `description`
- `date`
- `lastmod`
- `draft`
- `tags`
- `topics`
- `series`
- `featured`
- `canonicalURL`
- `aliases`
- `cover.image`
- `cover.alt`
- `ShowToc`
- `TocOpen`

This should be enforced through a richer archetype so every new post starts with the right structure.

### 5. Standardize naming and taxonomy conventions

Current post naming and metadata are inconsistent enough to become maintenance drag over time.

Recommended conventions:

- lowercase kebab-case slugs and folder names
- consistent tag casing and vocabulary
- stable topic taxonomy
- clear distinction between tags, topics, and series

Suggested brand/topic pillars:

- Distributed Systems
- Observability
- AIOps / AI Engineering
- Reliability / Architecture
- Engineering Leadership

These should become first-class navigation and discovery surfaces.

### 6. Add custom layouts for brand-critical pages

The site currently relies too much on the theme's default behavior. For personal brand building, the most important pages should be owned directly.

Priority surfaces to customize:

- homepage
- single post layout
- topic pages
- series pages
- about page
- author CTA / connect block
- related posts section

This is where differentiation happens. The site should communicate expertise, focus areas, and identity more clearly than a stock theme.

### 7. Introduce `assets/` and `static/` structure

Add a deliberate split between processed assets and static files.

Suggested purpose:

- `assets/` for CSS overrides, processed images, generated social assets
- `static/` for favicons, site manifest, verification files, durable media assets

This will make the site easier to extend without overloading the content folder.

### 8. Improve the homepage as a positioning surface

The homepage should not just be a generic blog landing page. It should function as a positioning layer for your personal brand.

It should clearly answer:

- who you are
- what technical areas you are known for
- what visitors should read first
- where to connect with you

Recommended homepage elements:

- clear positioning headline
- short expertise summary
- featured posts
- topic hubs
- optional featured series
- call to connect/subscribe/follow

### 9. Build topic hubs, not just a post feed

A strong technical brand compounds through topic ownership, not just individual articles.

Instead of relying mostly on archives and tag lists, build curated topic hub pages for core areas. These pages should aggregate relevant posts and help new readers understand your expertise quickly.

### 10. Strengthen SEO and distribution infrastructure

The current site has some basics, but discovery should be treated as a platform capability.

Recommended improvements:

- stronger article schema
- stronger person schema
- canonical URLs
- alias handling for renamed slugs
- JSON feed in addition to RSS
- default social preview image support
- topic pages optimized as landing pages
- internal linking structure between related posts

### 11. Clean up legacy or unclear artifacts

The repository contains some artifacts whose role should be clarified or removed.

Examples:

- obsolete `posts/posts.json` metadata file
- any mismatch between docs and actual deployment behavior

Every file in the repo should have an intentional role in the publishing system.

### 12. Add lightweight publishing guardrails

To support regular blogging, add low-overhead quality controls:

- a richer post archetype
- a new-post checklist
- a PR template for publish changes
- optional CI validation for required frontmatter
- optional link/image validation

The point is not process for its own sake. The point is reducing friction and avoiding avoidable publishing mistakes.

## PaperMod Recommendation

### Short Answer

Do not remove PaperMod immediately, but do treat it as a managed dependency on a path to removal.

### Why

PaperMod is useful today because it gives speed and a working baseline. Removing it right away would create unnecessary rewrite work before the publishing system and information architecture are mature.

However, for long-term personal brand building, owning the presentation layer is better than living inside theme constraints.

### Current dependency boundary

Already repo-owned today:

- `layouts/index.html` homepage
- `layouts/_default/single.html` post layout
- `layouts/_default/list.html`, `term.html`, and `terms.html` archive/topic discovery surfaces
- `layouts/_default/about.html` about page
- `layouts/series/list.html` series landing
- `layouts/partials/brand/*` and `layouts/partials/site/*` brand-specific presentation components
- `assets/css/extended/*` custom brand styling

Still inherited from PaperMod:

- theme wiring in `hugo.yaml` and the `themes/PaperMod/` submodule
- global shell partials: `head.html`, `header.html`, `footer.html`
- shared content helpers: `breadcrumbs.html`, `cover.html`, `post_meta.html`, `toc.html`, `anchored_headings.html`
- post utility/integration partials: `translation_list.html`, `edit_post.html`, `post_canonical.html`, `post_nav_links.html`
- optional platform partials: `social_icons.html`, `share_icons.html`, `comments.html`

What can stay temporary:

- Keep the PaperMod submodule in place while the site still depends on shared shell or post helper partials.
- Leave low-differentiation helpers such as `comments.html`, `translation_list.html`, `edit_post.html`, and `post_canonical.html` for late in the migration unless product requirements change.
- Avoid adding new direct dependencies on PaperMod internals beyond the list above; new work should land in repo-owned `layouts/` or `assets/`.

### Migration / removal sequence

Use PaperMod as a temporary scaffold while progressively taking ownership of the remaining dependency layers.

| Ownership milestone | What becomes repo-owned next | Prerequisites | Success signal |
| --- | --- | --- | --- |
| M1. Freeze the dependency boundary | Confirm the inherited partial set above and keep new feature work inside repo-owned `layouts/partials/{brand,site}` and `assets/css/extended/`. | Current branded layouts remain stable. | Theme usage stops expanding; PaperMod is a compatibility layer, not the design system. |
| M2. Own the global shell | Replace `head.html`, `header.html`, `footer.html`, and, if needed for navigation consistency, `breadcrumbs.html`. | Agreed navigation, metadata, and brand shell requirements. | Homepage, about, archives, topics, and series pages render site chrome without PaperMod partials. |
| M3. Own post primitives | Replace `cover.html`, `post_meta.html`, `toc.html`, `post_nav_links.html`, `social_icons.html`, `share_icons.html`, and `anchored_headings.html` as needed. | M2 complete and post design tokens/content behavior stable. | Single-post rendering is controlled locally; PaperMod no longer dictates reader-visible post behavior. |
| M4. Exit the theme cleanly | Remove unused PaperMod params, re-home any remaining helpers, update docs, remove `theme: ["PaperMod"]`, and delete the submodule. | M2 and M3 complete; no required runtime calls into theme-only templates. | `hugo --gc --minify` succeeds without `themes/PaperMod/`, and key pages pass smoke testing. |

### Safe removal criteria

PaperMod is safe to remove only when all of the following are true:

- the repo owns the global shell and all reader-visible components on homepage, posts, archives, topics, series, and about
- no required template resolution depends on `themes/PaperMod/`
- `hugo --gc --minify` succeeds on a branch where the theme config and submodule are removed
- a visual smoke check passes for homepage, a single post, `/about/`, `/archives/`, `/topics/`, one topic term page, and one series page
- local setup and deployment docs no longer mention initializing the PaperMod submodule

### Sequencing guidance

This should stay a low-risk migration track, not an immediate rewrite:

1. keep PaperMod for generic plumbing that is not currently hurting iteration speed
2. replace global shell pieces before touching every low-level post helper
3. move post primitives only when there is clear product/design value or theme friction
4. remove PaperMod only after the repo can render the full reader journey without it

This sequencing keeps the current site stable while making future removal predictable instead of urgent.

### Near-term focus while PaperMod remains

Use the current theme dependency to avoid rebuilding generic mechanics from scratch while you improve:

- content structure
- metadata model
- publishing flow
- homepage strategy

### Stage 2: Override brand-critical surfaces

Start building your own Hugo layouts, partials, and CSS for:

- homepage
- single post pages
- taxonomy/topic pages
- author and CTA components
- featured content sections

At this stage, the theme becomes a convenience layer rather than the source of your product decisions.

### Stage 3: Remove PaperMod once it becomes drag

The right time to remove PaperMod is when:

- most important templates are already custom
- you frequently work around theme assumptions
- theme internals are slowing simple changes
- upstream theme structure adds more cognitive load than value

At that point, a small custom Hugo theme or fully owned layout system is the better long-term option.

## Staff-Level Prioritization

### Phase 1: Foundation

- align branch, workflow, and docs
- pin the local Hugo workflow clearly
- move to page bundles
- improve archetype and metadata contract
- standardize naming and taxonomy conventions

### Phase 2: Brand Surfaces

- add custom layouts and partials
- redesign homepage for positioning
- add topic and series pages
- add author CTA and related posts
- introduce `assets/` and `static/`

### Phase 3: Distribution and Scale

- improve structured data
- add social image strategy
- improve feeds and discoverability
- add CI checks for publishing quality
- remove PaperMod once it no longer provides net value

## Bottom Line

The best path is:

1. keep Hugo
2. evolve away from theme dependence
3. build a stronger content and metadata model
4. own the brand-critical layouts
5. optimize the repo for regular, low-friction technical publishing

This approach gives the best balance of:

- speed today
- maintainability tomorrow
- better branding
- less theme workaround pain over time
