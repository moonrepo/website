export interface VersionLabelProps {
	version: string;
}

export function VersionLabel({ version }: VersionLabelProps) {
	return (
		<span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-bold bg-fd-primary text-fd-primary-foreground">
			v{version}
		</span>
	);
}
