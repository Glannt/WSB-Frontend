import { UploadImage } from '@/components/AdminService/UploadImage';
import { roomTypes } from '@/data/dataRoomType';
import { roomStatusManager } from '@/data/dataStatusRoom';

import { AddNewRoom, getAllStaff } from '@/service/manager.api';
import { AddRoomResponse } from '@/types/room.type';
import { Staff } from '@/types/staff.type';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchRooms: () => void;
}

interface ListStaffID {
  staffID: string;
}
export const AddRoom: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  refetchRooms,
}) => {
  const [valueStatus, setValueStatus] = React.useState(new Set(['available']));
  const [valueRoomType, setValueRoomType] = React.useState(new Set(['RT001']));
  const [selectedStaff, setSelectedStaff] = React.useState<string[]>([]);
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

  const [images, setImages] = React.useState<{ file: File; url: string }[]>([]);

  const handleImageUpload = (uploadedImages: { file: File; url: string }[]) => {
    setImages(uploadedImages); // Cập nhật hình ảnh
  };

  console.log(images);

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
    formData.append('roomTypeId', data.roomTypeId);
    formData.append('buildingId', data.buildingId.toString());
    // Check if listStaffID exists and append it
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
    AddNewRoomMutation.mutate(formData, {
      onSuccess: () => {
        refetchRooms();
        // Close modal or do something on success
        onClose();
      },
      onError: (error) => {
        console.log('Add NewRoomMutation error', error);
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
                    errorMessage={errors.roomName?.message}
                    isInvalid={errors.roomName?.message ? true : false}
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
                    errorMessage={errors.price?.message}
                    isInvalid={errors.price?.message ? true : false}
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
                  <Select
                    aria-hidden="false"
                    aria-multiselectable="true"
                    aria-errormessage="Lỗi"
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
