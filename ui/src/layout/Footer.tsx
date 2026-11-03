import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface FooterSocial {
	href: string;
	icon: ReactNode;
	label: string;
}

export interface FooterProps {
	className?: string;
	copyright: ReactNode;
	socials?: FooterSocial[];
}

export function Footer({ className, copyright, socials = [] }: FooterProps) {
	return (
		<footer
			className={cn(
				'flex h-[120px] items-center justify-between gap-6 px-6 md:px-12',
				className,
			)}
		>
			<p className="text-base text-graphite-700 dark:text-paper-50">
				{copyright}
			</p>
			<div className="flex gap-5 text-olive dark:text-paper-50">
				{socials.map((social) => (
					<a
						aria-label={social.label}
						className="transition-colors hover:text-graphite-800 dark:hover:text-tangerine"
						href={social.href}
						key={social.label}
					>
						{social.icon}
					</a>
				))}
			</div>
		</footer>
	);
}
