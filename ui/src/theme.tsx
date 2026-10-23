import { createContext, type ReactNode, useContext } from 'react';

export type ColorScheme = 'light' | 'dark';

export interface ColorSchemeContextValue {
	/** Undefined until the scheme is known on the client. */
	scheme?: ColorScheme;
	setScheme: (scheme: ColorScheme) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

export function ColorSchemeProvider({
	children,
	value,
}: {
	children: ReactNode;
	value: ColorSchemeContextValue;
}) {
	return (
		<ColorSchemeContext.Provider value={value}>
			{children}
		</ColorSchemeContext.Provider>
	);
}

export function useColorScheme() {
	return useContext(ColorSchemeContext);
}
