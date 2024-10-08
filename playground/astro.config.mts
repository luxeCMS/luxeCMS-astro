import tailwind from "@astrojs/tailwind";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

const { default: luxeCMS } = await import("@luxecms/luxecms-astro");

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		luxeCMS({ verbose: true }),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
});
