import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps } from 'react';
import { cn } from '../utils/cn';

const variants = {
	primary:
		'border-primary-dark bg-linear-to-b from-primary-light to-primary text-primary-fg shadow-md',
	secondary:
		'border-taupe bg-paper-50 bg-[radial-gradient(ellipse_at_center,var(--color-secondary-glow)_0%,transparent_70%)] text-graphite-500 shadow-sm',
};

const sizes = {
	md: 'h-14 rounded-md border-b-4 px-6 text-sm',
	sm: 'h-12 rounded-[4px] border-b-[3px] px-4 text-base',
};

interface ButtonStyleProps {
	className?: string;
	size?: keyof typeof sizes;
	variant?: keyof typeof variants;
}

export function buttonClassName({
	className,
	size = 'md',
	variant = 'primary',
}: ButtonStyleProps = {}) {
	return cn(
		'inline-flex select-none items-center justify-center whitespace-nowrap border font-bold font-display uppercase transition',
		'hover:not-data-disabled:brightness-105 active:not-data-disabled:translate-y-px',
		'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2 dark:focus-visible:outline-tangerine',
		'data-disabled:cursor-not-allowed data-disabled:opacity-50',
		variants[variant],
		sizes[size],
		className,
	);
}

export interface ButtonProps
	extends Omit<BaseButton.Props, 'className'>,
		ButtonStyleProps {}

export function Button({ className, size, variant, ...props }: ButtonProps) {
	return (
		<BaseButton
			className={buttonClassName({ className, size, variant })}
			{...props}
		/>
	);
}

export interface ButtonLinkProps
	extends Omit<ComponentProps<'a'>, 'className'>,
		ButtonStyleProps {
	href: string;
}

/** A link styled as a button. */
export function ButtonLink({
	className,
	size,
	variant,
	...props
}: ButtonLinkProps) {
	return (
		<a className={buttonClassName({ className, size, variant })} {...props} />
	);
}
