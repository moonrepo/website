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
import tsConfigPaths from 'vite-tsconfig-paths';

type Sources = typeof import('../src/lib/source');
type AnySource = Sources['apiSource'] | Sources['blogSource'];
type AnyPage = AnySource['$inferPage'];

const server = await createServer({
	configFile: false,
	appType: 'custom',
	logLevel: 'warn',
	server: { middlewareMode: true, hmr: false, ws: false },
	plugins: [tsConfigPaths({ projects: ['./tsconfig.json'] }), mdx()],
});

try {
	const { apiSource, blogSource, docsSource } = (await server.ssrLoadModule(
		'/src/lib/source.ts',
	)) as Sources;

	// Keys are the splat routes in `src/routes`
	const sources: Record<string, AnySource> = {
		'api/[[..._splat]]': apiSource,
		'blog/[[..._splat]]': blogSource,
		'docs/[[..._splat]]': docsSource,
	};

	const scanned = await scanURLs({
		preset: 'tanstack-start',
		populate: Object.fromEntries(
			Object.entries(sources).map(([route, source]) => [
				route,
				source.getPages().map((page) => ({
					value: { _splat: page.slugs },
					hashes: getHeadings(page),
				})),
			]),
		),
	});

	const files = await Promise.all(
		Object.values(sources).flatMap((source) => source.getPages().map(getFile)),
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
