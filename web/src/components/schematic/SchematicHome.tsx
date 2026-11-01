import { ButtonLink } from '@moonrepo/ui/components/Button';
import { Divider, Hatch } from '@moonrepo/ui/layout/Frame';
import { accent, dashed, heading, muted } from '@moonrepo/ui/layout/styles';
import { cn } from '@moonrepo/ui/utils/cn';
import {
	ArrowRight,
	Braces,
	Check,
	FileCode,
	Layers,
	ShieldCheck,
	Sparkle,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const code = 'font-mono text-olive dark:text-tangerine';
const pill =
	'flex min-h-[46px] items-center rounded-md border border-taupe/50 bg-paper-200 px-4 py-2 text-graphite-700 text-lg dark:border-white/5 dark:bg-graphite-surface dark:text-sand';
const link = 'underline underline-offset-2';

function SchematicLogo() {
	return (
		<div className="flex items-center gap-5 md:gap-7">
			<span className="relative size-[72px] shrink-0">
				<span className="absolute bottom-0 left-0 flex size-[66px] items-center justify-center rounded-full bg-olive dark:bg-tangerine">
					<Braces className="size-8 text-paper-50 dark:text-graphite-800" />
				</span>
				<Sparkle className="absolute -top-1 -right-1 size-8 fill-tangerine text-tangerine dark:fill-paper-100 dark:text-paper-100" />
			</span>
			<span
				className={cn(
					heading,
					'font-semibold font-stretch-125% text-[30px] tracking-[0.04em] md:text-[44px]',
				)}
			>
				SCHEMATIC
			</span>
		</div>
	);
}

function Hero() {
	return (
		<section className="grid gap-12 px-6 pt-16 pb-16 md:grid-cols-2 md:px-12 md:pt-[96px] lg:min-h-[546px]">
			<div className="min-w-0">
				<SchematicLogo />
				<h1
					className={cn(
						'mt-6 text-4xl leading-[1.2] md:text-[40px] xl:text-[44px]',
						heading,
					)}
				>
					Layered configuration and schemas for{' '}
					<span className={code}>Rust</span>.
				</h1>
				<p className="mt-6 text-graphite-800 text-xl dark:text-paper-50">
					Load, merge, and validate config from files, URLs, and environment
					variables, then generate types from the same structs.
				</p>
				<p className={cn('mt-2 text-[15px]', muted, 'dark:text-taupe')}>
					Powered by serde. Supports JSON, Pkl, RON, TOML, and YAML.
				</p>
				<div className="mt-6 flex flex-wrap gap-6">
					<ButtonLink href="/schematic/docs">
						Get started
						<ArrowRight className="ml-3 size-5" />
					</ButtonLink>
					<ButtonLink
						href="https://crates.io/crates/schematic"
						variant="secondary"
					>
						crates.io
					</ButtonLink>
				</div>
			</div>

			<div className="min-w-0 md:pt-12">
				<CodeBlock
					code={`#[derive(Config)]
struct AppConfig {
    #[setting(default = 3000, env = "PORT")]
    pub port: usize,

    #[setting(default = true)]
    pub secure: bool,
}

let result = ConfigLoader::<AppConfig>::new()
    .file("config.yml")?
    .load()?;`}
					lang="rust"
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

function CheckBadge() {
	return (
		<span className="flex size-[18px] shrink-0 items-center justify-center rounded-[3px] bg-olive text-paper-50 dark:bg-tangerine dark:text-graphite-800">
			<Check className="size-3.5 stroke-3" />
		</span>
	);
}

function Feature({
	children,
	description,
	href,
	items,
	title,
}: {
	children: ReactNode;
	description: ReactNode;
	href: string;
	items: string[];
	title: string;
}) {
	return (
		<div className="min-w-0 px-6 pt-12 pb-16 md:px-12">
			<h3 className={cn('text-[32px] leading-[1.35]', heading)}>{title}</h3>
			<p className={cn('mt-4 text-lg', muted)}>{description}</p>
			<ul className="mt-8 space-y-5">
				{items.map((item) => (
					<li
						className="flex items-center gap-3 text-graphite-800 text-lg dark:text-paper-50"
						key={item}
					>
						<CheckBadge />
						{item}
					</li>
				))}
			</ul>
			<div className="mt-10">{children}</div>
			<a
				className={cn(link, 'mt-6 inline-block text-[15px]', accent)}
				href={href}
			>
				Read the {title.toLowerCase()} docs
			</a>
		</div>
	);
}

function TwoFeatures() {
	return (
		<Columns>
			<Feature
				description="Derive Config on a struct and let Schematic handle the layering."
				href="/schematic/docs/config"
				items={[
					'Partial layers merged in order',
					'Defaults and environment variables',
					'Merge strategies and validation rules',
					'Extend configs from files or URLs',
				]}
				title="Configuration"
			>
				<CodeBlock
					code={`#[setting(merge = schematic::merge::append_vec)]
pub allowed_hosts: Vec<String>,`}
					lang="rust"
				/>
			</Feature>

			<div className="border-dashed border-olive border-t md:border-t-0">
				<Feature
					description="Model any Rust type as a schema, and render it to other formats."
					href="/schematic/docs/schema"
					items={[
						'TypeScript types',
						'JSON schemas',
						'Markdown API documentation',
						'Config file templates',
					]}
					title="Schemas"
				>
					<CodeBlock
						code={`#[derive(Schematic)]
struct User {
    pub name: String,
    pub age: usize,
}`}
						lang="rust"
					/>
				</Feature>
			</div>
		</Columns>
	);
}

function Benefits() {
	const benefits = [
		{
			icon: <Layers />,
			title: 'Layered sources',
			items: [
				'Files, secure URLs, and inline code',
				'Each layer is a typed partial',
				<>
					Final config has no <code className="font-mono">Option</code>{' '}
					unwrapping
				</>,
			],
		},
		{
			icon: <ShieldCheck />,
			title: 'Validated',
			items: [
				'Built-in and custom validation rules',
				'On by default via the validate feature',
				'Context available to validators',
			],
		},
		{
			icon: <FileCode />,
			title: 'One source of truth',
			items: [
				'Config structs double as schemas',
				'No extra derive macros per output',
				<>
					Custom renderers via <code className="font-mono">SchemaRenderer</code>
				</>,
			],
		},
	];

	return (
		<section className="grid gap-12 px-6 pt-[60px] pb-16 md:grid-cols-3 md:gap-8 md:px-12">
			{benefits.map((benefit) => (
				<div key={benefit.title}>
					<h3 className={cn('flex items-center gap-4 text-[32px]', heading)}>
						<span className={cn(accent, '[&_svg]:size-6')}>{benefit.icon}</span>
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
	return (
		<section className="px-6 pt-[60px] pb-16 md:px-12">
			<h2 className={cn('text-4xl md:text-[44px]', heading)}>Get started</h2>
			<p className={cn('mt-3 text-lg', muted)}>
				Configuration is enabled by default. Schemas require the{' '}
				<code className="font-mono">schema</code> Cargo feature.
			</p>

			<div className="mt-12 grid gap-12 lg:max-w-[1216px] lg:grid-cols-2 lg:gap-x-16">
				<div className="min-w-0 space-y-12">
					<Step title="Add the crate">
						<CodeBlock code="cargo add schematic" lang="shell" />
					</Step>
					<Step title="Load your config">
						<CodeBlock
							code={`let mut loader = ConfigLoader::<AppConfig>::new();
loader.file("path/to/config.yml")?;

let result = loader.load()?;
result.config; // AppConfig`}
							lang="rust"
						/>
					</Step>
				</div>
				<div className="min-w-0 space-y-12">
					<Step title="Generate types">
						<CodeBlock
							code={`let mut generator = SchemaGenerator::default();
generator.add::<AppConfig>();
generator.generate(
    PathBuf::from("types.ts"),
    TypeScriptRenderer::default(),
)?;`}
							lang="rust"
						/>
					</Step>
				</div>
			</div>

			<ButtonLink className="mt-12" href="/schematic/docs/config">
				Configuration guide
				<ArrowRight className="ml-3 size-5" />
			</ButtonLink>
		</section>
	);
}

function Formats() {
	const formats = ['JSON', 'PKL', 'RON', 'TOML', 'YAML'];

	return (
		<section className="flex flex-col gap-12 px-6 py-16 md:px-12 lg:h-[309px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
			<div>
				<h2 className={cn('text-4xl leading-[1.2] md:text-[44px]', heading)}>
					Format support
				</h2>
				<p className={cn('mt-3 text-lg', muted)}>
					Each format is an opt-in{' '}
					<a
						className={cn(link, 'dark:text-tangerine')}
						href="/schematic/docs/config#cargo-features"
					>
						Cargo feature
					</a>
				</p>
				<div className="mt-8 flex flex-wrap gap-4">
					<div className={pill}>
						<span>
							Powers{' '}
							<a className={link} href="/moon">
								moon
							</a>{' '}
							and{' '}
							<a className={link} href="/proto">
								proto
							</a>
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-5 overflow-hidden rounded-[10px] border border-taupe border-dashed lg:w-[752px]">
				{formats.map((format, i) => (
					<div
						className={cn(
							'flex h-[140px] items-center justify-center border-taupe border-dashed',
							i > 0 && 'border-l',
						)}
						key={format}
					>
						<span
							className={cn(
								'font-black font-display text-graphite-800 text-lg sm:text-2xl lg:text-[32px] dark:text-paper-100',
							)}
						>
							{format}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}

/** The schematic product landing page sections, without the site header and footer. */
export function SchematicHome() {
	return (
		<>
			<Hero />
			<Hatch />
			<SectionTitle>Two features, one crate</SectionTitle>
			<TwoFeatures />
			<Hatch />
			<SectionTitle>Core benefits</SectionTitle>
			<Benefits />
			<Hatch />
			<GetStarted />
			<Divider />
			<Formats />
		</>
	);
}
