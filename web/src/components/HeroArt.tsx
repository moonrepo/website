import { cn } from '@moonrepo/ui/utils/cn';
import { type ReactNode, useId } from 'react';

// Line art for the landing page heroes, drawn like a retro mission chart.
// Everything uses `currentColor`, so it follows the product theme.

const W = 1344;
const H = 600;

function random(seed: number) {
	let state = seed;

	return () => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function round(value: number) {
	return Math.round(value * 10) / 10;
}

function polar(cx: number, cy: number, r: number, angle: number) {
	return [round(cx + r * Math.cos(angle)), round(cy + r * Math.sin(angle))];
}

function HeroArt({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<svg
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute inset-x-0 top-0 h-[600px] w-full overflow-hidden text-olive opacity-30 lg:h-full lg:opacity-100 dark:text-tangerine',
				className,
			)}
			fill="none"
			preserveAspectRatio="xMaxYMin slice"
			stroke="currentColor"
			viewBox={`0 0 ${W} ${H}`}
		>
			{children}
		</svg>
	);
}

function Label({
	children,
	x,
	y,
	anchor,
}: {
	children: ReactNode;
	x: number;
	y: number;
	anchor?: 'start' | 'middle' | 'end';
}) {
	return (
		<text
			className="font-mono uppercase"
			fill="currentColor"
			fontSize={9}
			letterSpacing={1.8}
			stroke="none"
			textAnchor={anchor}
			x={x}
			y={y}
		>
			{children}
		</text>
	);
}

function Stars({
	count,
	seed,
	height = H,
}: {
	count: number;
	seed: number;
	height?: number;
}) {
	const next = random(seed);
	const stars = Array.from({ length: count }, () => ({
		r: next(),
		x: round(next() * W),
		y: round(next() * height),
	}));

	return (
		<g fill="currentColor" stroke="none">
			{stars.map((star) =>
				star.r > 0.93 ? (
					<path
						d={`M${star.x - 5} ${star.y}h10M${star.x} ${star.y - 5}v10`}
						fill="none"
						key={`${star.x}-${star.y}`}
						stroke="currentColor"
						strokeWidth={1}
					/>
				) : (
					<circle
						cx={star.x}
						cy={star.y}
						key={`${star.x}-${star.y}`}
						opacity={0.4 + star.r * 0.6}
						r={round(0.6 + star.r * 1.1)}
					/>
				),
			)}
		</g>
	);
}

/** A four-point star, like the proto logo's sparkle. */
function Sparkle({ x, y, size }: { x: number; y: number; size: number }) {
	const s = size;
	const k = size * 0.18;

	return (
		<path
			d={`M${x} ${y - s}Q${x + k} ${y - k} ${x + s} ${y}Q${x + k} ${y + k} ${x} ${y + s}Q${x - k} ${y + k} ${x - s} ${y}Q${x - k} ${y - k} ${x} ${y - s}Z`}
			fill="currentColor"
			stroke="none"
		/>
	);
}

function Hatch({ id, gap = 6 }: { id: string; gap?: number }) {
	return (
		<pattern
			height={gap}
			id={id}
			patternTransform="rotate(45)"
			patternUnits="userSpaceOnUse"
			width={gap}
		>
			<line
				stroke="currentColor"
				strokeWidth={1}
				x1={0}
				x2={0}
				y1={0}
				y2={gap}
			/>
		</pattern>
	);
}

// moon

