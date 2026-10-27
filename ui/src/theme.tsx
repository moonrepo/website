import { createContext, type ReactNode, useContext, useEffect } from 'react';

export type ColorScheme = 'light' | 'dark';

export type ProductTheme = 'moon' | 'proto';

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

/**
 * Returns the class for a product theme, and also applies it to `<body>`,
 * since Base UI popups are portaled outside of the themed element.
 */
export function useProductTheme(theme?: ProductTheme) {
	const themeClass = theme ? `theme-${theme}` : undefined;

	useEffect(() => {
		if (!themeClass) return;
		document.body.classList.add(themeClass);
		return () => document.body.classList.remove(themeClass);
	}, [themeClass]);

	return themeClass;
}
