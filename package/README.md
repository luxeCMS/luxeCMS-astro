# `luxeCMS-astro`

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that connects your luxeCMS to an Astro project.

## Usage

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add luxecms
```

```bash
npx astro add luxecms
```

```bash
yarn astro add luxecms
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add luxecms
```

```bash
npm install luxecms
```

```bash
yarn add luxecms
```

2. Add the integration to your astro config

```diff
+import luxeCMS from "luxecms";

export default defineConfig({
  integrations: [
+    luxeCMS(),
  ],
});
```

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/luxeCMS/luxeCMS-astro/blob/main/LICENSE)
