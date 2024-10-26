import { BookingRoomDetail } from '@/components/Content/BookingRoomDetail';
import { HomePage } from '@/components/Content/HomePage';
import { ListFood } from '@/components/Content/ListFood';
import { ListRoom } from '@/components/Content/ListRoom';
import Login from '@/components/Login/Login';
import ProfileEditor from '@/components/ProfileEditor/ProfileEditor';
import SignUp from '@/components/SignUp/SignUp';
import { AppContext } from '@/context/app.context';
import { MainLayout } from '@/layouts/MainLayout';
import { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import path from '@/constants/path';
import ReCAPTCHA from 'react-google-recaptcha';

import { Settings } from '@/components/Customer/Settings';
import BookingHistory from '@/components/Customer/Setting/History/Booking/BookingHistory';
// import TransactionHistory from '@/components/Customer/Setting/History/Transaction/TransactionHistory';
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
// import RoomsList from '@/components/Modal/Manager/testGET';
import { AdminDashboard } from '@/components/Manager/AdminDashboard';
import { DashboardManager } from '@/components/Manager/DashboardManager';
import { BuildingOne } from '@/components/Building/BuildingOne';
import { BuildingTwo } from '@/components/Building/BuildingTwo';
import { TypeSingle } from '@/pages/RoomType/TypeSingle';
import { TypeEvent } from '@/pages/RoomType/TypeEvent';
import { TypeMeeting } from '@/pages/RoomType/TypeMeeting';
import { TypeDouble } from '@/pages/RoomType/TypeDouble';
import { SidebarWrapper } from '@/components/sidebar/sidebar';
import { TestTable } from '@/components/Test/TestTable';
import { BookingRoomDetailMultiple } from '@/components/Content/BookingMultiple';
import TopUpPage from '@/components/Test/TopUp';
import { TestBookingRoomDetailMultiple } from '@/components/Content/TestMultipleBooking';
import {
  CustomerContext,
  CustomerProvider,
  useCustomer,
} from '@/context/customer.context';
import { setCustomerToLS } from '@/utils/auth';
import { getUser } from '@/service/customer.api';
import { useQuery } from '@tanstack/react-query';
import { Customer } from '@/types/customer.type';
import ReturnPage from '@/components/Test/ReturnPage';
import { DashboardOwner } from '@/components/Owner/DashboardOwner';
import ManageBuildings from '@/components/Owner/ManageBuildings';
import ManageManager from '@/components/Owner/ManageManager';
import Schedule from '@/components/Staff/Schedule';
import { ManagerWelComeback } from '@/components/Manager/WelcombackManager';
// import dotenv from 'dotenv';

interface ProtectedRouteProps {
  requiredRoles?: Role[]; // Optional prop for role-based protection
}

// function ProtectedRoute({ requiredRoles }: ProtectedRouteProps) {
//   const { isAuthenticated, hasRole } = useContext(AppContext);
//   const { customer, refetch } = useCustomer();
//   // Check if user is authenticated
//   if (!isAuthenticated) {
//     return <Navigate to={path.login} />; // Redirect to login if not authenticated
//   }

//   // Check if user has the required roles
//   if (requiredRoles && !hasRole(requiredRoles)) {
//     // const { customer } = useCustomer();
//      const getProfileUser = async () => {
//     const response = await getUser();
//     // console.log(response.data);

//     return response.data.data;
//   };
//   const { data: dataCustomer, refetch } = useQuery<Customer>({
//     queryKey: ['customer'],
//     queryFn: getProfileUser,
//     enabled: !customer
//   });
//   const customer = setCustomerToLS(customer);
//     return <Navigate to={path.home} />; // Redirect to home if user doesn't have required role(s)
//   }

//   // Render nested routes if authenticated and authorized
//   return <Outlet />;
// }

const ProtectedRoute = ({ requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useContext(AppContext);
  const { customer, refetch } = useCustomer(); // Get customer and refetch from context

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={path.login} />; // Redirect to login page if not authenticated
  }

  // Fetch customer profile data if needed (i.e., when roles are required)
  const getProfileUser = async () => {
    const response = await getUser();
    const customerData = response.data.data;
    setCustomerToLS(customerData); // Save customer to local storage
    return customerData;
  };

  const { data: fetchedCustomer, isLoading } = useQuery({
    queryKey: ['fetchedCustomer'],
    queryFn: getProfileUser,
    enabled: !customer, // Fetch data only if customer is not already in context
  });

  // If still loading customer profile, show a loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if the user has the required role(s)
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to={path.home} />;

    // Redirect to home if the user lacks roles
  }

  // If authenticated and has the required roles, render the nested route
  return <Outlet />;
};
type RejectedRouteProps = {
  requiredRoles?: Role[]; // Define requiredRoles as an optional prop
};
function RejectedRoute({ requiredRoles }: RejectedRouteProps) {
  const { isAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) {
    return <Outlet />;
  }
  return <ProtectedRoute />;
}

