import { ThemeProvider, useTheme } from '@/components/theme-provider';

import { Outlet, RouterProvider } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router/Router';
import { NextUIProvider } from '@nextui-org/system';
function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </NextUIProvider>
  );
}

export default App;
