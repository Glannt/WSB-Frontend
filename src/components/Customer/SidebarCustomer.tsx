import path from '@/constants/path';
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
import { useNavigate } from 'react-router';

interface SidebarProps {
  children?: React.ReactNode;
  collapse: boolean;
  hover: boolean;
}

export function SidebarAdmin({ children, collapse, hover }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* {collapse && !hover && (
        <Sidebar aria-label="Default sidebar example">
          <span className="font-bold text-black m-16">Cài đặt chung</span>
          <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
            Flowbite
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/dashboard" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/update-staff-schedule">
                Manage Staff
              </Sidebar.Item>

              <Sidebar.Item href="/dashboard/create-room">
                Manage Room
              </Sidebar.Item>

              <Sidebar.Item href="#" icon={HiInbox} label="3">
                Inbox
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )} */}
      {!collapse && hover && (
        <Sidebar aria-label="Default sidebar example">
          <span className="font-bold text-black m-8 text-2xl">
            Cài đặt chung
          </span>
          <div className="h-3"></div>
          {/* <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
            Flowbite
          </Sidebar.Logo> */}
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className="cursor-pointer"
                onClick={() => navigate(path.settings + '/edit-profile')}
                icon={HiChartPie}
              >
                Chỉnh sửa thông tin
              </Sidebar.Item>
              <Sidebar.Item
                className="cursor-pointer"
                onClick={() => navigate(path.settings + '/booking-history')}
                icon={HiViewBoards}
                label="3"
                // label="Pro"
                // labelColor="dark"
              >
                Phòng đã đặt
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiChartPie}
                className="cursor-pointer"
                onClick={() => navigate(path.settings + '/transaction-history')}
              >
                Lịch sử giao dịch
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Ví điện tử
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox}>
                Gói thành viên
              </Sidebar.Item>

              {/* <Sidebar.Item href="#" icon={HiShoppingBag}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Sign In
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                Sign Up
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
}
