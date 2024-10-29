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
import React, { useContext } from 'react';
import { logout } from '@/service/auth.api';
import { useMutation } from '@tanstack/react-query';
import { AppContext } from '@/context/app.context';
import { TimerIcon, UserRound } from 'lucide-react';

export const SidebarStaff = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AppContext);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
    // navigate('/');
  };
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
                navigate('');
              }}
            />

            <SidebarMenu title="Main Menu">
              <SidebarItem
                title="Lịch làm việc"
                icon={<TimerIcon />}
                isActive={activeItem === 'Lịch làm việc'}
                onClick={() => {
                  navigate(path.schedule);
                  setActiveItem('Lịch làm việc');
                }}
              />
              <CollapseItems
                title="Quản lý phòng"
                icon={<BalanceIcon />}
                items={sidebarItems}
              />
              <SidebarItem
                title="Thông tin cá nhân"
                isActive={activeItem === 'Thông tin cá nhân'}
                icon={<UserRound className="text-gray-300" />}
                onClick={() => {
                  navigate(path.staffProfile);
                  setActiveItem('Thông tin cá nhân');
                  // navigate(path.logout);
                }}
              />
              <SidebarItem
                title="Đăng xuất"
                icon={<SettingsIcon />}
                onClick={() => {
                  handleLogout();
                  setActiveItem('Đăng xuất');
                  // navigate(path.logout);
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
