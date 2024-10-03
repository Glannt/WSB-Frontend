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
}

export const ConfirmBooking: React.FC<ConfirmBookingProps> = ({
  showConfirmModal,
  toggleConfirmModal,
}) => {
  return (
    <>
      {' '}
      {showConfirmModal && (
        <Modal isOpen={showConfirmModal} className="h-60">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Xác nhận đặt phòng</ModalHeader>

                <ModalBody>Bạn đã đặt phòng thành công</ModalBody>

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
                    onClick={toggleConfirmModal}
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