function RequireCaptcha() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = () => {
    setIsCaptchaVerified(true);
    localStorage.setItem('captchaVerified', 'true'); // Lưu trạng thái xác minh vào localStorage
    localStorage.setItem(
      'captchaVerifiedTime',
      new Date().getTime().toString()
    ); // Lưu thời gian xác minh
    console.log(import.meta.env.VITE_GOOGLE_CAPCHA_SITE_KEY);
  };
  useEffect(() => {
    // localStorage.removeItem('captchaVerified');
    // Kiểm tra xem người dùng đã xác minh reCAPTCHA chưa
    const captchaStatus = localStorage.getItem('captchaVerified');
    const verifiedTime = localStorage.getItem('captchaVerifiedTime');
    // console.log(new Date().getTime() - Number(verifiedTime) < 1800000);

    if (
      captchaStatus === 'true' &&
      verifiedTime &&
      new Date().getTime() - Number(verifiedTime) < 1800000
    ) {
      setIsCaptchaVerified(true);
    }
  }, []);
  return !isCaptchaVerified ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '20px' }}>
        Vui lòng hoàn thành reCAPTCHA để tiếp tục
      </h2>
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_GOOGLE_CAPCHA_SITE_KEY} // Thay bằng site key từ Google reCAPTCHA
        onChange={handleCaptchaChange}
      />
      {/* 6LdLoV8qAAAAAF7HWwBph0kufiITsRwjdhgbIU63 */}
    </div>
  ) : (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireCaptcha />,
  },
  // {
  //   path: '/',
  //   element: (
  //     <MainLayout>
  //       <HomePage />
  //     </MainLayout>
  //   ),
  // },
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
  {
    path: path.owner,
    element: <ProtectedRoute requiredRoles={['OWNER']} />,
    children: [
      {
        path: path.owner,
        element: <DashboardOwner />,
        children: [
          {
            path: path.manageBuilding,
            element: <ManageBuildings />,
          },
          {
            path: path.manageAccount,
            element: <ManageManager />,
          },
          {
            path: '',
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: path.staff,
    element: <ProtectedRoute requiredRoles={['STAFF']} />,
    children: [
      {
        path: path.staff,
        element: <DashboardStaff />,
        children: [
          {
            path: path.schedule,
            element: <Schedule />,
          },
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
    path: '/sidebarTest',
    element: (
      <MainLayout>
        <SidebarWrapper />
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
    element: (
      <CustomerProvider>
        <ProtectedRoute />
      </CustomerProvider>
    ),
    children: [
      {
        path: 'vnpay-return',
        element: <ReturnPage />,
      },
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
        path: 'room-booking/:roomBuilding/:roomId',
        element: (
          <MainLayout>
            <BookingRoomDetailMultiple />
            {/* <TestBookingRoomDetailMultiple /> */}
          </MainLayout>
        ),
        // <BookingRoomDetail />,
      },
      {
        path: 'room-bill',
        element: <TestTable />,
      },
      {
        path: 'top-up',
        element: (
          <MainLayout>
            <>
              <TopUpPage />
            </>
          </MainLayout>
        ),
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
            children: [],
          },
          {
            path: 'package-membership',
            element: <PackageMembership />,
          },
        ],
      },
      //ko phân quyền staff tạm thời
      // {
      //   path: path.staff,
      //   element: <DashboardStaff />,
      //   children: [
      //     {
      //       path: path.staffRooms,
      //       element: <StaffRoomOverview />,
      //     },
      //     {
      //       path: path.staffBooking,
      //       element: <StaffBookings />,
      //     },
      //     {
      //       path: '',
      //       element: <StaffWelComeback />,
      //     },
      //     {
      //       path: path.staffProfile,
      //       element: <StaffProfile />,
      //     },
      //   ],
      // },
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
