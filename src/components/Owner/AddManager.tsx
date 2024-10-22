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
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  schemaAddRoom,
  SchemaAddRoom,
  schemaCreateAccount,
  SchemaCreateAccount,
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
import {
  createAccount,
  createBuilding,
  getAllBuilding,
  updateBuilding,
} from '@/service/owner.api';
import { log } from 'console';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;

  selectedRoom?: Building | null; // Selected room data for edit mode
  setSelectedRoom?: Dispatch<SetStateAction<Building | null>>; // Setter for selected room in edit mode
  refetchRooms: () => void;
}

const AddManager: React.FC<RoomModalProps> = ({
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
  } = useForm<SchemaCreateAccount>({
    resolver: yupResolver(schemaCreateAccount),
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const CreateMutation = useMutation({
    mutationFn: (formData: FormData) => createAccount(formData),
  });

  const getAllBuildingApi = async () => {
    const response = await getAllBuilding();
    return response.data.content;
  };

  const {
    data: buildings = [],
    isLoading,
    refetch,
  } = useQuery<Building[]>({
    queryKey: ['buildings'],
    queryFn: getAllBuildingApi,
  });
  console.log('buildings', buildings);
  const options = buildings.map((building) => ({
    label: building.buildingName,
    value: building.buildingId,
  }));

  // Function to handle updating an existing room
  const UpdateBuilding = (data: SchemaCreateAccount) => {
    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('buildingId', data.buildingId);
    formData.append('password', data.password);
    formData.append('confirm_password', data.confirm_password);
    formData.append('role', 'MANAGER');
    CreateMutation.mutate(
      formData,
      //   { formData }, // Pass an object with roomId and formData
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
    UpdateBuilding(data as SchemaCreateAccount); // Call update room function
  });

  const handleFieldChange = (field: keyof SchemaCreateAccount, value: any) => {
    if (selectedRoom && setSelectedRoom) {
      setValue(field, value);
      setSelectedRoom({
        ...selectedRoom,
        [field]: value,
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              {'Thêm quản lý'}
            </ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody>
                <div className="flex py-2 px-3 justify-evenly flex-wrap md:flex-nowrap gap-4 outline-none border-0">
                  <Input
                    isClearable
                    autoFocus
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0 focus:outline-none focus:border-none',
                      clearButton: 'pb-4',
                    }}
                    defaultValue={
                      selectedRoom ? selectedRoom?.buildingName : ''
                    }
                    {...register('userName')}
                    onChange={(e) =>
                      handleFieldChange('userName', e.target.value)
                    }
                  />
                  {/* <Input
                    label="Cơ sở"
                    placeholder="Nhập cơ sở"
                    variant="bordered"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    defaultValue={
                      selectedRoom ? selectedRoom?.buildingLocation : ''
                    }
                    {...register('buildingId')}
                    onChange={(e) =>
                      handleFieldChange('buildingId', e.target.value)
                    }
                  /> */}
                  <Select
                    label="Trạng thái phòng"
                    className="max-w-xl"
                    {...register('buildingId')}
                    onSelectionChange={(keys) => {
                      const newBuilding = Array.from(keys).join('');
                      handleFieldChange('buildingId', newBuilding);
                    }}
                    // defaultSelectedKeys={valueStatus}
                  >
                    {options.map((option) => (
                      <SelectItem key={option.value}>{option.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="relative flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Input
                    label="Mật khẩu"
                    variant="bordered"
                    type={showPassword ? 'text' : 'password'}
                    // name="confirmPassword"
                    // value={formData.confirmPassword}
                    // onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    autoComplete="on"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    {...register('password')}
                    onChange={(e) =>
                      handleFieldChange('password', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className={`absolute right-8 transform -translate-y-1/2 text-black top-1/2`}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative flex flex-wrap py-2 px-3 md:flex-nowrap gap-4 w-[960px] justify-evenly">
                  <Input
                    label="Xác nhận mật khẩu"
                    variant="bordered"
                    type={showConfirmPassword ? 'text' : 'password'}
                    // name="confirmPassword"
                    // value={formData.confirmPassword}
                    // onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="on"
                    classNames={{
                      label: 'text-black/50 dark:text-white/90 pb-2',
                      input: 'border-0',
                    }}
                    {...register('confirm_password')}
                    onChange={(e) =>
                      handleFieldChange('confirm_password', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className={`absolute right-8 transform -translate-y-1/2 text-black top-1/2`}
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
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

export default AddManager;
