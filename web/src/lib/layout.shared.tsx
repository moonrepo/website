import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// Products aren't listed as links, since the docs sidebar has a product switcher
export function baseOptions(): BaseLayoutProps {
	return {
		githubUrl: 'https://github.com/moonrepo',
		nav: {
			title: 'moonrepo',
			url: 'https://moonrepo.dev',
		},
		links: [],
	};
}
