import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon, NewspaperIcon, CodeIcon } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
	return {
		githubUrl: 'https://github.com/moonrepo/website',
		nav: {
			title: 'Tanstack Start',
		},
		links: [
			{
				text: 'Documentation',
				url: '/docs',
				active: 'nested-url',
				icon: <BookIcon />,
				description: 'Learn more',
			},
			{
				text: 'API',
				url: '/api',
				active: 'nested-url',
				icon: <CodeIcon />,
				description: 'Learn more',
			},
			{
				text: 'Blog',
				url: '/blog',
				active: 'nested-url',
				icon: <NewspaperIcon />,
				description: 'Keep up to date',
			},
		],
	};
}
