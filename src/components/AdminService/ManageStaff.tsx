// import React, { useState } from 'react';
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Chip,
//   User,
//   Pagination,
//   Selection,
//   ChipProps,
//   SortDescriptor,
//   useDisclosure,
//   Modal,
//   ModalHeader,
//   ModalContent,
//   ModalBody,
//   ModalFooter,
//   Select,
//   SelectItem,
//   Tooltip,
// } from '@nextui-org/react';
// import { PlusIcon } from '../Icons/PlusIcon';
// import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon';
// import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
// import { SearchIcon } from '../Icons/SearchIcon';
// import {
//   statusOptions,
//   staffs,
//   staffColumns,
//   statusOptionsStaff,
// } from '../../data/data';
// import { capitalize } from './utils';
// import { roomStatuses } from '@/data/dataStatusRoom';
// import { roomTypes } from '../../data/dataRoomType';
// import { EyeIcon } from '../Icons/EyeIcon';
// import { EditIcon } from '../Icons/EditIcon';
// import { DeleteIcon } from '../Icons/DeleteIcon';
// import EditStaff from '../Modal/Manager/EditStaff';

// const statusColorMap: Record<string, ChipProps['color']> = {
//   active: 'success',
//   inactive: 'danger',
//   vacation: 'warning',
// };

// const INITIAL_VISIBLE_COLUMNS = [
//   'fullName',
//   'workShift',
//   'roomInCharge',
//   'workDays',
//   'status',
//   'actions',
// ];

// type Staff = (typeof staffs)[0];

// export default function ManageStaff() {
//   const [mode, setMode] = useState('');
//   const [filterValue, setFilterValue] = React.useState('');
//   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
//     new Set([])
//   );
//   const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
//     new Set(INITIAL_VISIBLE_COLUMNS)
//   );
//   const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
//     column: 'fullName',
//     direction: 'ascending',
//   });
//   const [value, setValue] = React.useState(new Set([]));
//   const [page, setPage] = React.useState(1);
//   const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null);
//   const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
//   const openAdd = () => {
//     setIsOpenEdit(true);
//   };
//   const closeAdd = () => {
//     setIsOpenAdd(false);
//   };

//   const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
//   const openEdit = (staff: Staff) => {
//     setIsOpenEdit(true);
//     setSelectedStaff(staff);
//   };
//   const closeEdit = () => {
//     setIsOpenEdit(false);
//   };

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === 'all') return staffColumns;

//     return staffColumns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid)
//     );
//   }, [visibleColumns]);

//   const filteredItems = React.useMemo(() => {
//     let filteredStaffs = [...staffs];

//     if (hasSearchFilter) {
//       filteredStaffs = filteredStaffs.filter((staff) =>
//         staff.fullName.toLowerCase().includes(filterValue.toLowerCase())
//       );
//     }
//     if (
//       statusFilter !== 'all' &&
//       Array.from(statusFilter).length !== statusOptionsStaff.length
//     ) {
//       filteredStaffs = filteredStaffs.filter((staff) =>
//         Array.from(statusFilter).includes(staff.status)
//       );
//     }

//     return filteredStaffs;
//   }, [staffs, filterValue, statusFilter]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a: Staff, b: Staff) => {
//       const first = a[sortDescriptor.column as keyof Staff];
//       const second = b[sortDescriptor.column as keyof Staff];

//       let cmp = 0;

//       if (typeof first === 'string' && typeof second === 'string') {
//         cmp = first.localeCompare(second); // Compare strings
//       } else if (Array.isArray(first) && Array.isArray(second)) {
//         cmp = first.join(',').localeCompare(second.join(',')); // Compare arrays by joining them
//       } else if (typeof first === 'number' && typeof second === 'number') {
//         cmp = first - second; // Compare numbers
//       }

//       return sortDescriptor.direction === 'descending' ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const renderCell = React.useCallback((staff: Staff, columnKey: React.Key) => {
//     const cellValue = staff[columnKey as keyof Staff];
//     if (Array.isArray(cellValue)) {
//       return cellValue.join(', ');
//     }
//     switch (columnKey) {
//       case 'fullName':
//         return (
//           <User
//             // avatarProps={{ radius: 'lg', src: staff.avatar }}
//             // description={staff.email}
//             name={cellValue}
//           >
//             {staff.email}
//           </User>
//         );
//       case 'workShift':
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-small capitalize">{cellValue}</p>
//           </div>
//         );
//       case 'roomInCharge':
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-small capitalize">{cellValue}</p>
//           </div>
//         );
//       case 'workDays':
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-small capitalize">{cellValue}</p>
//             <p className="text-bold text-tiny capitalize text-default-400">
//               {staff.workDays}
//             </p>
//           </div>
//         );
//       case 'status':
//         return (
//           <Chip
//             content="Details"
//             className="capitalize"
//             color={statusColorMap[staff.status]}
//             size="sm"
//             variant="flat"
//           >
//             {cellValue}
//           </Chip>
//         );
//       case 'actions':
//         return (
//           <div className="relative flex justify-center gap-5">
//             <Tooltip content="Chi tiết">
//               <span
//                 // onClick={() => openDetail(room)}
//                 className="text-lg text-default-400 cursor-pointer active:opacity-50"
//               >
//                 <EyeIcon />
//               </span>
//             </Tooltip>
//             <Tooltip content="Chỉnh sửa nhân viên">
//               <span
//                 onClick={() => {
//                   openEdit(staff);
//                   setMode('edit');
//                 }}
//                 className="text-lg text-default-400 cursor-pointer active:opacity-50"
//               >
//                 <EditIcon />
//               </span>
//             </Tooltip>
//             <Tooltip color="danger" content="Xóa nhân viên">
//               <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   const onNextPage = React.useCallback(() => {
//     if (page < pages) {
//       setPage(page + 1);
//     }
//   }, [page, pages]);

