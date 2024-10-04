import path from '@/constants/path';
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
          <Sidebar.Logo href="" img="/favicon.svg" imgAlt="Flowbite logo">
            WSB
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className={`${activeItem === 'dashboard' ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100 transition duration-300 cursor-pointer`}
                onClick={() => handleItemClick('dashboard', path.manager)}
                icon={HiChartPie}
              >
                Bảng điều khiển
              </Sidebar.Item>

              <Sidebar.Item
                className={`${activeItem === 'manage-staff' ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100 transition duration-300 cursor-pointer`}
                onClick={() =>
                  handleItemClick('manage-staff', path.managerStaff)
                }
                icon={HiUser}
              >
                Quản lý nhân viên
              </Sidebar.Item>

              <Sidebar.Item
                className={`${activeItem === 'manage-room' ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100 transition duration-300 cursor-pointer`}
                onClick={() =>
                  handleItemClick('manage-room', path.managerRooms)
                }
                icon={HiInbox}
              >
                Quản lý phòng
              </Sidebar.Item>

              <Sidebar.Item
                className="target: active:bg-slate-600 transition duration-300"
                href="#"
                icon={HiArrowSmRight}
                label="3"
              >
                Đăng xuất
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
