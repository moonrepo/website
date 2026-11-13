import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { PanelLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface DrawerProps {
	/** Extra buttons rendered in the header row, before the close button. */
	actions?: ReactNode;
	children: ReactNode;
	className?: string;
	/** Edge the drawer slides in from. */
	side?: 'left' | 'right';
	title: string;
	titleClassName?: string;
	trigger: ReactNode;
	triggerClassName?: string;
}

/** Small ghost icon button, matching the docs sidebar drawer's buttons. */
export const drawerIconButtonClass = cn(
	'inline-flex items-center justify-center rounded-md p-2 text-graphite-500 transition-colors duration-100 dark:text-sand [&_svg]:size-4.5',
	'hover:bg-paper-200 hover:text-graphite-800 dark:hover:bg-graphite-700 dark:hover:text-paper-50',
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive dark:focus-visible:ring-tangerine',
);

/** Navigation item, matching the docs sidebar's links. */
export const drawerItemClass = cn(
	'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-graphite-500 wrap-anywhere transition-colors dark:text-sand [&_svg]:size-4 [&_svg]:shrink-0',
	'hover:bg-paper-200/50 hover:text-graphite-800/80 hover:transition-none dark:hover:bg-graphite-700/50 dark:hover:text-paper-50/80',
	'data-[active=true]:bg-olive/10 data-[active=true]:text-olive dark:data-[active=true]:bg-tangerine/10 dark:data-[active=true]:text-tangerine',
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive dark:focus-visible:ring-tangerine',
);

/** Group label, matching the docs sidebar's separators. */
export const drawerSeparatorClass =
	'mt-6 mb-1.5 inline-flex items-center gap-2 px-2 first:mt-0';

export function Drawer({
	actions,
	children,
	className,
	side = 'left',
	title,
	titleClassName,
	trigger,
	triggerClassName,
}: DrawerProps) {
	return (
		<BaseDrawer.Root swipeDirection={side}>
			<BaseDrawer.Trigger className={triggerClassName}>
				{trigger}
			</BaseDrawer.Trigger>
			<BaseDrawer.Portal>
				<BaseDrawer.Backdrop className="fixed inset-0 z-50 min-h-dvh opacity-[calc(1-var(--drawer-swipe-progress))] backdrop-blur-xs transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0" />
				<BaseDrawer.Viewport
					className={cn(
						'fixed inset-0 z-50 flex items-stretch',
						side === 'left' ? 'justify-start' : 'justify-end',
					)}
				>
					<BaseDrawer.Popup
						className={cn(
							'flex h-full w-[85%] max-w-[380px] flex-col border-paper-400 bg-paper-100 text-[0.9375rem] text-graphite-800 shadow-lg outline-hidden dark:border-graphite-500/60 dark:bg-graphite-800 dark:text-paper-50',
							'transform-[translateX(var(--drawer-swipe-movement-x))] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none',
							'data-ending-style:duration-[calc(var(--drawer-swipe-strength)*300ms)]',
							side === 'left'
								? 'border-r data-ending-style:transform-[translateX(-100%)] data-starting-style:transform-[translateX(-100%)]'
								: 'border-l data-ending-style:transform-[translateX(100%)] data-starting-style:transform-[translateX(100%)]',
							className,
						)}
					>
						<div className="flex items-center gap-1.5 p-4 pb-2">
							<BaseDrawer.Title
								className={cn('flex-1 px-2 font-medium', titleClassName)}
							>
								{title}
							</BaseDrawer.Title>
							{actions}
							<BaseDrawer.Close
								aria-label="Close menu"
								className={drawerIconButtonClass}
							>
								<PanelLeft />
							</BaseDrawer.Close>
						</div>
						<BaseDrawer.Content className="mask-[linear-gradient(to_bottom,transparent,white_12px,white_calc(100%-12px),transparent)] min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
							{children}
						</BaseDrawer.Content>
					</BaseDrawer.Popup>
				</BaseDrawer.Viewport>
			</BaseDrawer.Portal>
		</BaseDrawer.Root>
	);
}
