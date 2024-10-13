import { Room } from '@/types/room.type';
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Table,
  TableBody,
} from '@nextui-org/react';
import React from 'react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
}) => {
  const [loadingImages, setLoadingImages] = React.useState<boolean[]>([]);
  React.useEffect(() => {
    if (selectedRoom && selectedRoom.roomImg) {
      const loadingArray = selectedRoom.roomImg.map(() => true); // Initialize loading state for each image
      setLoadingImages(loadingArray);
    }
  }, [isOpen, selectedRoom]);

  const handleImageLoad = (index: number) => {
    setLoadingImages((prevState) => {
      const updatedLoading = [...prevState];
      updatedLoading[index] = false; // Set image as loaded
      return updatedLoading;
    });
  };
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'max-w-[1000px] h-[300px]',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Ảnh phòng</ModalHeader>
            <ModalBody>
              <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0 overflow-y-auto">
                {' '}
                {selectedRoom!.roomImg.length > 0 ? (
                  <ul className="flex flex-row gap-4 flex-wrap">
                    {selectedRoom!.roomImg.map((image, index) => (
                      <li key={index} className="flex flex-col items-center">
                        {loadingImages[index] ? (
                          <Skeleton className="mb-2 w-36 h-36 rounded-xl" />
                        ) : (
                          <Image
                            src={image}
                            alt={image}
                            className="object-cover w-36 h-36 rounded-xl"
                            onLoad={() => handleImageLoad(index)} // Mark image as loaded
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
