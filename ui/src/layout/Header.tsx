import { MenuIcon, Search } from 'lucide-react';
import { Drawer } from '../components/Drawer';
import { Kbd } from '../components/Kbd';
import { NavMenu, type NavMenuItem, navLinkClass } from '../components/NavMenu';
import { ThemeToggle } from '../components/ThemeToggle';
import { cn } from '../utils/cn';
import { caps, capsSm } from './styles';

/** A plain link, or a dropdown menu of links. */
export type HeaderNavItem =
	| { href: string; label: string }
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

const mobileLinkClass =
	'-mx-3 block rounded-md px-3 py-2 outline-hidden hover:bg-paper-200 focus-visible:bg-paper-200 dark:focus-visible:bg-graphite-surface dark:hover:bg-graphite-surface';

function MobileNav({ nav }: { nav: HeaderNavItem[] }) {
	return (
		<Drawer
			title="Menu"
			trigger={
				<>
					<MenuIcon className="size-5" />
					<span className="sr-only">Open menu</span>
				</>
			}
			triggerClassName={cn(iconButtonClass, 'lg:hidden')}
		>
			<nav aria-label="Mobile" className="flex flex-col gap-8">
				{nav.map((item) =>
					'items' in item ? (
						<div key={item.label}>
							<p className={cn(capsSm, 'text-olive dark:text-tangerine')}>
								{item.label}
							</p>
							<ul className="mt-3 flex flex-col gap-1">
								{item.items.map((link) => (
									<li key={link.label}>
										<a className={mobileLinkClass} href={link.href}>
											<span className="block font-display text-base text-graphite-800 dark:text-paper-50">
												{link.label}
											</span>
											{link.description && (
												<span className="block text-graphite-500 text-sm dark:text-sand">
													{link.description}
												</span>
											)}
										</a>
									</li>
								))}
							</ul>
						</div>
					) : null,
				)}

				<ul className="flex flex-col gap-1 border-olive border-t border-dashed pt-6">
					{nav.map((item) =>
						'items' in item ? null : (
							<li key={item.label}>
								<a
									className={cn(
										mobileLinkClass,
										caps,
										'text-graphite-800 dark:text-paper-50',
									)}
									href={item.href}
								>
									{item.label}
								</a>
							</li>
						),
					)}
				</ul>

				<div className="flex items-center justify-between border-olive border-t border-dashed pt-6">
					<span className={cn(capsSm, 'text-olive dark:text-tangerine')}>
						Theme
					</span>
					<ThemeToggle />
				</div>
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
