import { Button } from '@moonrepo/ui/components/Button';
import { Footer } from '@moonrepo/ui/layout/Footer';
import { Divider, Hatch, PageFrame } from '@moonrepo/ui/layout/Frame';
import { Header } from '@moonrepo/ui/layout/Header';
import { accent, dashed, heading, muted } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import { createFileRoute } from '@tanstack/react-router';
import {
	ArrowRight,
	CircleQuestionMark,
	Columns3,
	FileSearch,
	FolderCode,
	FolderX,
	Hexagon,
	Infinity as InfinityIcon,
	RefreshCw,
	Route as RouteIcon,
	SquareCode,
	Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/ui')({
	component: UiPage,
});

function ListCard({
	items,
	className,
}: {
	items: { icon: ReactNode; label: string }[];
	className?: string;
}) {
	return (
		<ul
			className={cn(
				'divide-y divide-olive overflow-hidden rounded-[14px] border border-olive bg-paper-200 dark:bg-graphite-surface',
				className,
			)}
		>
			{items.map((item) => (
				<li
					className="flex min-h-[62px] items-center gap-3 px-6 py-3 text-graphite-700 text-lg dark:text-sand"
					key={item.label}
				>
					<span
						className={cn(
							'flex size-5 items-center justify-center [&_svg]:size-5',
							accent,
						)}
					>
						{item.icon}
					</span>
					{item.label}
				</li>
			))}
		</ul>
	);
}

function Feature({
	icon,
	title,
	children,
}: {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}) {
	return (
		<div>
			<h3 className={cn('flex items-center gap-3 text-[22px]', heading)}>
				<span
					className={cn(
						'flex size-6 items-center justify-center [&_svg]:size-5',
						accent,
					)}
				>
					{icon}
				</span>
				{title}
			</h3>
			<p className={cn('mt-3 pl-9 text-base leading-6', muted)}>{children}</p>
		</div>
	);
}

// Sections

function Hero() {
	const craters = [
		'left-[59%] top-[475px] h-[78px] w-[112px]',
		'left-[29%] top-[555px] h-8 w-10',
		'left-[3%] top-[580px] h-6 w-7',
		'left-[17%] top-[610px] h-[120px] w-[120px]',
		'left-[86%] top-[617px] h-[58px] w-[64px]',
	];

	return (
		<section className="relative h-[880px] overflow-hidden md:h-[700px]">
			<div className="absolute inset-x-0 top-[180px] bottom-0 md:top-0">
				{/* Planet surface */}
				<div className="absolute top-[420px] left-[43%] size-[2380px] -translate-x-1/2 rounded-full border-2 border-olive bg-paper-100 dark:border-graphite-500 dark:bg-graphite-800" />
				{craters.map((crater) => (
					<div
						className={cn(
							'absolute rounded-[50%] bg-paper-400 dark:bg-graphite-950',
							crater,
						)}
						key={crater}
					/>
				))}

				{/* Small moons */}
				<div className="absolute top-[60px] left-[82px] hidden size-[146px] overflow-hidden rounded-full border-2 border-olive bg-paper-100 md:block dark:border-graphite-500 dark:bg-graphite-800">
					<div className="absolute -top-[30%] -right-[30%] size-full rounded-full bg-paper-400 dark:bg-graphite-950" />
					<div className="absolute -top-[22%] -right-[38%] size-full rounded-full bg-paper-100 dark:bg-graphite-800" />
				</div>
				<div className="absolute top-[478px] -right-[40px] size-[84px] rounded-full border-2 border-olive bg-paper-400 dark:border-graphite-500 dark:bg-graphite-950" />
			</div>

			<div className="relative flex flex-col items-center px-6 pt-[120px] text-center">
				<h1
					className={cn(
						'max-w-[680px] text-5xl leading-[1.1] md:text-[64px]',
						heading,
					)}
				>
					A new era of productivity tooling
				</h1>
				<p className={cn('mt-6 max-w-[660px] text-xl leading-[30px]', muted)}>
					The Rust-powered build system that makes monorepos manageable, no
					matter what language you’re building in
				</p>
				<p className={cn('mt-3 flex items-center gap-2 text-base', muted)}>
					Backed by
					<span className="flex items-center gap-1.5 font-medium text-yc">
						<span className="flex size-[22px] items-center justify-center bg-yc text-sm text-white">
							Y
						</span>
						Combinator
					</span>
				</p>
			</div>
		</section>
	);
}

