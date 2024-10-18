import React from 'react';
import clsx from 'clsx';
import { useSidebarContext } from '@/layouts/layout-context';

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void | undefined;
}

export const SidebarItem = ({ icon, title, isActive, onClick }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
    if (onClick) {
      // Check if onClick is defined before invoking
      onClick();
    }
  };

  return (
    <a
      className="text-default-900 active:bg-none max-w-full"
      onClick={handleClick}
    >
      <div
        className={clsx(
          isActive
            ? 'bg-primary-100 [&_svg_path]:fill-primary-500'
            : 'hover:bg-default-100',
          'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]'
        )}
      >
        {icon}
        <span className="text-default-900">{title}</span>
      </div>
    </a>
  );
};
