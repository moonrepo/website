// Kept separate from `source.ts`, so that routes can validate products
// on the client without bundling the content collections.

export const PRODUCTS = {
	moon: {
		title: 'moon',
		description: 'Build system for managing monorepos and codebases',
	},
	proto: {
		title: 'proto',
		description: 'Multi-language toolchain version manager',
	},
	schematic: {
		title: 'schematic',
		description: 'Layered configuration and schema modeling for Rust',
	},
} as const;

export type Product = keyof typeof PRODUCTS;

export function isProduct(value: string): value is Product {
	return Object.hasOwn(PRODUCTS, value);
}
