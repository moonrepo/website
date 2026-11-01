import { redirect } from '@tanstack/react-router';
import { createMiddleware, createStart } from '@tanstack/react-start';
import { rewritePath } from 'fumadocs-core/negotiation';
import { isProduct } from '@/lib/products';

// For example, `/moon/docs/task.mdx` -> `/llms.mdx/moon/docs/task`,
// and `/blog/moon-v2.1.mdx` -> `/llms.mdx/blog/moon-v2.1`
const { rewrite: rewriteLlm } = rewritePath(
	'/:product{/*path}.mdx',
	'/llms.mdx/:product{/*path}',
);

const llmMiddleware = createMiddleware().server(({ next, request }) => {
	const { pathname } = new URL(request.url);
	const section = pathname.split('/')[1];
	const path =
		(isProduct(section) || section === 'blog') && rewriteLlm(pathname);

	if (path) {
		throw redirect({ href: path });
	}

	return next();
});

export const startInstance = createStart(() => {
	return {
		requestMiddleware: [llmMiddleware],
	};
});
