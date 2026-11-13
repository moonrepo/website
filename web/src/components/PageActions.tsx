import { buttonClassName } from '@moonrepo/ui/components/Button';
import {
	MarkdownCopyButton,
	ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { cn } from '@/lib/cn';

// Fumadocs' secondary buttons, restyled as our `xs` secondary button; the
// hover overrides replace the `hover:bg-fd-accent hover:text-fd-accent-foreground`
// it keeps after merging
const actionClassName = buttonClassName({
	className:
		'hover:bg-paper-50 hover:text-graphite-500 data-[popup-open]:bg-paper-200 data-[popup-open]:text-graphite-800 [&_svg]:text-current',
	size: 'xs',
	variant: 'secondary',
});

const CONTENT_URL =
	'https://github.com/moonrepo/website/blob/master/web/content';

export interface PageActionsProps {
	className?: string;
	/** path of the content file, relative to `web/content` */
	file: string;
	/** URL of the page */
	url: string;
}

/** copy the page as Markdown, or open it in GitHub or an AI chat */
export function PageActions({ className, file, url }: PageActionsProps) {
	// Rewritten to the `llms.mdx` routes, see `start.ts`
	const markdownUrl = `${url}.mdx`;

	return (
		<div className={cn('flex flex-row items-center gap-2', className)}>
			<MarkdownCopyButton
				className={actionClassName}
				markdownUrl={markdownUrl}
			/>
			<ViewOptionsPopover
				className={actionClassName}
				githubUrl={`${CONTENT_URL}/${file}`}
				markdownUrl={markdownUrl}
			/>
		</div>
	);
}