//   const onPreviousPage = React.useCallback(() => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   }, [page]);

//   const onRowsPerPageChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setRowsPerPage(Number(e.target.value));
//       setPage(1);
//     },
//     []
//   );

//   const onSearchChange = React.useCallback((value?: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue('');
//     }
//   }, []);

//   const onClear = React.useCallback(() => {
//     setFilterValue('');
//     setPage(1);
//   }, []);
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const topContent = React.useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4 h-full max-h-screen">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             className="w-full sm:max-w-[50%] focus:outline-none bg-blackA2 rounded-xl"
//             placeholder="Tìm kiếm bằng tên..."
//             variant="bordered"
//             startContent={<SearchIcon />}
//             labelPlacement="outside"
//             value={filterValue}
//             onClear={() => onClear()}
//             onValueChange={onSearchChange}
//             classNames={{
//               input: 'border-0 focus:outline-none focus:border-transparent-1',
//             }}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Trạng thái
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 onSelectionChange={setStatusFilter}
//               >
//                 {statusOptionsStaff.map((status) => (
//                   <DropdownItem key={status.uid} className="capitalize">
//                     {capitalize(status.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Cột
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {staffColumns.map((column) => (
//                   <DropdownItem key={column.uid} className="capitalize">
//                     {capitalize(column.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-default-400 text-small">
//             Tổng {staffs.length} nhân viên
//           </span>
//           <label className="flex items-center text-default-400 text-small">
//             Số hàng
//             <select
//               className="bg-transparent outline-none text-default-400 text-small rounded-md ml-3"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [
//     filterValue,
//     statusFilter,
//     visibleColumns,
//     onSearchChange,
//     onRowsPerPageChange,
//     staffs.length,
//     hasSearchFilter,
//   ]);

//   const bottomContent = React.useMemo(() => {
//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="primary"
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />
//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onPreviousPage}
//           >
//             Trước
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onNextPage}
//           >
//             Sau
//           </Button>
//         </div>
//       </div>
//     );
//   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

//   return (
//     <div className="h-full mt-12 ml-5 mr-5">
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
//         <TableBody emptyContent={'No staff found'} items={sortedItems}>
//           {(item) => (
//             <TableRow key={item.staffId}>
//               {(columnKey) => (
//                 <TableCell>{renderCell(item, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       {isOpenAdd && (
//         <EditStaff
//           isOpen={isOpenAdd}
//           onClose={closeAdd}
//           selectedStaff={null} // Pass null since we are adding a new staff member
//           setSelectedStaff={() => setSelectedStaff} // Function to handle changes to the new staff
//         />
//       )}
//       {isOpenEdit && (
//         <EditStaff
//           isOpen={isOpenEdit}
//           onClose={closeEdit}
//           selectedStaff={selectedStaff} // Pass the currently selected staff for editing
//           setSelectedStaff={() => setSelectedStaff} // Function to handle changes to the selected staff
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import RoomPagination from './RoomPagination';
import { getAllStaff } from '@/service/manager.api';
import { statusOptions } from '../../data/data';

import { Selection, SortDescriptor } from '@nextui-org/react';

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
    console.log(response.data.data);

    return response.data.data;
  };

  const {
    data: staffs = [],
    isLoading,
    refetch,
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
    refetch();
  };

  const openEdit = (staff: Staff) => {
    setIsOpenEdit(true);
    setSelectedStaff(staff);
    console.log('edit staff');
  };
  const closeEdit = () => {
    setIsOpenEdit(false);
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
      <StaffTable
        sortedItems={sortedItems}
        headerColumns={headerColumns}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys} // Handle selection logic
        setSelectedKeys={setSelectedKeys} // Selection handler
        onSortChange={setSortDescriptor}
        onEdit={openEdit}
      />
      <RoomPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onChange={setPage}
      />
      {isOpenAdd && (
        <AddStaff
          isOpen={isOpenAdd}
          onClose={closeAdd}
          refetchRooms={refetch}
        />
      )}

      {isOpenEdit && (
        <EditStaff
          isOpen={isOpenEdit}
          onClose={closeEdit}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
        />
      )}
    </div>
  );
}
