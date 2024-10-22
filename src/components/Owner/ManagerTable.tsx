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
import { Building } from '@/types/building.type';
import { Manager } from '@/types/manager.type';

interface RoomTableProps {
  sortedItems: Manager[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  //   onEdit: (manager: Manager) => void;
  onDelete: (manager: Manager) => void;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  available: 'success',
  maintenance: 'danger',
  // vacation: 'warning',
};
const ManagerTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  //   onEdit,
  onDelete,
}) => {
  const renderCell = React.useCallback(
    (manager: Manager, columnKey: React.Key) => {
      const cellValue = manager[columnKey as keyof Manager];
      switch (columnKey) {
        // case 'buildingName':
        //   return (
        //     <User
        //       // avatarProps={{ radius: 'lg', src: room.avatar }}
        //       // description={room.email}
        //       name={
        //         typeof cellValue === 'object'
        //           ? JSON.stringify(cellValue)
        //           : cellValue
        //       }
        //     >
        //       {manager.fullName}
        //     </User>
        //   );
        // case 'location':
        //   return (
        //     <span
        //     // avatarProps={{ radius: 'lg', src: room.avatar }}
        //     // description={room.email}
        //     >
        //       {manager.buildingId}
        //     </span>
        //   );

        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              <Tooltip content="Chi tiết">
                <span
                  //   onClick={() => openDetail(room)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Chỉnh sửa">
                <span
                  onClick={() => {
                    // onEdit(manager);
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  onClick={() => onDelete(manager)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
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
      <TableBody emptyContent={'Không có quản lý nào'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.buildingId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)} </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ManagerTable;
