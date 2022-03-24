# Code Plus

CodePlus is a chrome extension to help you save programming record as Notion pages.

CodePlus plans to support these platforms:

- AcWing (available at https://www.acwing.com/problem/content/*/)
- LeetCode (Not implemented yet)
- Codeforces (Not implemented yet)
- CCF cspro (Not implemented yet)
- Luogu (Not implemented yet)

## Start up

### Notion integration

Follow [Notion's instructions](https://developers.notion.com/docs/getting-started) to add a new integration, and record your database_id and secret.

The database's schema should contain these:
- Link (url)
- From (select)
- Title (title)
- Data (date)
- Status (select)
- Difficulty (select)
- Tags (multi-select)

### configuration

Currently option page is not finished, so you need to configure notion API mannually.

Move and edit `src/config.js.template` as `src/config.js`.

### CORS proxy

<del>Notion API doesn't support CORS, so you need to use a CORS proxy.</del>

**Note**: It seems Notion API has been updated and you can use it without CORS proxy!

This repo contains a simple one using cors-anywhere at `proxy/server.js`.

## build and install

1. clone with submodule (add `--recursive` flag)
2. install dependency
```
npm install
```
3. build
```
npm run build
```

Optionally, you may need to run CORS proxy in a new terminal (depends on whether you can use with CORS proxy):
```
npm run proxy
```

Last, to install the extension, load the `build` folder.

For more details, see [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)'s description.

## How to use

Click the icon action.