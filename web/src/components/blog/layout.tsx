import { Footer } from '@moonrepo/ui/layout/Footer';
import {
	SidebarLayout,
	type SidebarLayoutProps,
} from '@moonrepo/ui/layout/SidebarLayout';
import { footerProps } from '@/lib/site';
import { SiteHeader } from '../SiteHeader';

export function BlogLayout(
	props: Omit<
		SidebarLayoutProps,
		'drawerTitle' | 'footer' | 'header' | 'sidebarClassName'
	>,
) {
	return (
		<SidebarLayout
			drawerTitle="Blog"
			footer={<Footer {...footerProps} />}
			header={<SiteHeader />}
			sidebarClassName="w-[356px] pt-[56px]"
			{...props}
		/>
	);
}
