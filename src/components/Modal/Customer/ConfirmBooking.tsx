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

interface ConfirmBookingProps {
  showConfirmModal: boolean;
  toggleConfirmModal: () => void;
  selectedBooking: CustomerOrderBooking | null | undefined;
}

export const ConfirmBooking: React.FC<ConfirmBookingProps> = ({
  showConfirmModal,
  toggleConfirmModal,
  selectedBooking,
}) => {
  console.log(selectedBooking);
  const newBooking = selectedBooking
    ? {
        bookingId: selectedBooking.bookingId,
        checkinDate: selectedBooking.checkinDate,
        checkoutDate: selectedBooking.checkoutDate,
        totalPrice: selectedBooking.totalPrice,
        status: selectedBooking.status,
        room: selectedBooking.room, // Ensure this is of type Room
        slots: selectedBooking.slots, // Ensure this is of type SlotBooking[]
        items: selectedBooking.items, // Ensure this is of type ServiceItems
      }
    : null;
  return (
    <>
      {' '}
      {showConfirmModal && (
        <Modal isOpen={showConfirmModal} className="h-auto w-[500px]">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Xác nhận đặt phòng</ModalHeader>

                <ModalBody>
                  Bạn đã đặt phòng thành công
                  <h3>Thông tin đặt phòng</h3>
                  {newBooking ? (
                    <ul>
                      <li>
                        <strong>Cơ sở:</strong> {newBooking.bookingId}
                      </li>
                      <li>
                        <strong>Ngày nhận phòng:</strong>{' '}
                        {newBooking.checkinDate}
                      </li>
                      <li>
                        <strong>Ngày trả phòng:</strong>{' '}
                        {newBooking.checkoutDate}
                      </li>
                      <li>
                        <strong>Tổng giá:</strong> {newBooking.totalPrice} VND
                      </li>
                      <li>
                        <strong>Trạng thái:</strong> {newBooking.status}
                      </li>
                      <li>
                        <strong>Phòng:</strong> {newBooking.room.roomName}
                      </li>
                      <li>
                        <strong>Dịch vụ đã chọn:</strong>
                        <ul>
                          {Object.entries(newBooking.items).map(
                            ([serviceId, quantity]) => (
                              <li key={serviceId}>
                                {serviceId} (x{quantity})
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                      <li>
                        <strong>Các khung giờ đã chọn:</strong>
                        <ul>
                          {newBooking.slots.map((slot) => (
                            <li key={slot.timeSlotId}>
                              {slot.timeStart} - {slot.timeEnd}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <p>Không có thông tin đặt phòng.</p>
                  )}
                </ModalBody>

                <ModalFooter className="flex justify-between">
                  <Button
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
