import { redirect } from '@tanstack/react-router';
import { createMiddleware, createStart } from '@tanstack/react-start';
import { rewritePath } from 'fumadocs-core/negotiation';

const { rewrite: rewriteLlm } = rewritePath(
	'/docs{/*path}.mdx',
	'/llms-mdx{/*path}',
);

const llmMiddleware = createMiddleware().server(({ next, request }) => {
	const url = new URL(request.url);
	const path = rewriteLlm(url.pathname);

	if (path) {
		throw redirect(new URL(path, url));
	}

	return next();
});

export const startInstance = createStart(() => {
	return {
		requestMiddleware: [llmMiddleware],
	};
});
