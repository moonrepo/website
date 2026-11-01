import {
	DynamicCodeBlock,
	type DynamicCodeblockProps,
} from 'fumadocs-ui/components/dynamic-codeblock.core';
import { getHighlighter } from '@/utils/highlighter';

export type CodeBlockProps = Omit<
	DynamicCodeblockProps,
	'highlighter' | 'options'
>;

export function CodeBlock(props: CodeBlockProps) {
	return (
		<DynamicCodeBlock
			highlighter={getHighlighter}
			options={{ themes: { dark: 'github-dark', light: 'github-light' } }}
			{...props}
		/>
	);
}
