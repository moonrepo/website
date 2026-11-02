import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from '@tanstack/react-router';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { lazy } from 'react';
import { ColorSchemeBridge } from '@/components/ColorSchemeBridge';
import { cn } from '@/lib/cn';
import { seo } from '@/lib/meta';
import { isProduct, PRODUCT_THEMES } from '@/lib/products';
import { BLOG_FEED_PATH, BLOG_FEED_TITLE } from '@/lib/rss';
import appCss from '@/styles/app.css?url';

// The search dialog bundles a markdown renderer for results, so keep it out
// of the main chunk. Fumadocs renders it within `<Suspense />`.
const SearchDialog = lazy(() => import('@/components/Search'));

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			// Defaults for routes without their own `head()`, like 404s
			...seo({ path: '/' }).meta,
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'alternate',
				type: 'application/rss+xml',
				title: BLOG_FEED_TITLE,
				href: BLOG_FEED_PATH,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

// Theme `<body>` during SSR, so the page background doesn't flash the
// base palette before the product theme is applied on the client
function useProductThemeClass() {
	const product = useRouterState({
		select: (state) =>
			(state.matches.at(-1)?.params as { product?: string } | undefined)
				?.product,
	});
	const theme = product && isProduct(product) ? PRODUCT_THEMES[product] : null;

	return theme ? `theme-${theme}` : undefined;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const themeClass = useProductThemeClass();

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className={cn('flex flex-col min-h-screen', themeClass)}>
				<RootProvider search={{ SearchDialog }}>
					<ColorSchemeBridge>{children}</ColorSchemeBridge>
				</RootProvider>
				<Scripts />
			</body>
		</html>
	);
}
