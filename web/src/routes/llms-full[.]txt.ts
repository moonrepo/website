import { createFileRoute } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { productSources } from '@/lib/source';

export const Route = createFileRoute('/llms-full.txt')({
	server: {
		handlers: {
			GET: async () => {
				const scanned = await Promise.all(
					Object.values(productSources)
						.flatMap((source) => source.getPages())
						.map(getLlmText),
				);

				return new Response(scanned.join('\n\n'));
			},
		},
	},
});
