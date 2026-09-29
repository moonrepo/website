// Validates links in MDX content: https://www.fumadocs.dev/docs/integrations/validate-links
//
// Content collections are generated with `import.meta.glob`, so the sources
// are loaded through a minimal Vite server instead of Node directly.

import mdx from 'fumadocs-mdx/vite';
import {
	type FileObject,
	printErrors,
	scanURLs,
	validateFiles,
} from 'next-validate-link';
import { createServer } from 'vite';

type Sources = typeof import('../src/lib/source');
type AnySource =
	| Sources['blogSource']
	| Sources['productSources'][keyof Sources['productSources']];
type AnyPage = AnySource['$inferPage'];

const server = await createServer({
	configFile: false,
	appType: 'custom',
	logLevel: 'warn',
	server: { middlewareMode: true, hmr: false, ws: false },
	plugins: [mdx()],
	resolve: { tsconfigPaths: true },
});

try {
	const { blogSource, productSources } = (await server.ssrLoadModule(
		'/src/lib/source.ts',
	)) as Sources;

	const products = Object.entries(productSources);

	// Keys are the dynamic routes in `src/routes`
	const scanned = await scanURLs({
		preset: 'tanstack-start',
		populate: {
			'[product]': products.map(([product]) => ({ value: { product } })),
			'[product]/[[..._splat]]': products.flatMap(([product, source]) =>
				source.getPages().map((page) => ({
					value: { product, _splat: page.slugs },
					hashes: getHeadings(page),
				})),
			),
			'blog/[[..._splat]]': blogSource.getPages().map((page) => ({
				value: { _splat: page.slugs },
				hashes: getHeadings(page),
			})),
		},
	});

	const sources: AnySource[] = [
		blogSource,
		...products.map(([, source]) => source),
	];

	const files = await Promise.all(
		sources.flatMap((source) => source.getPages().map(getFile)),
	);

	printErrors(
		await validateFiles(files, {
			scanned,
			markdown: {
				components: {
					Card: { attributes: ['href'] },
				},
			},
			// Links are relative file paths, like `./task.mdx`
			checkRelativePaths: 'as-url',
		}),
		true,
	);

	console.log(`Validated links in ${files.length} files`);
} finally {
	await server.close();
}

function getHeadings(page: AnyPage): string[] {
	return page.data.toc.map((item) => item.url.slice(1));
}

async function getFile(page: AnyPage): Promise<FileObject> {
	return {
		path: page.data.info.fullPath,
		content: await page.data.getText('raw'),
		url: page.url,
		data: page.data,
	};
}
