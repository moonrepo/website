import { createFileRoute } from '@tanstack/react-router';
import { llms } from 'fumadocs-core/source';
import { productSources } from '@/lib/source';

export const Route = createFileRoute('/llms.txt')({
	server: {
		handlers: {
			GET: async () => {
				const indexes = await Promise.all(
					Object.values(productSources).map((source) => llms(source).index()),
				);

				return new Response(indexes.join('\n\n'));
			},
		},
	},
});
