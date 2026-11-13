import { flattenTree, type Root } from 'fumadocs-core/page-tree';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { getLayoutTabs, type LayoutTab } from 'fumadocs-ui/layouts/shared';
import { ScrollText } from 'lucide-react';
import { type ReactNode, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { PRODUCTS, type Product } from '@/lib/products';

// Technical-drawing touches to match the docs' blueprint layer (see
// `fumadocs.css`). The popup is portaled outside `BlueprintScope`, so colors
// use the palette directly instead of the `--blueprint-*` variables.
const TRIGGER_CLASS = 'gap-3 rounded-md';
const ITEM_CLASS = 'docs-tab gap-3 rounded-[4px]';

function withItemClass(tabs: LayoutTab[]): LayoutTab[] {
	return tabs.map((tab) => ({
		...tab,
		props: { ...tab.props, className: cn(ITEM_CLASS, tab.props?.className) },
	}));
}

// Replaces the wrapper `getLayoutTabs` puts around icons, so every icon gets
// the same size, ink color, and (on mobile) drawing plate
function tabIcon(icon: ReactNode) {
	return (
		<div className="size-full text-olive dark:text-tangerine max-md:rounded-[4px] max-md:border max-md:border-olive/40 max-md:bg-olive/5 max-md:p-1.5 dark:max-md:border-tangerine/40 dark:max-md:bg-tangerine/5 [&_svg]:size-full">
			{icon}
		</div>
	);
}

function TabsLabel({ children }: { children: ReactNode }) {
	return (
		<p className="-mb-1 font-mono text-olive text-tech uppercase dark:text-tangerine">
			{children}
		</p>
	);
}

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
				icon: tabIcon(<Icon />),
				url: `/${id}/docs`,
				urls: id === product ? urls : undefined,
			}),
		);
	}, [product, tree]);

	const sectionTabs = useMemo(() => {
		const tabs = getLayoutTabs(tree, {
			transform: (option, node) =>
				node.icon ? { ...option, icon: tabIcon(node.icon) } : option,
		});

		if (product !== 'wasm') {
			tabs.push({
				title: 'Changelog',
				description: 'Latest releases and changes',
				icon: tabIcon(<ScrollText />),
				url: `/${product}/changelog`,
				urls: new Set([`/${product}/changelog`]),
			});
		}

		return tabs;
	}, [tree, product]);

	return (
		<>
			<TabsLabel>Project</TabsLabel>
			<SidebarTabsDropdown
				className={TRIGGER_CLASS}
				options={withItemClass(productTabs)}
			/>
			{sectionTabs.length > 1 && (
				<>
					<TabsLabel>Section</TabsLabel>
					<SidebarTabsDropdown
						className={TRIGGER_CLASS}
						options={withItemClass(sectionTabs)}
					/>
				</>
			)}
		</>
	);
}
