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
  Tooltip,
} from '@nextui-org/react';
import { PlusIcon } from '../Icons/PlusIcon';
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { SearchIcon } from '../Icons/SearchIcon';
import { roomStatuses, roomStatusManager } from '@/data/dataStatusRoom';
import { roomTypes } from '../../data/dataRoomType';
import { EyeIcon } from '../Icons/EyeIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteIcon } from '../Icons/DeleteIcon';
// import AdminRoomModal from '../Modal/Manager/AdminRoomModal';
import { capitalize } from '../AdminService/utils';
import {
  columnsRoomOverview,
  roomsData,
  statusOptions,
} from '@/data/dataRoomOverview';
import RoomFilters from '../AdminService/RoomFilter';
import RoomTable from '../AdminService/RoomTable';
import RoomPagination from '../AdminService/RoomPagination';
import RoomStaffFilters from './RoomStaffFilter';

const statusColorMap: Record<string, string> = {
  available: 'green', // Color for available rooms
  booked: 'blue', // Color for booked rooms
  maintenance: 'orange', // Color for rooms under maintenance
};

const INITIAL_VISIBLE_COLUMNS = [
  'id', // Room ID
  'roomName', // Room Name
  'roomType', // Room Type
  'roomStatus', // Room Status
  'createdAt', // Created At
  'actions', // Actions
];

type RoomOverView = (typeof roomsData)[0];

export default function StaffRoomOverview() {
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
    if (visibleColumns === 'all') return columnsRoomOverview;

    return columnsRoomOverview.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  //statusFilter
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const filteredItems = React.useMemo(() => {
    let filteredRooms = [...roomsData];

    if (hasSearchFilter) {
      filteredRooms = filteredRooms.filter((room) =>
        room.roomName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRooms = filteredRooms.filter((room) =>
        Array.from(statusFilter).includes(room.roomStatus)
      );
    }

    return filteredRooms;
  }, [roomsData, filterValue, statusFilter]);
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
    return [...items].sort((a: Room, b: Room) => {
      const first = a[sortDescriptor.column as keyof Room] as number;
      const second = b[sortDescriptor.column as keyof Room] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['single']));

  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
  const openDetail = (room: Room) => {
    setIsDetails(true);
    setSelectedRoom(room);
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
  const openEdit = (room: Room) => {
    setIsOpenEdit(true);
    setSelectedRoom(room);
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  const renderCell = React.useCallback(
    (room: RoomOverView, columnKey: React.Key): React.ReactNode => {
      const cellValue = room[columnKey as keyof RoomOverView];
      switch (columnKey) {
        case 'id':
          return <span>{String(cellValue)}</span>; // Display Room ID
        case 'roomName':
          return <div className="flex flex-col">{room.roomName}</div>;
        case 'roomType':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {String(cellValue)}
              </p>
            </div>
          );
        case 'roomStatus':
          return (
            <Chip
              className="capitalize"
              // color={statusColorMap[room.roomStatus]}
              size="sm"
              variant="flat"
            >
              {String(cellValue)}
            </Chip>
          );
        case 'createdAt':
          return <span>{new Date(cellValue).toLocaleDateString()}</span>; // Format the created date
        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              <Tooltip content="Chi tiết">
                <span
                  onClick={() => openDetail(room)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Chỉnh sửa">
                <span
                  onClick={() => openEdit(room)}
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

  // const topContent = React.useMemo(() => {
  //   return (
  //     <div className="flex flex-col gap-4 h-full max-h-screen">
  //       <div className="flex justify-between gap-3 items-end">
  //         <Input
  //           isClearable
  //           className="w-full sm:max-w-[50%] focus:outline-none bg-blackA2 rounded-xl"
  //           placeholder="Tìm kiếm bằng tên..."
  //           variant="bordered"
  //           startContent={<SearchIcon />}
  //           labelPlacement="outside"
  //           value={filterValue}
  //           onClear={() => onClear()}
  //           onValueChange={onSearchChange}
  //           classNames={{
  //             input: 'border-0 focus:outline-none focus:border-transparent-1',
  //           }}
  //         />
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
  //                 Cột
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
  //               {columnsRoomOverview.map((column) => (
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
  //           Tổng {roomsData.length} phòng
  //         </span>
  //         <label className="flex items-center text-default-400 text-small">
  //           Số hàng
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
  //   roomsData.length,
  //   hasSearchFilter,
  // ]);

  // const bottomContent = React.useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-between items-center">
  //       {/* <span className="w-[30%] text-small text-default-400">
  //         {selectedKeys === 'all'
  //           ? 'All items selected'
  //           : `${selectedKeys.size} of ${filteredItems.length} selected`}
  //       </span> */}
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

  // return (
  //   <div className="h-full mt-12 ml-5 mr-5">
  //     <Table
  //       isStriped
  //       aria-label="Example table with custom cells, pagination and sorting"
  //       isHeaderSticky
  //       bottomContent={bottomContent}
  //       bottomContentPlacement="outside"
  //       classNames={{
  //         wrapper: 'max-h-[470px]',
  //       }}
  //       selectedKeys={selectedKeys}
  //       // selectionMode="multiple"
  //       sortDescriptor={sortDescriptor}
  //       topContent={topContent}
  //       topContentPlacement="outside"
  //       onSelectionChange={setSelectedKeys}
  //       onSortChange={setSortDescriptor}
  //     >
  //       <TableHeader columns={headerColumns}>
  //         {(column) => (
  //           <TableColumn
  //             key={column.uid}
  //             align={column.uid === 'actions' ? 'center' : 'start'}
  //             allowsSorting={column.sortable}
  //           >
  //             {column.name}
  //           </TableColumn>
  //         )}
  //       </TableHeader>
  //       <TableBody emptyContent={'No users found'} items={sortedItems}>
  //         {(item) => (
  //           <TableRow key={item.id}>
  //             {(columnKey) => (
  //               <TableCell>{renderCell(item, columnKey)} </TableCell>
  //             )}
  //           </TableRow>
  //         )}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <RoomStaffFilters
        // rooms={RoomOverView}
        filterValue={filterValue}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        statusOptions={statusOptions}
        // columns={columnsRoom}
        onSearchChange={onSearchChange}
        onClear={() => onClear()}
        setStatusFilter={setStatusFilter}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
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
      <RoomTable
        sortedItems={sortedItems}
        headerColumns={headerColumns}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys} // Handle selection logic
        setSelectedKeys={setSelectedKeys} // Selection handler
        onSortChange={setSortDescriptor}
        onEdit={openEdit}
        // onDelete={openDelete}
      />
      <RoomPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onChange={setPage}
      />
    </div>
  );
}
