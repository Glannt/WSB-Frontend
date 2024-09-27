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
import CardDataStats from '@/components/Admin/CardDataStats';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';
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

// Assuming this is your ChartSeries type
type ChartSeries = {
  name: string;
  data: number[]; // or whatever type is appropriate
  categories: string[]; // add the categories property
  type?: 'default' | 'stacked'; // optional type property
};

// Example of creating a bar series with the required categories
const barSeries: ChartSeries = {
  name: 'Sample Series',
  data: [10, 20, 30, 40], // example data points
  categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // required categories
  type: 'default', // set type appropriately
};
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
        path: '/manager',
        element: <DashboardManager />,
        children: [
          {
            path: 'manage-room',
            element: <ManageRoom />,
          },
          {
            path: 'manage-staff',
            element: <ManageStaff />,
          },
          {
            path: '',
            element: <AdminDashboard />,
            // element: <ComboChartSingleAxisExample />,
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
