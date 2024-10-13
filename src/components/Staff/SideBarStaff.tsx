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
