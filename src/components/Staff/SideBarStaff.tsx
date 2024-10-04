import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import path from '@/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface SidebarProps {
  children?: React.ReactNode;
  collapse: boolean;
  hover: boolean;
}

export function SidebarStaff({ children, collapse, hover }: SidebarProps) {
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
          <Sidebar.Logo href="/staff" img="/favicon.svg" imgAlt="Flowbite logo">
            Flowbite
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Collapse icon={HiInbox} label="Quản lý phòng">
                <Sidebar.Item
                  className={`${activeItem === path.staffRooms ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                  onClick={() => handleItemClick('roomStatus', path.staffRooms)}
                >
                  Trạng thái phòng
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => handleItemClick('booking', path.staffBooking)}
                  className={`${activeItem === path.staffBooking ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                >
                  Đơn đặt phòng
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item
                onClick={() => handleItemClick('shift', path.staffShift)}
                className={`${activeItem === path.staffShift ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                icon={HiViewBoards}
              >
                Lịch làm việc
              </Sidebar.Item>
              <Sidebar.Item
                onClick={() => handleItemClick('profile', path.staffProfile)}
                className={`${activeItem === path.staffProfile ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                icon={HiUser}
              >
                Thông tin cá nhân
              </Sidebar.Item>
              <Sidebar.Item
                onClick={() => handleItemClick('logout', path.logout)}
                className={`${activeItem === path.logout ? 'bg-slate-600 text-white' : ''} hover:text-gray-900 hover:bg-gray-100`}
                icon={HiArrowSmRight}
              >
                Logout
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
