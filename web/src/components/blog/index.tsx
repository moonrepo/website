import { accent, dashed, heading, muted } from '@moonrepo/ui/layout/styles';
import { Image } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import type { TOCItemType } from 'fumadocs-core/toc';
import {
	TOCProvider,
	TOCScrollArea,
	useTOCItems,
} from 'fumadocs-ui/components/toc';
import { TOCItem, TOCItems } from 'fumadocs-ui/components/toc/default';
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	CornerLeftUpIcon,
	FileTextIcon,
	TextIcon,
} from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import type { BlogAuthor, BlogPost, BlogTag } from '../../lib/blog';
import { cn } from '../../lib/cn';
import { BlogPanel } from './panel';

const dateFormat = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'long',
	timeZone: 'UTC',
});

const label = 'font-bold font-display text-sm uppercase';

const chip =
	'flex h-6 items-center gap-1.5 rounded-[3px] border border-graphite-700/70 px-[7px] font-display font-semibold text-graphite-800 text-xs uppercase transition-colors hover:border-olive hover:text-olive dark:border-paper-100 dark:text-paper-50 dark:hover:border-tangerine dark:hover:text-tangerine';

export function BlogCards({
	posts,
	className,
	...props
}: ComponentProps<'div'> & { posts: BlogPost[] }) {
	return (
		<div {...props} className={cn('max-w-[820px] space-y-[70px]', className)}>
			{posts.map((post) => (
				<BlogCard key={post.url} post={post} />
			))}
		</div>
	);
}

export function BlogCard({ post }: { post: BlogPost }) {
	return (
		<article>
			<BlogMeta post={post} />
			<h2
				className={cn(
					'mt-1.5 text-[28px] leading-tight md:text-[32px]',
					heading,
				)}
			>
				<Link className="hover:underline" href={post.url}>
					{post.title}
				</Link>
			</h2>
			<p className="mt-3 text-graphite-700 text-lg leading-[30px] dark:text-sand">
				{post.description}{' '}
				<Link
					className={cn('underline underline-offset-2', accent)}
					href={post.url}
				>
					Read more
				</Link>
			</p>
			<BlogTags className="mt-4" tags={post.tags} />
		</article>
	);
}

/** the date and reading time of a post */
export function BlogMeta({
	post,
	className,
}: {
	post: BlogPost;
	className?: string;
}) {
	if (!post.date && !post.minutes) return;

	return (
		<p
			className={cn(label, 'text-graphite-700 dark:text-paper-100', className)}
		>
			{post.date && <BlogDate date={post.date} />}
			{post.date && post.minutes ? ' · ' : null}
			{post.minutes ? `${post.minutes} min read` : null}
		</p>
	);
}

