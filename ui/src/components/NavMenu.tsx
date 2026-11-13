import { Menu } from '@base-ui/react/menu';
import { ChevronRight, TriangleIcon } from 'lucide-react';
import { type FocusEvent, type ReactNode, useRef, useState } from 'react';
import { cn } from '../utils/cn';

export const navLinkClass = cn(
	'flex select-none items-center gap-1 font-display font-medium text-caps text-olive uppercase outline-hidden transition-colors',
	'hover:text-graphite-800 data-popup-open:text-graphite-800 dark:text-paper-50 dark:data-popup-open:text-tangerine dark:hover:text-tangerine',
	'focus-visible:underline focus-visible:underline-offset-4',
);

/** The tinted plate that menu and drawer icons sit in. */
export const navIconTileClass =
	'flex size-9 shrink-0 rounded-[4px] border border-olive/40 bg-olive/5 p-1.5 text-olive dark:border-tangerine/40 dark:bg-tangerine/5 dark:text-tangerine [&_svg]:size-full!';

const itemClass = cn(
	'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 outline-hidden',
	'data-highlighted:bg-paper-200 data-[active=true]:bg-paper-200 dark:data-highlighted:bg-graphite-surface dark:data-[active=true]:bg-graphite-surface',
);

// Delay before hovering another item swaps the panel, so that moving the
// pointer diagonally into the panel doesn't switch to the items it crosses
const SWITCH_DELAY = 100;

export interface NavMenuLink {
	description?: string;
	href: string;
	icon?: ReactNode;
	label: string;
}

export interface NavMenuItem extends NavMenuLink {
	/** Shown in a panel that slides out beside the menu while the item is hovered. */
	links?: NavMenuLink[];
}

export interface NavMenuProps {
	items: NavMenuItem[];
	label: string;
}

function ItemContent({ description, icon, label }: NavMenuLink) {
	return (
		<>
			{icon && <span className={navIconTileClass}>{icon}</span>}
			<span className="flex min-w-0 flex-1 flex-col">
				<span className="block font-display text-base text-graphite-800 dark:text-paper-50">
					{label}
				</span>
				{description && (
					<span className="block text-graphite-500 text-sm dark:text-sand">
						{description}
					</span>
				)}
			</span>
		</>
	);
}

export function NavMenu({ items, label }: NavMenuProps) {
	const [active, setActive] = useState<NavMenuItem | null>(null);
	const timer = useRef<number>(undefined);
	const hasPanel = items.some((item) => item.links?.length);

	const activate = (item: NavMenuItem, delay: number) => {
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setActive(item), delay);
	};

	return (
		<Menu.Root
			onOpenChange={(open) => {
				if (open) {
					window.clearTimeout(timer.current);
					setActive(null);
				}
			}}
		>
			<Menu.Trigger className={navLinkClass} openOnHover>
				{label}
				<TriangleIcon className="size-2 rotate-180 fill-current transition-transform in-data-popup-open:rotate-0" />
			</Menu.Trigger>

			<Menu.Portal>
				<Menu.Positioner
					align="start"
					className="z-50 outline-hidden"
					sideOffset={14}
				>
					<Menu.Popup
						className={cn(
							'flex origin-(--transform-origin) rounded-[10px] border border-olive bg-paper-50 p-1.5 shadow-lg outline-hidden dark:bg-graphite-950',
							'transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0',
						)}
					>
						<div className="flex w-80 flex-col gap-0.5">
							{items.map((item) => (
								<Menu.LinkItem
									className={itemClass}
									data-active={hasPanel && active === item}
									href={item.href}
									key={item.label}
									onFocus={(event: FocusEvent<HTMLElement>) => {
										if (
											hasPanel &&
											event.currentTarget.matches(':focus-visible')
										) {
											activate(item, 0);
										}
									}}
									onMouseEnter={() => {
										if (hasPanel) {
											activate(item, active ? SWITCH_DELAY : 0);
										}
									}}
								>
									<ItemContent {...item} />
									{item.links?.length ? (
										<ChevronRight className="size-4 shrink-0 text-graphite-500 dark:text-sand" />
									) : null}
								</Menu.LinkItem>
							))}
						</div>

						{hasPanel && (
							<div
								className={cn(
									'grid transition-[grid-template-columns] duration-200 ease-out',
									active?.links?.length ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]',
								)}
							>
								<div className="min-w-0 overflow-hidden">
									{active?.links?.length ? (
										<div className="ml-1.5 flex h-full w-72 flex-col gap-0.5 border-olive/30 border-l pl-1.5 dark:border-tangerine/30">
											<p className="px-3 pt-2 pb-1 font-mono text-olive text-tech uppercase dark:text-tangerine">
												{active.label}
											</p>
											{active.links.map((link) => (
												<Menu.LinkItem
													className={itemClass}
													href={link.href}
													key={link.label}
													onMouseEnter={() =>
														window.clearTimeout(timer.current)
													}
												>
													<ItemContent {...link} />
												</Menu.LinkItem>
											))}
										</div>
									) : null}
								</div>
							</div>
						)}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
}
