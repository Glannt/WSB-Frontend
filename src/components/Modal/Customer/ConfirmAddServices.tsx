import { CustomerOrderBookingHistory, ServiceItems } from '@/types/bookings';
import { Services } from '@/types/service.type';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
interface ConfirmAddServicesProps {
  quantities: { [key: string]: number };
  showConfirmModal: boolean;
  toggleConfirmModal: () => void;
  booking: CustomerOrderBookingHistory | null;
  services: Services[];
}
export const ConfirmAddServices: React.FC<ConfirmAddServicesProps> = ({
  quantities,
  showConfirmModal,
  toggleConfirmModal,
  booking,

  services,
}) => {
  console.log(booking);

  const formatRoomPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  return (
    <Modal
      isOpen={showConfirmModal}
      onClose={toggleConfirmModal}
      className="h-auto"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="font-bold text-lg">
              Tổng kết đặt dịch vụ
            </ModalHeader>

            <ModalBody className="text-lg">
              <span className="font-semibold">
                Bạn đã đặt các dịch vụ như sau
              </span>
              <ul>
                {/* {Object.entries(initialQuantities).map(
                  ([serviceId, quantity]) => {
                    const selectedService = services.find(
                      (s) => s.serviceId === serviceId
                    );
                    return selectedService ? (
                      <li key={serviceId} className="flex justify-between py-2">
                        <span>
                          allo
                          {selectedService.serviceName} (x{quantity})
                        </span>
                        <span>{selectedService.price * quantity} VND</span>
                      </li>
                    ) : null;
                  }
                )} */}
                {Object.entries(quantities).map(([serviceId, quantity]) => {
                  const selectedService = services.find(
                    (s) => String(s.serviceId) === String(serviceId)
                  );

                  return selectedService ? (
                    <li key={serviceId} className="flex justify-between py-2">
                      <span className="text-lg">
                        {selectedService.serviceName} (x{quantity})
                      </span>
                      <span>
                        {formatRoomPrice(selectedService.price * quantity)} VNĐ
                      </span>
                    </li>
                  ) : (
                    <li key={serviceId}>
                      Service not found for ID: {serviceId}
                    </li>
                  );
                })}
              </ul>
            </ModalBody>

            <ModalFooter className="flex justify-between">
              <Button
                className="w-full text-lg"
                color="danger"
                variant="light"
                onClick={toggleConfirmModal}
              >
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
