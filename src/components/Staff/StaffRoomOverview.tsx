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
import { roomsData, statusOptions } from '@/data/dataRoomOverview';
import RoomFilters from '../AdminService/RoomFilter';
import RoomTable from '../AdminService/RoomTable';
import RoomPagination from '../AdminService/RoomPagination';
import RoomStaffFilters from './RoomStaffFilter';
import { columnsRoomOverview, RoomOverView } from '@/types/room.type';
import { getAllRoomOverView, getRoomAssign } from '@/service/staff.api';
import { useQuery } from '@tanstack/react-query';
import StaffRoomTable from './StaffRoomTable';

const statusColorMap: Record<string, string> = {
  available: 'green', // Color for available rooms
  booked: 'blue', // Color for booked rooms
  maintenance: 'orange', // Color for rooms under maintenance
};

const INITIAL_VISIBLE_COLUMNS = [
  'roomId', // Room ID
  'roomStatus', // Room Status
  'roomName',
];

export default function StaffRoomOverview() {
  const getAllRoomOverviewAPi = async (): Promise<RoomOverView[]> => {
    const response = await getRoomAssign();
    console.log(response.data.data);

    return response.data.data;
  };

  const { data: roomsOverview = [], refetch } = useQuery<RoomOverView[]>({
    queryKey: ['roomsOverview'],
    queryFn: getAllRoomOverviewAPi,
  });
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
    let filteredRooms = [...roomsOverview];

    if (hasSearchFilter) {
      filteredRooms = filteredRooms.filter((room) =>
        room.roomId.toLowerCase().includes(filterValue.toLowerCase())
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
  }, [roomsOverview, filterValue, statusFilter]);
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
    return [...items].sort((a: RoomOverView, b: RoomOverView) => {
      const first = a[sortDescriptor.column as keyof RoomOverView];
      const second = b[sortDescriptor.column as keyof RoomOverView];

      let cmp = 0;

      // Determine if we're comparing numbers or strings
      if (typeof first === 'number' && typeof second === 'number') {
        cmp = first - second; // Numeric comparison
      } else {
        cmp = first.localeCompare(second); // String comparison
      }

      // Reverse comparison if sorting in descending order
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['single']));

  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = React.useState<RoomOverView | null>(
    null
  );
  const openDetail = (room: RoomOverView) => {
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
  const openEdit = (room: RoomOverView) => {
    setIsOpenEdit(true);
    setSelectedRoom(room);
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <RoomStaffFilters
        // rooms={RoomOverView}
        filterValue={filterValue}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        statusOptions={statusOptions}
        columns={headerColumns}
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
      <StaffRoomTable
        sortedItems={sortedItems}
        headerColumns={headerColumns}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys} // Handle selection logic
        setSelectedKeys={setSelectedKeys} // Selection handler
        onSortChange={setSortDescriptor}
        // onEdit={openEdit}
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
