import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/components/home/Home';
import { SiteLayout } from '@/components/SiteLayout';

export const Route = createFileRoute('/')({
	component: HomePage,
});

function HomePage() {
	return (
		<SiteLayout>
			<Home />
		</SiteLayout>
	);
}
