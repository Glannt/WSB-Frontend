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
import { Building } from '@/types/building.type';

interface RoomFiltersProps {
  buildings?: Building[];
  filterValue: string;
  statusFilter: Selection;
  visibleColumns: Selection;
  statusOptions: StatusOption[];
  columns: Column[];
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onAddManager: () => void;
  setStatusFilter: (keys: Selection) => void;
  setVisibleColumns: (keys: Selection) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ManagerFilter: React.FC<RoomFiltersProps> = ({
  //   buildings,
  filterValue,
  statusFilter,
  visibleColumns,
  statusOptions,
  columns,
  onSearchChange,
  onClear,
  onAddManager,
  setStatusFilter,
  setVisibleColumns,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-end gap-4 items-end">
      <div className="flex gap-4">
        <Dropdown>
          <DropdownTrigger>
            <Button size="lg" endContent={<ChevronDownIcon />}>
              Cột
            </Button>
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
        <Button
          size="lg"
          color="primary"
          endContent={<PlusIcon />}
          onClick={onAddManager}
        >
          Thêm quản lý
        </Button>
      </div>
    </div>
  );
};

export default ManagerFilter;
