import App from '@/App';
import { BookingRoomDetail } from '@/components/Content/BookingRoomDetail';
import { HomePage } from '@/components/Content/HomePage';
import { ListFood } from '@/components/Content/ListFood';
import { ListRoom } from '@/components/Content/ListRoom';
import Login from '@/components/Login/Login';
import SignUp from '@/components/SignUp/SignUp';
import { AppContext } from '@/context/app.context';
import { MainLayout } from '@/layouts/MainLayout';
import { useContext } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import path from '@/constants/path';
import ProfileEditor from '@/components/ProfileEditor/ProfileEditor';
import { Dashboard } from '@/components/Admin/Dashboard';
import CreateRoom from '@/components/AdminService/CreateRoom';
import TableAddRoom from '@/components/AdminService/TableAddRoom';
import AddStaffToRoom from '@/components/AdminService/AddStaffToRoom';
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
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
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
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
    path: 'room-detail',
    element: (
      <MainLayout>
        <BookingRoomDetail />
      </MainLayout>
    ),
  },

  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'room-bill',
        element: 'room-bill',
      },
    ],
  },
  {
    path: path.profile,
    element: <ProfileEditor />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'create-room',
        element: <CreateRoom />,
      },
      {
        path: 'update-staff-schedule',
        element: <AddStaffToRoom />,
      },
    ],
  },
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: path.register,
        element: (
          <MainLayout>
            <SignUp />
          </MainLayout>
        ),
      },
      {
        path: path.login,
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
