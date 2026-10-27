import { Collapsible } from '@base-ui/react/collapsible';
import { SidebarLayout } from '@moonrepo/ui/layout/SidebarLayout';
import { accent, heading, muted } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import { createFileRoute } from '@tanstack/react-router';
import {
	Book,
	ChevronDown,
	ChevronRight,
	Circle,
	FileText,
	FolderOpen,
	Hammer,
	House,
	KeyRound,
	Pencil,
	Puzzle,
	Rocket,
	SquareTerminal,
	Triangle,
} from 'lucide-react';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/ui-docs')({
	component: UiDocsPage,
});

const rule = 'border-paper-400 dark:border-graphite-500/60';

const products = [
	{ icon: <FileText />, label: 'Introduction' },
	{
		active: true,
		icon: <Circle className="fill-current" />,
		label: 'moon docs',
	},
	{ icon: <Triangle className="fill-current" />, label: 'proto docs' },
];

const groups: {
	collapsible?: boolean;
	icon: ReactNode;
	items: string[];
	label: string;
}[] = [
	{
		collapsible: false,
		icon: <Rocket />,
		items: [
			'Setup workspace',
			'Create a project',
			'Create a task',
			'Run a task',
			'Migrate to moon',
		],
		label: 'Getting started',
	},
	{
		icon: <KeyRound />,
		items: [
			'Workspace',
			'Projects',
			'Tasks',
			'Task inheritance',
			'Actions',
			'Action pipeline',
			'Toolchains',
			'Extensions',
		],
		label: 'Key concepts',
	},
	{
		icon: <FolderOpen />,
		items: [
			'Directory structure',
			'Cache lifecycle',
			'Configuration formats',
			'File groups',
			'File patterns',
			'Identifiers',
			'Query language',
			'Targets',
			'Task tokens',
		],
		label: 'Going further',
	},
	{
		icon: <Hammer />,
		items: ['JavaScript', 'Rust', 'etc.'],
		label: 'Toolchains',
	},
	{ icon: <Puzzle />, items: ['etc.'], label: 'Extensions' },
	{ icon: <SquareTerminal />, items: ['etc.'], label: 'Commands' },
	{ icon: <Book />, items: ['etc.'], label: 'Guides' },
];

const sections = [
	{ id: 'moon', title: 'moon' },
	{ id: 'why-use-moon', title: 'Why use moon?' },
	{ id: 'supported-languages', title: 'Supported languages' },
	{ id: 'supported-targets', title: 'Supported targets' },
	{ id: 'features', title: 'Features' },
];

function SidebarGroup({ group }: { group: (typeof groups)[number] }) {
	const label = (
		<>
			<span className="flex size-8 items-center justify-center rounded-md border border-paper-400 bg-paper-50 text-olive shadow-xs dark:border-graphite-500/60 dark:bg-graphite-surface dark:text-tangerine [&_svg]:size-[18px]">
				{group.icon}
			</span>
			<span className="flex-1 text-left">{group.label}</span>
		</>
	);
	const labelClass =
		'flex w-full items-center gap-3 text-base text-graphite-800 dark:text-paper-50';
	const list = (
		<ul className={cn('mt-2 ml-4 border-l py-0.5 pl-[31px]', rule)}>
			{group.items.map((item) => (
				<li key={item}>
					<a
						className="block py-[7px] text-graphite-700 text-sm leading-[19px] hover:text-graphite-800 dark:text-paper-100 dark:hover:text-tangerine"
						href="/ui-docs"
					>
						{item}
					</a>
				</li>
			))}
		</ul>
	);

	if (group.collapsible === false) {
		return (
			<div>
				<div className={labelClass}>{label}</div>
				{list}
			</div>
		);
	}

	return (
		<Collapsible.Root defaultOpen>
			<Collapsible.Trigger
				className={cn(
					labelClass,
					'group cursor-pointer outline-hidden focus-visible:underline',
				)}
			>
				{label}
				<ChevronDown className="size-5 transition-transform group-data-panel-open:rotate-0 -rotate-90" />
			</Collapsible.Trigger>
			<Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-150 ease-out data-ending-style:h-0 data-starting-style:h-0">
				{list}
			</Collapsible.Panel>
		</Collapsible.Root>
	);
}

