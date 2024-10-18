import React, { ReactNode } from 'react';

import { Footer } from '@/components/Header/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet } from 'react-router';
import { Header } from '@/components/Header/Header';
import { NextUIProvider } from '@nextui-org/system';
import { getRoleName } from '@/utils/auth';
import { HeaderManger } from '@/components/Header/HeaderManager';
import { HeaderStaff } from '@/components/Header/HeaderStaff';
import { HeaderOwner } from '@/components/Header/HeaderOwner';

export const MainLayout: React.FC<{ children?: JSX.Element }> = ({
  children,
}) => {
  return (
    <NextUIProvider>
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
    </NextUIProvider>
  );
};
