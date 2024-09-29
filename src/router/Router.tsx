import App from '@/App';
import { BookingRoomDetail } from '@/components/Content/BookingRoomDetail';
import { HomePage } from '@/components/Content/HomePage';
import { ListFood } from '@/components/Content/ListFood';
import { ListRoom } from '@/components/Content/ListRoom';
import Login from '@/components/Login/Login';
import ProfileEditor from '@/components/ProfileEditor/ProfileEditor';
import SignUp from '@/components/SignUp/SignUp';
import { AppContext } from '@/context/app.context';
import { MainLayout } from '@/layouts/MainLayout';
import { useContext } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import path from '@/constants/path';
import { DashboardManager } from '@/components/Admin/DashboardManager';
import ManageRoom from '@/components/AdminService/ManageRoom';
import ManageStaff from '@/components/AdminService/ManageStaff';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';
import EquipmentList from '@/components/Content/ListEquipment';
import { DashboardStaff } from '@/components/Staff/DashboardStaff';
import { StaffWelComeback } from '@/components/Staff/StaffWelcomeback';
import StaffBookings from '@/components/Staff/StaffBookings';
import StaffRoomOverview from '@/components/Staff/StaffRoomOverview';
import { StaffProfile } from '@/components/Staff/StaffProfie';
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
}

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
    path: 'equipments',
    element: (
      <MainLayout>
        <EquipmentList />
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
        path: 'room-detail/:roomId',
        element: (
          <MainLayout>
            <BookingRoomDetail />
          </MainLayout>
        ),
        // <BookingRoomDetail />,
      },
      {
        path: 'room-bill',
        element: 'room-bill',
      },
      {
        path: path.profile,
        element: (
          <MainLayout>
            <ProfileEditor />
          </MainLayout>
        ),
      },
      {
        path: path.manager,
        element: <DashboardManager />,
        children: [
          {
            path: path.managerRooms,
            element: <ManageRoom />,
          },
          {
            path: path.managerStaff,
            element: <ManageStaff />,
          },
          {
            path: '',
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: path.staff,
        element: <DashboardStaff />,
        children: [
          {
            path: path.staffRooms,
            element: <StaffRoomOverview />,
          },
          {
            path: path.staffBooking,
            element: <StaffBookings />,
          },
          {
            path: '',
            element: <StaffWelComeback />,
          },
          {
            path: path.staffProfile,
            element: <StaffProfile />,
          },
        ],
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
