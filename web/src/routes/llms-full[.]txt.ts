import { createFileRoute } from '@tanstack/react-router';
import { getLlmText } from '@/lib/llm';
import { apiSource, docsSource } from '@/lib/source';

export const Route = createFileRoute('/llms-full.txt')({
	server: {
		handlers: {
			GET: async () => {
				const scannedDocs = await Promise.all(
					docsSource.getPages().map(getLlmText),
				);
				const scannedApi = await Promise.all(
					apiSource.getPages().map(getLlmText),
				);

				return new Response(scannedDocs.concat(scannedApi).join('\n\n'));
			},
		},
	},
});
