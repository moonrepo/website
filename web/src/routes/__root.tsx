import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { lazy } from 'react';
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
			{
				title: 'Fumadocs on TanStack Start',
			},
		],
		links: [{ rel: 'stylesheet', href: appCss }],
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

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex flex-col min-h-screen">
				<RootProvider search={{ SearchDialog }}>{children}</RootProvider>
				<Scripts />
			</body>
		</html>
	);
}
