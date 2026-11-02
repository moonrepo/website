import { caps } from '@moonrepo/ui/layout/styles';
import type { CalloutType } from 'fumadocs-ui/components/callout';
import {
	CircleAlert,
	CircleCheck,
	Info,
	type LucideIcon,
	Rocket,
	TriangleAlert,
} from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Kind = 'info' | 'warning' | 'error' | 'success' | 'idea';

/** Labels follow flight-manual conventions: NOTE, CAUTION, WARNING. */
const kinds: Record<Kind, { icon: LucideIcon; label: string }> = {
	info: { icon: Info, label: 'Info' },
	idea: { icon: Rocket, label: 'Tip' },
	success: { icon: CircleCheck, label: 'Success' },
	warning: { icon: TriangleAlert, label: 'Warning' },
	error: { icon: CircleAlert, label: 'Error' },
};

function resolveKind(type: CalloutType | 'tip' = 'info'): Kind {
	if (type === 'warn') return 'warning';
	if (type === 'tip') return 'idea';
	return type;
}

export interface CalloutProps extends Omit<ComponentProps<'div'>, 'title'> {
	icon?: ReactNode;
	title?: ReactNode;
	type?: CalloutType | 'tip';
}

/** Fumadocs' `Callout`, styled as a technical manual notice panel. */
export function Callout({
	children,
	className,
	icon,
	title,
	type,
	...props
}: CalloutProps) {
	const kind = resolveKind(type);
	const { icon: Icon, label } = kinds[kind];

	return (
		<div {...props} className={cn('callout', className)} data-type={kind}>
			<div className={cn(caps, 'callout-header')}>
				{icon ?? <Icon aria-hidden="true" className="size-5 shrink-0" />}
				<span className="shrink-0">{label}</span>
				{title && (
					<>
						<span aria-hidden="true" className="opacity-50">
							{'//'}
						</span>
						<span className="min-w-0 truncate">{title}</span>
					</>
				)}
			</div>
			<div className="callout-body prose-no-margin">{children}</div>
		</div>
	);
}
