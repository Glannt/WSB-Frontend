import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Button,
  SortDescriptor,
  Selection,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ChipProps,
} from '@nextui-org/react';
import { CustomerOrderBookingHistory } from '@/types/bookings';
import { PlusIcon } from '@/components/Icons/PlusIcon';
import { Column } from '@/types/room.type';

interface BookingTableProps {
  headerColumns: Column[];
  items: any[];
  sortedItems: any[];
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
}

const statusColorMap: Record<string, ChipProps['color']> = {
  using: 'success',
  finished: 'danger',
  upcoming: 'warning',
};
const BookingTable: React.FC<BookingTableProps> = ({
  headerColumns,
  items,
  sortedItems,
  selectedKeys,
  sortDescriptor,
  setSelectedKeys,
  onSortChange,
}) => {
  const renderCell = React.useCallback(
    (user: CustomerOrderBookingHistory, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof CustomerOrderBookingHistory];

      switch (columnKey) {
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {user.status === 'finished' && 'Hoàn thành'}
              {user.status === 'upcoming' && 'Sắp tới'}
              {user.status === 'using' && 'Đang sử dụng'}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center items-center gap-2 h-10">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className={`${user.status === 'finished' ? 'btn-disabled' : ''}`}
                    size="sm"
                    variant="light"
                  >
                    <PlusIcon className="font-bold" />
                    {/* <VerticalDotsIcon className="text-default-300" /> */}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Thêm thiết bị</DropdownItem>
                  <DropdownItem>Thêm đồ ăn, uống</DropdownItem>
                  {/* <DropdownItem>Delete</DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  return (
    <Table
      isStriped
      aria-label="Room table"
      isHeaderSticky
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      onSelectionChange={setSelectedKeys}
      onSortChange={onSortChange}
      className="h-[300px] max-h-[300px] overflow-y-auto"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BookingTable;
