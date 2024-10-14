import { ThemeProvider, useTheme } from '@/components/theme-provider';

import { Outlet, RouterProvider } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router/Router';
import { NextUIProvider } from '@nextui-org/system';
import { CustomerProvider } from './context/customer.context';
function App() {
  return (
    <NextUIProvider>
      <CustomerProvider>
        {' '}
        <RouterProvider router={router} />
        <ToastContainer />
      </CustomerProvider>
    </NextUIProvider>
  );
}

export default App;
