import {
	type ColorSchemeContextValue,
	ColorSchemeProvider,
} from '@moonrepo/ui/theme';
import { useTheme } from 'fumadocs-ui/provider/base';
import { type ReactNode, useMemo } from 'react';

// Feeds the fumadocs (next-themes) theme state into @moonrepo/ui.
export function ColorSchemeBridge({ children }: { children: ReactNode }) {
	const { resolvedTheme, setTheme } = useTheme();
	const value = useMemo<ColorSchemeContextValue>(
		() => ({
			scheme:
				resolvedTheme === 'dark' || resolvedTheme === 'light'
					? resolvedTheme
					: undefined,
			setScheme: setTheme,
		}),
		[resolvedTheme, setTheme],
	);

	return <ColorSchemeProvider value={value}>{children}</ColorSchemeProvider>;
}