export function MoonHeroArt({ className }: { className?: string }) {
	const id = useId();
	const moon = { cx: 1130, cy: 640, r: 260 };
	const earth = { cx: 560, cy: 52, r: 30 };
	const craters = [
		[960, 470, 30],
		[1060, 420, 16],
		[1180, 455, 40],
		[1290, 520, 22],
		[1010, 540, 12],
		[1110, 520, 9],
		[900, 560, 14],
	];

	return (
		<HeroArt className={className}>
			<defs>
				<Hatch id={`${id}-hatch`} />
				<clipPath id={`${id}-moon`}>
					<circle cx={moon.cx} cy={moon.cy} r={moon.r} />
				</clipPath>
				<mask id={`${id}-shadow`}>
					<rect fill="white" height={H} width={W} />
					<circle cx={moon.cx - 90} cy={moon.cy + 40} fill="black" r={moon.r} />
				</mask>
				<clipPath id={`${id}-earth`}>
					<circle cx={earth.cx} cy={earth.cy} r={earth.r} />
				</clipPath>
			</defs>

			<g opacity={0.45}>
				<Stars count={90} seed={7} />
			</g>

			{/* Moon rising */}
			<g opacity={0.65}>
				<circle
					cx={moon.cx}
					cy={moon.cy}
					fill="currentColor"
					fillOpacity={0.07}
					r={moon.r}
					strokeWidth={1.5}
				/>
				<g clipPath={`url(#${id}-moon)`} strokeWidth={0.75}>
					{[0.3, 0.6, 0.85].map((f) => (
						<ellipse
							cx={moon.cx}
							cy={moon.cy}
							key={f}
							opacity={0.6}
							rx={moon.r * f}
							ry={moon.r}
							strokeDasharray="2 4"
						/>
					))}
					{[0.35, 0.65, 0.9].map((f) => (
						<line
							key={f}
							opacity={0.6}
							strokeDasharray="2 4"
							x1={moon.cx - moon.r}
							x2={moon.cx + moon.r}
							y1={moon.cy - moon.r * f}
							y2={moon.cy - moon.r * f}
						/>
					))}
					<rect
						fill={`url(#${id}-hatch)`}
						height={H}
						mask={`url(#${id}-shadow)`}
						stroke="none"
						width={W}
					/>
				</g>
				{craters.map(([x, y, r]) => (
					<g key={`${x}-${y}`} strokeWidth={1}>
						<ellipse cx={x} cy={y} rx={r} ry={r * 0.8} />
						<path
							d={`M${x - r * 0.8} ${y + r * 0.25}Q${x} ${y + r * 0.95} ${x + r * 0.8} ${y + r * 0.25}`}
							opacity={0.6}
						/>
					</g>
				))}
				<ellipse
					cx={moon.cx}
					cy={moon.cy}
					rx={moon.r + 60}
					ry={moon.r + 34}
					strokeDasharray="6 6"
					strokeWidth={1}
				/>
			</g>

			{/* Earth */}
			<g opacity={0.6} strokeWidth={1.25}>
				<circle
					cx={earth.cx}
					cy={earth.cy}
					fill="currentColor"
					fillOpacity={0.08}
					r={earth.r}
				/>
				<g clipPath={`url(#${id}-earth)`} opacity={0.7} strokeWidth={0.75}>
					<ellipse
						cx={earth.cx}
						cy={earth.cy}
						rx={earth.r * 0.45}
						ry={earth.r}
					/>
					<path
						d={`M${earth.cx - earth.r} ${earth.cy}H${earth.cx + earth.r}`}
					/>
					<path
						d={`M${earth.cx - 6} ${earth.cy - 22}c10 4 14 12 8 20s-2 14 6 18`}
						fill="currentColor"
						fillOpacity={0.25}
					/>
				</g>
				<ellipse
					cx={earth.cx}
					cy={earth.cy}
					rx={earth.r + 22}
					ry={10}
					strokeDasharray="2 3"
					strokeWidth={0.75}
					transform={`rotate(-18 ${earth.cx} ${earth.cy})`}
				/>
			</g>

			{/* Translunar trajectory */}
			<g opacity={0.5} strokeWidth={1}>
				<path
					d={`M${earth.cx + 34} ${earth.cy + 6}C760 40 820 160 760 300S860 430 ${moon.cx - moon.r - 20} ${moon.cy - 150}`}
					strokeDasharray="10 4 2 4"
				/>
				<path d="M-20 300Q300 120 520 70" opacity={0.6} strokeDasharray="1 5" />
			</g>

			{/* Capsule on approach */}
			<g
				opacity={0.7}
				strokeWidth={1.25}
				transform="translate(776 236) rotate(160)"
			>
				<path
					d="M-14 10L-6 -10H6L14 10Z"
					fill="currentColor"
					fillOpacity={0.15}
				/>
				<rect height={14} width={22} x={-11} y={10} />
				<path d="M-6 24L-10 34H10L6 24" />
				<path d="M-11 16H-26M11 16H26" />
				<rect height={6} width={10} x={-36} y={13} />
				<rect height={6} width={10} x={26} y={13} />
			</g>

			{/* Annotations */}
			<g opacity={0.7}>
				<Label x={earth.cx + 46} y={earth.cy - 14}>
					{'Earth // TLI burn'}
				</Label>
				<Label x={earth.cx + 46} y={earth.cy}>
					T+02:44:16
				</Label>
				<Label anchor="end" x={moon.cx - moon.r - 20} y={478}>
					Lunar orbit insertion
				</Label>
				<Label anchor="end" x={moon.cx - moon.r - 20} y={492}>
					Δv 0.92 km/s · apolune 314 km
				</Label>
			</g>
		</HeroArt>
	);
}

