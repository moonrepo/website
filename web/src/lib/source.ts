import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
// import * as icons from 'lucide-static';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { blog, moon, proto, schematic } from '@/generated/server';
import type { BlogAuthor } from '@/lib/blog';
import type { Product } from '@/lib/products';

function createProductSource(
	product: Product,
	collection: typeof moon | typeof proto | typeof schematic,
) {
	return loader({
		source: collection.toFumadocsSource(),
		baseUrl: `/${product}`,
		plugins: [lucideIconsPlugin()],
		// icon(icon) {
		// 	if (icon && icon in icons) {
		// 		// biome-ignore lint/performance/noDynamicNamespaceImportAccess: allowed
		// 		return icons[icon as keyof typeof icons];
		// 	}
		// },
	});
}

export const productSources = {
	moon: createProductSource('moon', moon),
	proto: createProductSource('proto', proto),
	schematic: createProductSource('schematic', schematic),
} satisfies Record<Product, unknown>;

export type ProductSource = (typeof productSources)[Product];

export const blogSource = loader({
	source: toFumadocsSource(blog, []),
	baseUrl: '/blog',
});

export const blogAuthors: Record<string, BlogAuthor> = {
	milesj: {
		name: 'Miles Johnson',
		title: 'Founder',
		url: 'https://github.com/milesj',
		image: 'https://github.com/milesj.png',
	},
};
