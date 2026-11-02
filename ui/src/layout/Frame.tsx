import { type ReactNode, useId } from 'react';
import { type ProductTheme, useProductTheme } from '../theme';
import { cn } from '../utils/cn';
import { dashed } from './styles';

export function PageFrame({
	children,
	full,
	theme,
}: {
	children: ReactNode;
	/** span the full viewport, instead of a centered, bordered column */
	full?: boolean;
	theme?: ProductTheme;
}) {
	const themeClass = useProductTheme(theme);

	return (
		<div
			className={cn(
				'relative flex-1 overflow-x-clip bg-paper-100 font-sans text-graphite-800 dark:bg-graphite-800 dark:text-paper-50',
				themeClass,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply dark:opacity-[0.25] dark:mix-blend-screen" />

			<div
				className={cn(
					'relative',
					!full && [
						'mx-auto max-w-[1344px] border-x md:mx-12 xl:mx-auto',
						dashed,
					],
				)}
			>
				{children}
			</div>
		</div>
	);
}

export function Divider({ className }: { className?: string }) {
	return (
		<div className={cn('relative border-t', dashed, className)}>
			<span className="absolute -top-[3px] -left-[3px] size-[5px] bg-olive" />
			<span className="absolute -top-[3px] -right-[3px] size-[5px] bg-olive" />
		</div>
	);
}

export function Hatch() {
	const id = useId();

	return (
		<>
			<Divider />
			<svg aria-hidden="true" className="block h-24 w-full text-olive/60">
				<defs>
					<pattern
						height="14"
						id={id}
						patternTransform="rotate(-30)"
						patternUnits="userSpaceOnUse"
						width="14"
					>
						<line
							stroke="currentColor"
							strokeDasharray="4 3"
							x1="0"
							x2="0"
							y1="0"
							y2="14"
						/>
					</pattern>
				</defs>
				<rect fill={`url(#${id})`} height="100%" width="100%" />
			</svg>
			<Divider />
		</>
	);
}
