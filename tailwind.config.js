/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const { heroui } = require('@heroui/react');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './App.jsx',
    './index.css',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideFade: {
          '0%': { width: '0%', opacity: '1' },
          '70%': { width: '100%', opacity: '1' },
          '100%': { width: '100%', opacity: '0' },
        },
      },
      animation: {
        slideFade: 'slideFade 0.6s ease-in-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({ perspective: value }),
      });
    }),
    heroui({
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            background: 'hsl(0 0% 100%)',
            foreground: 'hsl(0 0% 0%)',
            card: 'hsl(0 0% 100%)',
            'card-foreground': 'hsl(0 0% 0%)',
            popover: 'hsl(0 0% 100%)',
            'popover-foreground': 'hsl(0 0% 0%)',
            primary: 'hsl(0 0% 0%)',
            'primary-foreground': 'hsl(0 0% 100%)',
            secondary: 'hsl(220 14% 96%)',
            'secondary-foreground': 'hsl(0 0% 0%)',
            muted: 'hsl(220 14% 96%)',
            'muted-foreground': 'hsl(220 10% 46%)',
            accent: 'hsl(210 100% 97%)',
            'accent-foreground': 'hsl(220 60% 20%)',
            destructive: 'hsl(0 84% 60%)',
            'destructive-foreground': 'hsl(0 0% 100%)',
            border: 'hsl(220 13% 91%)',
            input: 'hsl(220 13% 91%)',
            ring: 'hsl(0 0% 0%)',
          },
        },
        dark: {
          colors: {
            background: 'hsl(0 0% 0%)',
            foreground: 'hsl(0 0% 100%)',
            card: 'hsl(0 0% 10%)',
            'card-foreground': 'hsl(0 0% 100%)',
            popover: 'hsl(0 0% 10%)',
            'popover-foreground': 'hsl(0 0% 100%)',
            primary: 'hsl(0 0% 100%)',
            'primary-foreground': 'hsl(0 0% 0%)',
            secondary: 'hsl(0 0% 15%)',
            'secondary-foreground': 'hsl(0 0% 100%)',
            muted: 'hsl(0 0% 20%)',
            'muted-foreground': 'hsl(0 0% 70%)',
            accent: 'hsl(210 30% 20%)',
            'accent-foreground': 'hsl(0 0% 100%)',
            destructive: 'hsl(0 60% 40%)',
            'destructive-foreground': 'hsl(0 0% 100%)',
            border: 'hsl(0 0% 30%)',
            input: 'hsl(0 0% 30%)',
            ring: 'hsl(0 0% 100%)',
          },
        },
      },
      // layout: {
      //   dividerWeight: '1px',
      //   disabledOpacity: 0.5,
      //   fontSize: {
      //     tiny: '0.75rem',
      //     small: '0.875rem',
      //     medium: '1rem',
      //     large: '1.125rem',
      //   },
      //   lineHeight: {
      //     tiny: '1rem',
      //     small: '1.25rem',
      //     medium: '1.5rem',
      //     large: '1.75rem',
      //   },
      //   radius: {
      //     small: '8px',
      //     medium: '12px',
      //     large: '14px',
      //   },
      //   borderWidth: {
      //     small: '1px',
      //     medium: '2px',
      //     large: '3px',
      //   },
      // },
    }),
  ],
};
