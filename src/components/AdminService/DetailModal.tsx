import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: any;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
}) => {
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
            <ModalHeader className="flex flex-col gap-1">
              Chi tiết phòng
            </ModalHeader>
            <ModalBody>
              <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                {' '}
                {selectedRoom ? (
                  <>
                    <Input
                      isDisabled
                      autoFocus
                      label="Tên phòng"
                      value={selectedRoom.roomName}
                      variant="bordered"
                      classNames={{
                        label: 'text-black/50 dark:text-white/90 pb-2',
                        input: 'border-0 focus:outline-none focus:border-none',
                        clearButton: 'pb-4',
                      }}
                    />
                    <Input
                      isDisabled
                      label="Giá phòng"
                      value={selectedRoom.roomPrice.toString()}
                      variant="bordered"
                      classNames={{
                        label: 'text-black/50 dark:text-white/90 pb-2',
                        input: 'border-0 focus:outline-none focus:border-none',
                        clearButton: 'pb-4',
                      }}
                    />
                    {/* You can add more inputs for other properties like roomStatus, roomType, employees, etc. */}
                  </>
                ) : (
                  <p>No room selected</p>
                )}
              </div>
              <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                {selectedRoom ? (
                  <>
                    <Input
                      isDisabled
                      autoFocus
                      label="Tên phòng"
                      value={selectedRoom.roomStatus}
                      variant="bordered"
                      classNames={{
                        label: 'text-black/50 dark:text-white/90 pb-2',
                        input: 'border-0 focus:outline-none focus:border-none',
                        clearButton: 'pb-4',
                      }}
                    />
                    <Input
                      isDisabled
                      label="Giá phòng"
                      value={selectedRoom.roomType}
                      variant="bordered"
                      classNames={{
                        label: 'text-black/50 dark:text-white/90 pb-2',
                        input: 'border-0 focus:outline-none focus:border-none',
                        clearButton: 'pb-4',
                      }}
                    />
                    {/* You can add more inputs for other properties like roomStatus, roomType, employees, etc. */}
                  </>
                ) : (
                  <p>No room selected</p>
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
