import type { ReactNode } from 'react';
import { Button } from '../components/Button';
import { Select, type SelectItem } from '../components/Select';
import { cn } from '../utils/cn';
import { Divider } from './Frame';

export interface FooterLink {
	href: string;
	label: string;
}

export interface FooterColumn {
	links: FooterLink[];
	title: string;
}

export interface FooterContact {
	description: ReactNode;
	onSubmit?: (topic: string | null) => void;
	submitLabel: string;
	title: string;
	topics: SelectItem[];
}

export interface FooterSocial extends FooterLink {
	icon: ReactNode;
}

export interface FooterProps {
	className?: string;
	columns: FooterColumn[];
	contact?: FooterContact;
	copyright: ReactNode;
	/** Where the wordmark links to. */
	logoHref: string;
	socials?: FooterSocial[];
}

const columnTitle =
	'font-display font-bold text-label text-sm uppercase dark:text-tangerine';

export function Footer({
	className,
	columns,
	contact,
	copyright,
	logoHref,
	socials = [],
}: FooterProps) {
	return (
		<footer>
			<div
				className={cn(
					'flex flex-col gap-12 bg-paper-200 px-6 pt-16 pb-16 lg:flex-row lg:gap-0 md:px-12 dark:bg-graphite-surface',
					className,
				)}
			>
				<a
					className="font-display font-medium font-stretch-125% text-[22px] text-graphite-500 tracking-[0.06em] lg:w-[370px] dark:text-brand"
					href={logoHref}
				>
					MOONREPO
				</a>

				<div className="flex flex-wrap gap-x-16 gap-y-10">
					{columns.map((col) => (
						<div key={col.title}>
							<h2 className={columnTitle}>{col.title}</h2>
							<ul className="mt-3 space-y-2">
								{col.links.map((link) => (
									<li key={link.label}>
										<a
											className="text-base text-graphite-500 hover:text-graphite-800 dark:text-paper-50 dark:hover:text-tangerine"
											href={link.href}
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}

					{contact && (
						<div>
							<h2 className={columnTitle}>{contact.title}</h2>
							<p className="mt-3 text-base text-graphite-500 dark:text-paper-50">
								{contact.description}
							</p>
							<form
								className="mt-3 flex gap-2"
								onSubmit={(e) => {
									e.preventDefault();
									const topic = new FormData(e.currentTarget).get('topic');
									contact.onSubmit?.(typeof topic === 'string' ? topic : null);
								}}
							>
								<Select
									aria-label="Topic"
									className="min-w-0 flex-1 sm:w-[326px] sm:flex-none"
									items={contact.topics}
									name="topic"
								/>
								<Button
									className="shrink-0"
									size="sm"
									type="submit"
									variant="secondary"
								>
									{contact.submitLabel}
								</Button>
							</form>
						</div>
					)}
				</div>
			</div>

			<Divider />

			<div className="flex h-[120px] items-center justify-between px-6 md:px-12">
				<p className="text-base text-graphite-700 dark:text-paper-50">
					{copyright}
				</p>
				<div className="flex gap-6 text-olive dark:text-paper-50">
					{socials.map((social) => (
						<a aria-label={social.label} href={social.href} key={social.label}>
							{social.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
