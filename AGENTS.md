# vr-documentation

## Purpose

`vr-documentation` is the public Docusaurus site for the Verkhovna Rada
Warmane Icecrown guild. It documents guild rules, DKP, raid preparation,
classes, speaker duties, recruitment, legendary items, and boss tactics.

This is an independent Git repository. It is content-focused and does not
share build code with `vr-manager`, `vr-manager-server`, or
`vr-organizer`.

## Stack and commands

- Docusaurus 3.8.1 with the classic preset.
- React 19, MDX, Prism React Renderer, TypeScript 5.6.
- npm with the committed `package-lock.json`.

```bash
npm ci
npm run start          # local Docusaurus server
npm run build          # production static build into build/
npm run typecheck      # tsc
npm run serve          # serve an existing build/
npm run clear          # clear Docusaurus caches when needed
```

CI runs `npm ci` and `npm run build` on Node 22, then deploys the `build/`
directory to GitHub Pages on pushes to `main`. There is no application test
suite; a successful build is the primary content validation.

## Site configuration

`docusaurus.config.ts` is executed in Node, not in the browser. It defines:

- title `Verkhovna Rada` and Ukrainian guild tagline;
- GitHub organization `LogansUA` and project `vr-documentation`;
- production URL `https://LogansUA.github.io`;
- project base path `/vr-documentation/`;
- English as the only configured locale, while most content is Ukrainian;
- `onBrokenLinks: 'throw'` and `onBrokenMarkdownLinks: 'warn'`;
- docs sidebar from `sidebars.ts`;
- custom CSS from `src/css/custom.css`;
- GitHub edit links, logo, favicon, Discord, spreadsheet, and feedback links.

Do not remove or change the base path casually: it is required for the GitHub
Pages project deployment. If hosting moves to a domain root, update `url`,
`baseUrl`, and deployment configuration together.

The Dockerfile builds the static site with Node 20 and serves it from nginx.
`docker/nginx/nginx.conf` provides SPA-style fallback to `index.html`, long
cache headers for static assets, compression, and basic security headers.

## Content structure

The `docs/` tree is the source of the site. The sidebar is filesystem-generated
by `sidebars.ts`, so directory placement and `_category_.json` files affect
navigation order and labels.

- `docs/intro.md`: guild purpose and goals.
- `docs/general/`: rules, FAQ, ranks, class obligations, raid behavior, needs,
  useful links, and main-spec changes.
- `docs/general/dkp/`: DKP system, bonuses, fines, and bidding rules.
- `docs/guides/`: boss encounter guidance and guide format.
- `docs/legendary/`: Shadowmourne and Val'anyr player lists.
- `docs/recruiter/`: recruitment guidance.
- `docs/speaker/`: raid composition, assignments, and speaker guidance.
- `blog/`: legacy/example blog material; current config disables the blog
  preset, so do not assume blog files are published.
- `static/`: favicon, logo, icons, and other files copied as-is.
- `src/`: homepage React components and global/theme CSS only.

Some documents intentionally contain `TBD` sections and future-guide
placeholders. Preserve them unless the task is specifically to complete or
remove unfinished guild policy.

## Authoring rules

Use Markdown/MDX with frontmatter at the top of a document when navigation
metadata is needed:

```md
---
sidebar_position: 3
slug: example
---
```

Guidelines:

- Write new user-facing content in Ukrainian and preserve guild terminology
  such as РТ, РЛ, ДКП, ЦЛК, РС, ТОГК, and біс.
- Use descriptive headings; headings become navigation/anchor IDs.
- Use relative links for pages within `docs/` and verify the target path after
  moving a document.
- Keep raid names, class/spec names, and game links consistent with existing
  pages. External links should be explicit and useful.
- Put images and downloadable static files under `static/`; reference them
  using the Docusaurus public path rather than filesystem-relative paths.
- Keep `_category_.json` changes focused: labels and ordering alter the whole
  sidebar.
- Avoid adding React components for content that Markdown/MDX can express.
- Do not edit generated `.docusaurus/` or `build/` output.

The documentation describes guild policy and raid practice, not application
implementation. When a rule conflicts with code behavior, document the current
policy accurately and flag the code discrepancy rather than silently inventing
a technical workaround.

## Homepage and theme work

The landing page lives in `src/pages/index.tsx` with styles in
`src/pages/index.module.css`. Shared theme overrides are in
`src/css/custom.css`; reusable homepage content is under
`src/components/HomepageFeatures/`.

Use existing Docusaurus theme components and CSS before adding a dependency.
Keep the site usable at narrow widths, preserve keyboard focus, and provide
alt text for meaningful images. Static decorative images may use an empty alt
attribute when that matches the surrounding component.

## Deployment and verification

The GitHub Actions workflow `.github/workflows/gh-pages.yml`:

1. checks out the full history;
2. installs Node 22 dependencies;
3. runs `npm run build`;
4. uploads `build/` as a Pages artifact;
5. deploys it to the `github-pages` environment.

Before changing navigation, URLs, images, or frontmatter, run:

```bash
npm run typecheck
npm run build
```

Inspect build warnings, especially broken links and broken Markdown. A local
build is enough for content changes; do not run deployment commands or push a
Pages release as part of ordinary editing.

## Safety and repository hygiene

- Do not commit `.env`, editor state, `.DS_Store`, `.docusaurus`, or
  `build/`.
- Preserve existing user content and links unless the request targets them.
- Check `git status` before editing; this repository is independent of the
  other three repositories.
- Keep the current GitHub Pages organization/project settings unless a hosting
  migration is explicitly requested.
