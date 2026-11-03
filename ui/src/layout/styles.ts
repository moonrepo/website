export const heading =
	'font-display font-medium text-graphite-800 dark:text-paper-50';
export const muted = 'text-graphite-500 dark:text-sand';
export const accent = 'text-olive dark:text-tangerine';
export const dashed = 'border-dashed border-olive';
/** Slightly darker panel background. Darkens the page color by a fixed amount so contrast is even across themes. */
export const panel =
	'bg-[color-mix(in_oklab,var(--color-paper-100)_99%,black)] dark:bg-[color-mix(in_oklab,var(--color-graphite-800)_95%,black)]';
export const codeBox =
	'rounded-md border border-paper-300 bg-paper-50 font-mono text-code dark:border-graphite-950 dark:bg-graphite-950';

/* Type roles, built on the `fontSize` scale in `tailwind.config.ts`. */
export const heroTitle = 'text-display-1 md:text-display-hero';
/** Page titles and top-level section headings. */
export const title = 'text-display-2 md:text-display-1';
export const subtitle = 'text-display-3 md:text-display-2';
export const cardTitle = 'text-display-4';
/** Uppercase display labels: buttons, dates, sidebar headings. */
export const caps = 'font-bold font-display text-caps uppercase';
export const capsSm = 'font-display font-semibold text-caps-sm uppercase';
/** Monospace technical annotations, like on a drawing. */
export const tech = 'font-mono text-tech uppercase';
export const wordmark =
	'font-display font-medium font-stretch-125% tracking-[0.06em]';
