import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Room, Column, columnsRoom } from '@/types/room.type'; // Define types accordingly

import RoomPagination from './RoomPagination';
import { getAllRoom } from '@/service/manager.api';
import { statusOptions } from '../../data/data';
import RoomFilters from './RoomFilter';
import RoomTable from './RoomTable';
import { Selection, SortDescriptor } from '@nextui-org/react';
import { AddRoom } from '../Modal/Manager/AddRoom';
import EditRoom from '../Modal/Manager/EditRoom';
import { DeleteRoom } from '../Modal/Manager/DeleteRoom';
import { useParams } from 'react-router';

const INITIAL_VISIBLE_COLUMNS = [
  'roomName',
  'roomType',
  'status',
  'creationTime',
  'actions',
];
export default function ManageRoom() {
  const getAllRoomsApi = async () => {
    const response = await getAllRoom();
    return response.data.data;
  };

  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: getAllRoomsApi,
  });
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [filterValue, setFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'roomName',
    direction: 'ascending',
  });
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isDeleteRoom, setIsDeleteRoom] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsRoom;
    return columnsRoom.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  const hasSearchFilter = Boolean(filterValue);
  const filteredRooms = useMemo(() => {
    let filteredRooms = rooms;

    if (hasSearchFilter) {
      filteredRooms = filteredRooms?.filter((room) =>
        room.roomName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRooms = filteredRooms.filter((room) =>
        Array.from(statusFilter).includes(room.status)
      );
    }
    filteredRooms = filteredRooms.sort((a, b) => {
      const firstCreationTime = new Date(a.creationTime).getTime();
      const secondCreationTime = new Date(b.creationTime).getTime();
      return secondCreationTime - firstCreationTime; // Mới nhất trước
    });
    return filteredRooms;
  }, [filterValue, rooms, statusFilter]);

  const paginatedRooms = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRooms.slice(start, end);
  }, [page, filteredRooms, rowsPerPage]);

  const pages = Math.ceil(filteredRooms.length / rowsPerPage);

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

  const sortedItems = useMemo(() => {
    return [...paginatedRooms].sort((a, b) => {
      // So sánh theo creationTime trước
      const firstCreationTime = new Date(a.creationTime).getTime();
      const secondCreationTime = new Date(b.creationTime).getTime();

      // Nếu creationTime khác nhau, ưu tiên sắp xếp giảm dần theo creationTime (mới nhất đứng trước)
      if (firstCreationTime !== secondCreationTime) {
        return sortDescriptor.direction === 'ascending'
          ? secondCreationTime - firstCreationTime
          : firstCreationTime - secondCreationTime;
      }

      // Nếu creationTime giống nhau, sắp xếp theo cột đã chọn
      const first = a[sortDescriptor.column as keyof Room];
      const second = b[sortDescriptor.column as keyof Room];

      // Đảm bảo các giá trị so sánh là chuỗi hoặc số
      if (typeof first === 'string' && typeof second === 'string') {
        return sortDescriptor.direction === 'descending'
          ? second.localeCompare(first)
          : first.localeCompare(second);
      } else if (typeof first === 'number' && typeof second === 'number') {
        return sortDescriptor.direction === 'descending'
          ? second - first
          : first - second;
      }

      // Dự phòng nếu các giá trị không xác định hoặc null
      return 0;
    });
  }, [sortDescriptor, paginatedRooms]);

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

  const openAdd = () => {
    setIsOpenAdd(true);
  };
  const closeAdd = () => {
    setIsOpenAdd(false);
    refetch();
  };

  const openEdit = (room: Room) => {
    setIsOpenEdit(true);
    setSelectedRoom(room);
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
    refetch();
  };

  const openDelete = (room: Room) => {
    setIsDeleteRoom(true);
    setSelectedRoom(room);
  };
  const closeDelete = () => {
    setIsDeleteRoom(false);
  };

  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <RoomFilters
        rooms={rooms}
        filterValue={filterValue}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        statusOptions={statusOptions}
        columns={columnsRoom}
        onSearchChange={onSearchChange}
        onClear={() => onClear()}
        onAddRoom={openAdd} // Add Room handler
        setStatusFilter={setStatusFilter}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <div className="flex justify-between items-center mt-5 mb-5">
        <span className="text-default-400 text-small">
          Tổng {rooms?.length} phòng
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
        onDelete={openDelete}
      />
      <RoomPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onChange={setPage}
      />
      {isOpenAdd && (
        <AddRoom isOpen={isOpenAdd} onClose={closeAdd} refetchRooms={refetch} />
      )}

      {isOpenEdit && (
        <EditRoom
          isOpen={isOpenEdit}
          onClose={closeEdit}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          refetchRooms={refetch}
        />
      )}
      {isDeleteRoom && (
        <DeleteRoom
          isOpen={isDeleteRoom}
          onClose={closeDelete}
          selectedDeleteRoom={selectedRoom}
          setSelectedDeleteRoom={setSelectedRoom}
          refetchRooms={refetch}
        />
      )}
    </div>
  );
}
