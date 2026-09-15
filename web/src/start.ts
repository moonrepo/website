import { redirect } from '@tanstack/react-router';
import { createMiddleware, createStart } from '@tanstack/react-start';
import { rewritePath } from 'fumadocs-core/negotiation';


const { rewrite: rewriteApi } = rewritePath(
	'/api{/*path}.mdx',
	'/llms.mdx/api{/*path}',
);

const { rewrite: rewriteDocs } = rewritePath(
	'/docs{/*path}.mdx',
	'/llms.mdx/docs{/*path}',
);

const llmMiddleware = createMiddleware().server(({ next, request }) => {
	const url = new URL(request.url);
	const path = url.pathname.includes('/api') ? rewriteApi(url.pathname) : rewriteDocs(url.pathname);

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
