'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@heroui/react';
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
      isSelected={isDarkMode}
      size="lg"
      color="secondary"
      onChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
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
