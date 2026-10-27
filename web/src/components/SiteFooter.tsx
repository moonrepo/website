import { Footer } from '@moonrepo/ui/layout/Footer';
import { dashed } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';

/** The site footer, for full-width layouts outside the design's frame. */
export function SiteFooter() {
	return (
		<div className={cn('overflow-x-clip border-t font-sans', dashed)}>
			<Footer />
		</div>
	);
}
