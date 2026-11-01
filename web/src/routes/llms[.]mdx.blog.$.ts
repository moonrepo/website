import { createFileRoute, notFound } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { blogSource } from '@/lib/source';

export const Route = createFileRoute('/llms.mdx/blog/$')({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const page = blogSource.getPage(params._splat?.split('/') ?? []);

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
