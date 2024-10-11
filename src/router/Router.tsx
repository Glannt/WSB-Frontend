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

import { Settings } from '@/components/Customer/Settings';
import BookingHistory from '@/components/Customer/Setting/History/Booking/BookingHistory';
import TransactionHistory from '@/components/Customer/Setting/History/Transaction/TransactionHistory';
import MyWallet from '@/components/Customer/MyWallet';
import PackageMembership from '@/components/Customer/PackageMembership';
import ChangePassword from '@/components/ProfileEditor/ChangePassword';
import ManageRoom from '@/components/AdminService/ManageRoom';
import ManageStaff from '@/components/AdminService/ManageStaff';

import EquipmentList from '@/components/Content/ListEquipment';
import { DashboardStaff } from '@/components/Staff/DashboardStaff';
import { StaffWelComeback } from '@/components/Staff/StaffWelcomeback';
import StaffBookings from '@/components/Staff/StaffBookings';
import StaffRoomOverview from '@/components/Staff/StaffRoomOverview';
import { StaffProfile } from '@/components/Staff/StaffProfie';
import AboutUs from '@/components/AboutUs/AboutUs';
import RoomDetail from '@/components/Content/RoomDetail';

import Location from '@/components/Content/Location';
import Contact from '@/Contact/Contact';

import { Role } from '@/types/user.type';
import RoomsList from '@/components/Modal/Manager/testGET';
import { AdminDashboard } from '@/components/Manager/AdminDashboard';
import { DashboardManager } from '@/components/Manager/DashboardManager';
import { BuildingOne } from '@/components/Building/BuildingOne';
import { BuildingTwo } from '@/components/Building/BuildingTwo';
import { TypeSingle } from '@/pages/RoomType/TypeSingle';
import { TypeEvent } from '@/pages/RoomType/TypeEvent';
import { TypeMeeting } from '@/pages/RoomType/TypeMeeting';
import { TypeDouble } from '@/pages/RoomType/TypeDouble';
interface ProtectedRouteProps {
  requiredRoles?: Role[]; // Optional prop for role-based protection
}

function ProtectedRoute({ requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useContext(AppContext);

  // Check if user is authenticated
  if (isAuthenticated) {
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
    path: path.contact,
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
  },
  {
    path: path.location,
    element: (
      <MainLayout>
        <Location />
      </MainLayout>
    ),
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
    path: path.aboutUs,
    element: (
      <MainLayout>
        <AboutUs />
      </MainLayout>
    ),
  },
  {
    path: 'single-space',
    element: (
      <MainLayout>
        <TypeSingle />
      </MainLayout>
    ),
  },
  {
    path: 'double-space',
    element: (
      <MainLayout>
        <TypeDouble />
      </MainLayout>
    ),
  },
  {
    path: 'meeting-space',
    element: (
      <MainLayout>
        <TypeMeeting />
      </MainLayout>
    ),
  },
  {
    path: 'event-space',
    element: (
      <MainLayout>
        <TypeEvent />
      </MainLayout>
    ),
  },
  {
    path: 'building-1',
    element: (
      <MainLayout>
        <BuildingOne />
      </MainLayout>
    ),
  },
  {
    path: 'building-2',
    element: (
      <MainLayout>
        <BuildingTwo />
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
            <RoomDetail />
          </MainLayout>
        ),
        // <BookingRoomDetail />,
      },
      {
        path: 'room-booking/:roomId',
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
        path: path.settings,
        element: (
          <MainLayout>
            <Settings />
          </MainLayout>
        ),
        children: [
          {
            path: 'edit-profile',
            element: (
              // <MainLayout>
              <ProfileEditor />
              // </MainLayout>
            ),
          },
          {
            path: 'change-password',
            element: (
              // <MainLayout>
              <ChangePassword />
              // </MainLayout>
            ),
          },
          {
            path: 'booking-history',
            element: <BookingHistory />,
          },
          {
            path: 'transaction-history',
            element: <MyWallet />,
          },
          {
            path: 'package-membership',
            element: <PackageMembership />,
          },
        ],
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
