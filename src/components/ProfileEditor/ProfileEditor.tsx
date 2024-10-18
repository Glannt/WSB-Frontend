import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUpload, FaLock } from 'react-icons/fa';
import { MdSave, MdRefresh } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { changeProfile } from '@/service/customer.api';
import { Customer, phoneCodes } from '@/types/customer.type';
import { DatePicker, Image, Input, Link } from '@nextui-org/react';
import { useCustomer } from '@/context/customer.context';
import { getProfileFromLS } from '@/utils/auth';
import path from '@/constants/path';
import { motion } from 'framer-motion';
import { log } from 'console';
import { parseDate } from '@internationalized/date';
interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  avatar: string;
}

interface ShowPassword {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

const ProfileEditor: React.FC = () => {
  const { customer, refetch } = useCustomer();
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    customer?.dateOfBirth!
  );
  const [formData, setFormData] = useState<FormData>({
    fullName: customer?.fullName ?? '',
    email: customer?.email ?? '',
    phoneNumber: customer?.phoneNumber ?? '',
    dateOfBirth: customer?.dateOfBirth ?? '',
    avatar: '',
  });

  const [showPassword, setShowPassword] = useState<ShowPassword>({
    current: false,
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();
  const [isModified, setIsModified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<Customer>({
    defaultValues: {
      userId: customer?.userId,
      fullName: customer?.fullName ?? '',
      email: customer?.email ?? '',
      phoneNumber: customer?.phoneNumber ?? '',
      dateOfBirth: customer?.dateOfBirth ?? '',
    },
  });
  const profile = getProfileFromLS();
  const updateProfile = useMutation({
    mutationFn: async (data: Omit<Customer, 'wallet' | 'roleName'>) =>
      changeProfile(profile.username, data),
    onSuccess: () => {
      setIsLoading(false);
      setIsModified(false);
      refetch();
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    },
  });

  const handleInputChange = (field: keyof Customer, value: any) => {
    // if (field === dateOfBirth) {
    //   setDateOfBirth(value);
    //   console.log(getValues().dateOfBirth);
    // }
    setValue(field, value);
    console.log(getValues().dateOfBirth);

    setIsModified(true);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
        setIsModified(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Omit<Customer, 'wallet' | 'roleName'>) => {
    if (isModified) {
      setIsLoading(true);
      updateProfile.mutate(data);
    }
  };

  const handleReset = () => {
    reset(); // Reset the form to default values
    setIsModified(false);
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
  };
  return (
    <>
      <h2 className="text-3xl font-bold mb-10 mt-5 text-center text-gray-800">
        Chỉnh sửa thông tin
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col justify-center items-stretch gap-4 h-[500px] max-h-screen mx-auto p-6 bg-[#fcfcfc] shadow-lg shadow-violet-500/70 rounded-lg w-[1200px] mt-20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="flex flex-col md:flex-row md:space-x-4 h-auto ">
              <div className="w-full md:w-2/3 space-y-12">
                <Input
                  isClearable
                  size="lg"
                  isRequired
                  label="Họ và tên"
                  {...register('fullName', {
                    required: 'Full name is required',
                  })}
                  defaultValue={customer?.fullName}
                  onChange={(e) =>
                    handleInputChange('fullName', e.target.value)
                  }
                  isInvalid={errors.fullName?.message ? true : false}
                  errorMessage={errors.fullName?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  isRequired
                  size="lg"
                  {...register('email', { required: 'Email is required' })}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  errorMessage={errors.email?.message}
                />
                <Input
                  label="Số điện thoại"
                  isRequired
                  type="tel"
                  size="lg"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                  })}
                  onChange={(e) =>
                    handleInputChange('phoneNumber', e.target.value)
                  }
                  errorMessage={errors.phoneNumber?.message}
                />
                <DatePicker
                  className="w-full"
                  size="lg"
                  label="Ngày sinh"
                  defaultValue={parseDate(
                    new Date(dateOfBirth).toISOString().slice(0, 10)
                  )} // ensure value is a Date object
                  onChange={
                    (dateValue) =>
                      handleInputChange('dateOfBirth', dateValue.toString()) // Format to YYYY-MM-DD
                  }
                  isInvalid={errors.dateOfBirth?.message ? true : false}
                  errorMessage={errors.dateOfBirth?.message}
                />
              </div>
              <div className="w-full md:w-1/3 mt-6 md:mt-0">
                <div className="text-center">
                  <div className="mx-auto w-36 h-36 border border-black rounded-full">
                    <Image
                      src={formData.avatar}
                      alt="User Avatar"
                      className="w-34 h-34 mx-auto rounded-full object-cover border"
                    />
                  </div>

                  {/* <label
                    htmlFor="avatar"
                    className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  ></label> */}
                  <Input
                    label="Thay ảnh đại diện"
                    type="file"
                    id="avatar"
                    name="avatar"
                    startContent={<FaUpload className="mr-2" />}
                    onChange={handleAvatarChange}
                    className="mt-2 cursor-pointer text-lg font-medium text-black rounded-md shadow-lg bg-transparent hover:bg-gray-100 opacity-90 transition duration-300"
                  />
                </div>
                <div className="px-8 flex items-center justify-between my-14">
                  <div className="flex items-center space-x-2">
                    <FaLock className="text-black text-lg" />
                    <span className="text-gray-700 text-lg">Mật khẩu</span>
                  </div>
                  <Link
                    onClick={() => navigate(path.settings + '/change-password')}
                    className="cursor-pointer px-4 py-2 border border-gray-300 rounded-sm shadow-sm font-medium text-black bg-white hover:bg-gray-50 text-lg"
                  >
                    Đổi mật khẩu
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <MdRefresh className="mr-2" />
                Đặt lại
              </button>
              <button
                type="submit"
                disabled={!isModified || isLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 ${
                  (!isModified || isLoading) && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <MdSave className="mr-2" />
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <Outlet />
      </motion.div>
    </>
  );
};

export default ProfileEditor;
