import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { logout } from '@/service/auth.api';
import { AppContext } from '@/context/app.context';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Divider,
  DropdownSection,
  User,
  CircularProgress,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
import { getProfileFromLS, getRoleName } from '@/utils/auth';
import { useCustomer } from '@/context/customer.context';
import { AccountsIcon } from '../Icons/sidebar/accounts-icon';
import ThemeSwitcher from '../ModeToggle/SwitchTheme';
import { getWalletByUserId } from '@/service/customer.api';
import { Wallet } from '@/types/customer.type';
import { ChevronDownIcon } from 'lucide-react';
import { Icon } from '@iconify/react';
export const Header = (props: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState<string>('');
  const profile = getProfileFromLS();
  const { customer, isLoading, refetch } = useCustomer();
  const [wallet, setWallet] = useState<string>('0');
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
  // const getWalletByUserIdApi = async () => {
  //   const response = await getWalletByUserId(profile.userId);
  //   return response.data.data;
  // };

  // const { data: wallet } = useQuery<Wallet>({
  //   queryKey: ['wallet'],
  //   queryFn: getWalletByUserIdApi,
  // });
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (profile !== null) {
      setRoleName(profile.roleName);
    }
  });
  useEffect(() => {
    refetch();
    if (customer?.wallet?.amount !== undefined) {
      const formattedWallet = new Intl.NumberFormat('vi-VN').format(
        Number(customer.wallet.amount)
      );
      setWallet(formattedWallet);
    } else {
      setWallet('0'); // Nếu không có customer, đặt giá trị là '0'
    }
  }, [customer]);

  const chevron = <ChevronDownIcon fill="currentColor" />;
  const removeQuotes = (str: string) => {
    return str.replace(/['"]+/g, ''); // Removes both single and double quotes
  };
  const roleNameRemoveQuotes = removeQuotes(roleName);
  const sidebarItems = [
    {
      title: 'Chỉnh sửa trang cá nhân', // Room Status
      icon: <AccountsIcon />, // Replace with actual icon
      onClick: () => {
        navigate(path.settings + '/edit-profile');
        // Add navigation or action logic here
      },
    },
    {
      title: 'Lịch sử đặt phòng', // Booking Status
      icon: <AccountsIcon />, // Replace with actual icon

      onClick: () => {
        navigate(path.settings + '/booking-history');
        // Add navigation or action logic here
      },
    },
    {
      title: 'Gói thành viên', // Booking Status
      icon: <AccountsIcon />, // Replace with actual icon

      onClick: () => {
        navigate(path.settings + '/package-membership');
        // Add navigation or action logic here
      },
    },
  ];
  return (
    <>
      {isLoading && (
        <>
          <CircularProgress
            className="flex justify-center items-center"
            title="Đang tải"
            size="lg"
          />
        </>
      )}
      <div className="mx-auto flex justify-between items-center shadow-lg shadow-gray-300">
        <Navbar
          className="h-24 shadow-md transition-colors duration-300 text-foreground bg-background dark:bg-white light:bg-black"
          maxWidth="full"
          isBordered
          classNames={{
            item: [
              'flex',
              'relative',
              'h-full',
              'items-center',
              "data-[active=true]:after:content-['']",
              'data-[active=true]:after:absolute',
              'data-[active=true]:after:bottom-0',
              'data-[active=true]:after:left-0',
              'data-[active=true]:after:right-0',
              'data-[active=true]:after:h-[2px]',
              'data-[active=true]:after:rounded-[2px]',
              'data-[active=true]:after:bg-primary',
            ],
            wrapper: 'max-w-full px-4',
          }}
        >
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <span
              // fullWidth={true}
              // size="lg"
              // color="primary"
              // variant="light"
              onClick={() => navigate('/')}
              className="ml-10 text-4xl hover:text-violet11 font-bold cursor-pointer"
            >
              WSB
            </span>
          </NavbarBrand>
          <NavbarItem
            isActive={window.location.pathname === '/'}
            className="mx-10"
          >
            <Link
              onClick={() => navigate(path.home)}
              className="cursor-pointer text-start hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none"
              aria-current="page"
            >
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <Dropdown>
              <NavbarItem
                isActive={window.location.pathname === path.location}
                className="mx-10"
              >
                <DropdownTrigger className="hover:bg-violet3  group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none">
                  <Button
                    disableRipple
                    className="cursor-pointer p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-violet11 hover:bg-violet3 focus:shadow-violet7"
                    endContent={chevron}
                    radius="sm"
                    variant="light"
                  >
                    Địa điểm
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-3xs dark:bg-white light:bg-dark shadow-lg shadow-lg/20 shadow-gray-300"
                itemClasses={{
                  base: 'gap-4',
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  // description="Cơ sở 1"
                  onClick={() => navigate(path.location)}
                  // startContent={icons.scale}
                >
                  <span className="text-lg font-semibold">TP. HCM</span>
                </DropdownItem>
                {/* <DropdownItem
                  key="usage_metrics"
                  description="Cơ sở 2"
                  onClick={() => navigate(path.location)}

                  // startContent={icons.activity}
                >
                  Hà Nội
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <NavbarItem
                isActive={[path.rooms, path.foods, path.equipments].includes(
                  window.location.pathname
                )}
                className="mx-10 "
              >
                <DropdownTrigger className=" group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none">
                  <Button
                    disableRipple
                    className="cursor-pointer p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 "
                    endContent={chevron}
                    radius="sm"
                    variant="light"
                  >
                    Dịch vụ
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-3xs dark:bg-white light:bg-dark shadow-lg shadow-lg/20 shadow-gray-300"
                itemClasses={{
                  base: 'gap-4',
                }}
              >
                <DropdownItem
                  showDivider
                  key="workspaces"
                  // description="Nơi làm việc"
                  className="cursor-pointer font-semibold pt-2 pb-3"
                  onClick={() => navigate(path.rooms)}
                  // startContent={icons.scale}
                  // title="Phòng làm việc"
                  classNames={{
                    base: 'pt-3 pb-3',
                  }}
                >
                  <span className="text-lg font-semibold">Phòng làm việc</span>
                </DropdownItem>
                <DropdownItem
                  showDivider
                  key="amenities"
                  // description="Thiết bị đi kèm"
                  className="cursor-pointer pt-2 pb-3"
                  onClick={() => navigate(path.equipments)}
                  // startContent={icons.activity}
                >
                  <span className="text-lg font-semibold">Thiết bị</span>
                </DropdownItem>
                <DropdownItem
                  isDisabled
                  showDivider
                  key="food"
                  // description="Thức ăn đi kèm"
                  className="cursor-pointer text-start text-lg pt-2 pb-3"
                  onClick={() => navigate(path.foods)}
                  // startContent={icons.activity}
                >
                  <span className="text-lg font-semibold">Đồ ăn</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavbarItem
              isActive={window.location.pathname === path.aboutUs}
              className="mx-10"
            >
              <Link
                className="cursor-pointer text-start hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none"
                onClick={() => navigate(path.aboutUs)}
                aria-current="page"
              >
                Về chúng tôi
              </Link>
            </NavbarItem>
            <NavbarItem
              isActive={window.location.pathname === path.contact}
              className="mx-10"
            >
              <Link
                color="foreground"
                className="cursor-pointer text-start hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-4 py-2 text-[15px] font-medium leading-none no-underline outline-none"
                onClick={() => navigate(path.contact)}
              >
                Liên hệ
              </Link>
            </NavbarItem>
          </NavbarContent>
          {!isAuthenticated && (
            <NavbarContent justify="end" className="mr-10">
              <NavbarItem className="cursor-pointer hidden lg:flex">
                <Button
                  className="bg-white text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
                  onClick={() => navigate(path.login)}
                >
                  Đăng nhập
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  onClick={() => navigate(path.register)}
                  className="cursor-pointer bg-black text-white py-3 rounded-lg font-semibold hover:text-white hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
                  as={Link}
                  color="default"
                  variant="flat"
                >
                  Đăng ký
                </Button>
              </NavbarItem>
            </NavbarContent>
          )}
          {/* {isAuthenticated && (
            <NavbarContent as="div" justify="end" className="mr-10">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <div className="flex gap-3 items-center">
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <User
                      // isBordered
                      as="button"
                      className="transition-transform"
                      // color="secondary"
                      name={customer?.fullName}
                      // size="lg"
                      // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="shadow"
                  className="p-4"
                >
                  <DropdownSection showDivider>
                    <DropdownItem
                      showDivider
                      key="wallet"
                      className="row-span-1 cursor-pointer pt-3 pb-3"
                      startContent={<FaWallet className="text-lg mr-2" />}
                      endContent={
                        <span
                          onClick={() =>
                            navigate(path.settings + '/transaction-history')
                          }
                          className="text-violet-400 font-semibold text-lg"
                        >
                          {wallet} VNĐ
                        </span>
                      }
                    >
                      <span className=" text-lg">Ví:</span>
                    </DropdownItem>
                    <DropdownItem
                      showDivider
                      key="settings"
                      className="row-span-1 cursor-pointer text-lg pt-3 pb-3"
                      closeOnSelect={false}
                      // onClick={() => navigate(path.settings + '/edit-profile')}
                    >
                      <div className="bg-white">
                        <CollapseDropdownItems
                          title="Cài đặt chung"
                          icon={<SettingsIcon />}
                          items={sidebarItems}
                        />
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      showDivider
                      key="logout"
                      className="row-span-1 cursor-pointer text-lg pt-3 pb-3"
                      // href="/logout"
                      onClick={handleLogout}
                      color="danger"
                      startContent={<span className="text-lg">Đăng xuất</span>}
                    ></DropdownItem>
                    <DropdownItem
                      key="theme-switcher"
                      closeOnSelect={false}
                      className="pt-3 pb-3"
                    >
                      <ThemeSwitcher />
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          )} */}

          {isAuthenticated && (
            <NavbarContent as="div" justify="end" className="mr-10">
              <Dropdown placement="bottom-end">
                {' '}
                // Changed to bottom-end for better positioning
                <DropdownTrigger>
                  <div className="flex gap-3 items-center cursor-pointer">
                    {' '}
                    // Added cursor-pointer
                    <Avatar
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      className="transition-transform"
                    />
                    <User
                      as="button"
                      className="transition-transform"
                      name={customer?.fullName}
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="shadow"
                  className="p-4 w-72" // Added width for consistent sizing
                >
                  <DropdownSection showDivider>
                    <DropdownItem
                      showDivider
                      key="wallet"
                      className="cursor-pointer py-3" // Simplified padding
                      startContent={
                        <Icon icon="lucide:wallet" className="text-lg" />
                      } // Replaced FaWallet with Iconify
                      endContent={
                        <span
                          onClick={() =>
                            navigate(path.settings + '/transaction-history')
                          }
                          className="text-primary font-semibold text-lg"
                        >
                          {wallet} VNĐ
                        </span>
                      }
                    >
                      <span className="text-lg">Ví:</span>
                    </DropdownItem>
                    <DropdownItem
                      key="edit-profile"
                      className="cursor-pointer py-2"
                      startContent={
                        <Icon icon="lucide:user" className="text-lg" />
                      }
                      onClick={() => navigate(path.settings + '/edit-profile')}
                    >
                      <span className="text-medium">Chỉnh sửa thông tin</span>
                    </DropdownItem>
                    <DropdownItem
                      key="booking-history"
                      className="cursor-pointer py-2"
                      startContent={
                        <Icon icon="lucide:history" className="text-lg" />
                      }
                      onClick={() =>
                        navigate(path.settings + '/booking-history')
                      }
                    >
                      <span className="text-medium">Phòng đã đặt</span>
                    </DropdownItem>
                    <DropdownItem
                      key="package-membership"
                      className="cursor-pointer py-2"
                      startContent={
                        <Icon icon="lucide:package" className="text-lg" />
                      }
                      onClick={() =>
                        navigate(path.settings + '/package-membership')
                      }
                    >
                      <span className="text-medium">Gói thành viên</span>
                    </DropdownItem>
                    <DropdownItem
                      showDivider
                      key="logout"
                      className="cursor-pointer py-3 mt-2"
                      onClick={handleLogout}
                      color="danger"
                      startContent={
                        <Icon icon="lucide:log-out" className="text-lg" />
                      }
                    >
                      <span className="text-medium">Đăng xuất</span>
                    </DropdownItem>
                    <DropdownItem
                      key="theme-switcher"
                      closeOnSelect={false}
                      className="py-3"
                    >
                      <ThemeSwitcher />
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          )}
        </Navbar>
      </div>
    </>
  );
};
