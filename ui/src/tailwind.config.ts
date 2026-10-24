import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

type Shades = Record<string, string>;
type Palette = Record<string, string | Shades>;

// Colors are emitted as CSS variables (instead of being inlined into
// utilities) so product themes can remap them at runtime.
const palette: Palette = {
	paper: {
		50: '#f8f5f1',
		100: '#e6e7e1',
		200: '#dbddd7',
		300: '#d1d3cd',
		400: '#c6c8c2',
		500: '#a4a6a1',
		600: '#848681',
		700: '#656662',
		800: '#474945',
		900: '#2c2d2a',
		950: '#1f201d',
	},
	graphite: {
		50: '#f3f4f2',
		100: '#e2e3e0',
		200: '#c0c1be',
		300: '#a0a19d',
		400: '#81817d',
		500: '#63635e',
		600: '#4b4d4b',
		700: '#353838',
		800: '#2e3131',
		900: '#262929',
		950: '#1f2121',
		surface: '#323535',
	},
	olive: {
		DEFAULT: '#787450',
		50: '#f7f6ef',
		100: '#e8e7dc',
		200: '#cbc9b8',
		300: '#aeac94',
		400: '#938f72',
		500: '#787450',
		600: '#625f41',
		700: '#4d4b33',
		800: '#393725',
		900: '#262518',
		950: '#1d1c12',
	},
	tangerine: {
		DEFAULT: '#ec9c46',
		50: '#fef6ec',
		100: '#fce9d6',
		200: '#f8d0a9',
		300: '#f3b67b',
		400: '#ec9c46',
		500: '#cf8a40',
		600: '#b37939',
		700: '#895c29',
		800: '#61401b',
		900: '#3c260d',
		950: '#2b1a07',
	},
	sand: {
		DEFAULT: '#ddd3c5',
		50: '#fbf9f6',
		100: '#f1ece5',
		200: '#ddd3c5',
		300: '#c2b8ab',
		400: '#a79e93',
		500: '#8d857b',
		600: '#746d63',
		700: '#5c564d',
		800: '#453f38',
		900: '#2f2a24',
		950: '#25201a',
	},
	taupe: {
		DEFAULT: '#9b9080',
		50: '#f6f5f3',
		100: '#ece9e6',
		200: '#d7d2cb',
		300: '#c3bcb2',
		400: '#afa698',
		500: '#9b9080',
		600: '#7c7366',
		700: '#5e574e',
		800: '#423d36',
		900: '#282420',
		950: '#1c1916',
	},
	moon: {
		DEFAULT: '#8b53f3',
		50: '#f5f0fe',
		100: '#eae1fd',
		200: '#d5c4fa',
		300: '#c0a6f5',
		400: '#ac88f0',
		500: '#8b53f3',
		600: '#7c4dd3',
		700: '#6d47b3',
		800: '#5e4195',
		900: '#312152',
		950: '#1c1233',
	},
	proto: {
		DEFAULT: '#f35383',
		50: '#fef1f5',
		100: '#fee2ea',
		200: '#fdc5d5',
		300: '#f9a8c0',
		400: '#f881a1',
		500: '#f35383',
		600: '#d34d75',
		700: '#b34767',
		800: '#95405a',
		900: '#4b1c2b',
		950: '#2a0c16',
	},
	yc: '#fb651e',

	// Semantic roles, overridden per product theme
	brand: '#ec9c46',
	label: '#2e3131',
	primary: {
		DEFAULT: '#ec9c46',
		light: '#f3ad5f',
		dark: '#b37939',
		fg: '#2e3131',
	},
	'secondary-glow': '#e3dccb',
};

function varName(name: string, shade: string) {
	return shade === 'DEFAULT' ? `--color-${name}` : `--color-${name}-${shade}`;
}

