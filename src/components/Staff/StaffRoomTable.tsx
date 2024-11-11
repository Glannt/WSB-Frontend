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
import { Room, Column, RoomOverView } from '@/types/room.type';
import { EyeIcon } from '../Icons/EyeIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import React from 'react';

interface RoomTableProps {
  sortedItems: RoomOverView[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  //   onEdit: (room: Room) => void;
  //   onDelete: (room: Room) => void;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  available: 'success',
  maintenance: 'danger',
};
const StaffRoomTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  //   onEdit,
  //   onDelete,
}) => {
  const renderCell = React.useCallback(
    (room: RoomOverView, columnKey: React.Key) => {
      const cellValue = room[columnKey as keyof RoomOverView];
      // Hàm lấy tên loại phòng từ ID
      const translateStatusToVietnamese = (status: string): string => {
        switch (status.toLowerCase()) {
          case 'available':
            return 'Có thể sử dụng';
          case 'maintenance':
            return 'Bảo trì';
          default:
            return 'Không xác định'; // Default case for unknown status
        }
      };

      switch (columnKey) {
        case 'roomId':
          return <span>{room.roomId}</span>;
        case 'roomName':
          return <span>{room.roomName}</span>;

        case 'roomStatus':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[room.roomStatus.toLowerCase()]}
              size="sm"
              variant="flat"
            >
              {typeof cellValue === 'object'
                ? JSON.stringify(
                    translateStatusToVietnamese(room.roomStatus.toLowerCase())
                  )
                : translateStatusToVietnamese(room.roomStatus.toLowerCase())}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              {/* <Tooltip content="Chi tiết">
                <span
                  // onClick={() => openDetail(room)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Chỉnh sửa">
                <span
                  // onClick={() => {
                  //   onEdit(room);
                  // }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  // onClick={() => onDelete(room)}
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
      classNames={{
        th: 'text-xl',
        td: 'text-lg',
      }}
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

export default StaffRoomTable;
