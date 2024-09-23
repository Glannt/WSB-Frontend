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
import { Outlet, RouterProvider } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router/Router';
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