// proto

export function ProtoHeroArt({ className }: { className?: string }) {
	const id = useId();
	const sun = { cx: 1180, cy: -40, r: 140 };
	const rays = Array.from({ length: 72 }, (_, i) => {
		const angle = (i / 72) * Math.PI * 2;
		const length = i % 6 === 0 ? 70 : i % 2 === 0 ? 38 : 22;
		const [x1, y1] = polar(sun.cx, sun.cy, sun.r + 22, angle);
		const [x2, y2] = polar(sun.cx, sun.cy, sun.r + 22 + length, angle);
		return { key: i, x1, x2, y1, y2 };
	});
	const constellation = [
		[90, 40],
		[210, 18],
		[330, 62],
		[455, 30],
		[560, 78],
		[690, 52],
	];
	const planet = polar(sun.cx, sun.cy, 520, 1.95);
	const southern = [
		[760, 520],
		[860, 470],
		[1010, 500],
		[1120, 440],
		[1250, 480],
		[1300, 560],
	];
	const sparkles = [
		[210, 18, 10],
		[455, 30, 14],
		[690, 52, 9],
		[1120, 440, 14],
		[860, 470, 9],
		[600, 470, 10],
		[40, 300, 8],
	];

	return (
		<HeroArt className={className}>
			<defs>
				<Hatch gap={5} id={`${id}-hatch`} />
				<radialGradient id={`${id}-glow`}>
					<stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
					<stop offset="100%" stopColor="currentColor" stopOpacity={0} />
				</radialGradient>
			</defs>

			<g opacity={0.35}>
				<Stars count={110} seed={23} />
			</g>

			{/* Celestial grid */}
			<g opacity={0.25} strokeWidth={0.75}>
				{[700, 820, 940, 1060].map((r) => (
					<circle cx={W / 2} cy={1300} key={r} r={r} strokeDasharray="1 5" />
				))}
				{[-0.5, -0.25, 0, 0.25, 0.5].map((f) => {
					const [x, y] = polar(W / 2, 1300, 1200, -Math.PI / 2 + f);
					return (
						<line
							key={f}
							strokeDasharray="1 5"
							x1={W / 2}
							x2={x}
							y1={1300}
							y2={y}
						/>
					);
				})}
			</g>

			{/* Sun */}
			<circle
				cx={sun.cx}
				cy={sun.cy}
				fill={`url(#${id}-glow)`}
				r={sun.r + 200}
				stroke="none"
			/>
			<g opacity={0.5}>
				<circle
					cx={sun.cx}
					cy={sun.cy}
					fill="currentColor"
					fillOpacity={0.08}
					r={sun.r}
					strokeWidth={1.5}
				/>
				<circle
					cx={sun.cx}
					cy={sun.cy}
					fill={`url(#${id}-hatch)`}
					opacity={0.5}
					r={sun.r * 0.55}
					stroke="none"
				/>
				<circle
					cx={sun.cx}
					cy={sun.cy}
					r={sun.r * 0.55}
					strokeDasharray="3 3"
					strokeWidth={0.75}
				/>
				<circle cx={sun.cx} cy={sun.cy} r={sun.r + 10} strokeWidth={0.75} />
				{[
					[1120, 60, 7],
					[1136, 72, 4],
					[1240, 70, 9],
					[1090, 10, 5],
				].map(([x, y, r]) => (
					<circle
						cx={x}
						cy={y}
						fill="currentColor"
						fillOpacity={0.35}
						key={`${x}-${y}`}
						r={r}
					/>
				))}
				{/* Prominence */}
				<path
					d={`M${polar(sun.cx, sun.cy, sun.r, 2.55).join(' ')}C${polar(sun.cx, sun.cy, sun.r + 90, 2.6).join(' ')} ${polar(sun.cx, sun.cy, sun.r + 90, 2.1).join(' ')} ${polar(sun.cx, sun.cy, sun.r, 2.15).join(' ')}`}
					strokeWidth={1.25}
				/>
				<g strokeWidth={1}>
					{rays.map((ray) => (
						<line
							key={ray.key}
							x1={ray.x1}
							x2={ray.x2}
							y1={ray.y1}
							y2={ray.y2}
						/>
					))}
				</g>
				<circle
					cx={sun.cx}
					cy={sun.cy}
					r={sun.r + 130}
					strokeDasharray="8 6"
					strokeWidth={0.75}
				/>
			</g>

			{/* Orbiting body */}
			<g opacity={0.5} strokeWidth={1}>
				<circle cx={sun.cx} cy={sun.cy} r={520} strokeDasharray="1 5" />
				<circle
					cx={planet[0]}
					cy={planet[1]}
					fill="currentColor"
					fillOpacity={0.2}
					r={11}
				/>
				<circle cx={planet[0]} cy={planet[1]} r={20} strokeDasharray="2 3" />
			</g>

			{/* Constellation */}
			<g opacity={0.5}>
				<polyline
					points={constellation.map((p) => p.join(',')).join(' ')}
					strokeDasharray="3 4"
					strokeWidth={0.75}
				/>
				<polyline
					points={southern.map((p) => p.join(',')).join(' ')}
					strokeDasharray="3 4"
					strokeWidth={0.75}
				/>
				{[...constellation, ...southern].map(([x, y]) => (
					<circle
						cx={x}
						cy={y}
						fill="currentColor"
						key={`${x}-${y}`}
						r={2.5}
						stroke="none"
					/>
				))}
				{sparkles.map(([x, y, s]) => (
					<Sparkle key={`${x}-${y}`} size={s} x={x} y={y} />
				))}
			</g>

			{/* Annotations */}
			<g opacity={0.7}>
				<Label anchor="end" x={sun.cx - sun.r - 110} y={28}>
					{'Sol // class G2V'}
				</Label>
				<Label anchor="end" x={sun.cx - sun.r - 110} y={42}>
					T(eff) 5772 K
				</Label>
				<Label x={470} y={22}>
					α Proto · mag 0.03
				</Label>
				<Label x={planet[0] + 28} y={planet[1] - 26}>
					Perihelion 0.31 AU
				</Label>
				<Label anchor="end" x={W - 24} y={444}>
					Crux australis
				</Label>
				<Label x={30} y={540}>
					RA 06h 45m 08s · Dec −16° 42′
				</Label>
			</g>
		</HeroArt>
	);
}

