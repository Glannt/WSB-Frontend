import { useState } from 'react';
import { SidebarAdmin } from './SidebarCustomer';

import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { MenuIconManager } from './MenuIconManager';
import { Navigate, Outlet, useNavigate } from 'react-router';
import ProfileEditor from '../ProfileEditor/ProfileEditor';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/service/customer.api';
import { CustomerContext } from '@/context/customer.context';
import { Customer } from '@/types/customer.type';
export const Settings = () => {
  // const getProfileUser = async () => {
  //   const response = await getUser();
  //   // console.log(response.data);

  //   return response.data.data;
  // };
  // const { data: customer, refetch } = useQuery<Customer>({
  //   queryKey: ['customer'],
  //   queryFn: getProfileUser,
  // });
  const [collapse, setCollapse] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const toggleSidebar = () => {
    setCollapse(!collapse);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="dashboard flex top-0 left-0 h-screen
    "
    >
      <div
        className={`relative transition-all duration-300 ease-in-out ${collapse || isHovered ? 'w[20%] p-0 m-0' : 'w-16'}`}
      >
        <div
          className={`h-full text-white p-4 transition-all duration-300 ease-in-out ${
            collapse || isHovered ? 'translate-x-0' : '-translate-x-full'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SidebarAdmin collapse={collapse} hover={isHovered} />

          {/* <button
            className={`absolute top-4 text-black p-2 rounded-full z-20 transition-all duration-300 ease-in-out ${
              collapse ? 'rotate-180 -right-2' : '-right-24'
            }`}
            onClick={toggleSidebar}
            aria-label={collapse ? 'Close sidebar' : 'Open sidebar'}
          >
            {collapse ? (
              <ChevronLeftCircle className="w-6 h-6" />
            ) : (
              <ChevronRightCircle className="w-6 h-6" />
            )}
          </button> */}
          {!collapse && (
            <>
              {!isHovered && (
                <div
                  className="absolute pt-16 top-0 left-16 w-16 h-full flex flex-col items-center bg-gray-50 text-black"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  aria-hidden={collapse}
                >
                  <MenuIconManager />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mainContent flex-auto max-h-screen h-vh items-stretch justify-center m-52 mt-16 border-spacing-2 border-0">
        {' '}
        <Outlet />
        {/* <ProfileEditor /> */}
      </div>
    </div>
  );
};
