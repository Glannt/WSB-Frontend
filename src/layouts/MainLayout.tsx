import React, { ReactNode } from 'react';

import { Footer } from '@/components/Header/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet } from 'react-router';
import { Header } from '@/components/Header/Header';

export const MainLayout: React.FC<{ children?: JSX.Element }> = ({
  children,
}) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <div className="min-h-screen ">
        <div className="header-container sticky top-0 z-10">
          <Header />
        </div>
        <div className="main-content">{children || <Outlet />}</div>
      </div>
      <div>
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};
