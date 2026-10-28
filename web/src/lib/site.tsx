import type { FooterProps } from '@moonrepo/ui/layout/Footer';
import type { HeaderProps } from '@moonrepo/ui/layout/Header';
import { AtSign, MessageCircle, Rss } from 'lucide-react';

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
	logoHref: '/',
	columns: [
		{
			title: 'Learn',
			links: [
				{ label: 'Docs', href: '/moon/docs' },
				{ label: 'Guides', href: '/moon/docs/guides' },
				{ label: 'Blogs', href: '/blog' },
			],
		},
		{
			title: 'Ecosystem',
			links: [
				{ label: 'Releases', href: `${GITHUB_URL}/moon/releases` },
				{ label: 'Shared configs', href: `${GITHUB_URL}/moon-configs` },
				{ label: 'Developer tools', href: `${GITHUB_URL}/dev` },
				{ label: 'Examples repository', href: `${GITHUB_URL}/examples` },
			],
		},
		{
			title: 'Support',
			links: [
				{ label: 'GitHub', href: GITHUB_URL },
				{ label: 'Discord', href: DISCORD_URL },
				{ label: 'Twitter', href: TWITTER_URL },
			],
		},
	],
	contact: {
		title: 'Contact',
		description: 'Want to learn more about moonrepo? Have questions?',
		submitLabel: 'Next',
		topics: [
			{ label: 'Sales', value: 'sales' },
			{ label: 'Support', value: 'support' },
			{ label: 'Partnerships', value: 'partnerships' },
		],
	},
	copyright: 'Copyright © 2025, moonrepo, inc.',
	socials: [
		{
			label: 'Discord',
			href: DISCORD_URL,
			icon: <MessageCircle className="size-6" />,
		},
		{
			label: 'Twitter',
			href: TWITTER_URL,
			icon: <AtSign className="size-6" />,
		},
		{ label: 'Blog', href: '/blog', icon: <Rss className="size-6" /> },
	],
};
