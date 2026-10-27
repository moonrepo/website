import { createFileRoute, notFound } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { isProduct } from '@/lib/products';
import { productSources } from '@/lib/source';

export const Route = createFileRoute('/llms.mdx/$product/$')({
	server: {
		handlers: {
			GET: async ({ params }) => {
				if (!isProduct(params.product)) {
					throw notFound();
				}

				const slugs = params._splat?.split('/') ?? [];
				const page = productSources[params.product].getPage(slugs);

				if (!page) {
					throw notFound();
				}

				return new Response(await getLlmText(page), {
					headers: {
						'Content-Type': 'text/markdown',
					},
				});
			},
		},
	},
});
