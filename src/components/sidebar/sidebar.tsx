import React from 'react';
import { Sidebar } from './sidebar.styles';
import { Avatar, Tooltip } from '@nextui-org/react';
import { CompaniesDropdown } from './companies-dropdown';
import { useSidebarContext } from '@/layouts/layout-context';
import { SidebarItem } from './sidebar-item';
import { HomeIcon } from '../Icons/sidebar/home-icon';
import { SidebarMenu } from './sidebar-menu';
import { AccountsIcon } from '../Icons/sidebar/accounts-icon';
import { CollapseItems } from './collapse-items';
import { BalanceIcon } from '../Icons/sidebar/balance-icon';
import { CustomersIcon } from '../Icons/sidebar/customers-icon';
import { ProductsIcon } from '../Icons/sidebar/products-icon';
import { ReportsIcon } from '../Icons/sidebar/reports-icon';
import { SettingsIcon } from '../Icons/sidebar/settings-icon';
import { ChangeLogIcon } from '../Icons/sidebar/changelog-icon';
import { FilterIcon } from '../Icons/sidebar/filter-icon';
import { DevIcon } from '../Icons/sidebar/dev-icon';
import { ViewIcon } from '../Icons/sidebar/view-icon';

export const SidebarWrapper = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

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
            <SidebarItem title="Home" icon={<HomeIcon />} href="/" />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                title="Accounts"
                icon={<AccountsIcon />}
                href="/accounts" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={['Banks Accounts', 'Credit Cards', 'Loans']}
                title="Balances"
              /> */}
              <SidebarItem
                title="Customers"
                icon={<CustomersIcon />}
                href="/customers" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
              <SidebarItem
                title="Products"
                icon={<ProductsIcon />}
                href="/products" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
              <SidebarItem
                title="Reports"
                icon={<ReportsIcon />}
                href="/reports" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                title="Developers"
                icon={<DevIcon />}
                href="/developers" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
              <SidebarItem
                title="View Test Data"
                icon={<ViewIcon />}
                href="/view" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
              <SidebarItem
                title="Settings"
                icon={<SettingsIcon />}
                href="/settings" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                title="Changelog"
                icon={<ChangeLogIcon />}
                href="/changelog" // Thêm dấu '/' ở đầu để xác định đường dẫn tuyệt đối
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
