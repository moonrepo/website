import { Header } from '@moonrepo/ui/layout/Header';
import { dashed } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { headerProps } from '@/lib/site';

// Sticky on desktop only; its height is `--site-header-height` in `app.css`.
export function SiteHeader() {
	const { setOpenSearch } = useSearchContext();

	return (
		<div
			className={cn(
				'z-30 border-b bg-fd-background font-sans md:sticky md:top-0',
				dashed,
			)}
		>
			<Header {...headerProps} onSearch={() => setOpenSearch(true)} />
		</div>
	);
}