function toCssVars(colors: Palette) {
	const vars: Record<string, string> = {};

	for (const [name, value] of Object.entries(colors)) {
		if (typeof value === 'string') {
			vars[varName(name, 'DEFAULT')] = value;
		} else {
			for (const [shade, hex] of Object.entries(value)) {
				vars[varName(name, shade)] = hex;
			}
		}
	}

	return vars;
}

function toVarRefs(colors: Palette) {
	return Object.fromEntries(
		Object.entries(colors).map(([name, value]) => [
			name,
			typeof value === 'string'
				? `var(${varName(name, 'DEFAULT')})`
				: Object.fromEntries(
						Object.keys(value).map((shade) => [
							shade,
							`var(${varName(name, shade)})`,
						]),
					),
		]),
	);
}

// Product themes remap the base palette's CSS variables (full scales), so
// shared components pick up moon/proto colors without changing their classes.
const moonTheme: Palette = {
	paper: {
		50: '#f3f1f8',
		100: '#e1dceb',
		200: '#d7d2e0',
		300: '#cdc8d6',
		400: '#c3bdcd',
		500: '#a19caa',
		600: '#817c89',
		700: '#625e69',
		800: '#44414b',
		900: '#29262e',
		950: '#1c1a21',
	},
	graphite: {
		50: '#f5f4f7',
		100: '#e4e2e7',
		200: '#c3c0c8',
		300: '#a39faa',
		400: '#847f8d',
		500: '#666071',
		600: '#585263',
		700: '#4b4556',
		800: '#3d2b30',
		900: '#1e1a1d',
		950: '#171618',
		surface: '#363042',
	},
	sand: {
		DEFAULT: '#cdc5dd',
		50: '#f8f7fb',
		100: '#e9e6f1',
		200: '#cdc5dd',
		300: '#b3acc2',
		400: '#9b94a8',
		500: '#827d8f',
		600: '#6b6676',
		700: '#55505f',
		800: '#3f3b48',
		900: '#2b2732',
		950: '#211e28',
	},
	taupe: {
		DEFAULT: '#988dac',
		50: '#f6f5f8',
		100: '#ebe9ef',
		200: '#d6d1de',
		300: '#c1bacd',
		400: '#aca3bd',
		500: '#988dac',
		600: '#7a708a',
		700: '#5c5569',
		800: '#413b4a',
		900: '#27232e',
		950: '#1b1820',
	},
	olive: {
		DEFAULT: '#5e4195',
		50: '#f3f0f9',
		100: '#e1dcee',
		200: '#beb4d9',
		300: '#9c8dc3',
		400: '#7c67ac',
		500: '#5e4195',
		600: '#4c3579',
		700: '#3c295f',
		800: '#2b1e45',
		900: '#1c132d',
		950: '#150e22',
	},
	tangerine: {
		DEFAULT: '#ac88f0',
		50: '#f7f2fe',
		100: '#ece3fd',
		200: '#d6c5fa',
		300: '#c0a7f5',
		400: '#ac88f0',
		500: '#9b6ff2',
		600: '#8b53f3',
		700: '#693eb8',
		800: '#482b81',
		900: '#2a194e',
		950: '#1c1036',
	},
	brand: '#f3f1f8',
	label: '#8b53f3',
	primary: {
		DEFAULT: '#8b53f3',
		light: '#9d6ef5',
		dark: '#6a3cc4',
		fg: '#ffffff',
	},
	'secondary-glow': '#d7d1e3',
};

const moonDarkTheme: Palette = {
	olive: {
		DEFAULT: '#666071',
		50: '#f4f3f6',
		100: '#e3e2e6',
		200: '#c2bfc8',
		300: '#a29eaa',
		400: '#847f8d',
		500: '#666071',
		600: '#534e5c',
		700: '#413d48',
		800: '#302d36',
		900: '#201d24',
		950: '#18161b',
	},
	graphite: {
		50: '#f5f4f7',
		100: '#e4e2e7',
		200: '#c3c0c8',
		300: '#a39faa',
		400: '#847f8d',
		500: '#666071',
		600: '#585263',
		700: '#4b4556',
		800: '#312b3d',
		900: '#1c1a1f',
		950: '#171618',
		surface: '#363042',
	},
};

