import { createFileRoute } from '@tanstack/react-router';
import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

const server = createFromSource(source, {
	language: 'english',
});

export const ServerRoute = createFileRoute('/api/search')({
	server: {
		handlers: {
			GET: async ({ request }) => server.GET(request),
		},
	},
});
