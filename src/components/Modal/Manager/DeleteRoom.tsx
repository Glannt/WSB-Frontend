import { deleteRoomById } from '@/service/manager.api';
import { Room } from '@/types/room.type';
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
  selectedDeleteRoom?: Room | null;
  setSelectedDeleteRoom?: Dispatch<SetStateAction<Room | null>>;
  refetchRooms: () => void;
}

export const DeleteRoom: React.FC<DeleteRoomProps> = ({
  isOpen,
  onClose,
  selectedDeleteRoom,
  setSelectedDeleteRoom,
  refetchRooms,
}) => {
  const deleteRoomMutation = useMutation({
    mutationFn: ({ roomId }: { roomId: number | undefined }) =>
      deleteRoomById(roomId),
    onSuccess: () => {
      console.log('Room deleted successfully');
      setSelectedDeleteRoom?.(null);
      refetchRooms();
      onClose(); // Close the modal after successful deletion
    },
    onError: (error: any) => {
      console.error('Error deleting room:', error);
    },
  });

  const roomId = selectedDeleteRoom?.roomId;

  const handleDeleteRoom = () => {
    deleteRoomMutation.mutate({ roomId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Xác nhận xóa phòng</ModalHeader>
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
