import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ModeToggle from '../ModeToggle/ModeToggle';
import { CaretDownIcon } from '@radix-ui/react-icons';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
export const Header = (props: any) => {
  return (
    <>
      <header className="bg-[#E0FFFA] text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <a href="/" className="hover:text-gray-300">
              My Website
            </a>
          </div>
          <ModeToggle
            className="absolute right-9 top-9 md:right-8 md:top-9
        "
          />
          <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center ">
            <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none p-1">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="text-white hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  Learn{' '}
                  <CaretDownIcon
                    className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                  <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[300px] sm:grid-flow-col sm:grid-rows-2">
                    <ListItem className="row-span-1" href="" title="Cơ sở 1">
                      {' '}
                    </ListItem>
                    <ListItem className="row-span-1" href="" title="Cơ sở 2">
                      {' '}
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="text-white hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  Dịch vụ{' '}
                  <CaretDownIcon
                    className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                  <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                    <ListItem title="Phòng làm việc" href="">
                      Build high-quality, accessible design systems and web
                      apps.
                    </ListItem>
                    <ListItem title="Đồ ăn " href="">
                      A quick tutorial to get you up and running with Radix
                      Primitives.
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item className="">
                <NavigationMenu.Link
                  className="text-white hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                  href=""
                >
                  Contact
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
          <NavigationMenu.Root className="relative z-[1] w-80 flex justify-end">
            <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none p-1">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="text-white hover:text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  User{' '}
                  <CaretDownIcon
                    className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                  <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[300px] sm:grid-flow-col sm:grid-rows-3">
                    <ListItem
                      className="row-span-1"
                      href=""
                      title=" Edit Profile"
                    >
                      {' '}
                    </ListItem>
                    <ListItem className="row-span-1" href="" title="Settings">
                      {' '}
                    </ListItem>
                    <ListItem className="row-span-1" href="" title="Logout">
                      {' '}
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>
            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-evenly">
              <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[5px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
          </NavigationMenu.Root>
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
          <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
            {title}
          </div>
          <p className="text-mauve11 leading-[1.4]">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);
