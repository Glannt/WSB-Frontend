import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { PlusIcon } from '../../../../Icons/PlusIcon';
import { VerticalDotsIcon } from '../../../../Icons/VerticalDotsIcon';
import { ChevronDownIcon } from '../../../../Icons/ChevronDownIcon';
import { SearchIcon } from '../../../../Icons/SearchIcon';
import { capitalize } from '../../../utils';
import { roomStatuses } from '@/data/dataStatusRoom';
import { roomTypes } from '../../../../../data/dataRoomType';
import BookingFilter from './BookingFilter';
import { statusOptionsBooking } from '@/data/data';
import BookingTable from './BookingTable';
import BookingPagination from './BookingPagination';
import { useQuery } from '@tanstack/react-query';
import { CustomerOrderBookingHistory, SlotBooking } from '@/types/bookings';
import { getHistoryBooking } from '@/service/customer.api';
import { Room } from '@/types/room.type';

const statusOptions = [
  { name: 'Đang sử dụng', uid: 'using' },
  { name: 'Hoàn thành', uid: 'finished' },
  { name: 'Sắp tới', uid: 'upcoming' },
];

const columns = [
  { name: 'ID', uid: 'bookingId', sortable: true }, // Based on bookingId field
  { name: 'Thời gian', uid: 'checkinDate', sortable: true }, // Date of booking
  { name: 'Phòng', uid: 'room', sortable: true }, // Room name from `room.roomName`
  { name: 'Đơn giá', uid: 'totalPrice', sortable: true }, // Amount for the booking
  { name: 'Thời gian Slot', uid: 'slot', sortable: false }, // Display time slot from `slot.timeStart - slot.timeEnd`
  { name: 'Tình trạng', uid: 'status' }, // Status of the booking
  { name: 'Thêm dịch vụ', uid: 'actions' }, // Actions column for any additional operations
];

const statusColorMap: Record<string, ChipProps['color']> = {
  using: 'success',
  finished: 'danger',
  upcoming: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = [
  'bookingId',
  'checkinDate',
  'room',
  'totalPrice',
  'slot',
  'status',
  'actions',
];

export default function BookingHistory() {
  const getHistoryBookingApi = async () => {
    const response = await getHistoryBooking();
    return response.data.data;
  };

  const { data: bookings = [], refetch } = useQuery<
    CustomerOrderBookingHistory[]
  >({
    queryKey: ['bookings'],
    queryFn: getHistoryBookingApi,
  });

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'checkinDate',
    direction: 'ascending',
  });
  const [value, setValue] = React.useState(new Set([]));
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredBookings = [...bookings];

    if (hasSearchFilter) {
      filteredBookings = filteredBookings.filter((booking) =>
        booking.totalPrice.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredBookings = filteredBookings.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    return filteredBookings;
  }, [bookings, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      // Compare checkinDate
      const firstCheckInDate = new Date(a.checkinDate).getTime();
      const secondCheckInDate = new Date(b.checkinDate).getTime();

      if (firstCheckInDate !== secondCheckInDate) {
        return sortDescriptor.direction === 'ascending'
          ? secondCheckInDate - firstCheckInDate // Ascending order
          : firstCheckInDate - secondCheckInDate; // Descending order
      }

      // If checkinDate is the same, compare roomName
      const firstRoomName = (a.room as Room)?.roomName || '';
      const secondRoomName = (b.room as Room)?.roomName || '';

      return sortDescriptor.direction === 'ascending'
        ? firstRoomName.localeCompare(secondRoomName)
        : secondRoomName.localeCompare(firstRoomName);
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  return (
    <div className="h-40 mt-5 ml-5 mr-5">
      <BookingFilter
        statusOptions={statusOptionsBooking}
        columns={columns}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <BookingTable
        headerColumns={headerColumns}
        items={items}
        sortedItems={sortedItems}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        setSelectedKeys={setSelectedKeys}
        onSortChange={setSortDescriptor}
      />
      <BookingPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        setPage={setPage}
      />
    </div>
  );
}