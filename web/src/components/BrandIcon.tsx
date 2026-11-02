import type { SimpleIcon } from 'simple-icons';

/** A brand logo from Simple Icons, drawn in the current text color. */
export function BrandIcon({
	className,
	icon,
	viewBox = '0 0 24 24',
}: {
	className?: string;
	icon: SimpleIcon;
	/** Crop to the glyph's bounds so wide logos fill the same height as the others. */
	viewBox?: string;
}) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="currentColor"
			viewBox={viewBox}
		>
			<path d={icon.path} />
		</svg>
	);
}
