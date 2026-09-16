import { createFileRoute, notFound } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { apiSource } from '@/lib/source';

export const Route = createFileRoute('/llms.mdx/api/$')({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const slugs = params._splat?.split('/') ?? [];
				const page = apiSource.getPage(slugs);

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