// schematic

function gearPath(
	cx: number,
	cy: number,
	teeth: number,
	outer: number,
	root: number,
) {
	const step = (Math.PI * 2) / teeth;
	const points: number[][] = [];

	for (let i = 0; i < teeth; i += 1) {
		const a = i * step;
		points.push(
			polar(cx, cy, root, a),
			polar(cx, cy, outer, a + step * 0.15),
			polar(cx, cy, outer, a + step * 0.45),
			polar(cx, cy, root, a + step * 0.6),
		);
	}

	return `M${points.map((p) => p.join(' ')).join('L')}Z`;
}

function Resistor({ x, y }: { x: number; y: number }) {
	return <path d={`M${x} ${y}h12l4 -8l8 16l8 -16l8 16l8 -16l8 16l4 -8h12`} />;
}

function Capacitor({ x, y }: { x: number; y: number }) {
	return (
		<path
			d={`M${x} ${y - 20}v16M${x - 14} ${y - 4}h28M${x - 14} ${y + 4}h28M${x} ${y + 4}v16`}
		/>
	);
}

function Ground({ x, y }: { x: number; y: number }) {
	return (
		<path
			d={`M${x} ${y}v12M${x - 14} ${y + 12}h28M${x - 9} ${y + 17}h18M${x - 4} ${y + 22}h8`}
		/>
	);
}

function Node({ x, y }: { x: number; y: number }) {
	return <circle cx={x} cy={y} fill="currentColor" r={3} stroke="none" />;
}

