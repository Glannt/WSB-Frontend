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
import BookingFilter from './BookingFilter';
import { statusOptionsBooking } from '@/data/data';
import BookingTable from './BookingTable';
import BookingPagination from './BookingPagination';
import { useQuery } from '@tanstack/react-query';
import { CustomerOrderBookingHistory, SlotBooking } from '@/types/bookings';
import { getHistoryBooking, getService } from '@/service/customer.api';
import { AddMoreServices } from '@/components/Modal/Customer/AddMoreServices';
import { Services } from '@/types/service.type';
import { ConfirmCancelBooking } from '@/components/Modal/Customer/ConfirmCancelBooking';

const columns = [
  { name: 'ID', uid: 'bookingId', sortable: true }, // Based on bookingId field
  { name: 'Thời gian bắt đầu sử dụng', uid: 'checkinDate', sortable: true }, // Date of booking
  { name: 'Thời gian hoàn thành', uid: 'checkoutDate', sortable: true },
  { name: 'Phòng', uid: 'room', sortable: true }, // Room name from `room.roomName`
  { name: 'Đơn giá', uid: 'totalPrice', sortable: true }, // Amount for the booking
  { name: 'Thời gian Slot', uid: 'slot', sortable: false }, // Display time slot from `slot.timeStart - slot.timeEnd`
  { name: 'Dịch vụ', uid: 'services' },
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
  'checkoutDate',
  'room',
  'totalPrice',
  'slot',
  'status',
  'services',
  'actions',
];

export default function BookingHistory() {
  const getServiceApi = async () => {
    const response = await getService();
    return response.data.data;
  };

  const { data: services = [] } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });
  const getHistoryBookingApi = async () => {
    const response = await getHistoryBooking();
    console.log(response.data.data);

    return response.data.data;
  };

  const { data: bookings = [], refetch } = useQuery<
    CustomerOrderBookingHistory[]
  >({
    queryKey: ['bookings'],
    queryFn: getHistoryBookingApi,
  });
  console.log('bookings', bookings);

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
  const [isCancelBooking, setIsCancelBooking] = React.useState<boolean>(false);

  const [page, setPage] = React.useState(1);
  const [isOpenService, setIsOpenServices] = React.useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] =
    React.useState<CustomerOrderBookingHistory | null>(null);
  const openModal = (booking: CustomerOrderBookingHistory) => {
    setIsOpenServices(true);
    setSelectedBooking(booking);
  };
  const closeModal = () => {
    setIsOpenServices(false);
    refetch();
  };

  const openCancel = (booking: CustomerOrderBookingHistory) => {
    setIsCancelBooking(true);
    setSelectedBooking(booking);
  };
  const closeCancel = () => {
    setIsCancelBooking(false);
    refetch();
  };
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredBookings = [...bookings];

    // if (hasSearchFilter) {
    //   filteredBookings = filteredBookings.filter((booking) =>
    //     booking.totalPrice.toLowerCase().includes(filterValue.toLowerCase())
    //   );
    // }
    // console.log('statusFilter', statusFilter);

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptionsBooking.length
    ) {
      filteredBookings = filteredBookings.filter((x) =>
        Array.from(statusFilter).includes(x.status.toLowerCase())
      );
    }
    // filteredBookings = filteredBookings.sort((a, b) => {
    //   const firstCreationTime = new Date(a.checkinDate).getTime();
    //   const secondCreationTime = new Date(b.checkinDate).getTime();
    //   return secondCreationTime - firstCreationTime; // Mới nhất trước
    // });
    return filteredBookings;
  }, [bookings, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // const sortedItems = React.useMemo(() => {
  //   return [...items].sort((a, b) => {
  //     // Compare checkinDate
  //     const firstCheckInDate = new Date(a.checkinDate).getTime();
  //     const secondCheckInDate = new Date(b.checkinDate).getTime();

  //     if (firstCheckInDate !== secondCheckInDate) {
  //       return sortDescriptor.direction === 'ascending'
  //         ? secondCheckInDate - firstCheckInDate // Ascending order
  //         : firstCheckInDate - secondCheckInDate; // Descending order
  //     }

  //     // If checkinDate is the same, compare roomName
  //     const firstRoomName = a.roomId || '';
  //     const secondRoomName = b.roomId || '';

  //     return sortDescriptor.direction === 'descending'
  //       ? firstRoomName.localeCompare(secondRoomName)
  //       : secondRoomName.localeCompare(firstRoomName);
  //   });
  // }, [sortDescriptor, items]);
  // console.log('sortedItems', sortedItems);

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
        items={items}
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
        sortedItems={items}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        setSelectedKeys={setSelectedKeys}
        onSortChange={setSortDescriptor}
        openModal={openModal}
        openCancel={openCancel}
      />
      <BookingPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        setPage={setPage}
      />
      {isOpenService && (
        <AddMoreServices
          services={services}
          refetchBooking={refetch}
          isOpen={isOpenService}
          onClose={closeModal}
          booking={selectedBooking}
        />
      )}
      {isCancelBooking && (
        <ConfirmCancelBooking
          showConfirmCancleBooking={isCancelBooking}
          booking={selectedBooking}
          onClose={closeCancel}
          refetchBooking={refetch}
        />
      )}
    </div>
  );
}
