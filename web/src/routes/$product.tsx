import { createFileRoute, notFound } from '@tanstack/react-router';
import { isProduct } from '@/lib/products';

// Parent of all `/<product>/*` routes. Custom product pages, like
// `/moon/playground`, can be added as siblings of `$product/$.tsx`,
// as static routes take precedence over the splat.
export const Route = createFileRoute('/$product')({
	beforeLoad: ({ params }) => {
		if (!isProduct(params.product)) {
			throw notFound();
		}
	},
});