export function SchematicHeroArt({ className }: { className?: string }) {
	const id = useId();
	const big = { cx: 1200, cy: 40, r: 150 };
	const small = { cx: 990, cy: 175, r: 78 };

	return (
		<HeroArt className={className}>
			<defs>
				<Hatch id={`${id}-hatch`} />
			</defs>

			{/* Gear train */}
			<g opacity={0.5} strokeWidth={1.25}>
				<path
					d={gearPath(big.cx, big.cy, 24, big.r, big.r - 16)}
					fill="currentColor"
					fillOpacity={0.06}
				/>
				<circle
					cx={big.cx}
					cy={big.cy}
					r={big.r - 40}
					strokeDasharray="4 4"
					strokeWidth={0.75}
				/>
				<circle cx={big.cx} cy={big.cy} fill={`url(#${id}-hatch)`} r={44} />
				<circle cx={big.cx} cy={big.cy} fill="none" r={18} />
				{[0, 1, 2, 3, 4, 5].map((i) => {
					const [x, y] = polar(big.cx, big.cy, 82, (i / 6) * Math.PI * 2);
					return <circle cx={x} cy={y} key={i} r={10} />;
				})}

				<path
					d={gearPath(small.cx, small.cy, 13, small.r, small.r - 15)}
					fill="currentColor"
					fillOpacity={0.06}
					transform={`rotate(7 ${small.cx} ${small.cy})`}
				/>
				<circle cx={small.cx} cy={small.cy} fill={`url(#${id}-hatch)`} r={24} />
				<circle cx={small.cx} cy={small.cy} r={8} />

				{/* Center marks */}
				<g opacity={0.7} strokeDasharray="14 4 2 4" strokeWidth={0.75}>
					<path
						d={`M${big.cx - big.r - 30} ${big.cy}H${big.cx + big.r + 30}M${big.cx} ${big.cy - big.r - 30}V${big.cy + big.r + 30}`}
					/>
					<path
						d={`M${small.cx - small.r - 24} ${small.cy}H${small.cx + small.r + 24}M${small.cx} ${small.cy - small.r - 24}V${small.cy + small.r + 24}`}
					/>
				</g>
			</g>

			{/* Dimension line */}
			<g opacity={0.55} strokeWidth={0.75}>
				<path
					d={`M${big.cx - big.r} ${big.cy + big.r + 10}v40M${big.cx + big.r} ${big.cy + big.r + 10}v40`}
				/>
				<path
					d={`M${big.cx - big.r} ${big.cy + big.r + 40}H${big.cx + big.r}`}
				/>
				<path
					d={`M${big.cx - big.r + 8} ${big.cy + big.r + 36}l-8 4l8 4M${big.cx + big.r - 8} ${big.cy + big.r + 36}l8 4l-8 4`}
				/>
			</g>

			{/* Circuit */}
			<g opacity={0.15} strokeWidth={1.25}>
				<path d="M-10 60H120V150H260" />
				<Resistor x={260} y={150} />
				<path d="M356 150H470V100H560" />
				<Node x={470} y={150} />
				<path d="M470 150V210" />
				<Capacitor x={470} y={230} />
				<path d="M470 250V280" />
				<Ground x={470} y={280} />

				{/* Op-amp */}
				<path d="M560 70V170L650 120Z" fill="currentColor" fillOpacity={0.06} />
				<path d="M570 100h12M576 94v12M570 140h12" strokeWidth={1} />
				<path d="M520 140H560M520 140V200H700V120H650" />
				<Node x={700} y={120} />
				<path d="M700 120H780V40H860" />

				{/* IC */}
				<rect
					fill="currentColor"
					fillOpacity={0.05}
					height={70}
					width={110}
					x={40}
					y={430}
				/>
				{[0, 1, 2, 3].map((i) => (
					<path d={`M${54 + i * 26} 430v-12M${54 + i * 26} 500v12`} key={i} />
				))}
				<path d="M54 418V360H200V300H260" />
				<Resistor x={260} y={300} />
				<path d="M356 300H400" />
				<Node x={400} y={300} />

				{/* Diode / LED */}
				<path d="M132 512V540H260" />
				<path
					d="M260 528V552L282 540ZM282 526V554"
					fill="currentColor"
					fillOpacity={0.1}
				/>
				<path d="M282 540H420" />
				<path d="M270 520l10 -12M278 524l10 -12" strokeWidth={1} />
				<path d="M278 508h2v4M286 512h2v4" strokeWidth={1} />
				<Ground x={420} y={540} />

				{/* Bus out to the right */}
				<path d="M860 40H900" />
				<path
					d="M800 520H1360M800 536H1360M800 552H1360"
					opacity={0.6}
					strokeDasharray="2 4"
					strokeWidth={0.75}
				/>
			</g>

			{/* Circuit annotations */}
			<g opacity={0.25}>
				<Label x={280} y={134}>
					R1 10kΩ
				</Label>
				<Label x={490} y={232}>
					C2 4.7µF
				</Label>
				<Label x={596} y={60}>
					U2
				</Label>
				<Label x={280} y={284}>
					R4 220Ω
				</Label>
				<Label x={60} y={470}>
					U1 · ATtiny85
				</Label>
				<Label x={240} y={570}>
					D1
				</Label>
				<Label x={10} y={50}>
					VCC +5V
				</Label>
			</g>

			{/* Gear annotations */}
			<g opacity={0.6}>
				<Label anchor="middle" x={big.cx} y={big.cy + big.r + 32}>
					Ø 300 · 24T · M12.5
				</Label>
				<Label x={small.cx - small.r - 10} y={small.cy + small.r + 34}>
					Pinion 13T
				</Label>
				<Label anchor="end" x={W - 24} y={510}>
					Dwg no. SCH-0021 · rev C
				</Label>
			</g>
		</HeroArt>
	);
}

