import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../components/Content/HomePage';
import { ListRoom } from '../components/Content/ListRoom';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Header/Footer';
import { ThemeProvider } from '@/components/theme-provider';

export const MainLayout: React.FC<{ children?: JSX.Element }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <div className="header-container sticky top-0 z-10 hover:bg-[#51a7bf]">
        <Header />
      </div>
      <div className="main-content">{children || <Outlet />}</div>
      <div>
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};
