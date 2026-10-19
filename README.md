# Booling✨

bingling_sama's personal webpage, built with Vue, Vue Router, Vite and System.css.

## Requirements

- Node.js 22.22.3+ (22.x) or 24.15.0+.
- pnpm 12.14.0, pinned in `package.json`.
- Git, including the `packages/system` submodule.

With nvm installed, run `nvm install` and `nvm use`. Install the pinned package manager with `npm install --global pnpm@12.14.0` if necessary.

## Development

```sh
git clone --recurse-submodules https://github.com/bingling-sama/Booling.git
cd Booling
pnpm install --frozen-lockfile
pnpm dev
```

For an existing checkout, run `git submodule update --init --recursive` before installation. Installation does not fetch or update Git repositories automatically.

`pnpm dev` and `pnpm build` build the System.css workspace first. Production output is written to `dist/`. Use `pnpm preview` to inspect a completed build.

## Appearance

Booling follows the system light/dark preference. A small script in `index.html`
sets the document's `data-theme` before the application loads and listens for
system preference changes. System.css supplies the explicit theme palettes and
component styling; automatic selection belongs to this application. No theme
preference is stored.

The application window fills the available width up to 40rem. On desktop
(48rem and wider), it is capped at 36rem with a preferred 4:3 width-to-height
ratio; content can make it taller. It has 1.25rem
outer gutters below 30rem and 2rem gutters above that breakpoint, with safe-area
insets respected. The window is vertically centered at every viewport size when
it fits; longer pages scroll naturally from the top gutter. The home profile stacks on narrow screens
and wraps again when enlarged text needs more room. About uses left-aligned text
on small screens and centered paragraphs on wider screens.

Layout variables live in `src/style.css`; window and navigation rules live in
`src/App.vue`. These application rules override System.css defaults without
changing the independent submodule.

## Checks

```sh
pnpm exec playwright install --no-shell chromium
pnpm check
```

Individual checks: `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm build`, and `pnpm test`. Run `pnpm format` to format the main repository. Browser tests use the production build; build before running `pnpm test` alone.

Browser coverage includes navigation, reloads, assets, bundled fonts and system
themes. Responsive checks cover both routes in light/dark themes at widths from
280px to 2560px, breakpoint boundaries, short landscape viewports, 200% root text
size, content overflow and reachability, navigation target size, keyboard focus,
selection and hover. Run `pnpm exec playwright test tests/responsive.spec.ts` to
check the responsive matrix alone.

CI checks out submodules recursively and runs formatting, lint, production build, Chromium desktop/mobile tests and a dependency audit. Dependency updates are proposed weekly by Dependabot.

## System.css submodule

`packages/system` remains an independent Git repository. Its CSS, fonts, icons, documentation and MIT license are maintained there.

```sh
pnpm --filter @booling/system.css build
pnpm --filter @booling/system.css dev
```

The documentation server listens on `http://127.0.0.1:3000` and rebuilds when CSS or documentation assets change. After editing the submodule, commit and push its changes first, then commit its new Git revision together with the root lockfile in this repository. Use Conventional Commits in both repositories.

## Deployment

Vercel's install and build commands explicitly run pnpm 12.14.0 through `npx`, so they do not depend on Vercel's default pnpm version or an experimental Corepack setting. Builds use the frozen lockfile and the `dist` output directory. Ensure submodules are initialized in the deployment checkout. The `/blog` redirect is preserved; `/about` rewrites to `/` (the SPA entry point, as required with `cleanUrls`) so direct links and reloads work. Static assets retain their normal paths and unknown URLs return 404. The Blog navigation link also works in local development.

Vercel handles HTTP compression. The old compression and image conversion build plugins are removed; the existing WebP avatar is served directly. No deployment is performed by the local check commands.

## Maintenance

Use `pnpm outdated -r` and `pnpm audit` to inspect dependencies. TypeScript stays on the latest 6.0 patch until the ESLint TypeScript tooling supports TypeScript 7. Review compatibility before changing major versions, update both workspace manifests as needed, then regenerate the shared lockfile and run `pnpm check`.

Dependency resolution and frozen installs enforce a 24-hour release cooldown (`minimumReleaseAge: 1440`, strict mode). Select versions that have passed this cooldown when updating the lockfile; do not bypass it in CI.
