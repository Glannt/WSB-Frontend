import { cancelBooking } from '@/service/customer.api';
import { CustomerOrderBookingHistory } from '@/types/bookings';
import { schemaCancelBooking, SchemaCancelBooking } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface ConfirmCancelBookingProps {
  showConfirmCancleBooking: boolean;
  onClose: () => void;
  booking: CustomerOrderBookingHistory | null;
  refetchBooking: () => void;
}

export const ConfirmCancelBooking: React.FC<ConfirmCancelBookingProps> = ({
  showConfirmCancleBooking,
  onClose,
  booking,
  refetchBooking,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    reset,
  } = useForm<SchemaCancelBooking>({
    resolver: yupResolver(schemaCancelBooking),
    defaultValues: {
      bookingId: booking?.bookingId || '',
    },
  });
  console.log(booking?.bookingId);

  const CancelBookingMutation = useMutation({
    mutationFn: (formdata: FormData) => cancelBooking(formdata),
    onSuccess: () => {
      console.log('Service update successful');
      refetchBooking();
      onClose(); // Close the modal on success
    },
    onError: (error) => {
      console.error('Error updating services:', error);
    },
  });
  const onSubmit = () => {
    const bookingId = booking?.bookingId;
    if (!bookingId) {
      console.error('Booking ID is missing');
      return;
    }
    const formdata = new FormData();
    if (bookingId) {
      formdata.append('bookingId', booking.bookingId);
    }
    console.log(bookingId);

    if (bookingId === undefined) {
      return null;
    }
    CancelBookingMutation.mutate(formdata);
  };
  return (
    <>
      {showConfirmCancleBooking && (
        <Modal
          isOpen={showConfirmCancleBooking}
          hideCloseButton={true}
          onClose={onClose}
          className="h-60"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Xác nhận hủy đơn</ModalHeader>

                  <ModalBody>Bạn xác nhận hủy đơn</ModalBody>

                  <ModalFooter className="flex justify-between">
                    <Button className="w-40" color="primary" type="submit">
                      Có
                    </Button>

                    <Button className="w-40" color="danger" onPress={onClose}>
                      Đóng
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      )}
    </>
  );
};
