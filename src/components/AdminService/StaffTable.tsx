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
  statusFilter: Selection;
}
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  inactive: 'danger',
  vacation: 'warning',
};
const StaffTable: React.FC<RoomTableProps> = ({
  sortedItems,
  headerColumns,
  sortDescriptor,
  selectedKeys,
  setSelectedKeys,
  onSortChange,
  onEdit,
  statusFilter,
}) => {
  const translateStatusToVietnamese = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Đang làm việc';
      case 'inactive':
        return 'Đã nghỉ';
      case 'vacation':
        return 'Đang nghỉ phép';
      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };
  const translateWorkShiftToVietnamese = (status: string): string => {
    switch (status) {
      case 'MORNING':
        return 'Sáng';
      case 'FULL_TIME':
        return 'Cả ngày';
      case 'EVENING':
        return 'Tối';
      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };
  function translateDaysToVietnamese(workDays: string[]): string[] {
    const daysMap: { [key: string]: string } = {
      SUNDAY: 'Chủ Nhật',
      MONDAY: 'Thứ Hai',
      TUESDAY: 'Thứ Ba',
      WEDNESDAY: 'Thứ Tư',
      THURSDAY: 'Thứ Năm',
      FRIDAY: 'Thứ Sáu',
      SATURDAY: 'Thứ Bảy',
      Mon: 'Thứ Hai',
      Tue: 'Thứ Ba',
      Wed: 'Thứ Tư',
      Thu: 'Thứ Năm',
      Fri: 'Thứ Sáu',
      Sat: 'Thứ Bảy',
    };

    return workDays.map((day: string) => daysMap[day] || day); // Specify 'day' as type string
  }
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
              {translateWorkShiftToVietnamese(staff.workShift)}
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
              {translateDaysToVietnamese(
                typeof staff.workDays === 'string'
                  ? staff.workDays.split(',').map((day) => day.trim()) // Split string into an array and trim whitespace
                  : staff.workDays // If already an array, just pass it
              ).join(', ')}
            </p>
          </div>
        );
      case 'status':
        return (
          <Chip
            content="Details"
            className="capitalize"
            color={statusColorMap[staff.status.toLowerCase()]}
            size="sm"
            variant="flat"
          >
            {translateStatusToVietnamese(staff.status)}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-center gap-5">
            <Button
              content="Chỉnh sửa nhân viên"
              className="bg-violet-100 cursor-pointer"
              onClick={() => {
                onEdit(staff);
              }}
              endContent={
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              }
            ></Button>
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
      <TableBody
        emptyContent={'Không tìm thấy nhân viên nào'}
        items={sortedItems}
      >
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