function ProblemSolution() {
	return (
		<section className="relative grid md:grid-cols-2">
			<div className="hidden md:absolute md:inset-y-0 md:left-1/2 md:block md:border-l md:border-dashed md:border-olive" />

			<div className="px-6 pt-[88px] pb-12 md:px-12 md:pb-24">
				<h2 className={cn('text-[32px]', heading)}>
					If you're dealing with...
				</h2>
				<ListCard
					className="mt-12"
					items={[
						{
							icon: <span className="font-bold text-xs">1X</span>,
							label: 'Slow builds in large codebases',
						},
						{
							icon: <FolderX />,
							label: 'Inconsistent tool versions across teams',
						},
						{
							icon: <CircleQuestionMark />,
							label: 'Complex deployment pipelines',
						},
					]}
				/>
			</div>

			<div className="px-6 pt-12 pb-[88px] md:px-12 md:pt-[88px]">
				<h2 className={cn('text-[32px]', heading)}>
					moonrepo solves this by...
				</h2>
				<ListCard
					className="mt-12"
					items={[
						{
							icon: <RefreshCw />,
							label: 'Smart caching and incremental builds',
						},
						{ icon: <FolderCode />, label: 'Automated version management' },
						{ icon: <InfinityIcon />, label: 'Streamlined CI/CD workflows' },
					]}
				/>
			</div>
		</section>
	);
}

