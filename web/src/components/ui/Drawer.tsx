import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { XIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface DrawerProps {
	children: ReactNode;
	className?: string;
	title: string;
	trigger: ReactNode;
	triggerClassName?: string;
}

export function Drawer({
	children,
	className,
	title,
	trigger,
	triggerClassName,
}: DrawerProps) {
	return (
		<BaseDrawer.Root swipeDirection="left">
			<BaseDrawer.Trigger className={triggerClassName}>
				{trigger}
			</BaseDrawer.Trigger>
			<BaseDrawer.Portal>
				<BaseDrawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-[calc(0.4*(1-var(--drawer-swipe-progress)))] transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0 dark:opacity-[calc(0.7*(1-var(--drawer-swipe-progress)))]" />
				<BaseDrawer.Viewport className="fixed inset-0 z-50 flex items-stretch justify-start">
					<BaseDrawer.Popup
						className={cn(
							'h-full w-80 max-w-[calc(100vw-3rem)] overflow-y-auto overscroll-contain border-olive border-r border-dashed bg-paper-100 px-8 pt-6 pb-10 text-graphite-700 shadow-xl outline-hidden dark:bg-graphite-700 dark:text-paper-50',
							'transform-[translateX(var(--drawer-swipe-movement-x))] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none',
							'data-ending-style:transform-[translateX(-100%)] data-starting-style:transform-[translateX(-100%)] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*300ms)]',
							className,
						)}
					>
						<div className="mb-8 flex items-center justify-between">
							<BaseDrawer.Title className="font-bold font-display text-graphite-700 text-sm uppercase dark:text-paper-50">
								{title}
							</BaseDrawer.Title>
							<BaseDrawer.Close
								aria-label="Close menu"
								className="flex size-9 items-center justify-center rounded-full text-graphite-500 hover:text-graphite-700 focus-visible:outline-2 focus-visible:outline-olive dark:text-paper-100 dark:focus-visible:outline-tangerine dark:hover:text-tangerine"
							>
								<XIcon className="size-5" />
							</BaseDrawer.Close>
						</div>
						<BaseDrawer.Content>{children}</BaseDrawer.Content>
					</BaseDrawer.Popup>
				</BaseDrawer.Viewport>
			</BaseDrawer.Portal>
		</BaseDrawer.Root>
	);
}
