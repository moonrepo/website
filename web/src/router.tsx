import { createRouter } from '@tanstack/react-router';
import { NotFound } from '@/components/NotFound';
import { routeTree } from './routeTree.gen';

export function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: 'intent',
		scrollRestoration: true,
		defaultNotFoundComponent: NotFound,
	});
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
