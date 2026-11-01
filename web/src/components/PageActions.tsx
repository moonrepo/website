import {
	MarkdownCopyButton,
	ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { cn } from '@/lib/cn';

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
			<MarkdownCopyButton markdownUrl={markdownUrl} />
			<ViewOptionsPopover
				githubUrl={`${CONTENT_URL}/${file}`}
				markdownUrl={markdownUrl}
			/>
		</div>
	);
}
