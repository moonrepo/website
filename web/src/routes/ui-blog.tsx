import { SidebarLayout } from '@moonrepo/ui/layout/SidebarLayout';
import { accent, heading } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronRight, FileText } from 'lucide-react';

export const Route = createFileRoute('/ui-blog')({
	component: UiBlogPage,
});

interface Post {
	date: string;
	excerpt: string;
	minutes: number;
	tags: string[];
	title: string;
}

const posts: Post[] = [
	{
		date: 'July 24, 2025',
		excerpt:
			"This is a rather small release, but it does include some important changes to task inputs, and proto's integration.",
		minutes: 5,
		tags: ['task', 'input', 'uri', 'object', 'proto', 'project', 'layer'],
		title:
			'moon v1.39 - Improved task inputs, better proto integration, and project layers',
	},
	{
		date: 'July 17, 2025',
		excerpt:
			"With this release, we're excited to introduce two major features that pave the way for proto's future!",
		minutes: 5,
		tags: ['lockfile', 'record', 'registry', 'oci', 'plugin', 'locator'],
		title: 'proto v0.51 - Unstable lockfiles and plugin registries',
	},
	{
		date: 'June 24, 2025',
		excerpt:
			"In this release, we're stoked to release the Go WASM toolchain plugin, and improved MCP/AI support!",
		minutes: 4,
		tags: [
			'toolchain',
			'wasm',
			'plugin',
			'go',
			'mcp',
			'ai',
			'webhooks',
			'terminal',
			'notifications',
		],
		title:
			'moon v1.38 - Go WASM toolchain, MCP tools, terminal notifications, and more!',
	},
	{
		date: 'June 11, 2025',
		excerpt:
			"In this release, we're landing a handful of quality of life improvements that have been requested by the community.",
		minutes: 4,
		tags: [
			'rewrite',
			'url',
			'activation',
			'comments',
			'config',
			'plugin',
			'shell',
		],
		title:
			'proto v0.50 - URL rewrites, on-init activation, preserved comments, and more',
	},
	{
		date: 'June 3, 2025',
		excerpt:
			"In this release, we're stoked to release another WASM toolchain plugin, and experimental MCP/AI support!",
		minutes: 4,
		tags: ['toolchain', 'wasm', 'plugin', 'rust', 'mcp', 'ai'],
		title: 'moon v1.37 - Rust WASM toolchain and MCP support',
	},
	{
		date: 'May 18, 2025',
		excerpt:
			"In this release, we're very excited to fully release toolchain plugins.",
		minutes: 4,
		tags: [
			'toolchain',
			'wasm',
			'plugin',
			'remote',
			'cache',
			'integrity',
			'codegen',
			'template',
		],
		title:
			'moon v1.36 - Toolchain plugins beta, optimized remote caching, and codegen improvements',
	},
	{
		date: 'April 16, 2025',
		excerpt:
			"With this release, we're taking yet another step to supporting plugins.",
		minutes: 4,
		tags: [
			'action',
			'graph',
			'task',
			'priority',
			'experiment',
			'terminal',
			'theme',
		],
		title: 'moon v1.35 - Action graph improvements, task priorities, and more!',
	},
	{
		date: 'March 31, 2025',
		excerpt:
			"With this release, we're introducing a handful of performance and customization improvements!",
		minutes: 6,
		tags: [
			'moonbase',
			'remote',
			'cache',
			'action',
			'pipeline',
			'glob',
			'git',
			'experiment',
		],
		title:
			'moon v1.34 - Action customization, faster globs, better Git, and more!',
	},
	{
		date: 'March 31, 2025',
		excerpt:
			'As mentioned in previous moon releases and announcements, we have sunset moonbase, our remote caching service.',
		minutes: 6,
		tags: ['moonbase', 'remote', 'cache'],
		title: 'moonbase has been sunset',
	},
	{
		date: 'March 13, 2025',
		excerpt:
			"With this release, we're stoked to provide an initial release for plugin support.",
		minutes: 6,
		tags: ['toolchain', 'wasm', 'plugin', 'moonx', 'schema'],
		title: 'moon v1.33 - Alpha support for toolchain WASM plugins',
	},
];

function RecentPosts() {
	return (
		<>
			<h4 className="font-bold font-display text-graphite-700 text-sm uppercase dark:text-paper-50">
				Recent posts
			</h4>
			<ul className="mt-5 space-y-3">
				{posts.slice(0, 5).map((post, i) => (
					<li key={post.title}>
						<a
							className={cn(
								'flex gap-3 text-[15px] leading-6',
								i === 0
									? accent
									: 'text-graphite-600 hover:text-graphite-700 dark:text-paper-100 dark:hover:text-tangerine',
							)}
							href="/ui-blog"
						>
							<FileText className="mt-[3px] size-[18px] shrink-0" />
							{post.title}
						</a>
					</li>
				))}
			</ul>
		</>
	);
}

function PostEntry({ post }: { post: Post }) {
	return (
		<article>
			<p className="font-bold font-display text-graphite-600 text-sm uppercase dark:text-paper-100">
				{post.date} · {post.minutes} min read
			</p>
			<h2
				className={cn(
					'mt-1.5 text-[28px] leading-tight md:text-[32px]',
					heading,
				)}
			>
				<a className="hover:underline" href="/ui-blog">
					{post.title}
				</a>
			</h2>
			<p className="mt-3 text-graphite-600 text-lg leading-[30px] dark:text-sand">
				{post.excerpt}{' '}
				<a
					className={cn('underline underline-offset-2', accent)}
					href="/ui-blog"
				>
					Read more
				</a>
			</p>
			<ul className="mt-4 flex flex-wrap gap-2.5">
				{post.tags.map((tag) => (
					<li
						className="flex h-6 items-center rounded-[3px] border border-graphite-600/70 px-[7px] font-display font-semibold text-graphite-700 text-xs uppercase dark:border-paper-100 dark:text-paper-50"
						key={tag}
					>
						{tag}
					</li>
				))}
			</ul>
		</article>
	);
}

function UiBlogPage() {
	return (
		<SidebarLayout
			drawerTitle="Blog"
			sidebar={<RecentPosts />}
			sidebarClassName="w-[356px] pt-[56px]"
			title="Blog"
		>
			<div className="px-6 pt-14 pb-16 md:px-12">
				<div className="max-w-[820px] space-y-[70px]">
					{posts.map((post) => (
						<PostEntry key={post.title} post={post} />
					))}
				</div>
				<div className="mt-20 flex justify-end md:pr-12">
					<a
						className="flex items-center gap-1.5 font-bold font-display text-graphite-700 text-sm uppercase hover:text-olive dark:text-paper-50 dark:hover:text-tangerine"
						href="/ui-blog"
					>
						Older entries
						<ChevronRight className="size-4" />
					</a>
				</div>
			</div>
		</SidebarLayout>
	);
}
