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
import { HomePage } from './components/Content/HomePage';
import { Footer } from './components/Header/Footer';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <div className="header-container sticky top-0 z-10 hover:bg-[#51a7bf]">
        <Header />
      </div>
      <div className="main-content">
        <HomePage autoSlide={true} autoSlideInterval={5000} />
      </div>
      <div>
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
