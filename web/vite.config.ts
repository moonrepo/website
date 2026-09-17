import tailwindCss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const fumadocsDeps = ['fumadocs-core', 'fumadocs-ui', '@fumadocs/base-ui'];

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		mdx(await import('./source.config.ts')),
		tailwindCss(),
		tanstackStart({
			prerender: {
				enabled: true,
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
