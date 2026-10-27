import {
	SidebarLayout,
	type SidebarLayoutProps,
} from '@moonrepo/ui/layout/SidebarLayout';
import { SiteHeader } from '../SiteHeader';

export function BlogLayout(
	props: Omit<
		SidebarLayoutProps,
		'drawerTitle' | 'header' | 'sidebarClassName'
	>,
) {
	return (
		<SidebarLayout
			drawerTitle="Blog"
			header={<SiteHeader />}
			sidebarClassName="w-[356px] pt-[56px]"
			{...props}
		/>
	);
}
