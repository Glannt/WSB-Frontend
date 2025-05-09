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
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  schemaAddRoom,
  SchemaAddRoom,
  schemaUpdateBuilding,
  SchemaUpdateBuilding,
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
import { Building } from '@/types/building.type';
import { createBuilding, updateBuilding } from '@/service/owner.api';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;

  selectedRoom?: Building | null; // Selected room data for edit mode
  setSelectedRoom?: Dispatch<SetStateAction<Building | null>>; // Setter for selected room in edit mode
  refetchRooms: () => void;
}

const AddBuilding: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  setSelectedRoom,
  refetchRooms,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaUpdateBuilding>({
    resolver: yupResolver(schemaUpdateBuilding),
  });

  const UpdateMutation = useMutation({
    mutationFn: ({ body }: { body: SchemaUpdateBuilding }) =>
      createBuilding(body), // Use the updated function
  });

  // Function to handle updating an existing room
  const UpdateBuilding = (data: SchemaUpdateBuilding) => {
    const buildingId = selectedRoom?.buildingId;
    const body = getValues();

    UpdateMutation.mutate(
      { body }, // Pass an object with roomId and formData
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
    UpdateBuilding(data as SchemaUpdateBuilding); // Call update room function
  });

  const handleFieldChange = (field: keyof SchemaUpdateBuilding, value: any) => {
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
        base: 'max-w-[1000px] h-auto',
        header: 'text-2xl',
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
              {'Thêm cơ sở'}
            </ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody>
                <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                  <Input
                    isClearable
                    autoFocus
                    size="lg"
                    label="Tên cơ sở"
                    placeholder="Nhập tên cơ sở"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2 text-lg',
                      input: 'border-0 focus:outline-none focus:border-none',
                      clearButton: 'pb-4',
                    }}
                    defaultValue={
                      selectedRoom ? selectedRoom?.buildingName : ''
                    }
                    {...register('buildingName')}
                    onChange={(e) =>
                      handleFieldChange('buildingName', e.target.value)
                    }
                    isInvalid={errors.buildingName ? true : false}
                    errorMessage={errors.buildingName?.message}
                  />
                  <Input
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    variant="bordered"
                    size="lg"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2 text-lg',
                      input: 'border-0',
                    }}
                    defaultValue={
                      selectedRoom ? selectedRoom?.buildingLocation : ''
                    }
                    {...register('buildingLocation')}
                    onChange={(e) =>
                      handleFieldChange('buildingLocation', e.target.value)
                    }
                    isInvalid={errors.buildingLocation ? true : false}
                    errorMessage={errors.buildingLocation?.message}
                  />
                </div>
                <div className="flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Input
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    variant="bordered"
                    size="lg"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2 text-lg',
                      input: 'border-0',
                    }}
                    defaultValue={
                      selectedRoom ? selectedRoom?.phoneContact : ''
                    }
                    {...register('phoneContact')}
                    onChange={(e) =>
                      handleFieldChange('phoneContact', e.target.value)
                    }
                    isInvalid={errors.phoneContact ? true : false}
                    errorMessage={errors.phoneContact?.message}
                  />
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

export default AddBuilding;