function WhatsIn() {
	const steps = [
		'Manage your tools with proto',
		'Manage your builds with moon',
		'Deploy faster',
	];

	return (
		<section className="px-6 pt-14 pb-24 text-center md:px-12">
			<h2 className={cn('text-[44px] leading-tight', heading)}>
				What’s in moonrepo?
			</h2>
			<p
				className={cn(
					'mx-auto mt-4 max-w-[640px] text-lg leading-[30px]',
					muted,
				)}
			>
				moonrepo is made up of two tools: moon and proto. Think of them as your
				development workflow helpers.
			</p>

			<div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:gap-8">
				{steps.map((step, i) => (
					<div className="contents" key={step}>
						{i > 0 && (
							<ArrowRight
								className={cn('size-5 shrink-0 rotate-90 md:rotate-0', accent)}
							/>
						)}
						<div className="flex min-h-[46px] w-full flex-1 items-center justify-center rounded-md px-3 py-2 text-center border border-olive text-graphite-800 text-lg dark:text-paper-50">
							{step}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function ToolIntro({
	logo,
	eyebrow,
	title,
	cta,
	children,
	reverse,
}: {
	logo: ReactNode;
	eyebrow: string;
	title: string;
	cta: string;
	children: ReactNode;
	reverse?: boolean;
}) {
	return (
		<div className={cn(reverse && 'md:order-2')}>
			<div className="flex h-[125px] items-center px-6 md:px-12">{logo}</div>
			<div className={cn('relative border-t', dashed)}>
				<span
					className={cn(
						'absolute -top-[3px] size-[5px] bg-olive',
						reverse ? '-right-[3px]' : '-left-[3px]',
					)}
				/>
			</div>
			<div className="px-6 pt-[70px] pb-16 md:px-12">
				<p
					className={cn(
						'font-display font-semibold text-sm uppercase tracking-wide',
						accent,
					)}
				>
					{eyebrow}
				</p>
				<h2 className={cn('mt-2 text-[32px]', heading)}>{title}</h2>
				<p className="mt-6 max-w-[575px] text-graphite-700 text-lg leading-[30px] dark:text-sand">
					{children}
				</p>
				<Button className="mt-6">{cta}</Button>
			</div>
		</div>
	);
}

function Logo({ name, color }: { name: string; color: string }) {
	return (
		<div className="flex items-center gap-7">
			<span className={cn('size-[66px] rounded-full', color)} />
			<span
				className={cn(
					heading,
					'font-semibold font-stretch-125% text-[44px] tracking-[0.04em]',
				)}
			>
				{name}
			</span>
		</div>
	);
}

function Tools() {
	return (
		<>
			<section className="relative grid md:grid-cols-2">
				<div className="hidden md:absolute md:inset-y-0 md:left-1/2 md:block md:border-l md:border-dashed md:border-olive" />
				<ToolIntro
					cta="Build fast with moon"
					eyebrow="Your smart build system"
					logo={<Logo color="bg-moon" name="MOON" />}
					title="Supercharge your codebase"
				>
					For repositories with multiple projects, any number of languages, and
					team members constantly pushing changes, moon will help simplify the
					experience of working in and maintaining a complex monorepo.
				</ToolIntro>
				<div className="flex flex-col gap-11 px-6 pt-20 pb-16 md:px-12">
					<Feature icon={<RouteIcon />} title="Efficient task orchestration">
						Never run the same task twice. With our smart hashing, robust
						caching, and efficient task execution, moon will avoid unnecessary
						work.
					</Feature>
					<Feature icon={<Columns3 />} title="Better project organization">
						Neatly organize your codebase, declare ownership information, and
						simplify project discovery.
					</Feature>
					<Feature
						icon={<SquareCode />}
						title="Integrated development environment"
					>
						With our integrated toolchain, development environments will be spun
						up in minutes, ensuring the exact tools and versions are used across
						developers and machines.
					</Feature>
				</div>
			</section>

			<Divider />

			<section className="relative grid md:grid-cols-2">
				<div className="hidden md:absolute md:inset-y-0 md:left-1/2 md:block md:border-l md:border-dashed md:border-olive" />
				<ToolIntro
					cta="Keep organized with proto"
					eyebrow="Your tool version manager"
					logo={<Logo color="bg-proto" name="PROTO" />}
					reverse
					title="Automate your environments"
				>
					Remove the hassle of managing and enforcing specific versions of
					programming languages across teams or projects. With proto, our modern
					version manager, your workflow is automated away through a single
					tool.
				</ToolIntro>
				<div className="flex flex-col gap-11 px-6 pt-24 pb-16 md:order-1 md:px-12">
					<Feature icon={<Hexagon />} title="Multi-language support">
						Manage versions of multiple languages and dependency managers
						through a single interface. A single source of truth.
					</Feature>
					<Feature icon={<FileSearch />} title="Contextual version detection">
						Detects and infers versions and semantics from a language's
						ecosystem for maximum compatibility and interoperability.
					</Feature>
					<Feature icon={<Zap />} title="Lightspeed interface">
						Download, install, and run tools with lightspeed, thanks to our Rust
						based foundation.
					</Feature>
				</div>
			</section>
		</>
	);
}

function Planet() {
	return (
		<svg
			aria-hidden="true"
			className="h-auto w-full max-w-[420px]"
			fill="none"
			viewBox="0 0 420 360"
		>
			<circle
				className="fill-paper-100 dark:fill-graphite-900"
				cx="210"
				cy="180"
				r="167"
				stroke="var(--color-olive)"
				strokeWidth="2"
			/>
			<ellipse
				cx="210"
				cy="180"
				rx="205"
				ry="34"
				stroke="var(--color-olive)"
				strokeDasharray="8 6"
				strokeWidth="2"
				transform="rotate(40 210 180)"
			/>
			<path
				d="M388 30l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z M18 300l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z"
				stroke="var(--color-olive)"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

function SimpleVersion() {
	const tile =
		'flex size-9 items-center justify-center rounded-[4px] border border-taupe border-b-[3px] bg-sand';

	return (
		<section className="grid items-center gap-12 bg-paper-200 px-6 py-24 md:grid-cols-2 md:px-12 dark:bg-graphite-900">
			<div>
				<h2 className={cn('text-[44px] leading-tight', heading)}>
					The simple version
				</h2>
				<ul className="mt-10 divide-y divide-olive overflow-hidden rounded-[14px] border border-olive bg-paper-300 dark:bg-graphite-800">
					<li className="flex min-h-[72px] items-center gap-3 px-6 py-3 text-graphite-700 text-lg dark:text-paper-50">
						<span className={tile}>
							<span className="size-4 rounded-full bg-moon" />
						</span>
						moon keeps your builds fast
					</li>
					<li className="flex min-h-[72px] items-center gap-3 px-6 py-3 text-graphite-700 text-lg dark:text-paper-50">
						<span className={tile}>
							<span className="size-0 border-x-8 border-x-transparent border-b-[14px] border-b-proto" />
						</span>
						proto keeps your tools organized
					</li>
				</ul>
				<p className="mt-10 max-w-[580px] text-base text-graphite-700 leading-6 dark:text-sand">
					Together, they eliminate a lot of the tedious setup work so you can
					focus on actually writing code. They're especially helpful once you
					move beyond single-file scripts to working on real applications with
					teammates.
				</p>
			</div>
			<div className="flex justify-center">
				<Planet />
			</div>
		</section>
	);
}

function Languages() {
	const langs = [
		'Bun',
		'Deno',
		'Node.js',
		'Python',
		'PHP',
		'Ruby',
		'Rust',
		'Go',
	];

	return (
		<section className="px-6 pt-24 pb-32 text-center md:px-12">
			<h2
				className={cn(
					'mx-auto max-w-[640px] text-[44px] leading-tight',
					heading,
				)}
			>
				Supporting your favorite languages and frameworks
			</h2>
			<p className={cn('mt-6 text-lg', muted)}>
				moonrepo is designed to work with your existing tools:
			</p>

			<div className="mt-16 grid grid-cols-2 overflow-hidden rounded-xl border border-dashed border-olive bg-paper-200 md:grid-cols-4 dark:bg-graphite-surface">
				{langs.map((lang, i) => (
					<div
						className={cn(
							'flex h-[180px] items-center justify-center border-dashed border-olive font-bold text-3xl text-graphite-800 dark:text-paper-50',
							i % 2 === 1 && 'border-l',
							i % 4 !== 0 && 'md:border-l',
							i % 4 === 0 && 'md:border-l-0',
							i >= 2 && 'border-t',
							i < 4 && 'md:border-t-0',
							i >= 4 && 'md:border-t',
						)}
						key={lang}
					>
						{lang}
					</div>
				))}
			</div>

			<p className={cn('mt-10 text-lg', muted)}>...and 800+ more.</p>

			<div className="mt-16 flex justify-center gap-6">
				<Button variant="secondary">moon support</Button>
				<Button variant="secondary">proto support</Button>
			</div>
		</section>
	);
}

function UiPage() {
	return (
		<PageFrame>
			<Header />
			<main>
				<Divider />
				<Hero />
				<Divider />
				<ProblemSolution />
				<Hatch />
				<WhatsIn />
				<Divider />
				<Tools />
				<Divider />
				<SimpleVersion />
				<Hatch />
				<Languages />
				<Hatch />
			</main>
			<Footer />
		</PageFrame>
	);
}
