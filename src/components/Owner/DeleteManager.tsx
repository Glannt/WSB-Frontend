import { deleteBuilding, deleteManager, deleteUser } from '@/service/owner.api';
import { Building } from '@/types/building.type';
import { Manager } from '@/types/manager.type';
import { UserAccount } from '@/types/user.type';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface DeleteRoomProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDeleteUser?: UserAccount | null;
  setSelectedDeleteUser?: Dispatch<SetStateAction<UserAccount | null>>;
  refetchBuildings: () => void;
}

export const DeleteManager: React.FC<DeleteRoomProps> = ({
  isOpen,
  onClose,
  selectedDeleteUser,
  setSelectedDeleteUser,
  refetchBuildings,
}) => {
  const deleteManagerMutation = useMutation({
    mutationFn: ({ username }: { username: string | undefined }) => {
      if (!username) {
        throw new Error('Tên tài khoản không tồn tại ');
      }
      return deleteUser(username);
    },
    onSuccess: () => {
      setSelectedDeleteUser?.(null);
      refetchBuildings();
      onClose(); // Close the modal after successful deletion
    },
    onError: (error: any) => {
      console.error('Error deleting room:', error);
    },
  });

  const username = selectedDeleteUser?.username;

  const handleDeleteRoom = () => {
    deleteManagerMutation.mutate({ username });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Xác nhận xóa quản lý</ModalHeader>
            <ModalFooter>
              <Button color="warning" onClick={handleDeleteRoom}>
                Xác nhận
              </Button>
              <Button color="danger" onClick={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
