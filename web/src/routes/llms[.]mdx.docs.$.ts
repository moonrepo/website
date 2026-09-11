import { createFileRoute, notFound } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { source } from '@/lib/source';

export const Route = createFileRoute('/llms.mdx/docs/$')({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const slugs = params._splat?.split('/') ?? [];
				const page = source.getPage(slugs);

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
