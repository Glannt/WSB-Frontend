import App from '@/App';
import { BookingRoomDetail } from '@/components/Content/BookingRoomDetail';
import { HomePage } from '@/components/Content/HomePage';
import { ListFood } from '@/components/Content/ListFood';
import { ListRoom } from '@/components/Content/ListRoom';
import Login from '@/components/Login/Login';
import SignUp from '@/components/SignUp/SignUp';
import { MainLayout } from '@/layouts/MainLayout';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
const isAuthenticated = true;
function ProtectedRoute() {
  // const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}
function RejectedRoute() {
  // const isAuthenticated = false;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/room-detail" />;
}

// let isAuthenticated = false;
// const checkAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return (isAuthenticated = false);
//   }
//   return (isAuthenticated = true);
// };

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  {
    path: 'list-room',
    element: (
      <MainLayout>
        <ListRoom />
      </MainLayout>
    ),
  },
  {
    path: 'contact',
    element: 'Contact',
  },

  {
    path: 'list-food',
    element: (
      <MainLayout>
        <ListFood />
      </MainLayout>
    ),
  },

  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'room-detail',
        element: <BookingRoomDetail />,
      },
    ],
  },

  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: 'sign-up',
        element: (
          <MainLayout>
            <SignUp />
          </MainLayout>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <MainLayout>
            <Login />
          </MainLayout>
        ),
      },
    ],
  },
]);
// checkAuthenticated();
