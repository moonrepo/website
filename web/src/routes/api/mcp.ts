import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { createFileRoute } from '@tanstack/react-router';
import { registerSearchTool } from 'fumadocs-core/mcp';
import { z } from 'zod';
import { getLlmIndex, getLlmText } from '@/lib/llm';
import { SITE_URL } from '@/lib/meta';
import { searchServer } from '@/lib/search';
import { productSources } from '@/lib/source';

const sources = Object.values(productSources);

// Agents pass URLs from `search` (`/page#heading`), from `llms.txt`
// (`/page.mdx`), or the full URL, so reduce them to a page's pathname
function toPagePath(url: string): string {
	const pathname = URL.parse(url, SITE_URL)?.pathname ?? url;

	return pathname.replace(/\.mdx?$/, '').replace(/(.)\/$/, '$1');
}

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
		async () => ({ content: [{ type: 'text', text: await getLlmIndex() }] }),
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
			const path = toPagePath(url);
			const page = sources
				.map((source) => source.getPageByUrl(path))
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
