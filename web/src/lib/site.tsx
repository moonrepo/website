import type { NavMenuItem, NavMenuLink } from '@moonrepo/ui/components/NavMenu';
import type { FooterProps } from '@moonrepo/ui/layout/Footer';
import type { HeaderProps } from '@moonrepo/ui/layout/Header';
import { BookOpen, Braces, Newspaper, ScrollText } from 'lucide-react';
import { siDiscord, siGithub, siRss, siX } from 'simple-icons';
import { BrandIcon } from '@/components/BrandIcon';
import { PRODUCTS, type Product } from '@/lib/products';
import { BLOG_FEED_PATH } from '@/lib/rss';

const DISCORD_URL = 'https://discord.gg/qCh9MEynv2';
const GITHUB_URL = 'https://github.com/moonrepo';
const X_URL = 'https://x.com/tothemoonrepo';

const SECTIONS = {
	docs: {
		description: 'Concepts, references, and more',
		icon: BookOpen,
		label: 'Documentation',
	},
	api: {
		description: 'Configuration types',
		icon: Braces,
		label: 'API reference',
	},
	changelog: {
		description: 'Latest releases and changes',
		icon: ScrollText,
		label: 'Changelog',
	},
};

type Section = keyof typeof SECTIONS;

function sectionLinks(id: Product, sections: Section[]): NavMenuLink[] {
	return sections.map((section) => {
		const { icon: Icon, ...rest } = SECTIONS[section];

		return { ...rest, href: `/${id}/${section}`, icon: <Icon /> };
	});
}

function productItem(id: Product, sections?: Section[]): NavMenuItem {
	const product = PRODUCTS[id];

	return {
		description: product.description,
		href: `/${id}`,
		icon: <product.icon />,
		label: product.title,
		links: sections && sectionLinks(id, sections),
	};
}

export const headerProps: Omit<HeaderProps, 'onSearch'> = {
	logoHref: '/',
	nav: [
		{
			label: 'Tools',
			items: [
				productItem('moon', ['docs', 'api', 'changelog']),
				productItem('proto', ['docs', 'changelog']),
				productItem('wasm', ['docs']),
			],
		},
		{ label: 'Packages', items: [productItem('schematic', ['docs'])] },
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
