import type { ComponentProps } from 'react';
import { cn } from '../utils/cn';

export const kbdClassName =
	'inline-flex h-5 min-w-5 select-none items-center justify-center rounded-[4px] border border-taupe/40 border-b-[3px] border-b-sand bg-paper-50 px-1 font-sans text-[10px] text-graphite-500 leading-none shadow-xs';

/** A keyboard key cap, like ⌘ or K. */
export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
	return <kbd className={cn(kbdClassName, className)} {...props} />;
}
