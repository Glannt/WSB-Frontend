import { ThemeProvider, useTheme } from '@/components/theme-provider';

import { Outlet, RouterProvider } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router/Router';
import { HeroUIProvider } from '@heroui/system';
import { CustomerProvider } from './context/customer.context';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
function App() {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <CustomerProvider>
          {' '}
          <RouterProvider router={router} />
          <ToastContainer />
        </CustomerProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export default App;
