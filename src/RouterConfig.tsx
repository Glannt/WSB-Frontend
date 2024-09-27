import * as React from 'react';
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
import App from './App';
export const router = createBrowserRouter([
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
        path: 'list-room/typeRoom=?',
        element: 'ListRoomType',
      },
      {
        path: 'list-food',
        element: <ListFood />,
      },
    ],
  },
]);
