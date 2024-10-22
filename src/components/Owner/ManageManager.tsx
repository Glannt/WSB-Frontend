import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAllRoom } from '@/service/manager.api';
import { statusOptions } from '../../data/data';
import { Selection, SortDescriptor } from '@nextui-org/react';
import { AddRoom } from '../Modal/Manager/AddRoom';
import EditRoom from '../Modal/Manager/EditRoom';
import { useParams } from 'react-router';
import BuildingFilter from './BuildingFilter';
import BuildingTable from './BuildingTable';
import BuildingPagination from './BuildingPagination';
import { Building } from '@/types/building.type';
import { getAllBuilding, getAllManagers } from '@/service/owner.api';
import EditBuilding from './EditBuilding';
import { DeleteBuilding } from './DeleteBuilding';
import AddBuilding from './AddBuilding';
import { Manager } from '@/types/manager.type';
import ManagerFilter from './ManagerFilter';
import ManagerTable from './ManagerTable';
import ManagerPagination from './ManagerPagination';
import { DeleteManager } from './DeleteManager';
import AddManager from './AddManager';

export const columnsBuilding = [
  { name: 'ID', uid: 'userId', sortable: true },
  { name: 'Tên quản lý', uid: 'fullName', sortable: true },
  { name: 'Email', uid: 'email', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber', sortable: true },
  { name: 'Ngày sinh', uid: 'dateOfBirth', sortable: true },
  { name: 'Cơ sở', uid: 'buildingId', sortable: true },
  { name: 'Actions', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = [
  'fullName',
  'email',
  'phoneNumber',
  'buildingId',
  'actions',
];
export default function ManageManager() {
  const getAllManagersApi = async () => {
    const response = await getAllManagers();
    return response.data.content;
  };

  const {
    data: managers = [],
    isLoading,
    refetch,
  } = useQuery<Manager[]>({
    queryKey: ['managers'],
    queryFn: getAllManagersApi,
  });
  console.log(managers);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [filterValue, setFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'fullName',
    direction: 'ascending',
  });
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isDeleteRoom, setIsDeleteRoom] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Manager | null>(null);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsBuilding;
    return columnsBuilding.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  const filteredRooms = useMemo(() => {
    let filteredRooms = managers;

    return filteredRooms;
  }, [filterValue, managers, statusFilter]);

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
      const first = a[sortDescriptor.column as keyof Manager];
      const second = b[sortDescriptor.column as keyof Manager];

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

  //   const openEdit = (building: Building) => {
  //     setIsOpenEdit(true);
  //     setSelectedRoom(building);
  //   };
  const closeEdit = () => {
    setIsOpenEdit(false);
    refetch();
  };

  const openDelete = (manager: Manager) => {
    setIsDeleteRoom(true);
    setSelectedRoom(manager);
  };
  const closeDelete = () => {
    setIsDeleteRoom(false);
  };

  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <ManagerFilter
        // buildings={managers}
        filterValue={filterValue}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        statusOptions={statusOptions}
        columns={columnsBuilding}
        onSearchChange={onSearchChange}
        onClear={() => onClear()}
        onAddManager={openAdd} // Add Room handler
        setStatusFilter={setStatusFilter}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <div className="flex justify-between items-center mt-5 mb-5">
        <span className="text-default-400 text-small">
          Tổng {managers?.length} quản lý
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
      <ManagerTable
        sortedItems={sortedItems}
        headerColumns={headerColumns}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys} // Handle selection logic
        setSelectedKeys={setSelectedKeys} // Selection handler
        onSortChange={setSortDescriptor}
        // onEdit={openEdit}
        onDelete={openDelete}
      />
      <ManagerPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onChange={setPage}
      />
      {isOpenAdd && (
        <AddManager
          isOpen={isOpenAdd}
          onClose={closeAdd}
          refetchRooms={refetch}
        />
      )}

      {/* {isOpenEdit && (
        <EditBuilding
          isOpen={isOpenEdit}
          onClose={closeEdit}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          refetchRooms={refetch}
        />
      )} */}
      {isDeleteRoom && (
        <DeleteManager
          isOpen={isDeleteRoom}
          onClose={closeDelete}
          selectedDeleteBuilding={selectedRoom}
          setSelectedDeleteBuilding={setSelectedRoom}
          refetchBuildings={refetch}
        />
      )}
    </div>
  );
}
