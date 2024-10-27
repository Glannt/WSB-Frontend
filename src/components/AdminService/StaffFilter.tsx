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
import { Staff } from '@/types/staff.type';

interface StaffFiltersProps {
  staffs?: Staff[];
  filterValue: string;
  statusFilter: Selection;
  visibleColumns: Selection;
  statusOptions: StatusOption[];
  columns: Column[];
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onAddStaff: () => void;
  setStatusFilter: (keys: Selection) => void;
  setVisibleColumns: (keys: Selection) => void;
}

const StaffFilter: React.FC<StaffFiltersProps> = ({
  staffs,
  filterValue,
  statusFilter,
  visibleColumns,
  statusOptions,
  columns,
  onSearchChange,
  onClear,
  onAddStaff,
  setStatusFilter,
  setVisibleColumns,
}) => {
  const translateStatusToVietnamese = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Đang làm việc';
      case 'inactive':
        return 'Đã nghỉ';
      case 'vacation':
        return 'Đang nghỉ phép';
      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };
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
              <DropdownItem key={status.uid}>
                {translateStatusToVietnamese(status.name)}
              </DropdownItem>
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
        <Button color="primary" endContent={<PlusIcon />} onClick={onAddStaff}>
          Thêm nhân viên
        </Button>
      </div>
    </div>
  );
};

export default StaffFilter;
