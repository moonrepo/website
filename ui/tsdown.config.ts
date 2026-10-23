import { defineConfig } from 'tsdown';

export default defineConfig({
	dts: true,
	// Every module is its own entry, so consumers can deep import
	// (e.g. `@moonrepo/ui/components/Button`).
	entry: ['src/**/*.ts', 'src/**/*.tsx'],
	format: 'esm',
	platform: 'neutral',
	unbundle: true,
});
