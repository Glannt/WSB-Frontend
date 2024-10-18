import React, { useState, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router';
import path from '@/constants/path';
import { useForm } from 'react-hook-form';
import { SchemaUpdatePassword, schemaUpdatePassword } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { getProfileFromLS } from '@/utils/auth';
import { changePassword } from '@/service/customer.api';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@nextui-org/react';
import { EyeSlashFilledIcon } from '../Icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../Icons/EyeFilledIcon';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register, // To register the form fields
    handleSubmit, // To handle form submission
    formState: { errors }, // To access validation errors
    reset,
    setValue,
    getValues,
  } = useForm<SchemaUpdatePassword>({
    resolver: yupResolver(schemaUpdatePassword), // Integrate Yup with react-hook-form
  });
  const profile = getProfileFromLS();
  const UpdatePasswordMutation = useMutation({
    mutationFn: async (
      data: Omit<SchemaUpdatePassword, 'currentPassword' | 'confirmPassword'>
    ) => {
      // Convert data to FormData before passing to changePassword
      const formData = new FormData();
      formData.append('newPassword', data.newPassword); // Assuming the API expects newPassword in FormData
      console.log(profile.username, data.newPassword);

      // Call the API function with username and formData
      return changePassword(profile.username, formData);
    },
    onSuccess: () => {
      setIsLoading(false);
      // refetch(); // You can refetch here if needed
      reset();
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    },
  });
  const onSubmit = (data: SchemaUpdatePassword) => {
    setIsLoading(true);

    // Prepare the data excluding currentPassword and confirmPassword
    const updateData = {
      newPassword: data.newPassword,
    };

    // Call the mutation to update the password
    UpdatePasswordMutation.mutate(updateData);
  };

  const togglePasswordVisibility = (
    field: 'current' | 'new' | 'confirm'
  ): void => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleChangeField = (field: keyof SchemaUpdatePassword, value: any) => {
    setValue(field, value);
  };
  return (
    <div className="inset-0 flex items-center justify-center">
      {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4"> */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl gap-4 h-auto max-h-screen mx-auto w-382px">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Đổi mật khẩu
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div>
            <Input
              label=" Mật khẩu hiện tại"
              labelPlacement="outside"
              placeholder="Nhập mật khẩu hiện tại"
              variant="bordered"
              type={showCurrentPassword ? 'text' : 'password'}
              className="max-w-auto"
              radius="sm"
              {...register('currentPassword')}
              onChange={(e) =>
                handleChangeField('currentPassword', e.target.value)
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  aria-label="toggle password visibility"
                >
                  {showCurrentPassword ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div>
            <Input
              label="Mật khẩu mới"
              labelPlacement="outside"
              placeholder="Nhập mật khẩu mới"
              variant="bordered"
              type={showNewPassword ? 'text' : 'password'}
              className="max-w-auto"
              radius="sm"
              {...register('newPassword')}
              onChange={(e) => handleChangeField('newPassword', e.target.value)}
              errorMessage={errors.newPassword?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  aria-label="toggle password visibility"
                >
                  {showNewPassword ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          {/* confirm new Password */}
          <div>
            <Input
              label="Xác nhận mật khẩu"
              labelPlacement="outside"
              placeholder="Nhập lại mật khẩu mới"
              variant="bordered"
              type={showConfirmPassword ? 'text' : 'password'}
              className="max-w-auto"
              radius="sm"
              onChange={(e) =>
                handleChangeField('confirmPassword', e.target.value)
              }
              isInvalid={errors.confirmPassword ? true : false}
              errorMessage={errors.confirmPassword?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  aria-label="toggle password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div className="flex justify-between">
            <span
              onClick={() => navigate(path.settings + '/edit-profile')}
              className="bg-black text-white rounded-md flex justify-center items-center w-32 cursor-pointer"
            >
              Trở về
            </span>
            <button
              type="submit"
              className="w-32 bg-black text-white py-2 px-4 rounded-md hover:bg-blackA12 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Đang thay đổi...
                </>
              ) : (
                'Lưu thay đổi'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
