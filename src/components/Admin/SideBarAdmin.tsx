import { Sidebar } from 'flowbite-react';
import { useState } from 'react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import { useNavigate } from 'react-router';

interface SidebarProps {
  children?: React.ReactNode;
  collapse: boolean;
  hover: boolean;
  className?: string;
}

export function SidebarAdmin({
  children,
  collapse,
  hover,
  className,
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>('');
  const handleItemClick = (item: string, path: string) => {
    setActiveItem(item); // Cập nhật item đang active
    navigate(path); // Điều hướng đến trang tương ứng
  };
  const navigate = useNavigate();
  return (
    <>
      {collapse && !hover && (
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
            Flowbite
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className={`${activeItem === 'dashboard' ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                onClick={() => handleItemClick('dashboard', '/manager')}
                icon={HiChartPie}
              >
                Dashboard
              </Sidebar.Item>

              <Sidebar.Item
                className={`${activeItem === 'manage-staff' ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                onClick={() =>
                  handleItemClick('manage-staff', '/manager/manage-staff')
                }
              >
                Manage Staff
              </Sidebar.Item>

              <Sidebar.Item
                className={`${activeItem === 'manage-room' ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                onClick={() =>
                  handleItemClick('manage-room', '/manager/manage-room')
                }
              >
                Manage Room
              </Sidebar.Item>

              <Sidebar.Item
                className="target: active:bg-slate-600"
                href="#"
                icon={HiInbox}
                label="3"
              >
                Inbox
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
      {!collapse && hover && (
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
            Flowbite
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
                label="Pro"
                labelColor="dark"
              >
                Kanban
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiShoppingBag} label="Manage Staff">
                <Sidebar.Item href="#">
                  Arrange schedules for staff
                </Sidebar.Item>
                <Sidebar.Item href="#">Assign staff to room</Sidebar.Item>
                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                <Sidebar.Item href="#">Shipping</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiShoppingBag} label="Manage Room">
                <Sidebar.Item href="#">Create Room</Sidebar.Item>
                <Sidebar.Item href="#">Update Room</Sidebar.Item>
                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                <Sidebar.Item href="#">Shipping</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item href="#" icon={HiInbox} label="3">
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Sign In
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                Sign Up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
}
