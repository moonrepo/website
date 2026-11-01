import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { createFileRoute } from '@tanstack/react-router';
import { registerSearchTool } from 'fumadocs-core/mcp';
import { llms } from 'fumadocs-core/source';
import { z } from 'zod';
import { getLlmText } from '@/lib/llm';
import { searchServer } from '@/lib/search';
import { productSources } from '@/lib/source';

const sources = Object.values(productSources);

const handler = createMcpHandler(() => {
	const mcp = new McpServer({
		name: 'moonrepo',
		version: '1.0.0',
	});

	// Same tools as `registerSourceTools()` from `fumadocs-core/mcp`,
	// which only supports a single source, but across every product
	mcp.registerTool(
		'list_pages',
		{
			title: 'List Pages',
			description:
				'List all docs pages of every moonrepo product with their pathnames (URLs)',
			inputSchema: z.object({}),
		},
		async () => {
			const indexes = await Promise.all(
				sources.map((source) => llms(source).index()),
			);

			return { content: [{ type: 'text', text: indexes.join('\n\n') }] };
		},
	);

	mcp.registerTool(
		'get_page',
		{
			title: 'Get Page',
			description:
				'Get the Markdown content of a docs page by its pathname (URL)',
			inputSchema: z.object({ url: z.string() }),
		},
		async ({ url }) => {
			const page = sources
				.map((source) => source.getPageByUrl(url))
				.find((item) => item !== undefined);

			if (!page) {
				return {
					content: [{ type: 'text', text: `page not found: ${url}` }],
					isError: true,
				};
			}

			return { content: [{ type: 'text', text: await getLlmText(page) }] };
		},
	);

	registerSearchTool(mcp, searchServer);

	return mcp;
});

export const Route = createFileRoute('/api/mcp')({
	server: {
		handlers: {
			GET: async ({ request }) => handler.fetch(request),
			POST: async ({ request }) => handler.fetch(request),
			DELETE: async ({ request }) => handler.fetch(request),
		},
	},
});
