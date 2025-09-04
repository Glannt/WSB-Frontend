import React from 'react';
import { Icon } from '@iconify/react';
import { Divider } from '@heroui/react';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

interface SidebarItemProps {
  children: React.ReactNode;
  icon?: string;
  label?: string;
  labelColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
  className?: string;
}

interface SidebarGroupProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarContext = React.createContext({
  collapsed: false,
});

export const Sidebar = ({ children, className = '' }: SidebarProps) => {
  return (
    <SidebarContext.Provider value={{ collapsed: false }}>
      <aside
        className={`w-64 h-full bg-content1 border-r border-divider shadow-xs ${className}`}
      >
        <div className="h-full flex flex-col">{children}</div>
      </aside>
    </SidebarContext.Provider>
  );
};

const SidebarGroup = ({ children, className = '' }: SidebarGroupProps) => {
  return <div className={`px-3 py-2 ${className}`}>{children}</div>;
};

const SidebarItem = ({
  children,
  icon,
  label,
  labelColor = 'primary',
  onClick,
  className = '',
}: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 hover:bg-default-100 text-foreground hover:text-foreground-900 ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          <Icon icon={icon} className="w-5 h-5" />
        </div>
      )}
      <span className="flex-grow text-lg">{children}</span>
      {label && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full bg-${labelColor}-100 text-${labelColor}-700`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

const SidebarLogo = ({
  children,
  img,
  imgAlt = 'Logo',
  href = '#',
  className = '',
}: {
  children: React.ReactNode;
  img: string;
  imgAlt?: string;
  href?: string;
  className?: string;
}) => {
  return (
    <a href={href} className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <img src={img} alt={imgAlt} className="w-8 h-8" />
      <span className="text-xl font-semibold">{children}</span>
    </a>
  );
};

// Attach sub-components
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;
Sidebar.Logo = SidebarLogo;
