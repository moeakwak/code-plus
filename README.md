# <img src="public/icons/icon_48.png" width="45" align="left"> Code Plus

CodePlus is a chrome extension to help you save programming record to Notion.

Currently, CodePlus supports these platforms:

- AcWing (https://www.acwing.com/problem/content/*/)
- <del>LeetCode</del> Not implemented yet

## Start up

### Notion integration

Follow [Notion's instructions](https://developers.notion.com/docs/getting-started) to add a new integration.

### CORS proxy

Notion API doesn't support CORS, so you need to use a CORS proxy.

This repo contain a simple one using cors-anywhere at `proxy/server.js`.

### configuration

Currently option page is not finished, so you need to configure notion API mannually.

Move and edit `src/config.js.template` as `src/config.js`.

## build and install

1. clone with submodule (add `--recursive` flag)
2. compile `lib/martian`
```
cd lib/martian
npm install
npm run compile
```
3. install dependency
```
cd ../..
npm install
```
4. build and watch
```
npm run watch
```

Optionally, you need to run CORS proxy in a new terminal:
```
npm run proxy
```

To install the extension, load the build folder to chrome/edge/etc.

For more details, see [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)'s description.

## How to use

Click the icon action.