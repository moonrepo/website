import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/components/home/Home';
import { SiteLayout } from '@/components/SiteLayout';
import { seo } from '@/lib/meta';

export const Route = createFileRoute('/')({
	component: HomePage,
	head: () => seo({ path: '/' }),
});

function HomePage() {
	return (
		<SiteLayout>
			<Home />
		</SiteLayout>
	);
}