const protoTheme: Palette = {
	paper: {
		50: '#f8f1f3',
		100: '#ebdde2',
		200: '#ddc5cc',
		300: '#ceb9c0',
		400: '#bfaab0',
		500: '#b09ba1',
		600: '#8e7c81',
		700: '#6c5e62',
		800: '#4d4144',
		900: '#302629',
		950: '#221a1c',
	},
	graphite: {
		50: '#f7f3f4',
		100: '#e7e2e3',
		200: '#c8bfc2',
		300: '#aa9ea2',
		400: '#8d7f83',
		500: '#716065',
		600: '#635257',
		700: '#554449',
		800: '#44222c',
		900: '#21191b',
		950: '#181617',
		surface: '#4a3a3e',
	},
	sand: {
		DEFAULT: '#ddc5cc',
		50: '#fbf6f7',
		100: '#f1e5e8',
		200: '#ddc5cc',
		300: '#c2acb2',
		400: '#a8949a',
		500: '#8e7c81',
		600: '#76656a',
		700: '#5e4f54',
		800: '#473a3e',
		900: '#31262a',
		950: '#271d20',
	},
	taupe: {
		DEFAULT: '#ab7082',
		50: '#f9f3f5',
		100: '#f1e4e8',
		200: '#e0c6cd',
		300: '#cfa9b3',
		400: '#bd8c9a',
		500: '#ab7082',
		600: '#8a5a69',
		700: '#6a4451',
		800: '#4c303a',
		900: '#2f1d24',
		950: '#22141a',
	},
	olive: {
		DEFAULT: '#95405a',
		50: '#fbf0f3',
		100: '#f1dce1',
		200: '#dbb4bd',
		300: '#c58d9b',
		400: '#ae677a',
		500: '#95405a',
		600: '#793349',
		700: '#5e2738',
		800: '#441b28',
		900: '#2b1019',
		950: '#200b12',
	},
	tangerine: {
		DEFAULT: '#f35383',
		50: '#fef1f5',
		100: '#ffdce4',
		200: '#ffb2c3',
		300: '#fb86a2',
		400: '#f35383',
		500: '#c34a6e',
		600: '#95405a',
		700: '#743045',
		800: '#552131',
		900: '#38131f',
		950: '#2a0c16',
	},
	brand: '#f8f1f3',
	label: '#f35383',
	primary: {
		DEFAULT: '#f35383',
		light: '#f56f98',
		dark: '#95405a',
		fg: '#f8f1f3',
	},
	'secondary-glow': '#e3cfd5',
};

const protoDarkTheme: Palette = {
	graphite: {
		50: '#f7f3f4',
		100: '#e7e2e3',
		200: '#c8bfc2',
		300: '#aa9ea2',
		400: '#8d7f83',
		500: '#716065',
		600: '#635257',
		700: '#554449',
		800: '#443338',
		900: '#201c1d',
		950: '#181617',
		surface: '#4a3a3e',
	},
};

const brand = plugin(({ addBase, addUtilities }) => {
	addBase({
		':root': toCssVars(palette),
		'.theme-moon': toCssVars(moonTheme),
		'.dark .theme-moon': toCssVars(moonDarkTheme),
		'.theme-proto': toCssVars(protoTheme),
		'.dark .theme-proto': toCssVars(protoDarkTheme),
	});

	addUtilities({
		'.bg-noise': {
			'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
		},
	});
});

export default {
	theme: {
		extend: {
			colors: toVarRefs(palette),
			fontFamily: {
				display: [
					'Eurostile',
					'Saira Variable',
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
				],
			},
		},
	},
	plugins: [brand],
} satisfies Config;
