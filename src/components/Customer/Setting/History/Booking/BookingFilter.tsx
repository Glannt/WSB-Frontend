import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from '@nextui-org/react';
import { Column, Room, StatusOption } from '@/types/room.type';
import { ChevronDownIcon } from '@/components/Icons/ChevronDownIcon';
import { capitalize } from '@/components/Customer/utils';
import { statusOptionsBooking } from '@/data/data';

interface BookingFiltersProps {
  statusFilter: Selection;
  visibleColumns: Selection;
  statusOptions: StatusOption[];
  columns: Column[];
  setStatusFilter: (keys: Selection) => void;
  setVisibleColumns: (keys: Selection) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
// const columns = [
//   { name: 'ID', uid: 'id', sortable: true },
//   { name: 'Thời gian', uid: 'date', sortable: true },
//   { name: 'Địa điểm', uid: 'address' },
//   { name: 'Đơn giá', uid: 'amount', sortable: true },
//   { name: 'Tình trạng', uid: 'status' },
//   { name: 'Thêm dịch vụ', uid: 'actions' },
// ];
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
const BookingFilter: React.FC<BookingFiltersProps> = ({
  columns,
  statusFilter,
  setStatusFilter,
  visibleColumns,
  setVisibleColumns,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex flex-col gap-4 h-full max-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Lịch Sử Đặt Phòng
      </h2>
      <div className="flex justify-end gap-3">
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
                Cột hiển thị
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
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Tổng {bookings.length} đơn
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
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
};

export default BookingFilter;
