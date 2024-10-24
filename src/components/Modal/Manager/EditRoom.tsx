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
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  schemaAddRoom,
  SchemaAddRoom,
  schemaUpdateRoom,
  SchemaUpdateRoom,
} from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AddNewRoom, getAllStaff, UpdateRoom } from '@/service/manager.api';
import axios from 'axios';
import { getAccessTokenFromLS } from '@/utils/auth';
import { Room, RoomType } from '@/types/room.type';
import { Staff } from '@/types/staff.type';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;

  selectedRoom?: Room | null; // Selected room data for edit mode
  setSelectedRoom?: Dispatch<SetStateAction<Room | null>>; // Setter for selected room in edit mode
  refetchRooms: () => void;
}

const EditRoom: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  setSelectedRoom,
  refetchRooms,
}) => {
  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueStaffAtRoom, setValueStaffAtRoom] = React.useState(
    new Set(
      selectedRoom?.staffAtRoom
        ? selectedRoom.staffAtRoom.split(',').map((id) => id.trim()) // Tách chuỗi thành mảng và loại bỏ khoảng trắng
        : []
    )
  );
  const getAllStaffApi = async () => {
    const response = await getAllStaff();

    return response.data.content;
  };
  const {
    data: staffs = [],
    isLoading,
    refetch,
  } = useQuery<Staff[]>({
    queryKey: ['staffs'],
    queryFn: getAllStaffApi,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaUpdateRoom>({
    resolver: yupResolver(schemaUpdateRoom),
  });

  const [images, setImages] = React.useState<{ file: File; url: string }[]>([]);

  const handleImageUpload = (uploadedImages: { file: File; url: string }[]) => {
    setImages(uploadedImages); // Cập nhật hình ảnh
  };

  const UpdateMutation = useMutation({
    mutationFn: ({
      roomId,
      formData,
    }: {
      roomId: string | undefined;
      formData: FormData;
    }) => UpdateRoom(roomId, formData), // Use the updated function
  });

  // Function to handle updating an existing room
  const updateRoom = (data: SchemaUpdateRoom) => {
    const formData = new FormData();
    // Append the fields you want to update
    formData.append('roomName', data.roomName);
    formData.append('price', data.price.toString());
    formData.append('status', data.status?.toString());
    if (data.listStaffID && data.listStaffID.length > 0) {
      data.listStaffID.forEach((id) => {
        formData.append('listStaffID', id); // Append each staff ID
      });
    } else {
      formData.append('listStaffID', ''); // Optional: Send empty value or skip this
    }
    images.forEach((image) => {
      formData.append('image', image.file); // Chỉ sử dụng roomImg cho nhiều tệp
    });
    // Assuming you have the roomId from selectedRoom
    const roomId = selectedRoom?.roomId;

    UpdateMutation.mutate(
      { roomId, formData }, // Pass an object with roomId and formData
      {
        onSuccess: () => {
          // navigate('/'); // Uncomment this line if you want to navigate
          console.log('Update success');
          refetchRooms();
          onClose(); // Close the modal or perform any action on success
        },
        onError: (error) => {
          console.error('Error updating room:', error);
        },
      }
    );
  };

  const onSubmit = handleSubmit((data) => {
    updateRoom(data as SchemaUpdateRoom); // Call update room function
  });

  const handleFieldChange = (field: keyof SchemaUpdateRoom, value: any) => {
    if (selectedRoom && setSelectedRoom) {
      setValue(field, value);
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
              {'Chỉnh sửa phòng'}
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
                    defaultValue={selectedRoom ? selectedRoom?.roomName : ''}
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
                    defaultValue={
                      selectedRoom ? selectedRoom?.price.toString() : ''
                    }
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
                    defaultSelectedKeys={
                      selectedRoom?.status
                        ? new Set([selectedRoom?.status])
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
                    tabIndex={1}
                    label="Nhân viên"
                    selectionMode="multiple"
                    placeholder="Chọn nhân viên phụ trách"
                    className="max-w-xl"
                    {...register('listStaffID')}
                    onSelectionChange={(keys) => {
                      // const listStaffID = Array.from(keys).join(',');
                      // handleFieldChange('listStaffID', listStaffID);
                      const listStaffID = Array.from(keys); // Store keys as an array
                      handleFieldChange(
                        'listStaffID',
                        JSON.stringify(listStaffID)
                      );
                    }}
                    // defaultSelectedKeys={
                    //   selectedRoom?.staffAtRoom &&
                    //   Array.isArray(selectedRoom?.staffAtRoom)
                    //     ? new Set(selectedRoom?.staffAtRoom)
                    //     : undefined
                    // }
                    selectedKeys={valueStaffAtRoom}
                  >
                    {staffs.map((staff) => (
                      <SelectItem key={staff.userId}>
                        {staff.fullName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="py-2 px-3">
                  <UploadImage onImagesUpload={handleImageUpload} />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" type="submit">
                  {'Hoàn thành'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditRoom;
