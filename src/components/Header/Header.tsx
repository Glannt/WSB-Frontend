import * as Avatar from '@radix-ui/react-avatar';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/service/auth.api';
import { AppContext } from '@/context/app.context';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
export const Header = (props: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
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
  return (
    <>
      <header
        className={`bg-white text-white p-2 rounded-b-lg ${isScrolled ? 'shadow-md transition-shadow' : 'bg-white'}`}
      >
        <div className="container mx-auto flex justify-between items-center max-w-[1800px]">
          <div
            className={`text-4xl font-bold text-black ${!isAuthenticated ? `mr-12` : ``} `}
          >
            <span
              // fullWidth={true}
              // size="lg"
              // color="primary"
              // variant="light"
              onClick={() => navigate('/')}
              className="hover:text-violet11 font-bold cursor-pointer"
            >
              WSB
            </span>
          </div>
          <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
            <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none p-1">
              <NavigationMenu.Item className="">
                <NavigationMenu.Link
                  className=" cursor-pointer text-black hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                  onClick={() => navigate(path.home)}
                >
                  Trang chủ
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="text-black hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  Địa điểm{' '}
                  <CaretDownIcon
                    className="text-violet10 relative top-[1px] transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                  <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[300px] sm:grid-flow-col sm:grid-rows-2">
                    <ListItem
                      onClick={() => navigate(path.location)}
                      className="row-span-1"
                      href=""
                      title="Cơ sở 1"
                    >
                      TP. HCM{' '}
                    </ListItem>
                    <ListItem
                      onClick={() => navigate(path.location)}
                      className="row-span-1"
                      href=""
                      title="Cơ sở 2"
                    >
                      Hà Nội{' '}
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="text-black hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  Dịch vụ{' '}
                  <CaretDownIcon
                    className="text-violet10 relative top-[1px] transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                  <ul className=" m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-2">
                    <ListItem
                      className="cursor-pointer"
                      title="Phòng làm việc"
                      onClick={() => navigate(path.rooms)}
                    >
                      Build high-quality, accessible design systems and web
                      apps.
                    </ListItem>
                    <ListItem
                      className="cursor-pointer"
                      title="Đồ ăn"
                      onClick={() => navigate('/foods')}
                    >
                      A quick tutorial to get you up and running with Radix
                      Primitives.
                    </ListItem>
                    <ListItem
                      className="cursor-pointer"
                      title="Thiết bị"
                      onClick={() => navigate('/equipments')}
                    >
                      A quick tutorial to get you up and running with Radix
                      Primitives.
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item className="">
                <NavigationMenu.Link
                  className=" cursor-pointer text-black hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                  onClick={() => navigate(path.aboutUs)}
                >
                  Về chúng tôi
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item className="">
                <NavigationMenu.Link
                  className=" cursor-pointer text-black hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                  onClick={() => navigate(path.contact)}
                >
                  Liên hệ
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-evenly">
              <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
          </NavigationMenu.Root>
          {isAuthenticated && (
            <NavigationMenu.Root className="relative z-[1] w-auto flex justify-end">
              <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none p-1">
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="text-white hover:text-violet11 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] mr-2">
                    <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                      <Avatar.Image
                        className="h-full w-full rounded-[inherit] object-cover"
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        alt="Colm Tuite"
                      />
                      <Avatar.Fallback
                        className="text-violet11 leading-1 flex h-full w-full items-center bg-white justify-center text-[15px] font-medium"
                        delayMs={200}
                      >
                        CT
                      </Avatar.Fallback>
                    </Avatar.Root>{' '}
                    <CaretDownIcon
                      className="text-violet10 relative top-[1px] transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                      aria-hidden
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                    <ul className="m-0 grid list-none gap-x-[10px] pl-[5px] p-[10px] sm:w-[150px] sm:grid-flow-col sm:grid-rows-3">
                      <ListItem
                        className="row-span-1 cursor-pointer"
                        onClick={() =>
                          navigate(path.settings + '/edit-profile')
                        }
                        title=" Profile"
                      >
                        {' '}
                      </ListItem>
                      <ListItem className="row-span-1" href="" title="Cài đặt">
                        {' '}
                      </ListItem>
                      <ListItem
                        className="row-span-1 cursor-pointer"
                        // href="/logout"
                        title="Đăng xuất"
                        onClick={handleLogout}
                      >
                        {' '}
                      </ListItem>
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                  <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                </NavigationMenu.Indicator>
              </NavigationMenu.List>
              <div className="perspective-[2000px] absolute top-full left-[-18px] flex w-[152%] justify-evenly">
                <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[3px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
              </div>
            </NavigationMenu.Root>
          )}
          {!isAuthenticated && (
            <div className="flex flex-row gap-5 mt-4 mb-4 items-center">
              <Button
                className="bg-white text-black py-3 rounded-lg font-semibold hover:bg-blackA12 hover:text-white hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
                color="primary"
                onClick={() => navigate(path.login)}
              >
                Đăng nhập
              </Button>
              <Button
                className="bg-blackA12 text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
                color="primary"
                onClick={() => navigate(path.register)}
              >
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  title: string;
}
const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(
            'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-1 text-[15px] leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="text-violet12 mb-[4px] font-medium leading-[1.2]">
            {title}
          </div>
          <p className="text-mauve11 leading-[1.4]">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);
