import React from 'react';

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

export const SidebarAdmin = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const navigate = useNavigate();
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
              onClick={() => navigate(path.home)}
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                title="Dashboard"
                icon={<AccountsIcon />}
                onClick={() => navigate(path.manager)}
              />

              <SidebarItem
                title="Quản lý nhân viên"
                icon={<CustomersIcon />}
                onClick={() => navigate(path.managerStaff)}
              />
              <SidebarItem
                title="Quản lý phòng"
                icon={<ProductsIcon />}
                onClick={() => navigate(path.managerRooms)}
              />

              <SidebarItem
                title="Đăng xuất"
                icon={<SettingsIcon />}
                onClick={() => navigate(path.logout)} // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
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
