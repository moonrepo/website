import type { ProductTheme } from '@moonrepo/ui/theme';
import { FileCogIcon, MoonIcon, PuzzleIcon, SparklesIcon } from 'lucide-react';

// Kept separate from `source.ts`, so that routes can validate products
// on the client without bundling the content collections.

export const PRODUCTS = {
	moon: {
		title: 'moon',
		description: 'Build system for managing monorepos and codebases',
		icon: MoonIcon,
	},
	proto: {
		title: 'proto',
		description: 'Multi-language toolchain version manager',
		icon: SparklesIcon,
	},
	schematic: {
		title: 'schematic',
		description: 'Layered configuration and schema modeling for Rust',
		icon: FileCogIcon,
	},
	wasm: {
		title: 'wasm',
		description: 'WASM based plugins',
		icon: PuzzleIcon,
	},
} as const;

export type Product = keyof typeof PRODUCTS;

export function isProduct(value: string): value is Product {
	return Object.hasOwn(PRODUCTS, value);
}

// Products without a theme use the base palette.
export const PRODUCT_THEMES: Partial<Record<Product, ProductTheme>> = {
	moon: 'moon',
	proto: 'proto',
};

// Products with a changelog, and the GitHub repository of their releases
export const CHANGELOG_REPOS: Partial<
	Record<Product, { owner: string; repo: string }>
> = {
	moon: { owner: 'moonrepo', repo: 'moon' },
	proto: { owner: 'moonrepo', repo: 'proto' },
};
