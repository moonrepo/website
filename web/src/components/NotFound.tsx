import { Heading } from '@moonrepo/ui/components/Heading';
import { heading } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import { Link } from '@tanstack/react-router';
import { SiteLayout } from './SiteLayout';

export function NotFound() {
	return (
		<SiteLayout>
			<div className="flex flex-col items-center gap-4 px-6 py-32 text-center">
				<Heading className="text-fd-muted-foreground" level={1} size="hero">
					404
				</Heading>
				<h2 className={cn('text-display-3', heading)}>Page Not Found</h2>
				<p className="max-w-md text-fd-muted-foreground">
					The page you are looking for might have been removed, had its name
					changed, or is temporarily unavailable.
				</p>

				<Link
					className="mt-4 rounded-lg bg-fd-primary px-4 py-2 font-medium text-fd-primary-foreground text-sm transition-opacity hover:opacity-90"
					to="/"
				>
					Back to Home
				</Link>
			</div>
		</SiteLayout>
	);
}