/** the latest posts, for the sidebar */
export function BlogRecentPosts({
	posts,
	current,
	limit = 5,
}: {
	posts: BlogPost[];
	/** URL of the current post */
	current?: string;
	limit?: number;
}) {
	return (
		<>
			<h2 className={cn(label, 'text-graphite-800 dark:text-paper-50')}>
				Recent posts
			</h2>
			<ul className="mt-5 space-y-3">
				{posts.slice(0, limit).map((post) => (
					<li key={post.url}>
						<Link
							className={cn(
								'flex gap-3 text-[15px] leading-6',
								post.url === current
									? accent
									: 'text-graphite-700 hover:text-graphite-800 dark:text-paper-100 dark:hover:text-tangerine',
							)}
							href={post.url}
						>
							<FileTextIcon className="mt-[3px] size-[18px] shrink-0" />
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export interface BlogPageProps extends ComponentProps<'article'> {
	/** shows a floating panel with the table of contents */
	toc?: TOCItemType[];
}

export function BlogPage({ toc, className, ...props }: BlogPageProps) {
	const article = (
		<article
			{...props}
			className={cn(
				'flex min-w-0 flex-1 flex-col gap-10 px-6 pt-10 pb-16 md:px-12',
				// room for the panel
				toc && 'pb-28 xl:pb-16',
				className,
			)}
		/>
	);
	if (!toc) return article;

	return (
		<TOCProvider toc={toc}>
			<div className="flex">
				{article}
				<BlogTOC />
			</div>
			<BlogPanel className="xl:hidden" />
		</TOCProvider>
	);
}

/** the "On this page" sidebar of docs, for wide screens */
export function BlogTOC() {
	const items = useTOCItems();
	if (items.length === 0) return;

	return (
		<div
			className="sticky top-(--site-header-height) flex h-[calc(100dvh-var(--site-header-height))] w-[268px] shrink-0 flex-col self-start pt-10 pe-6 max-xl:hidden"
			id="nd-toc"
		>
			<h3
				className="inline-flex items-center gap-1.5 text-fd-muted-foreground text-sm"
				id="toc-title"
			>
				<TextIcon className="size-4" />
				On this page
			</h3>
			<TOCScrollArea className="ms-px">
				<TOCItems>
					{items.map((item) => (
						<TOCItem item={item} key={item.url} />
					))}
				</TOCItems>
			</TOCScrollArea>
		</div>
	);
}

/** the description, authors, and tags on top of a post */
export function BlogHeader(props: ComponentProps<'div'>) {
	return (
		<div
			{...props}
			className={cn(
				'flex max-w-[820px] flex-col items-start gap-5',
				props.className,
			)}
		/>
	);
}

export function BlogBackLink({
	children = 'Back to blog',
	...props
}: ComponentProps<typeof Link>) {
	return (
		<Link
			{...props}
			className={cn(
				label,
				'inline-flex items-center gap-1.5 text-graphite-500 transition-colors hover:text-olive dark:text-sand dark:hover:text-tangerine',
				props.className,
			)}
		>
			<CornerLeftUpIcon className="size-4" />
			{children}
		</Link>
	);
}

export function BlogTitle(props: ComponentProps<'h1'>) {
	return (
		<h1
			{...props}
			className={cn('text-4xl md:text-[44px]', heading, props.className)}
		/>
	);
}

export function BlogDescription(props: ComponentProps<'p'>) {
	return (
		<p
			{...props}
			className={cn(
				'text-graphite-700 text-xl leading-8 empty:hidden dark:text-sand',
				props.className,
			)}
		/>
	);
}

export function BlogAuthors({
	authors,
	className,
	...props
}: ComponentProps<'div'> & { authors: BlogAuthor[] }) {
	if (authors.length === 0) return;

	return (
		<div
			{...props}
			className={cn('flex flex-row flex-wrap gap-x-8 gap-y-3', className)}
		>
			{authors.map((author) => {
				const content = (
					<>
						{author.image && (
							<Image
								alt=""
								className="size-9 rounded-full border border-paper-400 dark:border-graphite-500"
								height={36}
								src={author.image}
								width={36}
							/>
						)}
						<span className="flex flex-col leading-tight">
							<span className={cn('text-base', heading)}>{author.name}</span>
							{author.title && (
								<span className={cn('text-sm', muted)}>{author.title}</span>
							)}
						</span>
					</>
				);

				return author.url ? (
					<a
						className="group inline-flex items-center gap-2.5 [&:hover_span]:text-olive dark:[&:hover_span]:text-tangerine"
						href={author.url}
						key={author.name}
					>
						{content}
					</a>
				) : (
					<span className="inline-flex items-center gap-2.5" key={author.name}>
						{content}
					</span>
				);
			})}
		</div>
	);
}

export function BlogTags({
	tags,
	className,
	...props
}: ComponentProps<'ul'> & { tags: BlogTag[] }) {
	if (tags.length === 0) return;

	return (
		<ul {...props} className={cn('flex flex-wrap gap-2.5', className)}>
			{tags.map((tag) => (
				<li key={tag.slug}>
					<Link className={chip} href={tag.url}>
						{tag.name}
					</Link>
				</li>
			))}
		</ul>
	);
}

export function BlogDate({
	date,
	...props
}: Omit<ComponentProps<'time'>, 'children'> & { date: Date | string }) {
	const value = new Date(date);

	return (
		<time dateTime={value.toISOString()} {...props}>
			{dateFormat.format(value)}
		</time>
	);
}

/** adds typography styles */
export function BlogBody(props: ComponentProps<'div'>) {
	return (
		<div
			{...props}
			className={cn('prose min-w-0 max-w-[820px]', props.className)}
		/>
	);
}

/** links to the newer and older posts */
export function BlogPostNav({
	newer,
	older,
	className,
	...props
}: ComponentProps<'nav'> & { newer?: BlogPost; older?: BlogPost }) {
	if (!newer && !older) return;

	return (
		<nav
			{...props}
			className={cn(
				'grid max-w-[820px] gap-8 border-t pt-8 sm:grid-cols-2',
				dashed,
				className,
			)}
		>
			{newer && (
				<PostLink post={newer}>
					<ChevronLeftIcon className="size-4" />
					Newer post
				</PostLink>
			)}
			{older && (
				<PostLink
					className="sm:col-start-2 sm:items-end sm:text-right"
					post={older}
				>
					Older post
					<ChevronRightIcon className="size-4" />
				</PostLink>
			)}
		</nav>
	);
}

function PostLink({
	post,
	className,
	children,
}: {
	post: BlogPost;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Link
			className={cn('group flex flex-col gap-1.5', className)}
			href={post.url}
		>
			<span className={cn(label, accent, 'inline-flex items-center gap-1')}>
				{children}
			</span>
			<span
				className={cn('text-lg leading-snug group-hover:underline', heading)}
			>
				{post.title}
			</span>
		</Link>
	);
}

/** tags with their number of posts, see `getTags()` */
export function BlogTagCards({
	tags,
	className,
	...props
}: ComponentProps<'ul'> & { tags: (BlogTag & { count: number })[] }) {
	return (
		<ul {...props} className={cn('flex flex-wrap gap-2.5', className)}>
			{tags.map((tag) => (
				<li key={tag.slug}>
					<Link className={chip} href={tag.url}>
						{tag.name}
						<span className="text-graphite-500 dark:text-sand">
							{tag.count}
						</span>
					</Link>
				</li>
			))}
		</ul>
	);
}
