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
		tsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		mdx(await import('./source.config')),
		tailwindCss(),
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
		include: ['style-to-js', 'hast-util-to-jsx-runtime'],
		exclude: fumadocsDeps,
	},
});
