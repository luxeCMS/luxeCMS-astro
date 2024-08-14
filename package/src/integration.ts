import { createResolver, defineIntegration } from "astro-integration-kit";
import { readdir } from "node:fs/promises";
import { z } from "astro/zod";
import c from "picocolors";

export const integration = defineIntegration({
	name: "@luxecms/luxecms-astro",
	optionsSchema: z.object({
		verbose: z.boolean().optional(),
	}),
	setup({ options }) {
		const { resolve } = createResolver(import.meta.url);
		return {
			hooks: {
				"astro:config:setup": ({ logger, injectRoute }) => {
					const verbose = options.verbose ?? false;
					const luxeLogger = logger.fork(c.bold(c.yellow("luxeCMS-astro")));
					const loggerTagged = (message: string) =>
						logger.fork(
							`${c.bold(c.yellow("luxeCMS-astro"))}${c.gray("/")}${c.yellow(message)}`,
						);
					const routerLogger = loggerTagged("router");
					const routeLogInfo = (message: string) => {
						if (verbose) {
							routerLogger.info(message);
						}
					};

					const routeHelper = (
						enabled: boolean,
						pattern: string,
						entrypoint: string,
					) => {
						if (enabled) {
							routeLogInfo(
								c.bold(c.cyan(`Adding route: ${pattern} for ${entrypoint}`)),
							);
							injectRoute({
								pattern,
								entrypoint: resolve(`../src/routes/${entrypoint}`),
								prerender: true,
							});
						} else {
							routeLogInfo(c.gray(`Skipping route: ${pattern}`));
						}
					};

					luxeLogger.info("Setting up luxeCMS-astro integration");

					const addRoutes = async () => {
						try {
							const routesDir = resolve("../src/routes");
							const files = await readdir(routesDir, { recursive: true });
							for (const file of files) {
								if (file.endsWith(".astro")) {
									let routePath = `/${file.replace(routesDir, "").replace(".astro", "")}`;
									if (routePath.endsWith("/index")) {
										routePath = routePath.replace("/index", "");
									}
									const routeEntrypoint = `/${file}`;
									routeHelper(true, routePath, routeEntrypoint);
								}
							}
						} catch (e: unknown) {
							if (e instanceof Error) {
								luxeLogger.error(
									`Error reading routes directory: ${e.message}`,
								);
							}
						}
					};

					addRoutes();
				},
			},
		};
	},
});
