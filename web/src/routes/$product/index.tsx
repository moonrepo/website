import { createFileRoute } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/$product/')({
	component: Page,
});

function Page() {
	return <HomeLayout {...baseOptions()} />;
}
