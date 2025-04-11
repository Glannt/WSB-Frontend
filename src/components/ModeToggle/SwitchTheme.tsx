import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { SunIcon } from '../Icons/theme/SunIcon';
import { MoonIcon } from '../Icons/theme/MoonIcon';

export default function ThemeSwitcher() {
  const mountedRef = useRef(false); // Use useRef to persist mounted state
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!mountedRef.current) {
      setMounted(true);
      mountedRef.current = true; // Set ref to true after mounting
    }
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  return (
    <Switch
      checked={isDarkMode}
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
