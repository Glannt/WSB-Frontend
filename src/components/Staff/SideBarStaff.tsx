// import { Sidebar } from 'flowbite-react';
// import {
//   HiArrowSmRight,
//   HiChartPie,
//   HiInbox,
//   HiShoppingBag,
//   HiTable,
//   HiUser,
//   HiViewBoards,
// } from 'react-icons/hi';
// import path from '@/constants/path';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';

// interface SidebarProps {
//   children?: React.ReactNode;
//   collapse: boolean;
//   hover: boolean;
// }

// export function SidebarStaff({ children, collapse, hover }: SidebarProps) {
//   const [activeItem, setActiveItem] = useState<string>('');
//   const handleItemClick = (item: string, path: string) => {
//     setActiveItem(item); // Cập nhật item đang active
//     navigate(path); // Điều hướng đến trang tương ứng
//   };
//   const navigate = useNavigate();
//   return (
//     <>
//       {collapse && !hover && (
//         <Sidebar aria-label="Default sidebar example">
//           <Sidebar.Logo href="/staff" img="/favicon.svg" imgAlt="Flowbite logo">
//             Flowbite
//           </Sidebar.Logo>
//           <Sidebar.Items>
//             <Sidebar.ItemGroup>
//               <Sidebar.Collapse icon={HiInbox} label="Quản lý phòng">
//                 <Sidebar.Item
//                   className={`${activeItem === path.staffRooms ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
//                   onClick={() => handleItemClick('roomStatus', path.staffRooms)}
//                 >
//                   Trạng thái phòng
//                 </Sidebar.Item>
//                 <Sidebar.Item
//                   onClick={() => handleItemClick('booking', path.staffBooking)}
//                   className={`${activeItem === path.staffBooking ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
//                 >
//                   Đơn đặt phòng
//                 </Sidebar.Item>
//               </Sidebar.Collapse>
//               <Sidebar.Item
//                 onClick={() => handleItemClick('shift', path.staffShift)}
//                 className={`${activeItem === path.staffShift ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
//                 icon={HiViewBoards}
//               >
//                 Lịch làm việc
//               </Sidebar.Item>
//               <Sidebar.Item
//                 onClick={() => handleItemClick('profile', path.staffProfile)}
//                 className={`${activeItem === path.staffProfile ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
//                 icon={HiUser}
//               >
//                 Thông tin cá nhân
//               </Sidebar.Item>
//               <Sidebar.Item
//                 onClick={() => handleItemClick('logout', path.logout)}
//                 className={`${activeItem === path.logout ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
//                 icon={HiArrowSmRight}
//               >
//                 Logout
//               </Sidebar.Item>
//             </Sidebar.ItemGroup>
//           </Sidebar.Items>
//         </Sidebar>
//       )}
//       {!collapse && hover && (
//         <Sidebar aria-label="Default sidebar example">
//           <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
//             Flowbite
//           </Sidebar.Logo>
//           <Sidebar.Items>
//             <Sidebar.ItemGroup>
//               <Sidebar.Item href="#" icon={HiChartPie}>
//                 Dashboard
//               </Sidebar.Item>
//               <Sidebar.Item
//                 href="#"
//                 icon={HiViewBoards}
//                 label="Pro"
//                 labelColor="dark"
//               >
//                 Kanban
//               </Sidebar.Item>
//               <Sidebar.Collapse icon={HiShoppingBag} label="Manage Staff">
//                 <Sidebar.Item href="#">
//                   Arrange schedules for staff
//                 </Sidebar.Item>
//                 <Sidebar.Item href="#">Assign staff to room</Sidebar.Item>
//                 <Sidebar.Item href="#">Refunds</Sidebar.Item>
//                 <Sidebar.Item href="#">Shipping</Sidebar.Item>
//               </Sidebar.Collapse>
//               <Sidebar.Collapse icon={HiShoppingBag} label="Manage Room">
//                 <Sidebar.Item href="#">Create Room</Sidebar.Item>
//                 <Sidebar.Item href="#">Update Room</Sidebar.Item>
//                 <Sidebar.Item href="#">Refunds</Sidebar.Item>
//                 <Sidebar.Item href="#">Shipping</Sidebar.Item>
//               </Sidebar.Collapse>
//               <Sidebar.Item href="#" icon={HiInbox} label="3">
//                 Inbox
//               </Sidebar.Item>
//               <Sidebar.Item href="#" icon={HiUser}>
//                 Users
//               </Sidebar.Item>
//               <Sidebar.Item href="#" icon={HiShoppingBag}>
//                 Products
//               </Sidebar.Item>
//               <Sidebar.Item href="#" icon={HiArrowSmRight}>
//                 Sign In
//               </Sidebar.Item>
//               <Sidebar.Item href="#" icon={HiTable}>
//                 Sign Up
//               </Sidebar.Item>
//             </Sidebar.ItemGroup>
//           </Sidebar.Items>
//         </Sidebar>
//       )}
//     </>
//   );
// }
import { Avatar, Tooltip } from '@nextui-org/react';
import { useSidebarContext } from '@/layouts/layout-context';
import { HomeIcon } from '../Icons/sidebar/home-icon';
import { AccountsIcon } from '../Icons/sidebar/accounts-icon';
import { CustomersIcon } from '../Icons/sidebar/customers-icon';
import { ProductsIcon } from '../Icons/sidebar/products-icon';
import { SettingsIcon } from '../Icons/sidebar/settings-icon';
import { FilterIcon } from '../Icons/sidebar/filter-icon';
import { Sidebar } from '../sidebar/sidebar.styles';
import { CompaniesDropdown } from '../sidebar/companies-dropdown';
import { SidebarItem } from '../sidebar/sidebar-item';
import { SidebarMenu } from '../sidebar/sidebar-menu';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
import { CollapseItems } from '../sidebar/collapse-items';
import { BalanceIcon } from '../Icons/sidebar/balance-icon';
import React from 'react';

export const SidebarStaff = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const [activeItem, setActiveItem] = React.useState<string | null>('Home');
  const navigate = useNavigate();
  const sidebarItems = [
    {
      title: 'Trạng thái phòng', // Room Status
      icon: <AccountsIcon />, // Replace with actual icon
      isActive: activeItem === 'Trạng thái phòng', // Set the active state based on your logic
      onClick: () => {
        setActiveItem('Trạng thái phòng');
        navigate(path.staffRooms);
        // Add navigation or action logic here
      },
    },
    {
      title: 'Đơn đặt phòng', // Booking Status
      icon: <AccountsIcon />, // Replace with actual icon
      isActive: activeItem === 'Đơn đặt phòng', // Set the active state based on your logic
      onClick: () => {
        setActiveItem('Đơn đặt phòng');
        navigate(path.staffBooking);
        // Add navigation or action logic here
      },
    },
  ];
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed && (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      )}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={activeItem === 'Home'}
              onClick={() => {
                setActiveItem('Home');
                navigate(path.home);
              }}
            />

            <SidebarMenu title="Main Menu">
              <CollapseItems
                title="Quản lý phòng"
                icon={<BalanceIcon />}
                items={sidebarItems}
              />

              <SidebarItem
                title="Đăng xuất"
                icon={<SettingsIcon />}
                onClick={() => {
                  setActiveItem('Đăng xuất');
                  navigate(path.logout);
                }}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={'Settings'} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Adjustments'} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Profile'} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
