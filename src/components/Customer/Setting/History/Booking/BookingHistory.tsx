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

const statusOptions = [
  { name: 'Đang sử dụng', uid: 'using' },
  { name: 'Hoàn thành', uid: 'finished' },
  { name: 'Sắp tới', uid: 'upcoming' },
];

const bookings = [
  {
    id: 1,
    date: '2021-10-10',
    amount: '$100',
    status: 'finished',
    address: '123/ABC, ABC, Hà Nội',
  },
  {
    id: 2,
    date: '2021-10-11',
    amount: '$200',
    status: 'using',
    address: 'Hà Nội',
  },
  {
    id: 3,
    date: '2021-10-12',
    amount: '$300',
    status: 'upcoming',
    address: 'Hà Nội',
  },
  {
    id: 4,
    date: '2021-10-13',
    amount: '$400',
    status: 'finished',
    address: 'Hà Nội',
  },
  {
    id: 5,
    date: '2021-10-14',
    amount: '$500',
    status: 'using',
    address: 'Hà Nội',
  },
  {
    id: 6,
    date: '2021-10-15',
    amount: '$600',
    status: 'upcoming',
    address: 'Hà Nội',
  },
  {
    id: 7,
    date: '2021-10-16',
    amount: '$700',
    status: 'finished',
    address: 'Hà Nội',
  },
  {
    id: 8,
    date: '2021-10-17',
    amount: '$800',
    status: 'using',
    address: 'Hà Nội',
  },
  {
    id: 9,
    date: '2021-10-18',
    amount: '$900',
    status: 'upcoming',
    address: 'Hà Nội',
  },
  {
    id: 10,
    date: '2021-10-19',
    amount: '$1000',
    status: 'finished',
    address: 'Hà Nội',
  },
];

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Thời gian', uid: 'date', sortable: true },
  { name: 'Địa điểm', uid: 'address' },
  { name: 'Đơn giá', uid: 'amount', sortable: true },
  { name: 'Tình trạng', uid: 'status' },
  { name: 'Thêm dịch vụ', uid: 'actions' },
];

const statusColorMap: Record<string, ChipProps['color']> = {
  using: 'success',
  finished: 'danger',
  upcoming: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'date',
  'amount',
  'status',
  'actions',

  'address',
];

type Booking = (typeof bookings)[0];

