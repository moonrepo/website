import { createFileRoute } from '@tanstack/react-router';
import type { ComponentType } from 'react';
import { MoonHome } from '@/components/moon/MoonHome';
import { ProtoHome } from '@/components/proto/ProtoHome';
import { SiteLayout } from '@/components/SiteLayout';
import { SchematicHome } from '@/components/schematic/SchematicHome';
import { isProduct, PRODUCT_THEMES, type Product } from '@/lib/products';

export const Route = createFileRoute('/$product/')({
	component: Page,
});

const LANDING_PAGES: Partial<Record<Product, ComponentType>> = {
	moon: MoonHome,
	proto: ProtoHome,
	schematic: SchematicHome,
};

function Page() {
	const { product } = Route.useParams();
	const Landing = isProduct(product) ? LANDING_PAGES[product] : undefined;

	return (
		<SiteLayout
			footerClassName={Landing && 'bg-transparent dark:bg-transparent'}
			theme={isProduct(product) ? PRODUCT_THEMES[product] : undefined}
		>
			{Landing && <Landing />}
		</SiteLayout>
	);
}
