import { AtSign, MessageCircle, Rss } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { cn } from '@/utils/cn';
import { Divider } from './Frame';

export function Footer({ className }: { className?: string }) {
	const columns = [
		{ title: 'Learn', links: ['Docs', 'Guides', 'Blogs'] },
		{
			title: 'Ecosystem',
			links: [
				'Releases',
				'Shared configs',
				'Developer tools',
				'Examples repository',
			],
		},
		{ title: 'Support', links: ['GitHub', 'Discord', 'Twitter'] },
	];

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
					href="/ui"
				>
					MOONREPO
				</a>

				<div className="flex flex-wrap gap-x-16 gap-y-10">
					{columns.map((col) => (
						<div key={col.title}>
							<h4 className="font-display font-bold text-label text-sm uppercase dark:text-tangerine">
								{col.title}
							</h4>
							<ul className="mt-3 space-y-2">
								{col.links.map((link) => (
									<li key={link}>
										<a
											className="text-base text-graphite-500 hover:text-graphite-700 dark:text-paper-50 dark:hover:text-tangerine"
											href="/ui"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}

					<div>
						<h4 className="font-display font-bold text-label text-sm uppercase dark:text-tangerine">
							Contact
						</h4>
						<p className="mt-3 text-base text-graphite-500 dark:text-paper-50">
							Want to learn more about moonrepo? Have questions?
						</p>
						<form
							className="mt-3 flex gap-2"
							onSubmit={(e) => e.preventDefault()}
						>
							<Select
								aria-label="Topic"
								className="min-w-0 flex-1 sm:w-[326px] sm:flex-none"
								items={[
									{ label: 'Sales', value: 'sales' },
									{ label: 'Support', value: 'support' },
									{ label: 'Partnerships', value: 'partnerships' },
								]}
								name="topic"
							/>
							<Button
								className="shrink-0"
								size="sm"
								type="submit"
								variant="secondary"
							>
								Next
							</Button>
						</form>
					</div>
				</div>
			</div>

			<Divider />

			<div className="flex h-[120px] items-center justify-between px-6 md:px-12">
				<p className="text-base text-graphite-600 dark:text-paper-50">
					Copyright © 2025, moonrepo, inc.
				</p>
				<div className="flex gap-6 text-olive dark:text-paper-50">
					<MessageCircle className="size-6" />
					<AtSign className="size-6" />
					<Rss className="size-6" />
				</div>
			</div>
		</footer>
	);
}
