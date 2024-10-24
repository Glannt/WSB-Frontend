import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  SortDescriptor,
  Selection,
  ChipProps,
  User,
  Button,
} from '@nextui-org/react';
import { Room, Column } from '@/types/room.type';
import { EyeIcon } from '../Icons/EyeIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import React from 'react';
import { BookingStaffTable } from '@/types/bookings';

interface RoomTableProps {
  sortedItems: BookingStaffTable[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  openEdit: (booking: BookingStaffTable) => void;
  //   onDelete: (room: Room) => void;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  using: 'success', // USING
  finished: 'default', // FINISHED
  upcoming: 'warning', // UPCOMING
  cancelled: 'danger', // CANCELLED
};
const StaffBookingTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  openEdit,
  //   onDelete,
}) => {
  const translateStatusToVietnamese = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'using':
        return 'Đang sử dụng';
      case 'finished':
        return 'Đã hoàn thành';
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };

  const renderCell = React.useCallback(
    (booking: BookingStaffTable, columnKey: React.Key) => {
      const cellValue = booking[columnKey as keyof BookingStaffTable];

      switch (columnKey) {
        case 'roomId':
          return <span className="text-lg">{booking.roomId}</span>;

        case 'checkinDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize">
                {new Date(booking.checkinDate).toLocaleString()}
              </p>
            </div>
          );

        case 'checkoutDate':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg capitalize">
                {new Date(booking.checkoutDate).toLocaleString()}
              </p>
            </div>
          );

        case 'slots':
          return (
            <div className="flex flex-col">
              {booking.slots.map((slot, index) => (
                <p key={index} className="text-bold text-lg capitalize">
                  Slot {slot.timeSlotId}: {slot.timeStart} - {slot.timeEnd} (
                  {slot.status})
                </p>
              ))}
            </div>
          );

        case 'customerId':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg">{booking.customerId}</p>
            </div>
          );

        case 'totalPrice':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-lg">
                {booking.totalPrice.toLocaleString()} VNĐ
              </p>
            </div>
          );

        case 'serviceItems':
          return (
            <div className="flex flex-col">
              {Object.entries(booking.serviceItems).map(
                ([serviceName, quantity], index) => (
                  <p key={index} className="text-lg">
                    {serviceName}: {quantity}
                  </p>
                )
              )}
            </div>
          );

        case 'status':
          return (
            <Chip
              className="capitalize text-lg"
              color={statusColorMap[booking.status.toLowerCase()]}
              size="sm"
              variant="flat"
            >
              {translateStatusToVietnamese(booking.status)}
            </Chip>
          );

        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              <Button
                endContent={<EditIcon />}
                content="Chỉnh sửa"
                onClick={() => openEdit(booking)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              ></Button>
            </div>
          );

        default:
          return (
            <span className="text-lg">
              {typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue}
            </span>
          );
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
            className="text-lg"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No rooms found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.bookingId}>
            {(columnKey) => (
              <TableCell className="text-lg">
                {renderCell(item, columnKey)}{' '}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StaffBookingTable;
