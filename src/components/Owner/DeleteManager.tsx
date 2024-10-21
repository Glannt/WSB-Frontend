import { deleteBuilding, deleteManager } from '@/service/owner.api';
import { Building } from '@/types/building.type';
import { Manager } from '@/types/manager.type';
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
  selectedDeleteBuilding?: Manager | null;
  setSelectedDeleteBuilding?: Dispatch<SetStateAction<Manager | null>>;
  refetchBuildings: () => void;
}

export const DeleteManager: React.FC<DeleteRoomProps> = ({
  isOpen,
  onClose,
  selectedDeleteBuilding,
  setSelectedDeleteBuilding,
  refetchBuildings,
}) => {
  const deleteManagerMutation = useMutation({
    mutationFn: ({ buildingId }: { buildingId: string | undefined }) => {
      if (!buildingId) {
        throw new Error('Building ID is undefined');
      }
      return deleteManager(buildingId);
    },
    onSuccess: () => {
      setSelectedDeleteBuilding?.(null);
      refetchBuildings();
      onClose(); // Close the modal after successful deletion
    },
    onError: (error: any) => {
      console.error('Error deleting room:', error);
    },
  });

  const buildingId = selectedDeleteBuilding?.userId;

  const handleDeleteRoom = () => {
    deleteManagerMutation.mutate({ buildingId });
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
