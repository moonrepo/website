import type { HighlighterCore } from 'shiki/core';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

let highlighter: Promise<HighlighterCore> | undefined;

// Only bundles the languages and themes used by `ConfigTabs`, instead of
// every Shiki grammar that `DynamicCodeBlock` includes by default
export function getHighlighter(): Promise<HighlighterCore> {
	highlighter ??= createHighlighterCore({
		engine: createJavaScriptRegexEngine(),
		langs: [
			import('shiki/langs/hcl.mjs'),
			import('shiki/langs/json.mjs'),
			import('shiki/langs/pkl.mjs'),
			import('shiki/langs/toml.mjs'),
			import('shiki/langs/yaml.mjs'),
		],
		themes: [
			import('shiki/themes/github-dark.mjs'),
			import('shiki/themes/github-light.mjs'),
		],
	});

	return highlighter;
}
