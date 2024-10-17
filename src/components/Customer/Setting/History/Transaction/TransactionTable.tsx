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
import { Transaction } from '@/types/customer.type';

interface BookingTableProps {
  headerColumns: any[];
  items: Transaction[];
  sortedItems: Transaction[];
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  // openModal: (booking: CustomerOrderBookingHistory) => void;
}

const statusColorMap: Record<string, ChipProps['color']> = {
  completed: 'success',
  FINISHED: 'primary',
  UPCOMING: 'warning',
};
const translateStatus = (status: string) => {
  const translations: Record<string, string> = {
    FINISHED: 'Hoàn thành',
    UPCOMING: 'Sắp tới',
    using: 'Đang sử dụng',
  };

  return translations[status] || status; // Fallback to the original status if not found
};
const TransactionTable: React.FC<BookingTableProps> = ({
  headerColumns,
  items,
  sortedItems,
  selectedKeys,
  sortDescriptor,
  setSelectedKeys,
  onSortChange,
  // openModal,
}) => {
  // console.log(
  //   'aaaaaaaa ' + items.find((item) => item.transactionId === '1')?.type
  // );

  const renderCell = React.useCallback(
    (user: Transaction, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof Transaction];

      switch (columnKey) {
        case 'id':
          return (
            <div className="relative flex items-center gap-2 h-10">
              {user.transactionId}
            </div>
          );
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {user.status === 'completed' && 'Thành công'}
              {user.status === 'cancelled' && 'Thất bại'}
              {user.status === 'pending' && 'Đang xử lý'}
            </Chip>
          );

        case 'actions':
          return (
            <div className="relative flex justify-center items-center gap-2 h-10">
              {user.type}
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
      <TableBody
        emptyContent={'Không lịch sử giao dịch nào'}
        items={sortedItems}
      >
        {items.map((item) => (
          <TableRow key={item.transactionId}>
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

export default TransactionTable;
