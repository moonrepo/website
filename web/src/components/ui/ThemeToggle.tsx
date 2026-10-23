import { Toggle } from '@base-ui/react/toggle';
import { useTheme } from 'fumadocs-ui/provider/base';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && resolvedTheme === 'dark';

	return (
		<Toggle
			aria-label="Toggle dark mode"
			className={cn(
				'flex size-10 select-none items-center justify-center rounded-full border border-paper-300 bg-paper-50 text-graphite-500 shadow-sm transition-colors',
				'hover:text-graphite-700 dark:border-graphite-surface dark:bg-graphite-950 dark:text-paper-50 dark:hover:text-tangerine',
				'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2 dark:focus-visible:outline-tangerine',
				className,
			)}
			onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
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
