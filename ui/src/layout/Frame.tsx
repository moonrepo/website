import { type ReactNode, useId } from 'react';
import { type ProductTheme, useProductTheme } from '../theme';
import { cn } from '../utils/cn';
import { dashed } from './styles';

/** Shown only inside a `PageFrame` with `blueprint` enabled. */
const blueprintOnly = 'hidden group-data-[blueprint]/frame:flex';
const blueprintLabel =
	'font-mono text-[11px] text-olive uppercase tracking-[0.2em] dark:text-tangerine';

function Ruler({ side }: { side: 'left' | 'right' }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute inset-y-0 hidden w-3 text-olive/60 md:block',
				side === 'left' ? '-left-3' : '-right-3',
			)}
			style={{
				backgroundImage:
					'linear-gradient(to bottom, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
				backgroundPosition: `${side} top`,
				backgroundRepeat: 'repeat-y',
				backgroundSize: '6px 16px, 12px 96px',
			}}
		/>
	);
}

export function PageFrame({
	blueprint,
	children,
	full,
	theme,
}: {
	/** Decorate the frame like a technical drawing (rulers, crop marks, section labels). */
	blueprint?: boolean;
	children: ReactNode;
	/** span the full viewport, instead of a centered, bordered column */
	full?: boolean;
	theme?: ProductTheme;
}) {
	const themeClass = useProductTheme(theme);

	return (
		<div
			className={cn(
				'group/frame relative flex-1 overflow-x-clip bg-paper-100 font-sans text-graphite-800 dark:bg-graphite-800 dark:text-paper-50',
				blueprint && 'blueprint',
				themeClass,
			)}
			data-blueprint={blueprint ? '' : undefined}
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
				{blueprint && !full && (
					<>
						<Ruler side="left" />
						<Ruler side="right" />
					</>
				)}
				{children}
			</div>
		</div>
	);
}

/**
 * Enables blueprint decorations (`Hatch` dimension lines, registration marks,
 * auto-numbered labels) for layouts that don't render a `PageFrame`.
 */
export function BlueprintScope({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('group/frame blueprint', className)} data-blueprint="">
			{children}
		</div>
	);
}

/** A registration mark (crosshair with a ring), centered on its position. */
function RegistrationMark({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={cn('absolute size-[17px] text-olive', className)}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 17 17"
		>
			<circle cx="8.5" cy="8.5" r="4" />
			<path d="M8.5 0v17M0 8.5h17" />
		</svg>
	);
}

export function Divider({ className }: { className?: string }) {
	const square = 'absolute -top-[3px] size-[5px] bg-olive';

	return (
		<div className={cn('relative border-t', dashed, className)}>
			<span
				className={cn(
					square,
					'-left-[3px] group-data-[blueprint]/frame:hidden',
				)}
			/>
			<span
				className={cn(
					square,
					'-right-[3px] group-data-[blueprint]/frame:hidden',
				)}
			/>
			<RegistrationMark className="-top-[9px] -left-[9px] hidden group-data-[blueprint]/frame:block" />
			<RegistrationMark className="-top-[9px] -right-[9px] hidden group-data-[blueprint]/frame:block" />
		</div>
	);
}

function Arrowhead({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={cn('size-2 shrink-0 fill-current', className)}
			viewBox="0 0 8 8"
		>
			<path d="M0 4 8 0v8z" />
		</svg>
	);
}

/**
 * A dimension line spanning its container, with a label plate in the middle.
 * Without a `label`, the plate shows the next auto-incremented section number.
 */
export function DimensionLine({
	className,
	label,
}: {
	className?: string;
	label?: ReactNode;
}) {
	return (
		<div
			aria-hidden="true"
			className={cn('flex w-full items-center text-olive', className)}
		>
			<span className="h-4 border-current border-l" />
			<Arrowhead />
			<span className="flex-1 border-current border-t" />
			<span
				className={cn(
					'mx-3 rounded-[2px] border border-current bg-paper-100 px-3 py-1 dark:bg-graphite-800',
					blueprintLabel,
					!label && 'blueprint-section',
				)}
			>
				{label}
			</span>
			<span className="flex-1 border-current border-t" />
			<Arrowhead className="rotate-180" />
			<span className="h-4 border-current border-l" />
		</div>
	);
}

export function Hatch({ label }: { label?: ReactNode }) {
	const id = useId();

	return (
		<>
			<Divider />
			<div className="relative">
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
				<div
					className={cn(
						'absolute inset-0 items-center px-6 md:px-12',
						blueprintOnly,
					)}
				>
					<DimensionLine label={label} />
				</div>
			</div>
			<Divider />
		</>
	);
}

/** A faint graph-paper grid that fades out towards the edges. Place inside a relative container. */
export function BlueprintGrid({ className }: { className?: string }) {
	const line = 'currentColor 1px, transparent 1px';
	const minor =
		'color-mix(in srgb, currentColor 45%, transparent) 1px, transparent 1px';

	return (
		<div
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute inset-0 text-olive/25 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]',
				className,
			)}
			style={{
				backgroundImage: [
					`linear-gradient(to right, ${line})`,
					`linear-gradient(to bottom, ${line})`,
					`linear-gradient(to right, ${minor})`,
					`linear-gradient(to bottom, ${minor})`,
				].join(', '),
				backgroundPosition: 'center',
				backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
			}}
		/>
	);
}

/**
 * Wraps content in crop-mark corners, like a figure in a technical drawing,
 * with an optional caption prefixed by an auto-incremented figure number.
 */
export function Figure({
	caption,
	children,
	className,
}: {
	caption?: ReactNode;
	children: ReactNode;
	className?: string;
}) {
	const corner = 'pointer-events-none absolute size-3 border-olive';

	return (
		<figure className={className}>
			<div className="relative">
				<span
					aria-hidden="true"
					className={cn(corner, '-top-2 -left-2 border-t border-l')}
				/>
				<span
					aria-hidden="true"
					className={cn(corner, '-top-2 -right-2 border-t border-r')}
				/>
				<span
					aria-hidden="true"
					className={cn(corner, '-bottom-2 -left-2 border-b border-l')}
				/>
				<span
					aria-hidden="true"
					className={cn(corner, '-right-2 -bottom-2 border-r border-b')}
				/>
				{children}
			</div>
			{caption && (
				<figcaption
					className={cn('mt-5 flex items-center gap-2', blueprintLabel)}
				>
					<span className="blueprint-figure" />
					<span aria-hidden="true">—</span>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
