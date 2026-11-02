import { ButtonLink } from '@moonrepo/ui/components/Button';
import { Heading } from '@moonrepo/ui/components/Heading';
import { Text } from '@moonrepo/ui/components/Text';
import {
	BlueprintGrid,
	Divider,
	Figure,
	Hatch,
} from '@moonrepo/ui/layout/Frame';
import {
	codeBox,
	dashed,
	heading,
	muted,
	wordmark,
} from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import {
	ArrowRight,
	Check,
	Cog,
	Cpu,
	Gem,
	GitBranch,
	GitCommitHorizontal,
	Grip,
	Hash,
	Puzzle,
	Rocket,
	ScanSearch,
	Sprout,
	SquareTerminal,
	Target,
	UserRoundCog,
	Webhook,
	X,
	Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';

const icon = 'text-moon dark:text-moon-400';

function MoonLogo() {
	return (
		<div className="flex items-center gap-7">
			<span className="relative size-[72px]">
				<span className="absolute bottom-0 left-0 size-16 rounded-full bg-moon" />
				<span className="absolute top-[14px] left-[30px] size-6 rounded-full bg-moon-800/60" />
				<span className="absolute top-0 right-0 size-7 rounded-full bg-[#c7b3f7] dark:bg-paper-100" />
			</span>
			<span className={cn(heading, wordmark, 'text-display-1')}>MOON</span>
		</div>
	);
}

function Terminal() {
	const tasks = [
		{ id: 1, name: 'data-layer:build', time: '821ms' },
		{ id: 2, name: 'server:build', time: '1.588s' },
		{ id: 3, name: 'client:build' },
		{ id: 4, name: 'client:build', time: '1.471s' },
		{ id: 5, name: 'web:build' },
		{ id: 6, name: 'mobile:build' },
		{ id: 7, name: 'mobile:build', time: '1.313s' },
		{ id: 8, name: 'web:build', time: '1.811s' },
	];
	const ran = ['bg-moon', 'bg-moon/85', 'bg-moon/70', 'bg-moon/55'];
	const cached = [
		'bg-graphite-800 dark:bg-graphite-500',
		'bg-graphite-500 dark:bg-graphite-500/80',
		'bg-taupe dark:bg-graphite-500/70',
		'bg-taupe/70 dark:bg-graphite-500/60',
	];

	return (
		<div className={cn(codeBox, 'px-6 py-2 text-code')}>
			{tasks.map((task) => (
				<div className="flex items-center gap-2.5" key={task.id}>
					<span className="flex gap-[3px]">
						{(task.time ? ran : cached).map((color) => (
							<span className={cn('size-[5px]', color)} key={color} />
						))}
					</span>
					<span className="text-graphite-700 dark:text-paper-50">
						{task.name}
					</span>
					{task.time && (
						<span className="text-taupe dark:text-graphite-500">
							({task.time})
						</span>
					)}
				</div>
			))}
			<div className="mt-[14px] font-bold text-graphite-700 dark:text-paper-50">
				Tasks: <span className="font-normal text-moon">9 completed</span>
			</div>
			<div className="pl-2 font-bold text-graphite-700 dark:text-paper-50">
				Time: <span className="font-normal">6.9s</span>
			</div>
		</div>
	);
}

function Hero() {
	return (
		<section className="relative grid gap-12 px-6 pt-16 pb-16 md:px-12 md:pt-[96px] lg:min-h-[504px] lg:grid-cols-2">
			<BlueprintGrid />
			<div className="relative">
				<MoonLogo />
				<Heading className="mt-6" level={1}>
					The build system that makes large codebases fast again
				</Heading>
				<Text className="mt-4" tone="muted" variant="small">
					Supports JavaScript, TypeScript, Rust, Go, Ruby,{' '}
					<a
						className="underline underline-offset-2"
						href="/moon/docs/toolchain"
					>
						and more
					</a>
					.
				</Text>
				<div className="mt-8 flex gap-6">
					<ButtonLink href="/moon/docs">
						Get started
						<Rocket className="ml-3 size-5" />
					</ButtonLink>
					<ButtonLink
						href="https://github.com/moonrepo/moon/releases"
						variant="secondary"
					>
						v1.39.4
					</ButtonLink>
				</div>
			</div>

			<div className="relative lg:pt-[10px]">
				<Figure caption="moon run :build">
					<Terminal />
				</Figure>
				<Text
					className="mt-4 flex items-center gap-2"
					tone="muted"
					variant="small"
				>
					Backed by
					<span className="flex items-center gap-1.5 font-medium text-yc">
						<span className="flex size-[22px] items-center justify-center bg-yc text-sm text-white">
							Y
						</span>
						Combinator
					</span>
				</Text>
			</div>
		</section>
	);
}

function NumberBadge({ children }: { children: ReactNode }) {
	return (
		<span className="flex size-[18px] shrink-0 items-center justify-center rounded-[2px] bg-moon font-bold font-display text-[11px] text-paper-50 dark:bg-moon-400 dark:text-graphite-800">
			{children}
		</span>
	);
}

function PainAndSolution() {
	const pains = [
		'20+ minute CI builds that test unchanged code',
		'Inconsistent environments breaking builds randomly',
		'Complex task orchestration across multiple projects',
		'Team productivity killed by slow feedback loops',
	];
	const solutions = [
		{
			icon: <Zap className="fill-current" />,
			title: 'Lightning fast builds',
			items: [
				'Smart hashing and incremental builds',
				'Remote caching across team/CI',
				'"Only build what changed"',
			],
		},
		{
			icon: <Target />,
			title: 'Zero configuration',
			items: [
				'Integrated toolchain management',
				'Automatic dependency detection',
				'Works with existing projects',
			],
		},
		{
			icon: <Sprout />,
			title: 'Scales with your team',
			items: [
				'Multi-platform support (Linux, macOS, Windows)',
				'Project graph visualization',
				'Built-in flakiness detection',
			],
		},
	];

	return (
		<section className="relative grid md:grid-cols-2">
			<div
				className={cn(
					'hidden md:absolute md:inset-y-0 md:left-1/2 md:block md:border-l',
					dashed,
				)}
			/>

			<div>
				<div className="px-6 pt-12 pb-12 md:px-12">
					<Heading level={2}>
						Working with monorepos shouldn't be painful
					</Heading>
				</div>
				<Divider />
				<div className="px-6 pt-12 pb-16 md:px-12">
					<Heading level={3}>Common pain points:</Heading>
					<ol className="mt-10 space-y-[22px]">
						{pains.map((pain, i) => (
							<li
								className="flex items-center gap-4 text-graphite-800 text-body dark:text-paper-50"
								key={pain}
							>
								<NumberBadge>{i + 1}</NumberBadge>
								{pain}
							</li>
						))}
					</ol>
				</div>
			</div>

			<div className="border-dashed border-olive border-t px-6 pt-12 pb-12 md:border-t-0 md:px-12">
				<Heading level={2} size="subtitle">
					Use moon instead
				</Heading>
				<div className="mt-8 space-y-6">
					{solutions.map((solution) => (
						<div key={solution.title}>
							<Heading
								className="flex items-center gap-3"
								level={3}
								size="card"
							>
								<span className={cn('[&_svg]:size-5', icon)}>
									{solution.icon}
								</span>
								{solution.title}
							</Heading>
							<ul
								className={cn(
									'mt-3 ml-6 list-disc text-body-sm marker:text-xs',
									muted,
								)}
							>
								{solution.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function Comparison() {
	const columns = [
		{
			command: 'npm run test',
			glyph: <X />,
			stats: '15 files changed, 3m 45s',
			title: 'Without moon',
		},
		{
			command: 'moon run test',
			glyph: <Check />,
			stats: '2 files changed, 12s',
			title: 'With moon',
		},
	];

	return (
		<section className="relative grid bg-paper-200 md:grid-cols-2 dark:bg-graphite-surface">
			<div
				className={cn(
					'hidden md:absolute md:inset-y-0 md:left-1/2 md:block md:border-l',
					dashed,
				)}
			/>
			{columns.map((col) => (
				<div className="min-w-0 px-6 py-12 md:px-12" key={col.title}>
					<Heading className="flex items-center gap-5" level={3}>
						<span className="flex size-[26px] items-center justify-center rounded-[3px] bg-moon text-paper-50 dark:bg-moon-400 dark:text-graphite-800 [&_svg]:size-4 [&_svg]:stroke-3">
							{col.glyph}
						</span>
						{col.title}
					</Heading>
					<div
						className={cn(
							codeBox,
							'mt-8 flex min-h-[50px] items-center gap-3 px-4 py-2',
						)}
					>
						<Hash className="size-5 shrink-0 text-graphite-500" />
						<span className="whitespace-nowrap text-graphite-800 dark:text-paper-50">
							{col.command}
						</span>
						<span className="truncate text-taupe dark:text-graphite-500">
							({col.stats})
						</span>
					</div>
				</div>
			))}
		</section>
	);
}

function Stack() {
	const logoTile =
		'flex items-center justify-center bg-graphite-800 font-black font-display text-[40px] text-paper-50 leading-none dark:bg-paper-100 dark:text-graphite-800';
	const logos = [
		{
			label: 'JavaScript',
			node: (
				<span
					className={cn(logoTile, 'size-[86px] items-end justify-end p-1.5')}
				>
					JS
				</span>
			),
		},
		{
			label: 'TypeScript',
			node: (
				<span
					className={cn(
						logoTile,
						'size-[86px] items-end justify-end rounded-md p-1.5',
					)}
				>
					TS
				</span>
			),
		},
		{
			label: 'Ruby',
			node: (
				<Gem
					className="size-[80px] text-graphite-700 dark:text-paper-100"
					strokeWidth={1.25}
				/>
			),
		},
		{
			label: 'Rust',
			node: (
				<Cog
					className="size-[88px] text-graphite-800 dark:text-paper-100"
					strokeWidth={2.25}
				/>
			),
		},
		{
			label: 'Go',
			node: (
				<span className="font-black font-display text-[40px] text-graphite-800 italic dark:text-paper-100">
					GO
				</span>
			),
		},
	];

	return (
		<section className="flex flex-col gap-12 px-6 py-16 md:px-12 lg:h-[362px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
			<div>
				<Heading className="max-w-[400px]" level={2}>
					Works with your existing stack
				</Heading>
				<Text className="mt-3" tone="muted">
					No migration required
				</Text>
				<ButtonLink
					className="mt-10"
					href="/moon/docs/toolchain"
					variant="secondary"
				>
					See all supported languages
				</ButtonLink>
			</div>

			<div className="grid grid-cols-5 overflow-hidden rounded-[10px] border border-taupe border-dashed bg-paper-200 lg:w-[752px] dark:border-graphite-500 dark:bg-graphite-surface">
				{logos.map((logo, i) => (
					<div
						aria-label={logo.label}
						className={cn(
							'flex h-[136px] items-center justify-center border-taupe border-dashed dark:border-graphite-500',
							i > 0 && 'border-l',
						)}
						key={logo.label}
						role="img"
					>
						<span className="flex origin-center scale-50 sm:scale-75 lg:scale-100">
							{logo.node}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}

function AdvancedFeatures() {
	const features = [
		{
			icon: <UserRoundCog className="fill-current" />,
			title: 'Code ownership',
			body: 'Define who owns what parts of your codebase and automatically generate CODEOWNERS files. Perfect for large teams needing clear accountability across different services.',
		},
		{
			icon: <Grip />,
			title: 'Flakiness detection',
			body: 'Automatically detect and retry flaky tests to reduce false build failures. Configure smart retry logic that maintains reliability without masking real issues.',
		},
		{
			icon: <Webhook />,
			title: 'Webhook events',
			body: 'Stream real-time build events to monitoring tools or analytics platforms. Get deep visibility into your development workflow and build performance.',
		},
		{
			icon: <GitBranch />,
			title: 'Advanced Git support',
			body: 'Works seamlessly with submodules, subtrees, worktrees, and bare repositories. Moon adjusts its caching and dependency detection for complex Git setups.',
		},
		{
			icon: <GitCommitHorizontal />,
			title: 'Hook management',
			body: 'Enforce team standards with centralized Git hook management. Define pre-commit checks and push requirements that apply consistently across all contributors.',
		},
		{
			icon: <Cpu />,
			title: 'Build profiles',
			body: 'Generate CPU and memory profiles analyzable in Chrome DevTools. Debug slow builds and identify performance bottlenecks in your build process.',
		},
		{
			icon: <ScanSearch />,
			title: 'Process inspection',
			body: 'Get detailed insights when builds fail. Inspect processes, examine environment variables, and debug task execution to reduce troubleshooting.',
		},
		{
			icon: <SquareTerminal />,
			title: 'Terminal notifications',
			body: 'Get alerted when long-running builds complete so you can context-switch efficiently without constantly checking build status.',
		},
		{
			icon: <Puzzle className="fill-current" />,
			title: 'Editor extensions',
			body: 'Integrate moon directly into VS Code and other editors. View project graphs and trigger builds without leaving your development environment.',
		},
	];

	return (
		<section>
			<Heading className="py-[52px] text-center" level={2}>
				Advanced features
			</Heading>
			<Divider />
			<div className="grid bg-paper-200/40 md:grid-cols-2 lg:grid-cols-3 dark:bg-graphite-surface/80">
				{features.map((feature, i) => (
					<div
						className={cn(
							'border-dashed border-olive px-6 pt-12 pb-12 md:px-12',
							i > 0 && 'border-t',
							'md:border-t-0',
							i % 2 === 1 && 'md:border-l',
							i >= 2 && 'md:border-t',
							'lg:border-l-0 lg:border-t-0',
							i % 3 !== 0 && 'lg:border-l',
							i >= 3 && 'lg:border-t',
						)}
						key={feature.title}
					>
						<Heading className="flex items-center gap-4" level={3}>
							<span className={cn('[&_svg]:size-6', icon)}>{feature.icon}</span>
							{feature.title}
						</Heading>
						<Text className="mt-5" tone="muted" variant="small">
							{feature.body}
						</Text>
					</div>
				))}
			</div>
		</section>
	);
}

function QuickStart() {
	const commands = [
		'curl -fsSL https://moonrepo.dev/install.sh | bash',
		'moon init',
		'moon run build',
	];

	return (
		<section className="flex flex-col items-center px-6 pt-[60px] pb-[52px] text-center md:px-12">
			<Heading level={2}>Quick start</Heading>
			<Heading className="mt-10" level={3}>
				Get running in 3 commands:
			</Heading>
			<div
				className={cn(
					codeBox,
					'mt-8 w-full max-w-[576px] overflow-x-auto px-6 py-[7px] text-left leading-[37px]',
				)}
			>
				{commands.map((command) => (
					<div
						className="whitespace-nowrap text-graphite-700 dark:text-paper-50"
						key={command}
					>
						{command}
					</div>
				))}
			</div>
			<ButtonLink className="mt-8" href="/moon/docs">
				Full installation guide
				<ArrowRight className="ml-3 size-5" />
			</ButtonLink>
		</section>
	);
}

/** The moon product landing page sections, without the site header and footer. */
export function MoonHome() {
	return (
		<>
			<Hero />
			<Hatch />
			<PainAndSolution />
			<Divider />
			<Comparison />
			<Hatch />
			<Stack />
			<Hatch />
			<AdvancedFeatures />
			<Hatch />
			<QuickStart />
		</>
	);
}
