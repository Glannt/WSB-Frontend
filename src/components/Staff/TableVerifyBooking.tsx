// import { CheckBooking } from '@/types/bookings';
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from '@nextui-org/react';
// import React from 'react';

// interface BookingData {
//   booking: CheckBooking[] | undefined;
// }
// const headers = {
//   bookingId: 'Mã Đặt Phòng',
//   checkinDate: 'Ngày Nhận Phòng',
//   checkoutDate: 'Ngày Trả Phòng',
//   customerId: 'Mã Khách Hàng',
//   roomId: 'Mã Phòng',
//   serviceItems: 'Dịch Vụ',
//   slots: 'Khung Giờ',
//   status: 'Trạng Thái',
//   totalPrice: 'Tổng Giá',
// };

// export const TableVerifyBooking: React.FC<BookingData> = ({ booking }) => {
//   const items = booking ? Object.entries(booking) : [];
//   return (
//     <Table
//       aria-label="Booking details table"
//       classNames={{
//         th: 'text-lg',
//         td: 'text-lg',
//       }}
//     >
//       <TableHeader>
//         {Object.keys(headers).map((key) => (
//           <TableColumn key={key}>
//             {headers[key as keyof CheckBooking]}
//           </TableColumn>
//         ))}
//       </TableHeader>
//       <TableBody emptyContent="Không có thông tin đặt phòng" items={items}>
//         {(item) => (
//           <TableRow key={item[0]}>
//             <TableCell key={item[0]}>{JSON.stringify(item[1])}</TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// };

import { CheckBooking, SlotBooking } from '@/types/bookings';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ChipProps,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import React from 'react';
import { EditIcon } from '../Icons/EditIcon';
import { Check } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { updateBookingStatus } from '@/service/staff.api';
import { useForm } from 'react-hook-form';
import {
  schemaUpdateBookingStatus,
  SchemaUpdateBookingStatus,
} from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';

interface BookingData {
  booking: CheckBooking[] | undefined;
  refetch: () => void;
  refetchOrderBooking: () => void;
}

const headers = {
  bookingId: 'Mã Đặt Phòng',
  checkinDate: 'Ngày Nhận Phòng',
  checkoutDate: 'Ngày Trả Phòng',
  customerId: 'Mã Khách Hàng',
  roomId: 'Mã Phòng',
  serviceItems: 'Dịch Vụ',
  slots: 'Khung Giờ',
  status: 'Trạng Thái',
  totalPrice: 'Tổng Giá',
  actions: 'Hành động',
};
const statusColorMap: Record<string, ChipProps['color']> = {
  using: 'success', // USING
  finished: 'default', // FINISHED
  upcoming: 'warning', // UPCOMING
  cancelled: 'danger', // CANCELLED
  pending: 'warning',
};

export const TableVerifyBooking: React.FC<BookingData> = ({
  booking,
  refetch,
  refetchOrderBooking,
}) => {
  const translateStatusToVietnamese = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'using':
        return 'Đang sử dụng';
      case 'finished':
        return 'Đã hoàn thành';
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'cancelled':
        return 'Đã hủy';
      case 'pending':
        return 'Chờ xác nhận';
      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    reset,
  } = useForm<SchemaUpdateBookingStatus>({
    resolver: yupResolver(schemaUpdateBookingStatus),
  });

  const UpdateBookingStatusMutation = useMutation({
    mutationFn: (formData: FormData) => updateBookingStatus(formData),
    onSuccess: (data, variables) => {
      // Handle successful mutation here
      console.log('Booking status updated successfully:', data);
      refetch();
      refetchOrderBooking();
    },
    onError: (error) => {
      // Handle error here
      console.error('Error updating booking status:', error);
      // You might want to show a notification or alert to the user
    },
  });

  const handleUpdateBookingStatus = () => {
    const formdata = new FormData();

    formdata.append('bookingId', String(getValues().bookingId));
    formdata.append('status', 'USING');
    UpdateBookingStatusMutation.mutate(formdata);
  };
  const onSubmit = () => {
    handleUpdateBookingStatus();
  };
  const renderCell = React.useCallback(
    (booking: CheckBooking, columnKey: React.Key) => {
      const cellValue = booking[columnKey as keyof CheckBooking];

      // Helper function to format date
      const formatDate = (date: string | Date): string => {
        return typeof date === 'string'
          ? new Date(date).toLocaleString()
          : date.toString();
      };

      switch (columnKey) {
        case 'bookingId':
          return <span className="text-bold">{booking.bookingId}</span>;

        case 'checkinDate':
          return (
            <div className="text-bold text-small">
              {formatDate(booking.checkinDate)}
            </div>
          );

        case 'checkoutDate':
          return (
            <div className="text-bold text-small">
              {formatDate(booking.checkoutDate)}
            </div>
          );

        case 'customerId':
          return (
            <div className="text-bold text-small">{booking.customerId}</div>
          );

        case 'roomId':
          return <div className="text-bold text-small">{booking.roomId}</div>;

        case 'serviceItems':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">
                {Object.keys(cellValue).length > 0
                  ? Object.entries(cellValue).map(([key, value]) => (
                      <span key={key}>{`${key}: ${value}`}</span>
                    ))
                  : 'Không có dịch vụ'}
              </p>
            </div>
          );

        case 'slots':
          return (
            <div className="flex flex-col">
              {Array.isArray(cellValue) && cellValue.length > 0 ? (
                cellValue.map((slot: SlotBooking, index: number) => (
                  <div key={slot.timeSlotId} className="text-small">
                    Slot {slot.timeSlotId}: {slot.timeStart} - {slot.timeEnd}
                  </div>
                ))
              ) : (
                <p className="text-bold text-small">Không có khung giờ</p>
              )}
            </div>
          );

        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[booking.status.toLowerCase()]} // You should define this mapping somewhere
              size="sm"
              variant="flat"
            >
              {translateStatusToVietnamese(booking.status)}
            </Chip>
          );

        case 'totalPrice':
          return (
            <div className="text-bold text-small">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(cellValue as number)}
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center gap-5">
              <Tooltip content="Chỉnh sửa">
                <span
                  //   onClick={() => {
                  //     onEdit(booking);
                  //   }}
                  onClick={() => {
                    console.log(booking);

                    setValue('bookingId', booking.bookingId); // Set the current booking
                    handleUpdateBookingStatus(); // Call the update function
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <Check />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return (
            <span>
              {typeof cellValue === 'object'
                ? JSON.stringify(cellValue)
                : cellValue}
            </span>
          );
      }
    },
    []
  );
  return (
    <Table
      aria-label="Booking details table"
      classNames={{
        th: 'text-lg',
        tr: 'text-xl',
        td: 'text-xl',
        tbody: 'text-lg',
      }}
    >
      <TableHeader>
        {Object.keys(headers).map((key) => (
          <TableColumn key={key}>
            {headers[key as keyof CheckBooking]}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent="Không có thông tin đặt phòng"
        items={booking || []}
      >
        {(item) => (
          <TableRow key={item.bookingId} className="text-lg">
            {Object.keys(headers).map((key) => (
              <TableCell key={key} className="text-lg">
                {renderCell(item, key as keyof CheckBooking)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
