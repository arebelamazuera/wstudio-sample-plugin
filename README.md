# wstudio-sample-plugin

Minimal React-ready third-party plugin starter for WStudio.

This package keeps the five sample features while staying small enough to copy
and customize for real plugin development.

## Project Shape

- `src/main.ts`: plugin entry
- `src/settings.ts`: plugin settings tab
- `src/styles.scss`: plugin styles source
- `manifest.json`: plugin metadata consumed by the host
- `esbuild.config.mjs`: bundle and style build pipeline
- `eslint.config.mjs`: starter lint rules

## What It Exercises

- plugin discovery via `manifest.json`
- plugin entry loading via bundled `main.js`
- lifecycle `onload` / `onEnable` / `onDisable` / `onunload` / `onFailed`
- built-in React + TSX starter support
- ReactDOM mounting inside the plugin host
- ribbon icon registration with a notice callback
- command registration through `Open Simple Modal`
- React-powered modal creation and display
- plugin data persistence through a settings text field
- setting tab registration with interactive controls
- global DOM event registration through `registerDomEvent(document, 'click', ...)`
- global interval cleanup through `registerInterval(setInterval(...))`
- plugin stylesheet generation through `src/styles.scss -> styles.css`

## Commands

Install dependencies:

```bash
npm install
```

Lint the project:

```bash
npm run lint
```

Build the sample plugin package:

```bash
npm run build
```

Type-check the sample plugin package:

```bash
npm run typecheck
```

Run the complete local validation:

```bash
npm run validate
```

## Runtime Outputs

- `main.js`
- `main.js.map`
- `styles.css`

## Dependency

By default this sample uses a local sibling dependency:

```bash
wstudio-api = file:../wstudio-api
```

After `wstudio-api` is published, replace it with your public install source, for example:

```json
{
  "dependencies": {
    "wstudio-api": "github:YOUR_GITHUB_OWNER/wstudio-api#main"
  }
}
```

## Portability

You can run:

```bash
npm install
npm run typecheck
npm run build
```

The build will work because:

- `wstudio-api` stays external in the bundle and is provided by the WStudio host at runtime
- `react` and `react-dom` are bundled into the plugin output, so the host does not need to provide them
- the installed `wstudio-api` package contains the TypeScript declarations used by the editor
