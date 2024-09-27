import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Select,
  SelectItem,
  Selection,
} from '@nextui-org/react';
import { useDisclosure } from '@nextui-org/react';
import { roomStatusManager } from '@/data/dataStatusRoom';
import { roomTypes } from '@/data/dataRoomType';
import { users } from '@/data/data';

interface AddRoomModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  valueStatus: Set<string>;
  setValueStatus: Dispatch<SetStateAction<Set<string>>>;
  valueRoomType: Set<string>;
  setValueRoomType: Dispatch<SetStateAction<Set<string>>>;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  onOpenChange,
  valueStatus,
  setValueStatus,
  valueRoomType,
  setValueRoomType,
}) => {
  const [employees, setEmployees] = React.useState<Selection>(new Set([]));

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
              Thêm phòng mới
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
                />
              </div>
              <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                <Select
                  label="Trạng thái phòng"
                  className="max-w-xl"
                  onSelectionChange={() => setValueStatus(valueStatus)}
                  defaultSelectedKeys={valueStatus}
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
                  defaultSelectedKeys={valueRoomType}
                  onSelectionChange={() => setValueRoomType(valueRoomType)}
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
                  selectionMode="multiple"
                  onSelectionChange={(keys) => {
                    const selectedKeys = new Set(keys); // Create a Set from the selected keys
                    setEmployees(selectedKeys); // Update the employees state
                  }}
                >
                  {users.map((user) => (
                    <SelectItem key={user.id}>{user.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng{' '}
              </Button>
              <Button color="primary" onPress={onClose}>
                Tạo
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddRoomModal;
