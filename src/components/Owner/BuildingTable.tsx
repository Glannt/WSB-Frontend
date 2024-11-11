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

interface RoomTableProps {
  sortedItems: Building[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  onEdit: (building: Building) => void;
  onDelete: (building: Building) => void;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  available: 'success',
  maintenance: 'danger',
  // vacation: 'warning',
};
const BuildingTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  onEdit,
  onDelete,
}) => {
  const renderCell = React.useCallback(
    (building: Building, columnKey: React.Key) => {
      const cellValue = building[columnKey as keyof Building];
      switch (columnKey) {
        case 'buildingName':
          return (
            <User
              // avatarProps={{ radius: 'lg', src: room.avatar }}
              // description={room.email}
              name={
                typeof cellValue === 'object'
                  ? JSON.stringify(cellValue)
                  : cellValue
              }
              className="text-lg"
            >
              {building.buildingName}
            </User>
          );
        case 'location':
          return <span className="text-lg">{building.buildingLocation}</span>;
        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              <Tooltip content="Chi tiết">
                <span
                  // onClick={() => openDetail(room)}
                  className="text-xl text-default-400 cursor-pointer active:opacity-50" // Increase icon size
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Chỉnh sửa">
                <span
                  onClick={() => {
                    onEdit(building);
                  }}
                  className="text-xl text-default-400 cursor-pointer active:opacity-50" // Increase icon size
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span
                  onClick={() => onDelete(building)}
                  className="text-xl text-danger cursor-pointer active:opacity-50" // Increase icon size
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return (
            <span className="text-lg">
              {' '}
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
        td: 'text-lg',
        th: 'text-xl',
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
      <TableBody emptyContent={'Không có cơ sở'} items={sortedItems}>
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

export default BuildingTable;
