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
			blueprint
			drawerTitle="Blog"
			footer={<Footer {...footerProps} />}
			hatchLabel="End of sheet"
			header={<SiteHeader />}
			sidebarClassName="w-[268px] px-6 pt-[56px]"
			{...props}
		/>
	);
}
