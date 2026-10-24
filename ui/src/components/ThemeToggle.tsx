import { Toggle } from '@base-ui/react/toggle';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useColorScheme } from '../theme';
import { cn } from '../utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
	const colorScheme = useColorScheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && colorScheme?.scheme === 'dark';

	return (
		<Toggle
			aria-label="Toggle dark mode"
			className={cn(
				'flex size-10 select-none items-center justify-center rounded-full border border-paper-300 bg-paper-50 text-graphite-500 shadow-sm transition-colors',
				'hover:text-graphite-800 dark:border-graphite-surface dark:bg-graphite-950 dark:text-paper-50 dark:hover:text-tangerine',
				'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2 dark:focus-visible:outline-tangerine',
				className,
			)}
			disabled={!colorScheme}
			onPressedChange={(pressed) =>
				colorScheme?.setScheme(pressed ? 'dark' : 'light')
			}
			pressed={isDark}
		>
			{isDark ? (
				<SunIcon className="size-5" />
			) : (
				<MoonIcon className="size-5 fill-current" />
			)}
		</Toggle>
	);
}
