import { ButtonLink } from '@moonrepo/ui/components/Button';
import { Divider, Hatch } from '@moonrepo/ui/layout/Frame';
import { codeBox, dashed, heading, muted } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import {
	ArrowRight,
	BrainCircuit,
	Check,
	CircleDot,
	Croissant,
	Sparkle,
	SquareDot,
	Target,
	WandSparkles,
	Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';

const code = 'font-mono text-olive dark:text-sand';
const comment = 'text-taupe';
const pill =
	'flex min-h-[46px] items-center rounded-md border border-taupe/50 bg-paper-200 px-4 py-2 text-graphite-700 text-lg dark:border-white/5 dark:bg-graphite-surface dark:text-sand';
const link = 'underline underline-offset-2';

function ProtoLogo() {
	return (
		<div className="flex items-center gap-7">
			<span className="relative size-[72px]">
				<span className="absolute bottom-0 left-0 size-[66px] rounded-full bg-proto" />
				<span className="absolute top-[22px] left-[24px] h-8 w-3 rotate-[30deg] rounded-full bg-proto-800/70" />
				<Sparkle className="absolute -top-1 -right-1 size-8 fill-proto-300 text-proto-300 dark:fill-paper-100 dark:text-paper-100" />
			</span>
			<span
				className={cn(
					heading,
					'font-semibold font-stretch-125% text-[44px] tracking-[0.04em]',
				)}
			>
				PROTO
			</span>
		</div>
	);
}

function CodeLines({
	className,
	lines,
}: {
	className?: string;
	lines: (string | { comment: string } | null)[];
}) {
	return (
		<div className={cn(codeBox, 'overflow-x-auto px-6 text-sm', className)}>
			{lines.map((line, i) =>
				line === null ? (
					// biome-ignore lint/suspicious/noArrayIndexKey: static spacer rows
					<div className="h-3" key={i} />
				) : (
					<div
						className={cn(
							'whitespace-nowrap',
							typeof line === 'string'
								? 'text-graphite-700 dark:text-sand'
								: comment,
						)}
						// biome-ignore lint/suspicious/noArrayIndexKey: static code lines
						key={i}
					>
						{typeof line === 'string' ? line : `# ${line.comment}`}
					</div>
				),
			)}
		</div>
	);
}

function Hero() {
	return (
		<section className="grid gap-12 px-6 pt-16 pb-16 md:h-[546px] md:grid-cols-2 md:px-12 md:pt-[96px]">
			<div className="min-w-0">
				<ProtoLogo />
				<h1
					className={cn(
						'mt-6 text-4xl leading-[1.2] md:text-[40px] xl:text-[44px]',
						heading,
					)}
				>
					Stop juggling <span className={code}>nvm</span>,{' '}
					<span className={code}>pyenv</span>,{' '}
					<span className={code}>rbenv</span>, and{' '}
					<span className={code}>gvm</span>.
				</h1>
				<p className="mt-6 text-graphite-800 text-xl dark:text-paper-50">
					Proto handles every language version from a single command.
				</p>
				<p className={cn('mt-2 text-[15px]', muted, 'dark:text-taupe')}>
					Supports Bun, Deno, Node, Python, Rust, Go, and 800+ more.
				</p>
				<div className="mt-6 flex gap-6">
					<ButtonLink href="/proto/docs">
						Get started
						<WandSparkles className="ml-3 size-5" />
					</ButtonLink>
					<ButtonLink
						href="https://github.com/moonrepo/proto/releases"
						variant="secondary"
					>
						v0.51.6
					</ButtonLink>
				</div>
			</div>

			<div className="min-w-0 md:pt-12">
				<CodeLines
					className="py-4 text-[15px] leading-[25px] md:h-[260px]"
					lines={[
						{ comment: 'Install proto' },
						'bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)',
						null,
						{ comment: 'Install Rust (requires rustup)' },
						'proto install rust 1.68',
						null,
						{ comment: 'Use immediately' },
						'cargo build',
					]}
				/>
			</div>
		</section>
	);
}

function SectionTitle({ children }: { children: ReactNode }) {
	return (
		<>
			<h2
				className={cn('py-[52px] text-center text-4xl md:text-[44px]', heading)}
			>
				{children}
			</h2>
			<Divider />
		</>
	);
}

function Columns({ children }: { children: ReactNode }) {
	return (
		<section className="relative grid md:grid-cols-2">
			<div
				className={cn(
					'hidden md:absolute md:inset-y-0 md:left-1/2 md:block md:border-l',
					dashed,
				)}
			/>
			{children}
		</section>
	);
}

function Simplify() {
	return (
		<Columns>
			<div className="px-6 pt-12 pb-16 md:px-12">
				<h3 className={cn('text-[32px] leading-[1.35]', heading)}>
					Every language has its own version manager:
				</h3>
				<div className="mt-8 grid grid-cols-2 gap-6">
					<div className={cn(pill, 'col-span-2')}>nvm for Node.js</div>
					<div className={pill}>rbenv for Ruby</div>
					<div className={pill}>gvm for Go</div>
					<div className={pill}>rustup for Rust</div>
					<div className={pill}>...etc.</div>
				</div>
				<p className="mt-14 text-graphite-800 text-lg dark:text-paper-50">
					...each with different commands, config files, and quirks.
				</p>
			</div>

			<div className="min-w-0 border-dashed border-olive border-t px-6 pt-12 pb-16 md:border-t-0 md:px-12">
				<h3 className={cn('text-[32px]', heading)}>Instead of remembering:</h3>
				<CodeLines
					className="mt-8 py-[7px] leading-[37px]"
					lines={['nvm use 18.16.0', 'pyenv local 3.11.2', 'rbenv local 3.2.0']}
				/>
				<h3 className={cn('mt-14 text-[32px]', heading)}>Just use:</h3>
				<CodeLines
					className="mt-8 flex h-[52px] flex-col justify-center"
					lines={['proto use']}
				/>
			</div>
		</Columns>
	);
}

function CheckBadge() {
	return (
		<span className="flex size-[18px] shrink-0 items-center justify-center rounded-[3px] bg-proto text-paper-50">
			<Check className="size-3.5 stroke-3" />
		</span>
	);
}

function ManageThemAll() {
	const audiences = [
		'Full-stack developers juggling Node + Python + Go',
		'Teams wanting consistent environments',
		'CI/CD pipelines needing reliable tool versions',
		'Anyone tired of version manager hell',
	];

	return (
		<Columns>
			<div>
				<div className="px-6 pt-[60px] pb-16 md:px-12">
					<h3 className={cn('text-[28px] leading-[1.35]', heading)}>
						How many version managers are installed on your machine?
					</h3>
					<p className={cn('mt-6 text-lg', muted)}>
						If the answer is more than one, proto can help.
					</p>
				</div>
				<Divider />
				<div className="px-6 pt-12 pb-16 md:px-12">
					<h3 className={cn('text-[28px]', heading)}>proto is perfect for:</h3>
					<ul className="mt-12 space-y-[30px]">
						{audiences.map((item) => (
							<li
								className="flex items-center gap-3 text-graphite-800 text-lg dark:text-paper-50"
								key={item}
							>
								<CheckBadge />
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-dashed border-olive border-t px-6 pt-[68px] pb-16 md:border-t-0 md:px-12">
				<h3 className={cn('text-[28px]', heading)}>Built for the real world</h3>
				<div className="mt-10 space-y-6">
					<div className={pill}>
						<span>
							Powers{' '}
							<a className={link} href="/moon">
								moon's
							</a>{' '}
							integrated toolchain
						</span>
					</div>
					<div className={pill}>Battle-tested in complex monorepos</div>
					<div className={pill}>Designed for team consistency</div>
				</div>

				<h3 className={cn('mt-[72px] text-[28px]', heading)}>
					Switching is painless
				</h3>
				<div className="mt-8 space-y-6">
					<div className={pill}>
						<span>
							Reads your existing <code className="font-mono">.nvmrc</code>{' '}
							files
						</span>
					</div>
					<div className={pill}>
						Works alongside current tools during transition
					</div>
					<div className={pill}>5-minute migration guide for each tool</div>
				</div>
			</div>
		</Columns>
	);
}

function Benefits() {
	const benefits = [
		{
			icon: <Zap className="fill-current" />,
			title: 'Actually fast',
			items: [
				'Built in Rust (vs slow shell scripts)',
				'Parallel downloads and installs',
				'No startup overhead',
			],
		},
		{
			icon: <Target />,
			title: 'Everything in one',
			items: [
				'800+ tools supported',
				'Same commands regardless of language',
				'Single config file format',
			],
		},
		{
			icon: <BrainCircuit />,
			title: 'Smart detection',
			items: [
				<>
					Reads <code className="font-mono">.nvmrc</code>,{' '}
					<code className="font-mono">.python-version</code>,{' '}
					<code className="font-mono">package.json</code>, etc.
				</>,
				'Works with existing project configs',
				'No migration required',
			],
		},
	];

	return (
		<section className="grid gap-12 px-6 pt-[60px] pb-16 md:grid-cols-3 md:gap-8 md:px-12">
			{benefits.map((benefit) => (
				<div key={benefit.title}>
					<h3 className={cn('flex items-center gap-4 text-[32px]', heading)}>
						<span className="text-proto [&_svg]:size-6">{benefit.icon}</span>
						{benefit.title}
					</h3>
					<ul
						className={cn(
							'mt-5 ml-6 list-disc text-[15px] leading-6 marker:text-xs',
							muted,
						)}
					>
						{benefit.items.map((item, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static list
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
}

function Step({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="min-w-0">
			<h3 className={cn('text-[32px]', heading)}>{title}</h3>
			<div className="mt-6">{children}</div>
		</div>
	);
}

function GetStarted() {
	const single = 'flex h-[52px] flex-col justify-center';

	return (
		<section className="px-6 pt-[60px] pb-16 md:px-12">
			<h2 className={cn('text-4xl md:text-[44px]', heading)}>Get started</h2>
			<p className={cn('mt-3 text-lg', muted)}>
				proto works on your existing projects immediately, no configuration
				required.
			</p>

			<div className="mt-12 grid gap-12 lg:max-w-[1216px] lg:grid-cols-2 lg:gap-x-16">
				<div className="min-w-0 space-y-12">
					<Step title="Install proto for Linux, macOS, or WSL">
						<CodeLines
							className={single}
							lines={[
								'bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)',
							]}
						/>
					</Step>
					<Step title="Install for Windows">
						<CodeLines
							className={single}
							lines={['irm https://moonrepo.dev/install/proto.ps1 | iex']}
						/>
						<a
							className={cn(
								link,
								'mt-3 inline-block text-[15px] text-olive dark:text-proto',
							)}
							href="/proto/docs"
						>
							Full instructions
						</a>
					</Step>
				</div>
				<div className="min-w-0 space-y-12">
					<Step title="Install a tool">
						<CodeLines className={single} lines={['proto install node 18']} />
					</Step>
					<Step title="Run the tool">
						<CodeLines
							className="py-4 leading-[25px]"
							lines={[
								'node ./main.mjs',
								null,
								{ comment: 'Or with proto' },
								'proto run node -- ./main.mjs',
							]}
						/>
					</Step>
				</div>
			</div>

			<ButtonLink className="mt-12" href="/proto/docs">
				Full installation guide
				<ArrowRight className="ml-3 size-5" />
			</ButtonLink>
		</section>
	);
}

function LanguageSupport() {
	const mark = 'text-graphite-800 dark:text-paper-100';
	const logos = [
		{
			label: 'Deno',
			node: <SquareDot className={cn('size-[88px]', mark)} strokeWidth={1.5} />,
		},
		{
			label: 'Bun',
			node: <Croissant className={cn('size-[88px]', mark)} strokeWidth={1.5} />,
		},
		{
			label: 'Node.js',
			node: <CircleDot className={cn('size-[88px]', mark)} strokeWidth={1.5} />,
		},
		{
			label: 'Python',
			node: (
				<span className={cn('font-black font-display text-[40px]', mark)}>
					PY
				</span>
			),
		},
		{
			label: 'Go',
			node: (
				<span
					className={cn('font-black font-display text-[40px] italic', mark)}
				>
					GO
				</span>
			),
		},
	];

	return (
		<section className="flex flex-col gap-12 px-6 py-16 md:px-12 lg:h-[309px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
			<div>
				<h2 className={cn('text-4xl leading-[1.2] md:text-[44px]', heading)}>
					Language support
				</h2>
				<p className={cn('mt-3 text-lg', muted)}>
					Plus 800+ more via{' '}
					<a className={cn(link, 'dark:text-proto')} href="/proto/docs">
						plugins
					</a>
				</p>
				<ButtonLink className="mt-8" href="/proto/docs" variant="secondary">
					See all supported languages
				</ButtonLink>
			</div>

			<div className="grid grid-cols-5 overflow-hidden rounded-[10px] border border-taupe border-dashed lg:w-[752px]">
				{logos.map((logo, i) => (
					<div
						aria-label={logo.label}
						className={cn(
							'flex h-[140px] items-center justify-center border-taupe border-dashed',
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

/** The proto product landing page sections, without the site header and footer. */
export function ProtoHome() {
	return (
		<>
			<Hero />
			<Hatch />
			<SectionTitle>Simplify language tooling</SectionTitle>
			<Simplify />
			<Hatch />
			<SectionTitle>One tool to manage them all</SectionTitle>
			<ManageThemAll />
			<Divider />
			<SectionTitle>Core benefits</SectionTitle>
			<Benefits />
			<Hatch />
			<GetStarted />
			<Divider />
			<LanguageSupport />
		</>
	);
}
