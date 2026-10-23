import { type ReactNode, useEffect, useId } from 'react';
import { cn } from '@/utils/cn';
import { dashed } from './styles';

export function PageFrame({
	children,
	theme,
}: {
	children: ReactNode;
	theme?: 'moon' | 'proto';
}) {
	const themeClass = theme ? `theme-${theme}` : undefined;

	// Base UI popups are portaled into <body>, so the theme must apply there too.
	useEffect(() => {
		if (!themeClass) return;
		document.body.classList.add(themeClass);
		return () => document.body.classList.remove(themeClass);
	}, [themeClass]);

	return (
		<div
			className={cn(
				'relative flex-1 bg-paper-100 font-sans text-graphite-700 dark:bg-graphite-700 dark:text-paper-50',
				themeClass,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply dark:opacity-[0.25] dark:mix-blend-screen" />

			<div
				className={cn(
					'relative mx-auto max-w-[1344px] border-x md:mx-12 xl:mx-auto',
					dashed,
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
