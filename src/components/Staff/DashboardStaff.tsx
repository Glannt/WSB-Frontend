import { useState } from 'react';

import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  ChevronRightCircle,
  FlagTriangleLeft,
  FlagTriangleRight,
} from 'lucide-react';
import { SidebarStaff } from './SideBarStaff';
import { MenuIconStaff } from './MenuIconStaff';

export const Dashboard = () => {
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
          className={`h-full text-white p-4 transition-all duration-300 ease-in-out ${
            collapse || isHovered ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarStaff collapse={collapse} hover={isHovered} />

          <button
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
          </button>
          {!collapse && (
            <>
              {!isHovered && (
                <div
                  className="absolute pt-16 top-0 left-16 w-16 h-full bg-gray-100 flex flex-col items-center bg-gray-50 text-black"
                  //   onMouseEnter={handleMouseEnter}
                  //   onMouseLeave={handleMouseLeave}
                  aria-hidden={collapse}
                >
                  <MenuIconStaff />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mainContent flex-1 m-9 bg-gray-100">
        {' '}
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p>
          This is the main content area. It will adjust based on the sidebar's
          state.
        </p>
      </div>
    </div>
  );
};
