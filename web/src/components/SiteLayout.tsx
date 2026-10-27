import { Footer } from '@moonrepo/ui/layout/Footer';
import { Hatch, PageFrame } from '@moonrepo/ui/layout/Frame';
import type { ProductTheme } from '@moonrepo/ui/theme';
import type { ReactNode } from 'react';
import { footerProps } from '@/lib/site';
import { SiteHeader } from './SiteHeader';

/** The site header and footer around a page, in the design's frame. */
export function SiteLayout({
	children,
	theme,
}: {
	children?: ReactNode;
	theme?: ProductTheme;
}) {
	return (
		<PageFrame theme={theme}>
			<SiteHeader />
			{/* Keep the footer below the fold on short pages */}
			<main className="min-h-[calc(100dvh-var(--site-header-height))]">
				{children}
			</main>
			<Hatch />
			<Footer {...footerProps} />
		</PageFrame>
	);
}
