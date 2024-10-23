import { useCustomer } from '@/context/customer.context';
import { getService } from '@/service/customer.api';
import { Details, InitialQuantities } from '@/types/room.type';
import { Services } from '@/types/service.type';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

interface ConfirmBookingProps {
  totals: number;
  initialQuantities: InitialQuantities;
  details: Details;
  showConfirmModal: boolean;
  toggleConfirmModal: () => void;
}

export const ConfirmBooking: React.FC<ConfirmBookingProps> = ({
  totals,
  initialQuantities,
  details,
  showConfirmModal,
  toggleConfirmModal,
}) => {
  const { customer, refetch } = useCustomer();

  console.log('chi tiếttttt' + details);
  console.log(initialQuantities);

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
    refetch: refetchServices,
  } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });

  return (
    <>
      {' '}
      {showConfirmModal && (
        <Modal
          hideCloseButton={true}
          isOpen={showConfirmModal}
          className="h-fit"
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

                <ModalFooter className="flex justify-between">
                  <Button
                    // type="submit"
                    className="w-40"
                    color="primary"
                    onClick={toggleConfirmModal}
                  >
                    Đặt thêm
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
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
