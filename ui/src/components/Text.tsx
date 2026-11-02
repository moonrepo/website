import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { accent, caps, capsSm, muted, tech } from '../layout/styles';
import { cn } from '../utils/cn';

const variants = {
	/** Intro paragraphs, like under a hero title. */
	lead: 'text-body-lg',
	body: 'text-body',
	small: 'text-body-sm',
	/** Uppercase display labels. */
	caps,
	capsSm,
	/** Monospace technical annotations, like dates and reading time. */
	tech,
};

const tones = {
	default: 'text-graphite-800 dark:text-paper-50',
	muted,
	accent,
	/** Keep the parent's color. */
	inherit: '',
};

export type TextVariant = keyof typeof variants;
export type TextTone = keyof typeof tones;

export type TextProps<T extends ElementType = 'p'> = {
	/** The element to render. Defaults to `p`. */
	as?: T;
	tone?: TextTone;
	variant?: TextVariant;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Body copy and labels on the shared type scale. */
export function Text<T extends ElementType = 'p'>({
	as,
	className,
	tone = 'default',
	variant = 'body',
	...props
}: TextProps<T>) {
	const Component: ElementType = as ?? 'p';

	return (
		<Component
			className={cn(variants[variant], tones[tone], className)}
			{...props}
		/>
	);
}