// home

const color = {
	blue: 'var(--color-info)',
	green: 'var(--color-success)',
	orange: 'var(--color-tangerine)',
	pink: 'var(--color-proto)',
	purple: 'var(--color-moon)',
	teal: '#2bb5a0',
	yellow: 'var(--color-yellow)',
};

function ColorHatch({
	id,
	stroke,
	gap = 6,
	angle = 45,
}: {
	id: string;
	stroke: string;
	gap?: number;
	angle?: number;
}) {
	return (
		<pattern
			height={gap}
			id={id}
			patternTransform={`rotate(${angle})`}
			patternUnits="userSpaceOnUse"
			width={gap}
		>
			<line stroke={stroke} strokeWidth={1} x1={0} x2={0} y1={0} y2={gap} />
		</pattern>
	);
}

function circlePath(cx: number, cy: number, r: number) {
	return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
}

function Ringed({ cx, cy, r }: { cx: number; cy: number; r: number }) {
	const id = useId();
	const ring = { rx: r * 1.9, ry: r * 0.42 };
	const tilt = `rotate(-18 ${cx} ${cy})`;
	const rings = (
		<g transform={tilt}>
			<ellipse
				cx={cx}
				cy={cy}
				rx={ring.rx}
				ry={ring.ry}
				stroke={color.orange}
				strokeWidth={1.5}
			/>
			<ellipse
				cx={cx}
				cy={cy}
				rx={ring.rx - 10}
				ry={ring.ry - 5}
				stroke={color.orange}
				strokeDasharray="2 3"
			/>
			<ellipse
				cx={cx}
				cy={cy}
				rx={ring.rx + 14}
				ry={ring.ry + 7}
				stroke={color.teal}
				strokeDasharray="6 4"
			/>
		</g>
	);

	return (
		<g>
			<defs>
				<ColorHatch id={`${id}-hatch`} stroke={color.purple} />
				<clipPath id={`${id}-body`}>
					<circle cx={cx} cy={cy} r={r} />
				</clipPath>
				<clipPath id={`${id}-front`}>
					<rect height={r * 2} width={r * 6} x={cx - r * 3} y={cy} />
				</clipPath>
			</defs>
			{rings}
			<circle
				className="fill-paper-100 dark:fill-graphite-800"
				cx={cx}
				cy={cy}
				r={r}
				stroke="none"
			/>
			<circle
				cx={cx}
				cy={cy}
				fill={color.blue}
				fillOpacity={0.14}
				r={r}
				stroke="none"
			/>
			<g clipPath={`url(#${id}-body)`} transform={tilt}>
				<rect
					fill={`url(#${id}-hatch)`}
					height={r * 0.3}
					width={r * 2}
					x={cx - r}
					y={cy - r * 0.5}
				/>
				<path
					d={`M${cx - r} ${cy + r * 0.1}H${cx + r}M${cx - r} ${cy + r * 0.25}H${cx + r}`}
					stroke={color.pink}
					strokeDasharray="2 3"
				/>
				<rect
					fill={`url(#${id}-hatch)`}
					height={r * 0.6}
					width={r * 2}
					x={cx - r}
					y={cy + r * 0.55}
				/>
			</g>
			<circle cx={cx} cy={cy} r={r} stroke={color.blue} strokeWidth={1.5} />
			<g clipPath={`url(#${id}-front)`}>{rings}</g>
		</g>
	);
}

