import { MenuIcon, Search } from 'lucide-react';
import { Fragment, type ReactNode, useEffect, useState } from 'react';
import {
	Drawer,
	drawerIconButtonClass,
	drawerItemClass,
	drawerSeparatorClass,
} from '../components/Drawer';
import { Kbd } from '../components/Kbd';
import { NavMenu, type NavMenuItem, navLinkClass } from '../components/NavMenu';
import { ThemeToggle } from '../components/ThemeToggle';
import { cn } from '../utils/cn';

/** A plain link, or a dropdown menu of links. */
export type HeaderNavItem =
	| { href: string; icon?: ReactNode; label: string }
	| { items: NavMenuItem[]; label: string };

export interface HeaderProps {
	className?: string;
	/** Where the wordmark links to. */
	logoHref: string;
	nav: HeaderNavItem[];
	onSearch?: () => void;
}

const iconButtonClass = cn(
	'flex size-10 shrink-0 items-center justify-center rounded-full border border-paper-300 bg-paper-50 text-graphite-500 shadow-sm transition-colors',
	'hover:text-graphite-800 dark:border-graphite-surface dark:bg-graphite-950 dark:text-paper-50 dark:hover:text-tangerine',
	'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2 dark:focus-visible:outline-tangerine',
);

function isActive(pathname: string, href: string) {
	return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileNavLink({
	description,
	href,
	icon,
	label,
	pathname,
}: {
	description?: string;
	href: string;
	icon?: ReactNode;
	label: string;
	pathname: string;
}) {
	return (
		<a
			className={cn(drawerItemClass, description && 'items-start')}
			data-active={isActive(pathname, href)}
			href={href}
		>
			{icon && <span className={cn(description && 'mt-0.5')}>{icon}</span>}
			<span className="flex flex-col">
				{label}
				{description && (
					<span className="text-[0.8125rem] opacity-80">{description}</span>
				)}
			</span>
		</a>
	);
}

function MobileNav({ nav }: { nav: HeaderNavItem[] }) {
	const [pathname, setPathname] = useState('');

	useEffect(() => {
		setPathname(window.location.pathname);
	}, []);

	return (
		<Drawer
			actions={
				<ThemeToggle
					className={cn(
						drawerIconButtonClass,
						'size-auto rounded-md border-0 bg-transparent shadow-none dark:bg-transparent [&_svg]:size-4.5',
					)}
				/>
			}
			title="Menu"
			trigger={
				<>
					<MenuIcon className="size-5" />
					<span className="sr-only">Open menu</span>
				</>
			}
			triggerClassName={cn(iconButtonClass, 'lg:hidden')}
		>
			<nav aria-label="Mobile" className="flex flex-col gap-0.5">
				{nav.map((item) =>
					'items' in item ? null : (
						<MobileNavLink key={item.label} pathname={pathname} {...item} />
					),
				)}

				{nav.map((item) =>
					'items' in item ? (
						<Fragment key={item.label}>
							<p className={drawerSeparatorClass}>{item.label}</p>
							{item.items.map((link) => (
								<MobileNavLink key={link.label} pathname={pathname} {...link} />
							))}
						</Fragment>
					) : null,
				)}
			</nav>
		</Drawer>
	);
}

export function Header({ className, logoHref, nav, onSearch }: HeaderProps) {
	return (
		<header
			className={cn(
				'flex h-[100px] items-center gap-6 px-6 md:px-12 lg:gap-12',
				className,
			)}
		>
			<a
				className="shrink-0 font-display font-medium font-stretch-125% text-[22px] text-graphite-500 tracking-[0.06em] sm:text-[28px] dark:text-brand"
				href={logoHref}
			>
				MOONREPO
			</a>

			<nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
				{nav.map((item) =>
					'items' in item ? (
						<NavMenu items={item.items} key={item.label} label={item.label} />
					) : (
						<a className={navLinkClass} href={item.href} key={item.label}>
							{item.label}
						</a>
					),
				)}
			</nav>

			<div className="ml-auto flex items-center gap-3 sm:gap-4">
				<ThemeToggle className="hidden sm:flex" />

				<button
					aria-label="Search"
					className={cn(iconButtonClass, 'sm:hidden')}
					onClick={onSearch}
					type="button"
				>
					<Search className="size-5" />
				</button>

				<button
					className="hidden h-9 w-56 items-center gap-2 rounded-full border border-paper-300 bg-paper-50 px-2.5 text-graphite-800 shadow-sm sm:flex dark:border-graphite-surface dark:bg-graphite-950 dark:text-paper-50"
					onClick={onSearch}
					type="button"
				>
					<Search className="size-5" />
					<span className="flex-1 text-body-sm text-left text-graphite-700 dark:text-graphite-500">
						Search
					</span>
					<span className="flex gap-0.5">
						{['⌘', 'K'].map((key) => (
							<Kbd key={key}>{key}</Kbd>
						))}
					</span>
				</button>

				<MobileNav nav={nav} />
			</div>
		</header>
	);
}