export default function BookingHistory() {
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
    column: 'age',
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
    let filteredUsers = [...bookings];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.amount.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [bookings, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Booking, b: Booking) => {
      const first = a[sortDescriptor.column as keyof Booking] as number;
      const second = b[sortDescriptor.column as keyof Booking] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      console.log(1, first, second, cmp);

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
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
  // const topContent = React.useMemo(() => {
  //   return (
  //     <div className="flex flex-col gap-4 h-full max-h-screen">
  //       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
  //         Lịch Sử Đặt Phòng
  //       </h2>
  //       <div className="flex justify-end gap-3">
  //         <div className="flex gap-3">
  //           <Dropdown>
  //             <DropdownTrigger className="hidden sm:flex">
  //               <Button
  //                 endContent={<ChevronDownIcon className="text-small" />}
  //                 variant="flat"
  //               >
  //                 Trạng thái
  //               </Button>
  //             </DropdownTrigger>
  //             <DropdownMenu
  //               disallowEmptySelection
  //               aria-label="Table Columns"
  //               closeOnSelect={false}
  //               selectedKeys={statusFilter}
  //               selectionMode="multiple"
  //               onSelectionChange={setStatusFilter}
  //             >
  //               {statusOptions.map((status) => (
  //                 <DropdownItem key={status.uid} className="capitalize">
  //                   {capitalize(status.name)}
  //                 </DropdownItem>
  //               ))}
  //             </DropdownMenu>
  //           </Dropdown>
  //           <Dropdown>
  //             <DropdownTrigger className="hidden sm:flex">
  //               <Button
  //                 endContent={<ChevronDownIcon className="text-small" />}
  //                 variant="flat"
  //               >
  //                 Cột hiển thị
  //               </Button>
  //             </DropdownTrigger>
  //             <DropdownMenu
  //               disallowEmptySelection
  //               aria-label="Table Columns"
  //               closeOnSelect={false}
  //               selectedKeys={visibleColumns}
  //               selectionMode="multiple"
  //               onSelectionChange={setVisibleColumns}
  //             >
  //               {columns.map((column) => (
  //                 <DropdownItem key={column.uid} className="capitalize">
  //                   {capitalize(column.name)}
  //                 </DropdownItem>
  //               ))}
  //             </DropdownMenu>
  //           </Dropdown>
  //         </div>
  //       </div>
  //       <div className="flex justify-between items-center">
  //         <span className="text-default-400 text-small">
  //           Tổng {bookings.length} đơn
  //         </span>
  //         <label className="flex items-center text-default-400 text-small">
  //           Rows per page:
  //           <select
  //             className="bg-transparent outline-none text-default-400 text-small rounded-md ml-3"
  //             onChange={onRowsPerPageChange}
  //           >
  //             <option value="5">5</option>
  //             <option value="10">10</option>
  //             <option value="15">15</option>
  //           </select>
  //         </label>
  //       </div>
  //     </div>
  //   );
  // }, [
  //   filterValue,
  //   statusFilter,
  //   visibleColumns,
  //   onSearchChange,
  //   onRowsPerPageChange,
  //   bookings.length,
  //   hasSearchFilter,
  // ]);

  // const bottomContent = React.useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-between items-center">
  //       <Pagination
  //         isCompact
  //         showControls
  //         showShadow
  //         color="primary"
  //         page={page}
  //         total={pages}
  //         onChange={setPage}
  //       />
  //       <div className="hidden sm:flex w-[30%] justify-end gap-2">
  //         <Button
  //           isDisabled={pages === 1}
  //           size="sm"
  //           variant="flat"
  //           onPress={onPreviousPage}
  //         >
  //           Trước
  //         </Button>
  //         <Button
  //           isDisabled={pages === 1}
  //           size="sm"
  //           variant="flat"
  //           onPress={onNextPage}
  //         >
  //           Sau
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  //   return (
  //     <div className="h-full mt-5 ml-5 mr-5">
  //       <Table
  //         isStriped
  //         aria-label="Example table with custom cells, pagination and sorting"
  //         isHeaderSticky
  //         bottomContent={bottomContent}
  //         bottomContentPlacement="outside"
  //         classNames={{
  //           wrapper: 'max-h-[382px]',
  //         }}
  //         selectedKeys={selectedKeys}
  //         // selectionMode="multiple"
  //         sortDescriptor={sortDescriptor}
  //         topContent={topContent}
  //         topContentPlacement="outside"
  //         onSelectionChange={setSelectedKeys}
  //         onSortChange={setSortDescriptor}
  //       >
  //         <TableHeader columns={headerColumns}>
  //           {(column) => (
  //             <TableColumn
  //               key={column.uid}
  //               align={column.uid === 'actions' ? 'center' : 'start'}
  //               allowsSorting={column.sortable}
  //             >
  //               {column.name}
  //             </TableColumn>
  //           )}
  //         </TableHeader>
  //         <TableBody emptyContent={'No users found'} items={sortedItems}>
  //           {(item) => (
  //             <TableRow key={item.id}>
  //               {(columnKey) => (
  //                 <TableCell>{renderCell(item, columnKey)}</TableCell>
  //               )}
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //       <Modal
  //         // backdrop="opaque"
  //         isOpen={isOpen}
  //         onOpenChange={onOpenChange}
  //         placement="top-center"
  //         // classNames={{
  //         //   backdrop:
  //         //     'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
  //         // }}
  //         classNames={{
  //           base: 'max-w-[1000px] h-[300px]',
  //         }}
  //         motionProps={{
  //           variants: {
  //             enter: {
  //               y: 0,
  //               opacity: 1,
  //               transition: {
  //                 duration: 0.3,
  //                 ease: 'easeOut',
  //               },
  //             },
  //             exit: {
  //               y: -20,
  //               opacity: 0,
  //               transition: {
  //                 duration: 0.2,
  //                 ease: 'easeIn',
  //               },
  //             },
  //           },
  //         }}
  //       >
  //         <ModalContent>
  //           {(onClose) => (
  //             <>
  //               <ModalHeader className="flex flex-col gap-1">
  //                 Thêm phòng mới
  //               </ModalHeader>
  //               <ModalBody>
  //                 <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4">
  //                   {' '}
  //                   <Input
  //                     autoFocus
  //                     label="Tên phòng"
  //                     placeholder="Nhập tên phòng"
  //                     variant="bordered"
  //                   />
  //                   <Input
  //                     label="Giá"
  //                     placeholder="Nhập giá phòng"
  //                     type="number"
  //                     variant="bordered"
  //                   />
  //                 </div>
  //                 <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
  //                   <Select
  //                     label="Trạng thái phòng"
  //                     className="max-w-xl"
  //                     selectedKeys={value}
  //                     onSelectionChange={() => setValue(value)}
  //                   >
  //                     {bookings.map((user) => (
  //                       <SelectItem key={user.id}>{user.amount}</SelectItem>
  //                     ))}
  //                   </Select>
  //                   <Select
  //                     label="Loại phòng"
  //                     placeholder="Chọn loại phòng"
  //                     className="max-w-xl"
  //                   >
  //                     {roomTypes.map((roomTypes) => (
  //                       <SelectItem key={roomTypes.key}>
  //                         {roomTypes.label}
  //                       </SelectItem>
  //                     ))}
  //                   </Select>
  //                 </div>
  //               </ModalBody>
  //               <ModalFooter>
  //                 <Button color="danger" variant="flat" onPress={onClose}>
  //                   Đóng
  //                 </Button>
  //                 <Button color="primary" onPress={onClose}>
  //                   Tạo
  //                 </Button>
  //               </ModalFooter>
  //             </>
  //           )}
  //         </ModalContent>
  //       </Modal>
  //     </div>
  //   );
  // }

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
