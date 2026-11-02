import type { FooterProps } from '@moonrepo/ui/layout/Footer';
import type { HeaderProps } from '@moonrepo/ui/layout/Header';
import { siDiscord, siGithub, siRss, siX } from 'simple-icons';
import { BrandIcon } from '@/components/BrandIcon';
import { BLOG_FEED_PATH } from '@/lib/rss';

const DISCORD_URL = 'https://discord.gg/qCh9MEynv2';
const GITHUB_URL = 'https://github.com/moonrepo';
const TWITTER_URL = 'https://twitter.com/tothemoonrepo';

export const headerProps: Omit<HeaderProps, 'onSearch'> = {
	logoHref: '/',
	nav: [
		{
			label: 'Products',
			items: [
				{ description: 'Smart build system', href: '/moon', label: 'moon' },
				{ description: 'Toolchain manager', href: '/proto', label: 'proto' },
			],
		},
		{
			label: 'Docs',
			items: [
				{ href: '/moon/docs', label: 'moon' },
				{ href: '/proto/docs', label: 'proto' },
				{ href: '/moon/api', label: 'Config reference' },
			],
		},
		{ href: '/moon/docs/guides', label: 'Guides' },
		{ href: '/blog', label: 'Blog' },
		{ href: GITHUB_URL, label: 'GitHub' },
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
			href: TWITTER_URL,
			icon: <BrandIcon className="size-5" icon={siX} />,
		},
		{
			label: 'RSS feed',
			href: BLOG_FEED_PATH,
			icon: <BrandIcon className="size-5" icon={siRss} />,
		},
	],
};
