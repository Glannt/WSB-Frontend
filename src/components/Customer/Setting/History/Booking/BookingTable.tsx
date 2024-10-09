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
  UPCOMING: 'warning',
};
const translateStatus = (status: string) => {
  const translations: Record<string, string> = {
    finished: 'Hoàn thành',
    UPCOMING: 'Sắp tới',
    using: 'Đang sử dụng',
  };

  return translations[status] || status; // Fallback to the original status if not found
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
    (booking: CustomerOrderBookingHistory, columnKey: React.Key) => {
      const cellValue = booking[columnKey as keyof CustomerOrderBookingHistory];
      console.log(columnKey);

      switch (columnKey) {
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[booking.status]}
              size="sm"
              variant="flat"
            >
              {translateStatus(booking.status) || booking.status}
            </Chip>
          );
        case 'room':
          // Render room information like room name
          const room = booking.room;
          return room ? (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{room.roomName}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {room.price} USD
              </p>
            </div>
          ) : (
            'N/A'
          );
        case 'slot':
          // Render slot information (assuming there can be multiple slots)
          const slots = booking.slot;
          return slots && slots.length > 0 ? (
            <div>
              {slots.map((slot, index) => (
                <div key={index}>
                  {slot.timeStart} - {slot.timeEnd}
                </div>
              ))}
            </div>
          ) : (
            'N/A'
          );
        case 'actions':
          return (
            <div className="relative flex justify-center items-center gap-2 h-10">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className={`${booking.status === 'finished' ? 'btn-disabled' : ''}`}
                    size="sm"
                    variant="light"
                  >
                    <PlusIcon className="font-bold" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Thêm thiết bị</DropdownItem>
                  <DropdownItem>Thêm đồ ăn, uống</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          // Default case for simple values like strings or numbers
          return typeof cellValue === 'string' || typeof cellValue === 'number'
            ? cellValue
            : 'N/A';
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
      <TableBody emptyContent={'Không có đơn đặt nào'} items={sortedItems}>
        {items.map((item) => (
          <TableRow key={item.bookingId}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingTable;