import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/SiteLayout';
import { isProduct, PRODUCT_THEMES } from '@/lib/products';

export const Route = createFileRoute('/$product/')({
	component: Page,
});

function Page() {
	const { product } = Route.useParams();

	return (
		<SiteLayout
			theme={isProduct(product) ? PRODUCT_THEMES[product] : undefined}
		/>
	);
}
