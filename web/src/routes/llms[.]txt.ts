import { createFileRoute } from '@tanstack/react-router';
import { getLlmIndex } from '@/lib/llm';

export const Route = createFileRoute('/llms.txt')({
	server: {
		handlers: {
			GET: async () => new Response(await getLlmIndex()),
		},
	},
});
