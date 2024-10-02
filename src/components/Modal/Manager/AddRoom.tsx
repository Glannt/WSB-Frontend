import { UploadImage } from '@/components/AdminService/UploadImage';
import { roomTypes } from '@/data/dataRoomType';
import { roomStatusManager } from '@/data/dataStatusRoom';

import { AddNewRoom } from '@/service/manager.api';
import { AddRoomResponse } from '@/types/room.type';
import { getAccessTokenFromLS } from '@/utils/auth';
import http from '@/utils/http';
import { schemaAddRoom, SchemaAddRoom } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchRooms: () => void;
}

export const AddRoom: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  refetchRooms,
}) => {
  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['1']));
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaAddRoom>({
    resolver: yupResolver(schemaAddRoom),
  });

  const AddNewRoomMutation = useMutation({
    mutationFn: (formData: FormData) => AddNewRoom(formData),
  });

  const addNewRoom = (data: SchemaAddRoom) => {
    const formData = new FormData();
    // Append all form fields to the FormData object
    formData.append('roomName', data.roomName);
    formData.append('price', data.price.toString());
    formData.append('status', data.status);
    formData.append('roomTypeId', data.roomTypeId.toString());
    formData.append('buildingId', data.buildingId.toString());
    AddNewRoomMutation.mutate(formData, {
      onSuccess: () => {
        console.log('Room added successfully');
        refetchRooms();
        // Close modal or do something on success
        onClose();
      },
      onError: (error) => {
        console.error('Error adding room:', error);
      },
    });
  };
  const onSubmit = handleSubmit((data) => {
    // Call update room function
    addNewRoom(data); // Call add new room function
  });
  const handleFieldChange = (field: keyof SchemaAddRoom, value: any) => {
    setValue(field, value);
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
              {'Thêm phòng mới'}
            </ModalHeader>
            <form onSubmit={onSubmit}>
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
                    defaultValue={''}
                    {...register('roomName')}
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
                    defaultValue={''}
                    {...register('price')}
                    onChange={(e) => handleFieldChange('price', e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Select
                    label="Trạng thái phòng"
                    className="max-w-xl"
                    {...register('status')}
                    onSelectionChange={(keys) => {
                      const newStatus = Array.from(keys).join('');
                      handleFieldChange('status', newStatus);
                    }}
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
                    {...register('roomTypeId')}
                    onSelectionChange={(keys) => {
                      const newRoomType = Array.from(keys).join('');
                      const newRoomTypeId = Array.from(keys)[0].toString();
                      setValue('roomTypeId', newRoomTypeId);
                      handleFieldChange('roomTypeId', newRoomTypeId);
                    }}
                    defaultSelectedKeys={valueRoomType}
                  >
                    {roomTypes.map((roomType) => (
                      <SelectItem key={roomType.key}>
                        {roomType.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  {/* <Select
                    label="Nhân viên"
                    placeholder="Chọn nhân viên phụ trách"
                    className="max-w-xl"
                    selectionMode="multiple"
                    onSelectionChange={(keys) => {
                      const selectedEmployees = Array.from(keys);
                      handleFieldChange(
                        'employees',
                        selectedEmployees.map(Number)
                      ); // Chuyển key sang số
                      setEmployees(new Set(keys));
                    }}
                    defaultSelectedKeys={
                      isEditMode
                        ? new Set(selectedRoom?.employees.map(String))
                        : undefined
                    }
                  >
                    {users.map((user) => (
                      <SelectItem key={user.id}>{user.name}</SelectItem>
                    ))}
                  </Select> */}
                </div>
                <div className="py-2 px-3">
                  <UploadImage />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" type="submit">
                  {'Tạo'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
