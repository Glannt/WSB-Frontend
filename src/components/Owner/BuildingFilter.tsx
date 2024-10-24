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
  onAddRoom: () => void;
  setStatusFilter: (keys: Selection) => void;
  setVisibleColumns: (keys: Selection) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BuildingFilter: React.FC<RoomFiltersProps> = ({
  buildings,
  filterValue,
  statusFilter,
  visibleColumns,
  statusOptions,
  columns,
  onSearchChange,
  onClear,
  onAddRoom,
  setStatusFilter,
  setVisibleColumns,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-end gap-3 items-end">
      <div className="flex gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="text-lg py-2 px-4"
              endContent={<ChevronDownIcon />}
            >
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
          className="text-lg py-2 px-4"
          color="primary"
          endContent={<PlusIcon />}
          onClick={onAddRoom}
        >
          Thêm cơ sở
        </Button>
      </div>
    </div>
  );
};

export default BuildingFilter;
