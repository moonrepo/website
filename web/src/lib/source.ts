import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
// import * as icons from 'lucide-static';
import { docs } from '@/generated/server';

export const source = loader({
	source: docs.toFumadocsSource(),
	baseUrl: '/docs',
	plugins: [lucideIconsPlugin()],
	// icon(icon) {
	// 	if (icon && icon in icons) {
	// 		// biome-ignore lint/performance/noDynamicNamespaceImportAccess: allowed
	// 		return icons[icon as keyof typeof icons];
	// 	}
	// },
});
