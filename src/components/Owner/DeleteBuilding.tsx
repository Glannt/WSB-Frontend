import { deleteBuilding } from '@/service/owner.api';
import { Building } from '@/types/building.type';
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
  selectedDeleteBuilding?: Building | null;
  setSelectedDeleteBuilding?: Dispatch<SetStateAction<Building | null>>;
  refetchBuildings: () => void;
}

export const DeleteBuilding: React.FC<DeleteRoomProps> = ({
  isOpen,
  onClose,
  selectedDeleteBuilding,
  setSelectedDeleteBuilding,
  refetchBuildings,
}) => {
  const deleteBuildingMutation = useMutation({
    mutationFn: ({ buildingId }: { buildingId: string | undefined }) => {
      if (!buildingId) {
        throw new Error('Building ID is undefined');
      }
      return deleteBuilding(buildingId);
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

  const buildingId = selectedDeleteBuilding?.buildingId;

  const handleDeleteRoom = () => {
    deleteBuildingMutation.mutate({ buildingId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Xác nhận xóa cơ sở</ModalHeader>
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
