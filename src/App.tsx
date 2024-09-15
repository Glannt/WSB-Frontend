import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import logo from './assets/react.svg';

import viteLogo from '/vite.svg';
import { Header } from './components/Header/Header';
import ModeToggle from './components/ModeToggle/ModeToggle';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Header />
    </ThemeProvider>
  );
}

export default App;
