import { flattenTree, type Root } from 'fumadocs-core/page-tree';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { getLayoutTabs, type LayoutTab } from 'fumadocs-ui/layouts/shared';
import { useMemo } from 'react';
import { PRODUCTS, type Product } from '@/lib/products';

// Renders a dropdown for switching between products, followed by a dropdown
// for switching between the current product's sections (docs, api).
export function DocsSidebarTabs({
	product,
	tree,
}: {
	product: Product;
	tree: Root;
}) {
	const productTabs = useMemo(() => {
		// Each product has its own page tree, so the current product can't be
		// detected from root folders, and is matched against its pages instead
		const urls = new Set(
			flattenTree([...tree.children, ...(tree.fallback?.children ?? [])]).map(
				(page) => page.url,
			),
		);

		return Object.entries(PRODUCTS).map(
			([id, { title, description, icon: Icon }]): LayoutTab => ({
				title,
				description,
				icon: <Icon />,
				url: `/${id}/docs`,
				urls: id === product ? urls : undefined,
			}),
		);
	}, [product, tree]);

	const sectionTabs = useMemo(() => getLayoutTabs(tree), [tree]);

	return (
		<>
			<SidebarTabsDropdown options={productTabs} />
			{sectionTabs.length > 1 && <SidebarTabsDropdown options={sectionTabs} />}
		</>
	);
}
