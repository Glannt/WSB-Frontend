import { ThemeProvider, useTheme } from '@/components/theme-provider';

import { Outlet, RouterProvider } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router/Router';
import { NextUIProvider } from '@nextui-org/system';
import { CustomerProvider } from './context/customer.context';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <CustomerProvider>
          {' '}
          <RouterProvider router={router} />
          <ToastContainer />
        </CustomerProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
