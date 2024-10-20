import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './index.css';

import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  BrowserRouter,
} from 'react-router-dom';
import { router } from './router/Router.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AuthProvider } from './context/AuthProvider.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/app.context.tsx';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
