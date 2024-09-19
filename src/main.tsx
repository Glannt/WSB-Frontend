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
} from 'react-router-dom';
import { HomePage } from './components/Content/HomePage';
import { ListRoom } from './components/Content/ListRoom';
import { ListFood } from './components/Content/ListFood';
import Login from './components/Login/Login.tsx';
import SignUp from './components/SignUp/SignUp.tsx';
import { BookingRoomDetail } from './components/Content/BookingRoomDetail.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'list-room',
        element: <ListRoom />,
      },
      {
        path: 'contact',
        element: 'Contact',
      },
      {
        path: 'sign-in',
        element: <Login />,
      },
      {
        path: 'list-food',
        element: <ListFood />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'room-detail',
        element: <BookingRoomDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
