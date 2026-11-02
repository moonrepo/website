import tailwindCss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import { SITE_URL } from './src/lib/meta.ts';
import { CHANGELOG_REPOS } from './src/lib/products.ts';
import { BLOG_FEED_PATH } from './src/lib/rss.ts';

const fumadocsDeps = ['fumadocs-core', 'fumadocs-ui', '@fumadocs/base-ui'];

interface PrerenderPage {
	path: string;
	sitemap?: { exclude?: boolean };
}

function normalizePath(path: string): string {
	return path.replace(/[?#].*$/, '').replace(/(.)\/$/, '$1');
}

// The prerender crawler dedupes pages by their exact path, so variants like
// `/page`, `/page/`, and `/page#heading` are rendered concurrently into the
// same `page/index.html`, which can leave it empty. Only render the first.
const prerenderedPaths = new Set<string>();

function isFirstPrerender(page: PrerenderPage): boolean {
	// Every crawled link (variants, failed fetches, non-HTML files) lands in
	// the sitemap, so exclude by default and opt in on successful HTML renders
	page.sitemap = { exclude: true };

	const outputPath = normalizePath(page.path);

	if (prerenderedPaths.has(outputPath)) {
		return false;
	}

	prerenderedPaths.add(outputPath);

	return true;
}

function includeInSitemap({
	page,
	html,
}: {
	page: PrerenderPage;
	html: string;
}) {
	if (!/^<!doctype html/i.test(html)) {
		return undefined;
	}

	return { path: normalizePath(page.path), sitemap: { exclude: false } };
}

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		mdx(await import('./source.config.ts')),
		tailwindCss(),
		tanstackStart({
			// Changelogs and the blog feed aren't linked from content, so the
			// crawler needs a start, and follows changelog pagination from there
			pages: [
				...Object.keys(CHANGELOG_REPOS).map((product) => ({
					path: `/${product}/changelog`,
				})),
				{ path: BLOG_FEED_PATH },
			],
			prerender: {
				enabled: true,
				filter: isFirstPrerender,
				onSuccess: includeInSitemap,
			},
			sitemap: {
				enabled: true,
				host: SITE_URL,
			},
		}),
		nitro({
			// Nitro's `unwasm` export condition resolves `shiki/wasm` to a raw
			// `.wasm` file, which the Vite SSR build can't load.
			wasm: false,
		}),
		react(),
	],
	resolve: {
		noExternal: fumadocsDeps,
		tsconfigPaths: true,
	},
	build: {
		rolldownOptions: {
			checks: {
				// Dependencies mark modules with `"use client"` for React Server
				// Components, which don't apply to this app and are safely ignored
				moduleLevelDirective: false,
			},
		},
	},
	// optimizeDeps: {
	// 	include: ['style-to-js', 'hast-util-to-jsx-runtime'],
	// 	exclude: fumadocsDeps,
	// },
});
