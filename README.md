# WStudio Sample Plugin

This is a sample plugin for WStudio.

This project uses TypeScript for type checking and `wstudio-api` for the public
plugin API surface. It also includes React-ready tooling so you can build plugin
UI with TSX without extra setup.

This sample demonstrates some of the basic functionality the plugin API can do:

- Adds a ribbon icon, which shows a notice when clicked
- Adds a command `Open Simple Modal`, which opens a modal
- Adds a plugin setting tab to the settings page
- Registers a global click event and logs `click` to the console
- Registers a global interval and logs `setInterval` to the console
- Renders modal content with React to show built-in TSX support

## First time developing WStudio plugins?

Quick start for new plugin developers:

- Make a copy of this repo or clone it to your local development folder
- Install Node.js 20 or newer
- Run `npm install`
- Run `npm run dev` to compile the plugin in watch mode
- Make changes in `src/main.ts`, `src/settings.ts`, or `src/styles.scss`
- Reload WStudio to load the new build
- Enable the plugin after WStudio discovers it

## How to use

- Clone this repository
- Make sure your Node.js version is 20 or newer
- Run `npm install`
- Run `npm run dev` to start compilation in watch mode
- Use `npm run build` if you only want to build once

## Manually installing the plugin

Copy `manifest.json`, `main.js`, and `styles.css` to your plugin folder:

```text
plugins/
  wstudio-plugin-sample/
    manifest.json
    main.js
    styles.css
```

WStudio scans its user-data `plugins/` directory by default. For development
builds, WStudio can also read additional plugin roots from the
`WSTUDIO_PLUGIN_ROOTS` environment variable.

## Improve code quality with ESLint

This project already includes ESLint configuration.

- Run `npm run lint` to check the project
- Run `npm run lint:fix` to apply automatic fixes where possible

## Funding URL

You can include a `fundingUrl` field in `manifest.json` so people who use your
plugin can support it:

```json
{
  "fundingUrl": "https://github.com/sponsors/YOUR_ACCOUNT"
}
```

This sample already includes a `fundingUrl` value in `manifest.json`, and
WStudio can surface that link in the Extensions view.

## API documentation

See the public `wstudio-api` repository:

https://github.com/arebelamazuera/wstudio-api
