import { Select as BaseSelect } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectItem {
	label: string;
	value: string;
}

export interface SelectProps {
	'aria-label'?: string;
	className?: string;
	defaultValue?: string | null;
	items: SelectItem[];
	name?: string;
	onValueChange?: (value: string | null) => void;
	placeholder?: string;
	value?: string | null;
}

export function Select({
	'aria-label': ariaLabel,
	className,
	defaultValue,
	items,
	name,
	onValueChange,
	placeholder,
	value,
}: SelectProps) {
	return (
		<BaseSelect.Root<string>
			defaultValue={defaultValue}
			items={items}
			name={name}
			onValueChange={(next) => onValueChange?.(next)}
			value={value}
		>
			<BaseSelect.Trigger
				aria-label={ariaLabel}
				className={cn(
					'flex h-12 select-none items-center justify-between gap-3 rounded-[4px] border border-taupe border-b-[3px] bg-paper-50 px-3 text-base text-graphite-700',
					'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2 dark:focus-visible:outline-tangerine',
					className,
				)}
			>
				<BaseSelect.Value
					className="truncate data-placeholder:text-graphite-500"
					placeholder={placeholder}
				/>
				<BaseSelect.Icon className="text-graphite-600 transition-transform data-popup-open:rotate-180">
					<ChevronDownIcon className="size-5" />
				</BaseSelect.Icon>
			</BaseSelect.Trigger>

			<BaseSelect.Portal>
				<BaseSelect.Positioner
					alignItemWithTrigger={false}
					className="z-50 select-none outline-hidden"
					sideOffset={6}
				>
					<BaseSelect.Popup
						className={cn(
							'min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-[4px] border border-taupe bg-paper-50 py-1 text-graphite-700 shadow-lg outline-hidden',
							'transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0',
						)}
					>
						<BaseSelect.List className="max-h-(--available-height) overflow-y-auto">
							{items.map((item) => (
								<BaseSelect.Item
									className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-2 pr-4 pl-3 text-base outline-hidden data-highlighted:bg-paper-200"
									key={item.value}
									value={item.value}
								>
									<BaseSelect.ItemIndicator className="col-start-1 text-olive">
										<CheckIcon className="size-4" />
									</BaseSelect.ItemIndicator>
									<BaseSelect.ItemText className="col-start-2">
										{item.label}
									</BaseSelect.ItemText>
								</BaseSelect.Item>
							))}
						</BaseSelect.List>
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
}