function Rocket({ x, y, angle }: { x: number; y: number; angle: number }) {
	return (
		<g strokeWidth={1.25} transform={`translate(${x} ${y}) rotate(${angle})`}>
			<path d="M-6 32Q0 60 6 32" stroke={color.orange} strokeDasharray="2 2" />
			<path d="M-3 32Q0 48 3 32" stroke={color.yellow} />
			<path
				d="M-10 10L-20 30H-8ZM10 10L20 30H8Z"
				fill={color.pink}
				fillOpacity={0.2}
				stroke={color.pink}
			/>
			<path
				d="M0 -34C14 -20 12 10 8 30H-8C-12 10 -14 -20 0 -34Z"
				fill="currentColor"
				fillOpacity={0.06}
			/>
			<path d="M-9 -14C-4 -18 4 -18 9 -14M-8 22H8" opacity={0.6} />
			<circle cx={0} cy={0} r={5} stroke={color.green} />
		</g>
	);
}

export function HomeHeroArt({ className }: { className?: string }) {
	const id = useId();
	const height = 700;
	const planet = { cx: 580, cy: 1720, r: 1200 };
	const moon = { cx: 1268, cy: 480, r: 42 };
	const bands = [
		{ hatch: true, inner: planet.r - 34, stroke: color.yellow },
		{ hatch: false, inner: planet.r - 62, stroke: color.orange },
		{ hatch: true, inner: planet.r - 86, stroke: color.teal },
		{ hatch: false, inner: planet.r - 112, stroke: color.pink },
		{ hatch: true, inner: planet.r - 136, stroke: color.purple },
	];
	const sparkles: [number, number, number, string][] = [
		[300, 110, 9, color.yellow],
		[1040, 300, 8, color.pink],
		[1180, 90, 11, color.blue],
		[90, 420, 7, color.green],
		[860, 70, 6, color.green],
		[640, 40, 5, color.orange],
		[1290, 330, 6, color.yellow],
		[420, 420, 5, color.teal],
	];

	return (
		<svg
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute inset-0 size-full text-olive dark:text-tangerine',
				className,
			)}
			fill="none"
			preserveAspectRatio="xMidYMax slice"
			stroke="currentColor"
			viewBox={`0 0 ${W} ${height}`}
		>
			<defs>
				{bands.map((band) => (
					<ColorHatch
						id={`${id}-${band.inner}`}
						key={band.inner}
						stroke={band.stroke}
					/>
				))}
				<ColorHatch gap={5} id={`${id}-shade`} stroke={color.purple} />
				<ColorHatch
					angle={-45}
					gap={5}
					id={`${id}-moon-shade`}
					stroke={color.pink}
				/>
				<radialGradient id={`${id}-glow`}>
					<stop offset="90%" stopColor={color.orange} stopOpacity={0.18} />
					<stop offset="100%" stopColor={color.orange} stopOpacity={0} />
				</radialGradient>
				<clipPath id={`${id}-moon`}>
					<circle cx={moon.cx} cy={moon.cy} r={moon.r} />
				</clipPath>
				<mask id={`${id}-moon-mask`}>
					<rect fill="white" height={height} width={W} />
					<circle cx={moon.cx - 16} cy={moon.cy - 14} fill="black" r={moon.r} />
				</mask>
			</defs>

			<g opacity={0.4}>
				<Stars count={80} height={height - 160} seed={42} />
			</g>
			<g opacity={0.85}>
				{sparkles.map(([x, y, size, fill]) => (
					<g color={fill} key={`${x}-${y}`}>
						<Sparkle size={size} x={x} y={y} />
					</g>
				))}
			</g>

			{/* Shooting star */}
			<path
				d="M980 210L1110 150"
				opacity={0.7}
				stroke={color.yellow}
				strokeDasharray="1 5"
				strokeLinecap="round"
				strokeWidth={2}
			/>
			<circle cx={1112} cy={149} r={3} stroke={color.yellow} />

			{/* Gas giant on the horizon */}
			<circle
				cx={planet.cx}
				cy={planet.cy}
				fill={`url(#${id}-glow)`}
				r={planet.r + 120}
				stroke="none"
			/>
			<g opacity={0.6} strokeWidth={1}>
				<circle
					cx={planet.cx}
					cy={planet.cy}
					r={planet.r + 40}
					stroke={color.orange}
					strokeDasharray="8 6"
				/>
				<circle
					cx={planet.cx}
					cy={planet.cy}
					r={planet.r + 80}
					stroke={color.teal}
					strokeDasharray="1 6"
				/>
			</g>
			{bands.map((band, i) => {
				const outer = i === 0 ? planet.r : bands[i - 1].inner;

				return (
					<g key={band.inner}>
						<path
							d={`${circlePath(planet.cx, planet.cy, outer)}${circlePath(planet.cx, planet.cy, band.inner)}`}
							fill={band.hatch ? `url(#${id}-${band.inner})` : band.stroke}
							fillOpacity={band.hatch ? 0.8 : 0.16}
							fillRule="evenodd"
							stroke="none"
						/>
						<circle
							cx={planet.cx}
							cy={planet.cy}
							r={band.inner}
							stroke={band.stroke}
							strokeWidth={1}
						/>
					</g>
				);
			})}
			<circle
				cx={planet.cx}
				cy={planet.cy}
				fill={`url(#${id}-shade)`}
				opacity={0.5}
				r={planet.r - 136}
				stroke="none"
			/>
			<circle
				cx={planet.cx}
				cy={planet.cy}
				r={planet.r}
				stroke={color.orange}
				strokeWidth={1.5}
			/>
			<ellipse
				cx={360}
				cy={653}
				fill={color.pink}
				fillOpacity={0.2}
				rx={56}
				ry={9}
				stroke={color.pink}
			/>
			<ellipse
				cx={360}
				cy={653}
				rx={36}
				ry={4}
				stroke={color.pink}
				strokeDasharray="2 3"
			/>

			{/* Ringed planet */}
			<Ringed cx={155} cy={135} r={58} />

			{/* Small teal planet */}
			<circle
				cx={70}
				cy={300}
				opacity={0.6}
				r={30}
				stroke={color.green}
				strokeDasharray="2 4"
			/>
			<circle
				cx={70}
				cy={300}
				fill={`url(#${id}-${planet.r - 86})`}
				r={13}
				stroke={color.teal}
				strokeWidth={1.5}
			/>
			<circle cx={100} cy={300} fill={color.green} r={3} stroke="none" />

			{/* Small moon */}
			<circle
				cx={moon.cx}
				cy={moon.cy}
				fill={color.pink}
				fillOpacity={0.1}
				r={moon.r}
				stroke={color.pink}
				strokeWidth={1.5}
			/>
			<g clipPath={`url(#${id}-moon)`} stroke={color.pink}>
				<rect
					fill={`url(#${id}-moon-shade)`}
					height={height}
					mask={`url(#${id}-moon-mask)`}
					stroke="none"
					width={W}
				/>
				<ellipse cx={1254} cy={468} rx={9} ry={7} />
				<ellipse cx={1278} cy={454} rx={4} ry={3} />
				<ellipse cx={1282} cy={496} rx={6} ry={5} />
			</g>
			<ellipse
				cx={moon.cx}
				cy={moon.cy}
				opacity={0.6}
				rx={moon.r + 26}
				ry={moon.r + 10}
				stroke={color.green}
				strokeDasharray="1 4"
				transform={`rotate(20 ${moon.cx} ${moon.cy})`}
			/>

			{/* Rocket */}
			<path
				d="M1000 470C1080 430 1130 360 1150 280"
				opacity={0.7}
				stroke={color.orange}
				strokeDasharray="10 4 2 4"
			/>
			<Rocket angle={24} x={1166} y={232} />

			{/* Annotations */}
			<g opacity={0.7}>
				<Label x={240} y={60}>
					Ring plane 18°
				</Label>
				<Label x={240} y={74}>
					Ø 116 · 3 rings
				</Label>
				<Label x={1190} y={196}>
					{'MR-01 // ascent'}
				</Label>
				<Label anchor="end" x={moon.cx - moon.r - 34} y={moon.cy + 4}>
					Moonlet b
				</Label>
				<Label x={60} y={height - 120}>
					Gas giant · class J
				</Label>
			</g>
		</svg>
	);
}
