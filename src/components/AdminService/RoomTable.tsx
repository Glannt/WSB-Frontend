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
} from '@nextui-org/react';
import { Room, Column } from '@/types/room.type';
import { EyeIcon } from '../Icons/EyeIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import React from 'react';

interface RoomTableProps {
  sortedItems: Room[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  // renderCell: (
  //   room: Room,
  //   columnKey: React.Key
  // ) => string | number | JSX.Element;
  onEdit: (room: Room) => void;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  available: 'success',
  maintenance: 'danger',
  // vacation: 'warning',
};
const RoomTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  onEdit,
}) => {
  const renderCell = React.useCallback((room: Room, columnKey: React.Key) => {
    const cellValue = room[columnKey as keyof Room];
    // Hàm lấy tên loại phòng từ ID
    const getRoomTypeNameById = (id: string): string | undefined => {
      const roomType = room.roomType; // Lấy trực tiếp từ room
      return roomType ? roomType.roomTypeName : undefined;
    };
    switch (columnKey) {
      case 'roomName':
        return (
          <User
            // avatarProps={{ radius: 'lg', src: room.avatar }}
            // description={room.email}
            name={
              typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue
            }
          >
            {room.roomName}
          </User>
        );
      case 'roomType':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {getRoomTypeNameById(String(room.roomType.id))}
            </p>
          </div>
        );
      case 'creationTime':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {typeof room.creationTime === 'string'
                ? new Date(room.creationTime).toLocaleString()
                : room.creationTime}
            </p>
          </div>
        );
      case 'staffs':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {room.staffAtRoom} {/* Lấy danh sách tên nhân viên */}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {room.staffAtRoom.length > 1
                ? `${room.staffAtRoom.length} nhân viên phụ trách`
                : `${room.staffAtRoom.length} nhân viên phụ trách`}
            </p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[room.status]}
            size="sm"
            variant="flat"
          >
            {typeof cellValue === 'object'
              ? JSON.stringify(cellValue)
              : cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-center gap-5">
            <Tooltip content="Chi tiết">
              <span
                // onClick={() => openDetail(room)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Chỉnh sửa">
              <span
                onClick={() => {
                  onEdit(room);
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return (
          <span>
            {typeof cellValue === 'object'
              ? JSON.stringify(cellValue)
              : cellValue}
          </span>
        );
    }
  }, []);
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
      <TableBody emptyContent={'No rooms found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.roomId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)} </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RoomTable;
