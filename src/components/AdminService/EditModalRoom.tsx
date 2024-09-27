import { users } from '@/data/data';
import { roomTypes } from '@/data/dataRoomType';
import { roomStatusManager } from '@/data/dataStatusRoom';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import React, { EventHandler } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: any;
  setSelectedRoom: React.Dispatch<
    React.SetStateAction<{
      id: number;
      roomName: string;
      roomPrice: number;
      roomStatus: string;
      roomType: string;
      employees: string[];
    } | null>
  >;
}

export const EditModalRoom: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  setSelectedRoom,
}) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      // onOpenChange={onOpenChange}
      placement="top-center"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'max-w-[1000px] h-[500px]',
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
              Chỉnh sửa phòng
            </ModalHeader>
            <ModalBody>
              <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                {' '}
                <Input
                  isClearable
                  autoFocus
                  label="Tên phòng"
                  placeholder="Nhập tên phòng"
                  variant="bordered"
                  classNames={{
                    label: 'text-black/50 dark:text-white/90 pb-2',
                    input: 'border-0 focus:outline-none focus:border-none',
                    clearButton: 'pb-4',
                  }}
                  defaultValue={selectedRoom?.roomName}
                />
                <Input
                  label="Giá"
                  placeholder="Nhập giá phòng"
                  type="number"
                  variant="bordered"
                  classNames={{
                    label: 'text-black/50 dark:text-white/90 pb-2',
                    input: 'border-0',
                  }}
                  defaultValue={selectedRoom?.roomPrice.toString()}
                />
              </div>
              <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                <Select
                  label="Trạng thái phòng"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newStatus = Array.from(keys).join(''); // Convert Set to string
                    if (selectedRoom) {
                      setSelectedRoom({
                        ...selectedRoom,
                        roomStatus: newStatus, // Update the room status based on selection
                      });
                    }
                  }}
                  defaultSelectedKeys={
                    selectedRoom
                      ? new Set([selectedRoom.roomStatus])
                      : undefined
                  }
                >
                  {roomStatusManager.map((roomStatuses) => (
                    <SelectItem key={roomStatuses.key}>
                      {roomStatuses.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Loại phòng"
                  placeholder="Chọn loại phòng"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newRoomType = Array.from(keys); // Convert Set to string
                    if (selectedRoom) {
                      setSelectedRoom({
                        ...selectedRoom,
                        roomType: newRoomType, // Update the room status based on selection
                      });
                    }
                  }}
                  defaultSelectedKeys={
                    selectedRoom ? new Set(selectedRoom.roomType) : undefined
                  }
                >
                  {roomTypes.map((roomTypes) => (
                    <SelectItem key={roomTypes.key}>
                      {roomTypes.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                <Select
                  label="Nhân viên"
                  placeholder="Chọn nhân viên phụ trách"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const addEmployees = Array.from(keys);
                    if (selectedRoom) {
                      setSelectedRoom({
                        ...selectedRoom,
                        employees: addEmployees,
                      });
                    }
                  }}
                  defaultSelectedKeys={
                    selectedRoom ? new Set(selectedRoom.employees) : undefined
                  }
                  selectionMode="multiple"
                >
                  {users.map((user) => (
                    <SelectItem key={user.id}>{user.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng
              </Button>
              <Button color="primary" onPress={onClose}>
                Hoàn thành
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
