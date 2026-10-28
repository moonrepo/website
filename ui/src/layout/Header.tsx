import { Search } from 'lucide-react';
import { NavMenu, type NavMenuItem, navLinkClass } from '../components/NavMenu';
import { ThemeToggle } from '../components/ThemeToggle';
import { cn } from '../utils/cn';

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

export function Header({ className, logoHref, nav, onSearch }: HeaderProps) {
	return (
		<header
			className={cn(
				'flex h-[100px] items-center gap-12 px-6 md:px-12',
				className,
			)}
		>
			<a
				className="font-display font-medium font-stretch-125% text-[28px] text-graphite-500 tracking-[0.06em] dark:text-brand"
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

			<div className="ml-auto flex items-center gap-4">
				<ThemeToggle />

				<button
					className="hidden h-9 w-56 items-center gap-2 rounded-full border border-paper-300 bg-paper-50 px-2.5 text-graphite-800 shadow-sm sm:flex dark:border-graphite-surface dark:bg-graphite-950 dark:text-paper-50"
					onClick={onSearch}
					type="button"
				>
					<Search className="size-5" />
					<span className="flex-1 text-left text-lg text-graphite-700 dark:text-graphite-500">
						Search
					</span>
					<span className="flex gap-0.5">
						{['⌘', 'K'].map((key) => (
							<kbd
								className="flex size-5 items-center justify-center rounded-[4px] border border-taupe/50 bg-paper-300 text-[10px] text-graphite-700 dark:bg-paper-100"
								key={key}
							>
								{key}
							</kbd>
						))}
					</span>
				</button>
			</div>
		</header>
	);
}
