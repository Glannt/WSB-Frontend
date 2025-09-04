import path from '@/constants/path';
import { getProfileFromLS } from '@/utils/auth';
import {
  BadgeIcon,
  EditIcon,
  GroupIcon,
  HistoryIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from 'lucide-react';

import { useNavigate } from 'react-router';
import { Sidebar } from '../sidebar';

interface SidebarProps {
  children?: React.ReactNode;
  collapse: boolean;
  hover: boolean;
}

export function SidebarCustomer({ children, collapse, hover }: SidebarProps) {
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
        // <Sidebar aria-label="Default sidebar example">
        //   <span className="font-bold text-black m-8 text-2xl">
        //     Cài đặt chung
        //   </span>
        //   <div className="h-3"></div>
        //   {/* <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
        //     Flowbite
        //   </Sidebar.Logo> */}
        //   <Sidebar.Items>
        //     <Sidebar.ItemGroup>
        //       <Sidebar.Item
        //         className="cursor-pointer"
        //         onClick={() => navigate(path.settings + '/edit-profile')}
        //         icon={EditIcon}
        //       >
        //         Chỉnh sửa thông tin
        //       </Sidebar.Item>
        //       <Sidebar.Item
        //         className="cursor-pointer"
        //         onClick={() => navigate(path.settings + '/booking-history')}
        //         icon={HistoryIcon}
        //         // label="3"
        //         // label="Pro"
        //         // labelColor="dark"
        //       >
        //         Phòng đã đặt
        //       </Sidebar.Item>
        //       <Sidebar.Item
        //         icon={WalletIcon}
        //         className="cursor-pointer"
        //         onClick={() => navigate(path.settings + '/transaction-history')}
        //       >
        //         Ví của tôi
        //       </Sidebar.Item>
        //       <Sidebar.Item
        //         className="cursor-pointer"
        //         onClick={() => navigate(path.settings + '/package-membership')}
        //         icon={UserIcon}
        //       >
        //         Gói thành viên
        //       </Sidebar.Item>
        //       {/* <Sidebar.Item href="#" icon={HiInbox}>
        //         Gói thành viên
        //       </Sidebar.Item> */}

        //       {/* <Sidebar.Item href="#" icon={HiShoppingBag}>
        //         Products
        //       </Sidebar.Item>
        //       <Sidebar.Item href="#" icon={HiArrowSmRight}>
        //         Sign In
        //       </Sidebar.Item>
        //       <Sidebar.Item href="#" icon={HiTable}>
        //         Sign Up
        //       </Sidebar.Item> */}
        //     </Sidebar.ItemGroup>
        //   </Sidebar.Items>
        // </Sidebar>
        <div className="flex min-h-screen border-r border-gray-200 rounded-r-md shadow-lg/20">
          <Sidebar>
            <span className="font-bold m-6 text-2xl text-foreground">
              Cài đặt chung
            </span>

            <Sidebar.Group>
              <Sidebar.Item
                icon="lucide:edit"
                onClick={() => navigate(path.settings + '/edit-profile')}
              >
                Chỉnh sửa thông tin
              </Sidebar.Item>

              <Sidebar.Item
                icon="lucide:history"
                onClick={() => navigate(path.settings + '/booking-history')}
              >
                Phòng đã đặt
              </Sidebar.Item>

              <Sidebar.Item
                icon="lucide:wallet"
                onClick={() => navigate(path.settings + '/transaction-history')}
              >
                Ví của tôi
              </Sidebar.Item>

              <Sidebar.Item
                icon="lucide:user"
                onClick={() => navigate(path.settings + '/package-membership')}
              >
                Gói thành viên
              </Sidebar.Item>
            </Sidebar.Group>
          </Sidebar>
        </div>
      )}
    </>
  );
}
