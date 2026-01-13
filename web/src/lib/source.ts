import { loader } from 'fumadocs-core/source';
import * as icons from 'lucide-static';
import { create, docs } from '@/generated';

export const source = loader({
	source: await create.sourceAsync(docs.doc, docs.meta),
	baseUrl: '/docs',
	icon(icon) {
		if (icon && icon in icons) {
			// biome-ignore lint/performance/noDynamicNamespaceImportAccess: allowed
			return icons[icon as keyof typeof icons];
		}
	},
});
