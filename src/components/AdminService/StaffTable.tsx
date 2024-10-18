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
import { Staff } from '@/types/staff.type';

interface RoomTableProps {
  sortedItems: Staff[];
  headerColumns: Column[];
  sortDescriptor: SortDescriptor;
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  onSortChange: (descriptor: SortDescriptor) => void;
  // renderCell: (
  //   room: Room,
  //   columnKey: React.Key
  // ) => string | number | JSX.Element;
  onEdit: (staff: Staff) => void;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  maintenance: 'danger',
  // vacation: 'warning',
};
const StaffTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  onEdit,
}) => {
  const renderCell = React.useCallback((staff: Staff, columnKey: React.Key) => {
    const cellValue = staff[columnKey as keyof Staff];
    if (Array.isArray(cellValue)) {
      return cellValue.join(', ');
    }
    switch (columnKey) {
      case 'userId':
        return <span>{staff.userId}</span>;
      case 'fullName':
        return (
          <User
            // avatarProps={{ radius: 'lg', src: staff.avatar }}
            // description={staff.email}
            name={
              typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue
            }
          >
            {staff.email}
          </User>
        );
      case 'workShift':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue}
            </p>
          </div>
        );
      case 'dateOfBirth':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue}
            </p>
          </div>
        );
      case 'roomInCharge':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue}
            </p>
          </div>
        );
      case 'workDays':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {staff.workDays}
            </p>
          </div>
        );
      case 'status':
        return (
          <Chip
            content="Details"
            className="capitalize"
            color={statusColorMap[staff.status]}
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
            <Tooltip content="Chỉnh sửa nhân viên">
              <span
                onClick={() => {
                  onEdit(staff);
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa nhân viên">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
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
          <TableRow key={item.userId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)} </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StaffTable;
