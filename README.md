# WStudio Sample Plugin

This is a sample plugin for WStudio.

It uses TypeScript for type checking, `wstudio-api` for the public plugin API
surface, and includes React-ready tooling so you can build plugin UI without
adding extra setup first.

This sample demonstrates a small but practical set of plugin features:

- Adds a ribbon icon that shows a notice when clicked
- Adds a command `Open Simple Modal`
- Adds a plugin setting tab
- Registers a global click event and logs `click`
- Registers a global interval and logs `setInterval`
- Renders modal content with React to show built-in TSX support

## First Time Developing WStudio Plugins?

Quick start for new plugin developers:

- Clone this repository to your development machine
- Install Node.js 20 or newer
- Run `npm install`
- Run `npm run dev` to build in watch mode
- Make changes in `src/main.ts`, `src/settings.ts`, or `src/styles.scss`
- Reload WStudio after rebuilding the plugin
- Enable the plugin in WStudio after it is discovered

The project already includes:

- TypeScript configuration
- React + TSX support
- SCSS compilation
- ESLint configuration
- A minimal manifest and starter file layout

## Project Structure

- `manifest.json`: plugin metadata used by the WStudio host
- `src/main.ts`: main plugin entry
- `src/settings.ts`: sample settings tab
- `src/styles.scss`: plugin styles source
- `esbuild.config.mjs`: build pipeline for `main.js` and `styles.css`
- `eslint.config.mjs`: lint configuration
- `tsconfig.json`: TypeScript configuration

## Development

Install dependencies:

```bash
npm install
```

Start watch mode:

```bash
npm run dev
```

Build the plugin once:

```bash
npm run build
```

Type-check the project:

```bash
npm run typecheck
```

Run the complete local validation:

```bash
npm run validate
```

## How It Works

This sample keeps `wstudio-api` external during bundling. The API package is
provided by the WStudio host at runtime, while `react` and `react-dom` are
bundled into the plugin output.

Build output files:

- `main.js`
- `main.js.map`
- `styles.css`

## Running It In WStudio

WStudio scans plugin folders under its user-data `plugins/` directory by
default. Each plugin should live in its own folder named after the plugin id or
another stable directory name, for example:

```text
plugins/
  wstudio-plugin-sample/
    manifest.json
    main.js
    styles.css
```

To load this sample manually:

1. Clone or copy this repository into a folder for the plugin
2. Run `npm install`
3. Run `npm run build` or `npm run dev`
4. Make sure the folder contains `manifest.json`, `main.js`, and `styles.css`
5. Start or reload WStudio so it rescans plugins

For development builds, WStudio can also read additional plugin roots from the
`WSTUDIO_PLUGIN_ROOTS` environment variable.

## API Dependency

This sample depends on the public `wstudio-api` repository:

```json
{
  "dependencies": {
    "wstudio-api": "github:arebelamazuera/wstudio-api#main"
  }
}
```

If you publish `wstudio-api` to a package registry later, you can replace that
dependency with a normal semver package version.

## Notes

- `manifest.json` is required for plugin discovery
- `main.js` is the plugin entry file loaded by the host
- `styles.css` is optional in general, but included by this sample
- The settings tab persists the sample notice message through the plugin data store
