import { createFileRoute } from '@tanstack/react-router';
import { llms } from 'fumadocs-core/source';
import { apiSource, docsSource } from '@/lib/source';

export const Route = createFileRoute('/llms.txt')({
	server: {
		handlers: {
			GET() {
				const docs = llms(docsSource).index();
				const api = llms(apiSource).index();

				return new Response(`${docs}\n\n${api}`);
			},
		},
	},
});
