import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Tooltip,
  Chip,
  Selection,
  ChipProps,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  SortDescriptor,
  Divider,
} from '@nextui-org/react';
import { SearchIcon } from '../Icons/SearchIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { EyeIcon } from '../Icons/EyeIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { capitalize } from '../AdminService/utils';
import StaffBookingFilter from './StaffBookingFilter';
import StaffBookingTable from './StaffBookingTable';
import { getOrderBooking, updateBooking } from '@/service/staff.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  BookingStaffTable,
  columnsBooking,
  statusOptionsBooking,
} from '@/types/bookings';
import RoomPagination from '../AdminService/RoomPagination';
import { useForm } from 'react-hook-form';
import {
  SchemaUpdateOrderStatusSchema,
  updateOrderStatusSchema,
} from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditBooking } from '../Modal/Staff/EditBooking';
import { VerifyBooking } from './VerifyBooking';
import { io } from 'socket.io-client';
import { Client } from '@stomp/stompjs';
import useWebSocket from './useWebsocket';
const statusColorMap: Record<string, ChipProps['color']> = {
  available: 'success',
  maintenance: 'danger',
  // vacation: 'warning',
};
// type Booking = (typeof bookings)[0];
const INITIAL_VISIBLE_COLUMNS = [
  'bookingID', // Unique identifier for each booking
  'roomId', // Identifier for the booked room
  'checkinDate',
  'checkoutDate',
  'customerId', // Identifier for the user who made the booking
  'slots', // Start date of the booking
  'totalPrice', // End date of the booking
  'status', // Current status of the booking (e.g., confirmed, cancelled)
  'actions', // Actions like view, edit, or delete the booking
];
// const socket = io('http://localhost:8080/ws');
export default function StaffBookings() {
  // React.useEffect(() => {
  //   const client = new Client({
  //     brokerURL: 'http://localhost:8080/ws', // URL WebSocket của server
  //     reconnectDelay: 3000, // Tự động kết nối lại sau 5s nếu mất kết nối
  //     heartbeatIncoming: 12000, // Thời gian giữ kết nối
  //     heartbeatOutgoing: 10000,

  //     onConnect: () => {
  //       console.log('Connected to WebSocket stomps');
  //       refetchOrderBooking();
  //       window.location.reload();
  //       client.subscribe('/booking/bookings/status', (message) => {
  //         const updatedBooking = JSON.parse(message.body);
  //         console.log('Updated booking:', updatedBooking);
  //         // Xử lý khi nhận thông báo hết hạn đặt phòng
  //       });
  //     },

  //     onStompError: (error) => {
  //       console.error('Error:', error);
  //     },
  //   });

  //   client.activate();

  //   return () => {
  //     client.deactivate();
  //   };
  // }, []);

  const getStaffBookingApi = async (): Promise<BookingStaffTable[]> => {
    const response = await getOrderBooking();
    console.log(response.data.data);

    return response.data.data;
  };

  const { data: orderBookings = [], refetch: refetchOrderBooking } = useQuery<
    BookingStaffTable[]
  >({
    queryKey: ['orderBookings'],
    queryFn: getStaffBookingApi,
  });
  useWebSocket(refetchOrderBooking);
  //filter
  const [filterValue, setFilterValue] = React.useState('');
  const hasSearchFilter = Boolean(filterValue);
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);
  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);
  //selectedKey
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  //visibleColumns
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsBooking;

    return columnsBooking.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  //statusFilter
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const filteredItems = React.useMemo(() => {
    let filteredBookings = [...orderBookings];

    if (hasSearchFilter) {
      filteredBookings = filteredBookings.filter((booking) =>
        booking.roomId.toString().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptionsBooking.length
    ) {
      filteredBookings = filteredBookings.filter((booking) =>
        Array.from(statusFilter).includes(booking.status)
      );
    }

    return filteredBookings;
  }, [orderBookings, filterValue, statusFilter]);
  //rowsPerPage
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
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

  //sort
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'roomId',
    direction: 'ascending',
  });
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: BookingStaffTable, b: BookingStaffTable) => {
      const first = a[
        sortDescriptor.column as keyof BookingStaffTable
      ] as number;
      const second = b[
        sortDescriptor.column as keyof BookingStaffTable
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['single']));

  const [selectedBooking, setSelectedBooking] =
    React.useState<BookingStaffTable | null>(null);

  const [isEditBooking, setIsEditBooking] = React.useState<boolean>(false);
  const openEdit = (booking: BookingStaffTable) => {
    setIsEditBooking(true);
    setSelectedBooking(booking);
  };
  const closeEdit = () => {
    setIsEditBooking(false);
    refetchOrderBooking();
  };

  return (
    <div className="">
      <div className="h-full mt-12 ml-5 mr-5">
        <StaffBookingFilter
          filterValue={filterValue}
          statusFilter={statusFilter}
          visibleColumns={visibleColumns}
          statusOptions={statusOptionsBooking}
          columns={columnsBooking}
          onSearchChange={onSearchChange}
          onClear={() => onClear()}
          setStatusFilter={setStatusFilter}
          setVisibleColumns={setVisibleColumns}
        />
        <div className="flex justify-between items-center mt-5 mb-5">
          <span className="text-default-400 text-small">
            {/* Tổng {rooms?.length} phòng */}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Số hàng
            <select
              className="bg-transparent outline-none text-default-400 text-small rounded-md ml-3"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
        <StaffBookingTable
          sortedItems={sortedItems}
          headerColumns={headerColumns}
          sortDescriptor={sortDescriptor}
          selectedKeys={selectedKeys} // Handle selection logic
          setSelectedKeys={setSelectedKeys} // Selection handler
          onSortChange={setSortDescriptor}
          openEdit={openEdit}
          // onDelete={openDelete}
        />
        <RoomPagination
          page={page}
          pages={pages}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          onChange={setPage}
        />
        {isEditBooking && (
          <EditBooking
            selectedBooking={selectedBooking}
            refetchBookings={refetchOrderBooking}
            isOpen={isEditBooking}
            onClose={closeEdit}
          />
        )}
      </div>
      <Divider className="mt-24" />
      <div className="mt-10 p-10 w-auto h-[100px]">
        <VerifyBooking refetchOrderBooking={refetchOrderBooking} />
      </div>
    </div>
  );
}
