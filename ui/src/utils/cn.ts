import { type ClassNameValue, extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [
				{
					text: [
						'display-hero',
						'display-1',
						'display-2',
						'display-3',
						'display-4',
						'body-lg',
						'body',
						'body-sm',
						'caps',
						'caps-sm',
						'tech',
						'code',
					],
				},
			],
		},
	},
});

export function cn(...classes: ClassNameValue[]) {
	return twMerge(classes);
}
