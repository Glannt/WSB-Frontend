import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import RoomPagination from './RoomPagination';
import { getAllStaff } from '@/service/manager.api';
import { statusOptions } from '../../data/data';

import { CircularProgress, Selection, SortDescriptor } from '@nextui-org/react';

import { columnsStaff, Staff } from '@/types/staff.type';
import StaffFilter from './StaffFilter';
import StaffTable from './StaffTable';
import EditStaff from '../Modal/Manager/EditStaff';
import { AddStaff } from '../Modal/Manager/AddStaff';

const INITIAL_VISIBLE_COLUMNS = [
  'fullName',
  'workShift',
  'workDays',
  'status',
  'actions',
];
export default function ManageStaff() {
  const getAllStaffApi = async () => {
    const response = await getAllStaff();
    console.log(response.data);

    return response.data.data;
  };

  const {
    data: staffs = [],
    isLoading,
    refetch: refetchStaff,
    isFetching: isFetchingStaffs,
  } = useQuery<Staff[]>({
    queryKey: ['staffs'],
    queryFn: getAllStaffApi,
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

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsStaff;
    return columnsStaff.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  const hasSearchFilter = Boolean(filterValue);
  const filteredStaffs = useMemo(() => {
    let filteredStaffs = staffs;

    if (hasSearchFilter) {
      filteredStaffs = filteredStaffs?.filter((staff) =>
        staff.userId.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredStaffs = filteredStaffs.filter((staff) =>
        Array.from(statusFilter).includes(staff.status)
      );
    }
    filteredStaffs = filteredStaffs.sort((a, b) => {
      const firstStaffID = a.userId;
      const secondStaffID = b.userId;
      return firstStaffID.localeCompare(secondStaffID); // Mới nhất trước
    });
    return filteredStaffs;
  }, [filterValue, staffs, statusFilter]);

  const paginatedStaff = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredStaffs.slice(start, end);
  }, [page, filteredStaffs, rowsPerPage]);

  const pages = Math.ceil(filteredStaffs.length / rowsPerPage);

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
    return [...paginatedStaff].sort((a, b) => {
      // Nếu creationTime giống nhau, sắp xếp theo cột đã chọn
      const first = a[sortDescriptor.column as keyof Staff];
      const second = b[sortDescriptor.column as keyof Staff];

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
  }, [sortDescriptor, paginatedStaff]);

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

  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const openAdd = () => {
    setIsOpenAdd(true);
  };
  const closeAdd = () => {
    setIsOpenAdd(false);
    // refetch();
  };

  const openEdit = (staff: Staff) => {
    setIsOpenEdit(!isOpenEdit);
    setSelectedStaff(staff);
  };
  const closeEdit = () => {
    setIsOpenEdit(!isOpenEdit);
    // refetchStaff();
  };

  return (
    <div className="h-full mt-12 ml-5 mr-5">
      <StaffFilter
        filterValue={filterValue}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        statusOptions={statusOptions}
        columns={columnsStaff}
        onSearchChange={onSearchChange}
        onClear={() => onClear()}
        onAddStaff={openAdd} // Add Room handler
        setStatusFilter={setStatusFilter}
        setVisibleColumns={setVisibleColumns}
      />
      <div className="flex justify-between items-center mt-5 mb-5">
        <span className="text-default-400 text-small">
          Tổng {staffs?.length} phòng
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
      {isFetchingStaffs ? (
        <div className="flex justify-center items-center">
          <CircularProgress label="Đang tải..." />
        </div>
      ) : (
        <StaffTable
          sortedItems={sortedItems}
          headerColumns={headerColumns}
          sortDescriptor={sortDescriptor}
          selectedKeys={selectedKeys} // Handle selection logic
          setSelectedKeys={setSelectedKeys} // Selection handler
          onSortChange={setSortDescriptor}
          onEdit={openEdit}
        />
      )}

      <RoomPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onChange={setPage}
      />
      {/* {isOpenAdd && (
        <AddStaff
          isOpen={isOpenAdd}
          onClose={closeAdd}
          refetchRooms={refetch}
        />
      )} */}

      {isOpenEdit && (
        <EditStaff
          isOpen={isOpenEdit}
          onClose={closeEdit}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
          refetchStaff={refetchStaff}
        />
      )}
    </div>
  );
}
