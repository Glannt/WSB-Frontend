'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { SunIcon } from '../Icons/theme/SunIcon';
import { MoonIcon } from '../Icons/theme/MoonIcon';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted before rendering (for SSR support)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Determine if current theme is dark
  const isDarkMode = theme === 'dark';

  return (
    <Switch
      checked={isDarkMode} // Check if dark mode is enabled
      size="lg"
      color="secondary"
      onChange={() => setTheme(isDarkMode ? 'light' : 'dark')} // Toggle theme on change
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    >
      Dark mode
    </Switch>
  );
}
