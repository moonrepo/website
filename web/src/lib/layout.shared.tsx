import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { NewspaperIcon } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';

export function baseOptions(): BaseLayoutProps {
	return {
		githubUrl: 'https://github.com/moonrepo',
		nav: {
			title: 'moonrepo',
			url: 'https://moonrepo.dev'
		},
		links: [
			...Object.entries(PRODUCTS).map(
				([product, { title, description }]): LinkItemType => ({
					text: title,
					url: `/${product}/docs`,
					active: 'nested-url',
					description,
				}),
			),
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
