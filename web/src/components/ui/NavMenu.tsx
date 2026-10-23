import { Menu } from '@base-ui/react/menu';
import { TriangleIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export const navLinkClass = cn(
	'flex select-none items-center gap-1 font-display font-medium text-olive text-sm uppercase outline-hidden transition-colors',
	'hover:text-graphite-700 data-popup-open:text-graphite-700 dark:text-paper-50 dark:data-popup-open:text-tangerine dark:hover:text-tangerine',
	'focus-visible:underline focus-visible:underline-offset-4',
);

export interface NavMenuItem {
	description?: string;
	href: string;
	label: string;
}

export interface NavMenuProps {
	items: NavMenuItem[];
	label: string;
}

export function NavMenu({ items, label }: NavMenuProps) {
	return (
		<Menu.Root>
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
							'min-w-60 origin-(--transform-origin) rounded-[10px] border border-olive bg-paper-50 p-1.5 shadow-lg outline-hidden dark:bg-graphite-950',
							'transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0',
						)}
					>
						{items.map((item) => (
							<Menu.LinkItem
								className="block cursor-pointer rounded-md px-3 py-2 outline-hidden data-highlighted:bg-paper-200 dark:data-highlighted:bg-graphite-surface"
								href={item.href}
								key={item.label}
							>
								<span className="block font-display text-base text-graphite-700 dark:text-paper-50">
									{item.label}
								</span>
								{item.description && (
									<span className="block text-graphite-500 text-sm dark:text-sand">
										{item.description}
									</span>
								)}
							</Menu.LinkItem>
						))}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
}
