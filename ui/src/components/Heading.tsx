import type { ComponentProps } from 'react';
import {
	cardTitle,
	heading,
	heroTitle,
	subtitle,
	title,
} from '../layout/styles';
import { cn } from '../utils/cn';

const sizes = {
	/** The home page hero. */
	hero: heroTitle,
	/** Page titles and top-level section headings. */
	title,
	subtitle,
	card: cardTitle,
};

export type HeadingSize = keyof typeof sizes;

export interface HeadingProps extends ComponentProps<'h2'> {
	/** The heading element, `h1` to `h6`. Defaults to 2. */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	/** Defaults to `title` for levels 1-2, `subtitle` for 3, and `card` for 4-6. */
	size?: HeadingSize;
}

function defaultSize(level: number): HeadingSize {
	if (level <= 2) {
		return 'title';
	}

	return level === 3 ? 'subtitle' : 'card';
}

/** A display-font heading on the shared type scale. */
export function Heading({
	className,
	level = 2,
	size = defaultSize(level),
	...props
}: HeadingProps) {
	const Tag = `h${level}` as const;

	return <Tag className={cn(sizes[size], heading, className)} {...props} />;
}
