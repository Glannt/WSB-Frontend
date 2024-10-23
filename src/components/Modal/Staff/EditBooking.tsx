import { bookings } from '@/data/dataBookings';
import { updateBooking } from '@/service/staff.api';
import { Booking, BookingStaffTable, BookingStatus } from '@/types/bookings';
import {
  SchemaUpdateOrderStatusSchema,
  updateOrderStatusSchema,
} from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
interface EditBookingProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBooking?: BookingStaffTable | null; // Selected room data for edit mode
  setSelectedBooking?: Dispatch<SetStateAction<BookingStaffTable | null>>; // Setter for selected room in edit mode
  refetchBookings: () => void;
}
export const EditBooking: React.FC<EditBookingProps> = ({
  isOpen,
  onClose,
  selectedBooking,
  setSelectedBooking,
  refetchBookings,
}) => {
  const [valueStatus, setValueStatus] = React.useState(
    new Set([selectedBooking?.status])
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    reset,
    control,
  } = useForm<SchemaUpdateOrderStatusSchema>({
    resolver: yupResolver(updateOrderStatusSchema),
    defaultValues: {
      bookingId: selectedBooking?.bookingId,
      status: selectedBooking?.status,
    },
  });
  const UpdateBookingMutation = useMutation({
    mutationFn: (formdata: FormData) => updateBooking(formdata),
  });
  const updateStatusBooking = (data: SchemaUpdateOrderStatusSchema) => {
    const formData = new FormData();
    formData.append('bookingId', selectedBooking!.bookingId.toString());
    formData.append('status', data.status.toString()); // Append status vào formdata

    // Gọi mutation để update booking
    UpdateBookingMutation.mutate(formData, {
      onSuccess: (data) => {
        // Xử lý sau khi cập nhật thành công
        console.log('Update thành công!', data);
        refetchBookings();
        onClose();
        reset();
      },
      onError: (error) => {
        // Xử lý lỗi khi cập nhật thất bại
        console.error('Cập nhật thất bại', error);
        setError('bookingId', {
          type: 'manual',
          message: 'Cập nhật thất bại. Vui lòng thử lại.',
        });
      },
    });
  };
  const onSubmit = handleSubmit((data: SchemaUpdateOrderStatusSchema) => {
    updateStatusBooking(data);
  });

  const handleFieldChange = (
    field: keyof SchemaUpdateOrderStatusSchema,
    value: any
  ) => {
    setValue(field, value);
    console.log(getValues());

    if (setSelectedBooking && selectedBooking) {
      setSelectedBooking({
        ...selectedBooking,
        [field]: value,
      });
    }
  };
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        size="lg"
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          base: 'max-w-[1000px] h-[200px]',
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {'Chỉnh sửa phòng'}
              </ModalHeader>
              <form onSubmit={onSubmit}>
                <ModalBody>
                  <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                    <Input
                      size="lg"
                      label="Mã đặt phòng"
                      {...register('bookingId')}
                      labelPlacement="outside"
                      isReadOnly
                      autoFocus
                      variant="bordered"
                      classNames={{
                        label: 'text-black/50 dark:text-white/90 pb-2',
                        input: 'border-0 focus:outline-none focus:border-none',
                        clearButton: 'pb-4',
                      }}
                      defaultValue={
                        selectedBooking ? selectedBooking?.bookingId : ''
                      }
                    />
                    <Select
                      variant="bordered"
                      size="lg"
                      //   data-focus
                      //   data-focus-visible
                      label="Trạng thái phòng đơn đặt phòng"
                      labelPlacement="outside"
                      className="max-w-xl"
                      {...register('status')}
                      onSelectionChange={(keys) => {
                        // Convert Set to array and get the first key (expected to be one of the statuses)
                        const newStatusKey = Array.from(
                          keys
                        )[0] as keyof typeof BookingStatus;

                        // Check if newStatusKey is a valid key of BookingStatus
                        if (newStatusKey) {
                          handleFieldChange('status', newStatusKey);
                        }
                      }}
                      defaultSelectedKeys={
                        selectedBooking?.status ? [selectedBooking.status] : []
                      }
                    >
                      {Object.entries(BookingStatus).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    // onClick={() => {
                    //   console.log('Button clicked!'); // Xem thông báo trong console
                    // }}
                  >
                    {'Hoàn thành'}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
