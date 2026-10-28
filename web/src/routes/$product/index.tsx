import { createFileRoute } from '@tanstack/react-router';
import type { ComponentType } from 'react';
import { MoonHome } from '@/components/moon/MoonHome';
import { SiteLayout } from '@/components/SiteLayout';
import { isProduct, PRODUCT_THEMES, type Product } from '@/lib/products';

export const Route = createFileRoute('/$product/')({
	component: Page,
});

const LANDING_PAGES: Partial<Record<Product, ComponentType>> = {
	moon: MoonHome,
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
