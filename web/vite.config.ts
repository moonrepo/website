import tailwindCss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

const fumadocsDeps = ['fumadocs-core', 'fumadocs-ui'];

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		mdx(await import('./source.config')),
		tailwindCss(),
		tsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tanstackStart({
			prerender: {
				enabled: true,
			},
		}),
		react(),
	],
	resolve: {
		noExternal: fumadocsDeps,
	},
	optimizeDeps: {
		exclude: fumadocsDeps,
	},
});
