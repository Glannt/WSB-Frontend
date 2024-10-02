import { UploadImage } from '@/components/AdminService/UploadImage';
import { statusOptions } from '@/data/data';
import { roomTypes } from '@/data/dataRoomType';
import { roomStatusManager } from '@/data/dataStatusRoom';

import { AddNewRoom, AddNewStaff } from '@/service/manager.api';
import { AddRoomResponse } from '@/types/room.type';
import { columnWorkShift } from '@/types/staff.type';
import { getAccessTokenFromLS } from '@/utils/auth';
import http from '@/utils/http';
import {
  schemaAddRoom,
  SchemaAddRoom,
  schemaAddStaff,
  SchemaAddStaff,
} from '@/utils/rules';
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

export const AddStaff: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  refetchRooms,
}) => {
  const [valueStatus, setValueStatus] = React.useState(new Set(['active']));
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaAddStaff>({
    resolver: yupResolver(schemaAddStaff),
  });

  const AddNewSStaffMutation = useMutation({
    mutationFn: (body: SchemaAddStaff) => AddNewStaff(body),
  });

  const addNewStaff = (data: SchemaAddStaff) => {
    AddNewSStaffMutation.mutate(data, {
      onSuccess: () => {
        console.log('Staff added successfully');
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
    addNewStaff(data); // Call add new room function
  });
  const handleFieldChange = (field: keyof SchemaAddStaff, value: any) => {
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
              {'Thêm nhân viên mới'}
            </ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody>
                <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                  <Input
                    isClearable
                    autoFocus
                    label="Tên nhân viên"
                    placeholder="Nhập tên nhân viên"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0 focus:outline-none focus:border-none',
                      clearButton: 'pb-4',
                    }}
                    defaultValue={''}
                    {...register('fullName')}
                    onChange={(e) =>
                      handleFieldChange('fullName', e.target.value)
                    }
                  />
                  <Input
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    type="number"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    defaultValue={''}
                    {...register('phoneNumber')}
                    onChange={(e) =>
                      handleFieldChange('phoneNumber', String(e.target.value))
                    }
                  />
                </div>
                <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                  <Input
                    label="Ngày sinh"
                    placeholder="Nhập ngày sinh"
                    type="date"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    defaultValue={''}
                    {...register('dateOfBirth')}
                    onChange={(e) =>
                      handleFieldChange(
                        'dateOfBirth',
                        e.target.value.toString()
                      )
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Nhập email"
                    type="email"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    defaultValue={''}
                    {...register('email')}
                    onChange={(e) =>
                      handleFieldChange('email', String(e.target.value))
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  {/* Work Shift */}
                  <Select
                    label="Ca làm việc"
                    className="max-w-xl"
                    {...register('workShift')}
                    onSelectionChange={(e) => {
                      handleFieldChange('workShift', e.currentKey); // Truyền giá trị key đã chọn, không phải đối tượng
                    }}
                  >
                    {columnWorkShift.map((column) => (
                      <SelectItem key={column.uid}>{column.name}</SelectItem>
                    ))}
                  </Select>
                  {/* Ngày làm việc */}
                  <Select
                    label="Ngày làm việc"
                    className="max-w-xl"
                    selectionMode="multiple"
                    {...register('workDays')}
                    onSelectionChange={(e) => {
                      handleFieldChange('workDays', e.currentKey);
                    }}
                    // defaultSelectedKeys={'TuesDay'}
                  >
                    <SelectItem key="Monday">Monday</SelectItem>
                    <SelectItem key="Tuesday">Tuesday</SelectItem>
                    <SelectItem key="Wednesday">Wednesday</SelectItem>
                    <SelectItem key="Thursday">Thursday</SelectItem>
                    <SelectItem key="Friday">Friday</SelectItem>
                  </Select>
                </div>
                <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Select
                    label="Trạng thái"
                    className="max-w-xl"
                    // {...register('status')}
                    onSelectionChange={(e) => {
                      //   handleFieldChange('status', e.currentKey);
                    }}
                    defaultSelectedKeys={valueStatus}
                  >
                    {statusOptions.map((staffStatus) => (
                      <SelectItem key={staffStatus.uid}>
                        {staffStatus.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Cơ sở"
                    placeholder="Nhập cơ sở"
                    type="text"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    defaultValue={''}
                    {...register('buildingId')}
                    onChange={(e) =>
                      handleFieldChange('buildingId', e.target.value)
                    }
                  />
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
