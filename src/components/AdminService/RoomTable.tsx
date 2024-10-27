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

interface RoomTableProps {
  sortedItems: Room[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  openDetail: (room: Room) => void;
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
  onDelete,
  openDetail,
}) => {
  const translateStatusToVietnamese = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'Có thể sử dụng';
      case 'maintenance':
        return 'Đang bảo trì';

      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };
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
                ? room.creationTime
                : room.creationTime}
            </p>
          </div>
        );
      case 'staffs':
        return (
          <div className="flex flex-col">
            {room.staff.length > 0 ? (
              room.staff.map((staffMember) => (
                <p
                  key={staffMember.userId}
                  className="text-bold text-small capitalize"
                >
                  {staffMember.fullName} {/* Lấy danh sách tên nhân viên */}
                </p>
              ))
            ) : (
              <p className="text-default-400">Không có nhân viên phụ trách</p>
            )}
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[room.status.toLowerCase()]}
            size="sm"
            variant="flat"
          >
            {translateStatusToVietnamese(room.status)}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-center gap-5">
            <Button
              content="Chi tiết"
              color="default"
              className="bg-violet-100"
            >
              <span
                onClick={() => openDetail(room)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </Button>
            <Button
              content="Chỉnh sửa"
              color="default"
              className="bg-violet-100"
            >
              <span
                onClick={() => {
                  onEdit(room);
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Button>
            {/* <Tooltip color="danger" content="Xóa">
              <span
                onClick={() => onDelete(room)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip> */}
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
      <TableBody emptyContent={'Không tìm thấy phòng'} items={sortedItems}>
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
