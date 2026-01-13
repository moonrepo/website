import { createFileRoute } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { source } from '@/lib/source';

export const Route = createFileRoute('/llms-full.txt')({
	server: {
		handlers: {
			GET: async () => {
				const scanned = await Promise.all(source.getPages().map(getLlmText));

				return new Response(scanned.join('\n\n'));
			},
		},
	},
});
