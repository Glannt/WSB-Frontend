import { useState } from 'react';
import { SidebarAdmin } from './SideBarManager';

import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { MenuIconManager } from './MenuIconManager';
import { Outlet } from 'react-router';
import { ManagerProvider } from '@/context/manager.context';

export const DashboardManager = () => {
  const [collapse, setCollapse] = useState<boolean>(true);
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
          className={`h-screen text-white transition-all duration-300 ease-in-out ${
            collapse || isHovered ? 'translate-x-0' : '-translate-x-full'
          }`}
          //   onMouseEnter={handleMouseEnter}
          //   onMouseLeave={handleMouseLeave}
        >
          <SidebarAdmin />

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
                  //   onMouseEnter={handleMouseEnter}
                  //   onMouseLeave={handleMouseLeave}
                  aria-hidden={collapse}
                >
                  <MenuIconManager />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mainContent flex-auto w-full max-h-screen items-stretch justify-center p-5 border-spacing-2 overflow-y-auto mt-7 ">
        {' '}
        <ManagerProvider>
          <Outlet />
        </ManagerProvider>
      </div>
    </div>
  );
};