function SidebarNav() {
	return (
		<>
			<nav aria-label="Products" className="space-y-4">
				{products.map((product) => (
					<a
						className={cn(
							'flex h-10 items-center gap-3 rounded-md border border-transparent px-3 text-base text-graphite-800 dark:text-paper-50',
							product.active &&
								'border-olive bg-paper-50/60 dark:border-tangerine dark:bg-graphite-800',
						)}
						href="/ui-docs"
						key={product.label}
					>
						<span className={cn('[&_svg]:size-[18px]', accent)}>
							{product.icon}
						</span>
						{product.label}
					</a>
				))}
			</nav>

			<hr className={cn('my-8', rule)} />

			<div className="space-y-4">
				{groups.map((group) => (
					<SidebarGroup group={group} key={group.label} />
				))}
			</div>
		</>
	);
}

function Breadcrumb() {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cn('flex items-center gap-3 text-[15px]', muted)}
		>
			<House className="size-4" />
			<ChevronRight className="size-4" />
			<a href="/ui-docs">moon</a>
			<ChevronRight className="size-4" />
			<span>Getting started</span>
		</nav>
	);
}

function Article() {
	const paragraph =
		'text-[15px] text-graphite-800 leading-6 dark:text-paper-100 [&+&]:mt-4';

	return (
		<article className="min-w-0 max-w-[660px] flex-1">
			<p className={paragraph}>
				moonrepo is a productivity platform that aims to eliminate pain points
				for both developers and companies, by automating tiresome and complex
				workflows, and improving the overall developer experience.
			</p>
			<p className={paragraph}>
				We currently achieve this through the following tools and services.
			</p>

			{sections.map((section) => (
				<section className="mt-12 scroll-mt-8" id={section.id} key={section.id}>
					<h2 className={cn('text-[32px]', heading)}>{section.title}</h2>
					<div className="mt-4">
						<p className={paragraph}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
							nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
							Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
							Praesent mauris.
						</p>
						<p className={paragraph}>
							Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
							lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
							torquent per conubia nostra, per inceptos himenaeos. Curabitur
							sodales ligula in libero.
						</p>
						<p className={paragraph}>
							Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.
							Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed
							convallis tristique sem. Proin ut ligula vel nunc egestas
							porttitor.
						</p>
					</div>
				</section>
			))}

			<a
				className={cn(
					'mt-16 inline-flex items-center gap-2 font-bold font-display text-sm uppercase',
					accent,
				)}
				href="https://github.com/moonrepo/website"
			>
				<Pencil className="size-4" />
				Edit this page
			</a>
		</article>
	);
}

function TableOfContents() {
	const [first, ...rest] = sections;

	return (
		<aside
			aria-label="On this page"
			className="hidden w-[200px] shrink-0 xl:block"
		>
			<div className="sticky top-8">
				<h2 className="font-bold font-display text-graphite-800 text-sm uppercase dark:text-paper-50">
					On this page
				</h2>
				<ul className="mt-6 space-y-2.5 text-base">
					<li>
						<a className={cn('text-[17px]', accent)} href={`#${first.id}`}>
							{first.title}
						</a>
					</li>
					{rest.map((section) => (
						<li className="pl-4" key={section.id}>
							<a
								className="text-graphite-700 hover:text-graphite-800 dark:text-paper-100 dark:hover:text-tangerine"
								href={`#${section.id}`}
							>
								{section.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}

function UiDocsPage() {
	return (
		<SidebarLayout
			beforeTitle={<Breadcrumb />}
			drawerTitle="Documentation"
			sidebar={<SidebarNav />}
			title="Getting started"
		>
			<div className="flex gap-12 px-6 pt-12 pb-12 md:px-12">
				<Article />
				<TableOfContents />
			</div>
		</SidebarLayout>
	);
}
