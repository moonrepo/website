export interface TypeLabelProps {
	type: string;
}

export function TypeLabel({ type }: TypeLabelProps) {
	const colorClass = 'bg-fd-primary';

	// if (type.startsWith('Record<') || type.endsWith('}')) {
	// 	colorClass = 'bg-fd-secondary';
	// } else if (type.startsWith('Array<') || type.endsWith('[]')) {
	// 	colorClass = 'bg-fd-secondary';
	// } else if (type === 'string') {
	// 	colorClass = 'bg-fd-green';
	// } else if (type === 'number') {
	// 	colorClass = 'bg-fd-blue';
	// } else if (type === 'boolean') {
	// 	colorClass = 'bg-fd-yellow';
	// } else if (type === 'null' || type === 'undefined') {
	// 	colorClass = 'bg-fd-gray';
	// }

	return (
		<span
			className={`inline-flex items-center px-1 py-0.5 rounded text-xs text-fd-primary-foreground ${colorClass}`}
		>
			{type}
		</span>
	);
}
