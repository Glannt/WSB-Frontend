import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from '@nextui-org/react';
import { columnsRoom, statusOptions, users } from '../../data/data';
import { Column, Room, StatusOption } from '@/types/room.type';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { SearchIcon } from '../Icons/SearchIcon';
import { PlusIcon } from '../Icons/PlusIcon';

interface RoomFiltersProps {
  rooms?: Room[];
  filterValue: string;
  statusFilter: Selection;
  visibleColumns: Selection;
  statusOptions: StatusOption[];
  columns: Column[];
  onSearchChange: (value: string) => void;
  onClear: () => void;
  setStatusFilter: (keys: Selection) => void;
  setVisibleColumns: (keys: Selection) => void;
}

const StaffBookingFilter: React.FC<RoomFiltersProps> = ({
  rooms,
  filterValue,
  statusFilter,
  visibleColumns,
  statusOptions,
  columns,
  onSearchChange,
  onClear,
  setStatusFilter,
  setVisibleColumns,
}) => {
  return (
    <div className="flex justify-between gap-3 items-end">
      <Input
        isClearable
        placeholder="Search by name..."
        variant="bordered"
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={onClear}
        onValueChange={onSearchChange}
      />
      <div className="flex gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button endContent={<ChevronDownIcon />}>Trạng thái</Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={statusFilter}
            onSelectionChange={setStatusFilter}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid}>{status.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button endContent={<ChevronDownIcon />}>Cột</Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={visibleColumns}
            onSelectionChange={setVisibleColumns}
          >
            {columns.map((column) => (
              <DropdownItem key={column.uid}>{column.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default StaffBookingFilter;
