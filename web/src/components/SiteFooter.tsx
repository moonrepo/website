import { Footer } from '@moonrepo/ui/layout/Footer';
import { Hatch } from '@moonrepo/ui/layout/Frame';
import { footerProps } from '@/lib/site';

/** The site footer, for full-width layouts outside the design's frame. */
export function SiteFooter() {
	return (
		<div className="overflow-x-clip font-sans">
			<Hatch />
			<Footer {...footerProps} />
		</div>
	);
}
