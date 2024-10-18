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
  const removeQuotes = (str: string) => {
    return str.replace(/['"]+/g, ''); // Removes both single and double quotes
  };

  const renderHeader = (roleName: string) => {
    switch (removeQuotes(roleName).toUpperCase()) {
      case 'MANAGER':
        return <HeaderManger />;
      case 'STAFF':
        return <HeaderStaff />;
      case 'OWNER':
        return <HeaderOwner />;
      case 'CUSTOMER':
      case '':
      case null:
      case undefined:
        return <Header />;
      default:
        return null; // You can return a default header or null if no role matches
    }
  };

  const roleName = getRoleName();

  return (
    <NextUIProvider>
      <div className="min-h-screen ">
        <div className="header-container sticky top-0 z-10">
          {renderHeader(roleName)}
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
