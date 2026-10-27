import { redirect } from '@tanstack/react-router';
import { createMiddleware, createStart } from '@tanstack/react-start';
import { rewritePath } from 'fumadocs-core/negotiation';
import { isProduct } from '@/lib/products';

// For example, `/moon/docs/task.mdx` -> `/llms.mdx/moon/docs/task`
const { rewrite: rewriteLlm } = rewritePath(
	'/:product{/*path}.mdx',
	'/llms.mdx/:product{/*path}',
);

const llmMiddleware = createMiddleware().server(({ next, request }) => {
	const { pathname } = new URL(request.url);
	const path = isProduct(pathname.split('/')[1]) && rewriteLlm(pathname);

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
