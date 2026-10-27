import { createFileRoute, Link } from '@tanstack/react-router';
import { SiteLayout } from '@/components/SiteLayout';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<SiteLayout>
			<div className="flex flex-col items-center py-32 text-center">
				<h1 className="mb-4 font-medium text-xl">
					Fumadocs on Tanstack Start.
				</h1>

				<Link
					className="mx-auto rounded-lg bg-fd-primary px-3 py-2 font-medium text-fd-primary-foreground text-sm"
					params={{
						product: 'moon',
						_splat: 'docs',
					}}
					to="/$product/$"
				>
					Open Docs
				</Link>
			</div>
		</SiteLayout>
	);
}
