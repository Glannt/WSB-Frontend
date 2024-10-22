'use client';
import React, { useState } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { ChevronDownIcon } from '../Icons/sidebar/chevron-down-icon';
import { SidebarItem } from './sidebar-item';
import { DropdownItems } from './dropdown-item';

interface Props {
  icon: React.ReactNode;
  title: string;
  items: {
    title: string;
    icon: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
  }[];
}

export const CollapseDropdownItems = ({ icon, items, title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 justify-start h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: 'data-[open=true]:-rotate-180',
            trigger:
              'py-0 min-h-[44px] hover:bg-default-100 transition-transform px-3.5 ml-0',

            title:
              'px-0 flex text-base gap-2 h-full justify-start items-start cursor-pointer',
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-6">
            {items.map((item, index) => (
              <DropdownItems
                key={index}
                icon={item.icon}
                title={item.title}
                isActive={item.isActive}
                onClick={item.onClick}
              />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
