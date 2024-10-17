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
import TransactionFilter from './TransactionFilter';
import TransactionTable from './TransactionTable';
import TransactionPagination from './TransactionPagination';
import { getTransactionsByUserId } from '@/service/customer.api';
import { getProfileFromLS } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';
import { Transaction } from '@/types/customer.type';

const statusOptions = [
  { name: 'Đang xử lý', uid: 'pending' },
  { name: 'Thành công', uid: 'completed' },
  { name: 'Thất bại', uid: 'cancelled' },
];

// const bookings = [
//   {
//     id: 1,
//     date: '2021-10-10',
//     amount: '$100',
//     status: 'pending',
//     actions: 'lorem ipsum.',
//   },
//   {
//     id: 2,
//     date: '2021-10-10',
//     amount: '$110',
//     status: 'completed',
//     actions: 'abc xyz',
//   },
//   {
//     id: 3,
//     date: '2021-10-10',
//     amount: '$100',
//     status: 'completed',
//     actions: 'abc xyz',
//   },
// ];

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Thời gian', uid: 'date', sortable: true },
  { name: 'Số tiền', uid: 'amount', sortable: true },
  //   { name: 'STATUS', uid: 'role', sortable: true },
  //   { name: 'TEAM', uid: 'team' },
  //   { name: 'EMAIL', uid: 'email' },
  { name: 'Tình Trạng', uid: 'status' },
  { name: 'Loại', uid: 'actions' },
];

const statusColorMap: Record<string, ChipProps['color']> = {
  completed: 'success',
  cancelled: 'danger',
  pending: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['id', 'date', 'amount', 'status', 'actions'];

const profile = getProfileFromLS();
export default function TransactionHistory() {
  const getHistoryTransactionApi = async () => {
    const response = await getTransactionsByUserId(profile.userId);
    return response.data.data;
  };

  const { data: transaction = [] } = useQuery<Transaction[]>({
    queryKey: ['transaction'],
    queryFn: getHistoryTransactionApi,
  });

  // const fakedata = [
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 200000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  //   {
  //     transactionId: 'abababa',
  //     date: '2021-10-10',
  //     amount: 100000,
  //     status: 'completed',
  //     type: 'Nạp tiền',
  //   },
  // ];
  // console.log(transaction);

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
    let filteredUsers = transaction;

    // if (hasSearchFilter) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     user.amount.toLowerCase().includes(filterValue.toLowerCase())
    //   );
    // }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [transaction, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Transaction, b: Transaction) => {
      const first = a[sortDescriptor.column as keyof Transaction] as number;
      const second = b[sortDescriptor.column as keyof Transaction] as number;
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

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const topContent = React.useMemo(() => {}, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    transaction.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
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
    <div className="h-40 mt-5 ml-5 mr-5">
      <TransactionFilter
        transaction={transaction}
        statusOptions={statusOptions}
        columns={columns}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <TransactionTable
        headerColumns={headerColumns}
        items={items}
        sortedItems={sortedItems}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        setSelectedKeys={setSelectedKeys}
        onSortChange={setSortDescriptor}
        // openModal={openModal}
      />
      <TransactionPagination
        page={page}
        pages={pages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        setPage={setPage}
      />
    </div>
  );
}
