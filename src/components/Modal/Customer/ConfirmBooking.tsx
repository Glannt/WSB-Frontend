import { useCustomer } from '@/context/customer.context';
import { createBooking, getService } from '@/service/customer.api';
import { Details, InitialQuantities } from '@/types/room.type';
import { Services } from '@/types/service.type';
import {
  CustomerOrderBooking,
  CustomerOrderBookingHistory,
} from '@/types/bookings';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SchemacreateMultiBooking } from '@/utils/rules';
import { UseFormHandleSubmit } from 'react-hook-form';

interface ConfirmBookingProps {
  totals: number;
  initialQuantities: InitialQuantities;
  details: Details;
  showConfirmModal: boolean;
  toggleConfirmModal: () => void;
  handleSubmit: UseFormHandleSubmit<SchemacreateMultiBooking>;
  refetchRoomType: () => void;
  refetchServices: () => void;
  refetchSlots: () => void;
  setIsNotEnoughMoney: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmBooking: React.FC<ConfirmBookingProps> = ({
  totals,
  initialQuantities,
  details,
  showConfirmModal,
  toggleConfirmModal,
  setIsNotEnoughMoney,
  handleSubmit,
  refetchRoomType,
  refetchServices,
  refetchSlots,
}) => {
  const { customer, refetch } = useCustomer();

  console.log('chi tiếttttt' + details);
  console.log(initialQuantities);
  const CreateBookingMutation = useMutation({
    mutationFn: (formData: FormData) => createBooking(formData),
  });

  const handleCreateBooking = (
    data: SchemacreateMultiBooking,
    refetch: () => void
  ) => {
    const formData = new FormData();
    if (details.roomId === undefined) {
      return Promise.reject(new Error('Room ID is undefined'));
    }
    console.log('data', data);

    formData.append('buildingId', data.buildingId);

    console.log('selectedBuildingKey nè', data.buildingId);

    console.log('buildingId nè', data.buildingId);

    formData.append('roomId', data.roomId);
    formData.append('checkinDate', data.checkinDate);
    formData.append('checkoutDate', data.checkoutDate);
    // Append slots array (handle as multiple values)
    if (data.slots && data.slots.length > 0) {
      data.slots.forEach((slot, index) => {
        formData.append(`slots`, slot.toString());
      });
    }
    Object.entries(initialQuantities).forEach(([serviceId, quantity]) => {
      formData.append(`items[${serviceId}]`, quantity.toString()); // This creates items[serviceId]=quantity
    });

    CreateBookingMutation.mutate(formData, {
      onSuccess: (response) => {
        console.log('Booking created successfully');

        refetch();
        refetchRoomType();
        refetchServices();
        refetchSlots();
      },
      onError: (error) => {
        console.error('Error creating booking:', error);
      },
    });
  };
  const onSubmit = (data: SchemacreateMultiBooking) => {
    const totalBookingMoney = totals;
    if (
      !customer ||
      !customer.wallet ||
      customer.wallet.amount === undefined ||
      customer.wallet.amount === null ||
      customer.wallet.amount < totalBookingMoney
    ) {
      setIsNotEnoughMoney(true);
      // return;
    } else {
      handleCreateBooking(data, refetch);
      window.location.reload();
    }
  };
  const formatted = new Intl.NumberFormat('vi-VN').format(Number(totals));
  const formattedCurrent = new Intl.NumberFormat('vi-VN').format(
    Number(customer?.wallet.amount)
  );
  const formattedRemaining = new Intl.NumberFormat('vi-VN').format(
    Number((customer?.wallet?.amount ?? 0) - totals)
  );

  const slot = [
    {
      label: '7:00 - 10:00',
      value: 1,
    },
    {
      label: '11:00 - 14:00',
      value: 2,
    },
    {
      label: '15:00 - 18:00',
      value: 3,
    },
    {
      label: '19:00 - 22:00',
      value: 4,
    },
  ];

  const getServiceApi = async () => {
    const response = await getService();
    return response.data.data;
  };

  const {
    data: services = [],
    isLoading: isLoadingServices,
    refetch: refetchServicess,
  } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });
  if (isLoadingServices) {
    return <div className="">Loading....</div>;
  }
  return (
    <>
      {' '}
      {showConfirmModal && (
        <Modal
          hideCloseButton={true}
          isOpen={showConfirmModal}
          className="h-auto w-[500px]"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Xác nhận đặt phòng</ModalHeader>

                <ModalBody>
                  <p className="flex">
                    <span className="mr-24">
                      <strong>Phòng:</strong> {details?.roomId}
                    </span>
                    <span>
                      <strong>Cơ sở:</strong> {details.buildingId}
                    </span>
                  </p>
                  <p>
                    {details?.checkinDate === details?.checkoutDate ? (
                      <>
                        <strong>Thời gian:</strong> {details?.checkinDate}
                      </>
                    ) : (
                      <>
                        <strong>Thời gian:</strong> {details?.checkinDate} -{' '}
                        {details?.checkoutDate}
                      </>
                    )}
                  </p>
                  <div className="flex">
                    <p className="mr-24">
                      <strong>Slot:</strong>{' '}
                      {slot.map((item) => (
                        <p key={item.value}>
                          {(details?.slots ?? []).includes(item.value)
                            ? item.label
                            : ''}
                        </p>
                      ))}
                    </p>
                    <p>
                      <strong>Dịch vụ:</strong>{' '}
                      {Object.entries(initialQuantities).map(([key, value]) => {
                        const serviceName =
                          services.find((service) => service.serviceId == key)
                            ?.serviceName || key;
                        return (
                          <p key={key}>
                            {serviceName}: {value}
                          </p>
                        );
                      })}
                    </p>
                  </div>
                  <hr />
                  <p>
                    <strong>Số dư hiện tại:</strong> {formattedCurrent} VND
                  </p>
                  <p>
                    <strong>Tổng giá:</strong> {formatted} VND
                  </p>
                  <p>
                    <strong>Số dư còn lại</strong> {formattedRemaining} VND
                  </p>
                </ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalFooter className="flex justify-between">
                    <Button
                      type="submit"
                      className="w-40"
                      color="primary"
                      // onClick={toggleConfirmModal}
                    >
                      Xác nhận
                    </Button>

                    <Button
                      className="w-40"
                      color="danger"
                      onClick={() => {
                        toggleConfirmModal;
                        window.location.reload();
                      }}
                    >
                      Đóng
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
