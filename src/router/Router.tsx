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
import { DashboardManager } from '@/components/Manager/DashboardManager';
import ManageRoom from '@/components/AdminService/ManageRoom';
import ManageStaff from '@/components/AdminService/ManageStaff';

import EquipmentList from '@/components/Content/ListEquipment';
import { DashboardStaff } from '@/components/Staff/DashboardStaff';
import { StaffWelComeback } from '@/components/Staff/StaffWelcomeback';
import StaffBookings from '@/components/Staff/StaffBookings';
import StaffRoomOverview from '@/components/Staff/StaffRoomOverview';
import { StaffProfile } from '@/components/Staff/StaffProfie';
import { Role } from '@/types/user.type';
import RoomsList from '@/components/Modal/Manager/testGET';
import { AdminDashboard } from '@/components/Manager/AdminDashboard';
interface ProtectedRouteProps {
  requiredRoles?: Role[]; // Optional prop for role-based protection
}

function ProtectedRoute({ requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useContext(AppContext);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={path.login} />; // Redirect to login if not authenticated
  }

  // Check if user has the required roles
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to={path.home} />; // Redirect to home if user doesn't have required role(s)
  }

  // Render nested routes if authenticated and authorized
  return <Outlet />;
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
    path: path.rooms,
    element: (
      <MainLayout>
        <ListRoom />
      </MainLayout>
    ),
  },
  {
    path: path.equipments,
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
    path: path.foods,
    element: (
      <MainLayout>
        <ListFood />
      </MainLayout>
    ),
  },
  {
    path: path.manager,
    element: <ProtectedRoute requiredRoles={['MANAGER']} />, // Only accessible by Manager or Owner
    children: [
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
    ],
  },
  // {
  //   path: path.staff,
  //   element: <ProtectedRoute requiredRoles={['STAFF']} />,
  //   children: [
  //     {
  //       path: path.staff,
  //       element: <DashboardStaff />,
  //       children: [
  //         {
  //           path: path.staffRooms,
  //           element: <StaffRoomOverview />,
  //         },
  //         {
  //           path: path.staffBooking,
  //           element: <StaffBookings />,
  //         },
  //         {
  //           path: '',
  //           element: <StaffWelComeback />,
  //         },
  //         {
  //           path: path.staffProfile,
  //           element: <StaffProfile />,
  //         },
  //       ],
  //     },
  //   ],
  // },
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
        element: <RoomsList />,
      },
      {
        path: path.profile,
        element: (
          <MainLayout>
            <ProfileEditor />
          </MainLayout>
        ),
      },
      //ko phân quyền staff tạm thời
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
