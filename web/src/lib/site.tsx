import type { FooterProps } from '@moonrepo/ui/layout/Footer';
import type { HeaderProps } from '@moonrepo/ui/layout/Header';
import { Newspaper } from 'lucide-react';
import { siDiscord, siGithub, siRss, siX } from 'simple-icons';
import { BrandIcon } from '@/components/BrandIcon';
import { PRODUCTS } from '@/lib/products';
import { BLOG_FEED_PATH } from '@/lib/rss';

const DISCORD_URL = 'https://discord.gg/qCh9MEynv2';
const GITHUB_URL = 'https://github.com/moonrepo';
const X_URL = 'https://x.com/tothemoonrepo';

export const headerProps: Omit<HeaderProps, 'onSearch'> = {
	logoHref: '/',
	nav: [
		{
			label: 'Projects',
			items: Object.entries(PRODUCTS).map(([id, product]) => ({
				description: product.description,
				href: `/${id}`,
				icon: <product.icon />,
				label: product.title,
			})),
		},
		{ href: '/blog', icon: <Newspaper />, label: 'Blog' },
		{
			href: GITHUB_URL,
			icon: <BrandIcon icon={siGithub} />,
			label: 'GitHub',
		},
	],
};

export const footerProps: FooterProps = {
	copyright: `Copyright © ${new Date().getFullYear()}, moonrepo, inc.`,
	socials: [
		{
			label: 'GitHub',
			href: GITHUB_URL,
			icon: <BrandIcon className="size-5" icon={siGithub} />,
		},
		{
			label: 'Discord',
			href: DISCORD_URL,
			icon: (
				<BrandIcon
					className="h-5 w-auto"
					icon={siDiscord}
					viewBox="0 2.85 24 18.3"
				/>
			),
		},
		{
			label: 'X',
			href: X_URL,
			icon: <BrandIcon className="size-5" icon={siX} />,
		},
		{
			label: 'RSS feed',
			href: BLOG_FEED_PATH,
			icon: <BrandIcon className="size-5" icon={siRss} />,
		},
	],
};
