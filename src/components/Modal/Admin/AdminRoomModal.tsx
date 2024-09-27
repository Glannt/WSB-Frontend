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
  Selection,
} from '@nextui-org/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { UploadImage } from '../../AdminService/UploadImage';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit'; // Mode to differentiate between adding and editing
  selectedRoom?: {
    id: number;
    roomName: string;
    roomPrice: number;
    roomStatus: string;
    roomType: string;
    employees: string[];
  } | null; // Selected room data for edit mode
  setSelectedRoom?: Dispatch<
    SetStateAction<{
      id: number;
      roomName: string;
      roomPrice: number;
      roomStatus: string;
      roomType: string;
      employees: string[];
    } | null>
  >; // Setter for selected room in edit mode
}

const AdminRoomModal: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedRoom,
  setSelectedRoom,
}) => {
  const [employees, setEmployees] = useState<Selection>(
    mode === 'edit' && selectedRoom
      ? new Set(selectedRoom.employees)
      : new Set([])
  );

  const isEditMode = mode === 'edit';
  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['single']));

  const handleFieldChange = (field: string, value: any) => {
    if (isEditMode && selectedRoom && setSelectedRoom) {
      setSelectedRoom({
        ...selectedRoom,
        [field]: value,
      });
    }
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
        base: 'max-w-[1000px] h-[600px]',
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
              {isEditMode ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
            </ModalHeader>
            <ModalBody>
              <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
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
                  defaultValue={isEditMode ? selectedRoom?.roomName : ''}
                  onChange={(e) =>
                    handleFieldChange('roomName', e.target.value)
                  }
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
                  defaultValue={
                    isEditMode ? selectedRoom?.roomPrice.toString() : ''
                  }
                  onChange={(e) =>
                    handleFieldChange('roomPrice', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                <Select
                  label="Trạng thái phòng"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newStatus = Array.from(keys).join('');
                    handleFieldChange('roomStatus', newStatus);
                  }}
                  defaultSelectedKeys={
                    isEditMode && selectedRoom?.roomStatus
                      ? new Set([selectedRoom?.roomStatus])
                      : valueStatus
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
                    const newRoomType = Array.from(keys).join('');
                    handleFieldChange('roomType', newRoomType);
                  }}
                  defaultSelectedKeys={
                    isEditMode && selectedRoom?.roomType
                      ? new Set([selectedRoom.roomType])
                      : valueRoomType
                  }
                >
                  {roomTypes.map((roomType) => (
                    <SelectItem key={roomType.key}>{roomType.label}</SelectItem>
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
                    const selectedEmployees = Array.from(keys);
                    handleFieldChange('employees', selectedEmployees);
                    setEmployees(new Set(keys));
                  }}
                  defaultSelectedKeys={
                    isEditMode ? new Set(selectedRoom?.employees) : undefined
                  }
                >
                  {users.map((user) => (
                    <SelectItem key={user.id}>{user.name}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="py-2 px-3">
                <UploadImage />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng
              </Button>
              <Button color="primary" onPress={onClose}>
                {isEditMode ? 'Hoàn thành' : 'Tạo'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AdminRoomModal;
