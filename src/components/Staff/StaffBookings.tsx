// import React from 'react';

// interface Booking {
//   roomName: string;
//   bookedBy: string;
//   date: string;
//   status: string;
// }

// const bookings: Booking[] = [
//   {
//     roomName: 'Room 101',
//     bookedBy: 'John Doe',
//     date: '2024-09-30',
//     status: 'Confirmed',
//   },
//   {
//     roomName: 'Room 102',
//     bookedBy: 'Jane Smith',
//     date: '2024-10-01',
//     status: 'Pending',
//   },
// ];

// export const StaffBookings: React.FC = () => {
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
//       <table className="min-w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Room Name</th>
//             <th className="px-4 py-2">Booked By</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking, index) => (
//             <tr key={index} className="border-t">
//               <td className="px-4 py-2">{booking.roomName}</td>
//               <td className="px-4 py-2">{booking.bookedBy}</td>
//               <td className="px-4 py-2">{booking.date}</td>
//               <td className="px-4 py-2">{booking.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
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
} from '@nextui-org/react';
import { SearchIcon } from '../Icons/SearchIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import {
  bookings,
  columnsBooking,
  statusOptionsBooking,
} from '@/data/dataBookings'; // Import dữ liệu bookings
import { EyeIcon } from '../Icons/EyeIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { capitalize } from '../AdminService/utils';

const statusColorMap: Record<string, ChipProps['color']> = {
  available: 'success',
  maintenance: 'danger',
  // vacation: 'warning',
};
type Booking = (typeof bookings)[0];
const INITIAL_VISIBLE_COLUMNS = [
  'bookingID', // Unique identifier for each booking
  'roomId', // Identifier for the booked room
  'userId', // Identifier for the user who made the booking
  'startDate', // Start date of the booking
  'endDate', // End date of the booking
  'status', // Current status of the booking (e.g., confirmed, cancelled)
  'actions', // Actions like view, edit, or delete the booking
];

export default function StaffBookings() {
  // Assuming you have an initial bookings state
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
    let filteredBookings = [...bookings];

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
  }, [bookings, filterValue, statusFilter]);
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
    column: 'age',
    direction: 'ascending',
  });
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Booking, b: Booking) => {
      const first = a[sortDescriptor.column as keyof Booking] as number;
      const second = b[sortDescriptor.column as keyof Booking] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['single']));

  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = React.useState<Booking | null>(null);
  const openDetail = (booking: Booking) => {
    setIsDetails(true);
    setSelectedRoom(booking);
  };
  const closeDetail = () => {
    setIsDetails(false);
  };

  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const openAdd = () => {
    setIsOpenEdit(true);
  };
  const closeAdd = () => {
    setIsOpenAdd(false);
  };

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const openEdit = (room: Booking) => {
    setIsOpenEdit(true);
    setSelectedRoom(room);
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  const renderCell = React.useCallback(
    (booking: Booking, columnKey: React.Key): React.ReactNode => {
      const cellValue = booking[columnKey as keyof Booking];
      switch (columnKey) {
        case 'bookingID':
          return booking.id; // Render Booking ID
        case 'roomId':
          return `Room #${booking.roomId}`; // Render Room ID
        case 'userId':
          return `User #${booking.userId}`; // Render User ID
        case 'startDate':
          return booking.startDate.toLocaleString(); // Format and render Start Date
        case 'endDate':
          return booking.endDate.toLocaleString(); // Format and render End Date
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[booking.status]} // Map status to colors
              size="sm"
              variant="flat"
            >
              {String(cellValue)}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              <Tooltip content="Chi tiết">
                <span
                  onClick={() => openDetail(booking)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Chỉnh sửa">
                <span
                  onClick={() => openEdit(booking)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    []
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 h-full max-h-screen">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[50%] focus:outline-none bg-blackA2 rounded-xl"
            placeholder="Tìm kiếm bằng tên..."
            variant="bordered"
            startContent={<SearchIcon />}
            labelPlacement="outside"
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{
              input: 'border-0 focus:outline-none focus:border-transparent-1',
            }}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptionsBooking.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsBooking.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="rounded-lg hover:scale-105 hover:shadow-xl"
              color="primary"
              endContent={<PlusIcon />}
              onPress={openAdd}
            >
              Thêm phòng
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng {bookings.length} phòng
          </span>
          <label className="flex items-center text-default-400 text-small">
            Số hàng
            <select
              className="bg-transparent outline-none text-default-400 text-small rounded-md ml-3"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    bookings.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
           {selectedKeys === 'all'
             ? 'All items selected'
             : `${selectedKeys.size} of ${filteredItems.length} selected`}
         </span> */}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Trước
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Sau
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <Table
        isStriped
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[470px]',
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
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
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)} </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
