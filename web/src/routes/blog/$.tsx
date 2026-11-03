import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Suspense } from 'react';
import {
	BlogAuthors,
	BlogBody,
	BlogDescription,
	BlogHeader,
	BlogMeta,
	BlogPage,
	BlogPostNav,
	BlogRecentPosts,
	BlogTags,
} from '@/components/blog';
import { BlogLayout } from '@/components/blog/layout';
import { PageActions } from '@/components/PageActions';
import browserCollections from '@/generated/browser';
import { type BlogPost, findPost } from '@/lib/blog';
import { loadBlogPosts } from '@/lib/blogPosts';
import { seo } from '@/lib/meta';
import { blogSource } from '@/lib/source';
import { getMdxComponents } from '@/mdxComponents';

export const Route = createFileRoute('/blog/$')({
	component: Page,
	loader: async ({ params }) => {
		const slugs = params._splat?.split('/') ?? [];
		const data = await serverLoader({ data: slugs });

		await clientLoader.preload(data.path);

		return data;
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};

		const { post } = loaderData;

		return seo({
			title: post.title,
			description: post.description,
			path: post.url,
			image: post.image,
			type: 'article',
			properties: {
				'article:published_time':
					post.date && new Date(post.date).toISOString(),
			},
		});
	},
});

const serverLoader = createServerFn({
	method: 'GET',
})
	.validator((slugs: string[]) => slugs)
	.handler(async ({ data: slugs }) => {
		const page = blogSource.getPage(slugs);
		const posts = await loadBlogPosts();
		const found = page && findPost(posts, page.url);

		if (!page || !found) {
			throw notFound();
		}

		return {
			...found,
			path: page.path,
			posts,
		};
	});

interface PostProps {
	newer?: BlogPost;
	older?: BlogPost;
	post: BlogPost;
}

const clientLoader = browserCollections.blog.createClientLoader({
	id: 'blog',
	component({ toc, default: MDX }, { newer, older, post }: PostProps) {
		return (
			<BlogPage toc={toc}>
				<BlogHeader>
					<BlogDescription>{post.description}</BlogDescription>
					<BlogAuthors authors={post.authors} />
					<BlogTags tags={post.tags} />
				</BlogHeader>
				<BlogBody>
					<MDX components={getMdxComponents()} />
				</BlogBody>
				<BlogPostNav newer={newer} older={older} />
			</BlogPage>
		);
	},
});

function Page() {
	const { newer, older, path, post, posts } = Route.useLoaderData();

	return (
		<BlogLayout
			beforeTitle={<BlogMeta post={post} spread />}
			sidebar={<BlogRecentPosts current={post.url} posts={posts} />}
			title={post.title}
			titleActions={
				<PageActions
					className="shrink-0"
					file={`blog/${path}`}
					url={post.url}
				/>
			}
		>
			<Suspense>
				{clientLoader.useContent(path, { newer, older, post })}
			</Suspense>
		</BlogLayout>
	);
}
