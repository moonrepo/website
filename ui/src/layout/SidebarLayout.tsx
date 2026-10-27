import { PanelLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Drawer } from '../components/Drawer';
import { cn } from '../utils/cn';
import { Footer } from './Footer';
import { Divider, Hatch, PageFrame } from './Frame';
import { Header } from './Header';
import { dashed, heading } from './styles';

export interface SidebarLayoutProps {
	beforeTitle?: ReactNode;
	children: ReactNode;
	drawerTitle: string;
	/** Replaces the default header and divider. */
	header?: ReactNode;
	sidebar: ReactNode;
	sidebarClassName?: string;
	title: string;
}

export function SidebarLayout({
	beforeTitle,
	children,
	drawerTitle,
	header,
	sidebar,
	sidebarClassName,
	title,
}: SidebarLayoutProps) {
	return (
		<PageFrame>
			{header ?? (
				<>
					<Header />
					<Divider />
				</>
			)}
			<div className="flex">
				<aside
					aria-label={drawerTitle}
					className={cn(
						'hidden w-[291px] shrink-0 border-r bg-paper-200/40 px-12 pt-[52px] pb-16 lg:block dark:bg-graphite-900/50',
						dashed,
						sidebarClassName,
					)}
				>
					{sidebar}
				</aside>
				<main className="min-w-0 flex-1">
					<div className="px-6 pt-9 pb-9 md:px-12">
						<Drawer
							title={drawerTitle}
							trigger={
								<>
									<PanelLeft className="size-5" />
									Menu
								</>
							}
							triggerClassName="mb-6 flex h-9 items-center gap-2 rounded-full border border-paper-300 bg-paper-50 px-3 font-display font-semibold text-graphite-800 text-sm uppercase shadow-sm lg:hidden dark:border-graphite-surface dark:bg-graphite-950 dark:text-paper-50"
						>
							{sidebar}
						</Drawer>
						{beforeTitle}
						<h1
							className={cn(
								'text-4xl md:text-[44px]',
								beforeTitle ? 'mt-5' : undefined,
								heading,
							)}
						>
							{title}
						</h1>
					</div>
					<Divider />
					{children}
				</main>
			</div>
			<Hatch />
			<Footer />
		</PageFrame>
	);
}
