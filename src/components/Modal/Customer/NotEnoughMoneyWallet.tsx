import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useNavigate } from 'react-router';

interface ConfirmBookingProps {
  showConfirmModal: boolean;
  toggleConfirmModal: () => void;
}

export const NotEnoughMoneyInWallet: React.FC<ConfirmBookingProps> = ({
  showConfirmModal,
  toggleConfirmModal,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {' '}
      {showConfirmModal && (
        <Modal
          hideCloseButton={true}
          isOpen={showConfirmModal}
          className="h-40"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Không đủ tiền trong ví</ModalHeader>
                <ModalFooter className="flex justify-between">
                  <Button
                    className="w-40"
                    color="primary"
                    onClick={() => navigate('/top-up')}
                  >
                    Nạp tiền
                  </Button>
                  <Button
                    className="w-40"
                    color="danger"
                    onClick={() => {
                      toggleConfirmModal();
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
