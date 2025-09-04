import React, { useContext, useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { CircularProgress, Form, Input, Button } from '@heroui/react';
import { BiLoaderAlt } from 'react-icons/bi';
import { schema, Schema } from '@/utils/rules';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '@/service/auth.api';
import { ErrorResponse } from '@/types/utils.type';
import { isAxiosUnprocessableEntityError } from '@/utils/utils';
import { AppContext } from '@/context/app.context';
import path from '@/constants/path';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) =>
      registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    const body = { ...data, confirm_password: undefined };
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true);
        navigate('/');
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<Schema, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<Schema, 'confirm_password'>, {
                message: String(formError[key as keyof typeof formError]),
                type: 'Server',
              });
            });
          }
        }
      },
    });
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg')",
      }}
    >
      <div className="bg-opacity-70 p-10 m-20 rounded-lg shadow-lg w-full max-w-lg backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">Tạo tài khoản!</h2>

        <Form onSubmit={onSubmit} className="space-y-4">
          <Input
            isRequired
            {...register('userName')}
            label="Tên đăng nhập"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Nhập tên đăng nhập"
            errorMessage={errors.userName?.message}
            isInvalid={!!errors.userName}
            startContent={<FaUser className="mr-3" />}
          />

          <Input
            isRequired
            {...register('fullName')}
            label="Họ và tên"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Nhập họ và tên"
            errorMessage={errors.fullName?.message}
            isInvalid={!!errors.fullName}
            startContent={<FaUser className="mr-3" />}
          />

          <Input
            isRequired
            {...register('email')}
            label="Email"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Nhập email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            startContent={<FaEnvelope className="mr-3" />}
          />

          <Input
            isRequired
            {...register('phoneNumber')}
            label="Số điện thoại"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Nhập số điện thoại"
            errorMessage={errors.phoneNumber?.message}
            isInvalid={!!errors.phoneNumber}
            startContent={<FaPhone className="mr-3" />}
          />

          <Input
            isRequired
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Nhập mật khẩu"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            startContent={<FaLock className="mr-3" />}
            endContent={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-3 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          <Input
            isRequired
            {...register('confirm_password')}
            type={showConfirmPassword ? 'text' : 'password'}
            label="Xác nhận mật khẩu"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Xác nhận mật khẩu"
            errorMessage={errors.confirm_password?.message}
            isInvalid={!!errors.confirm_password}
            startContent={<FaLock className="mr-3" />}
            endContent={
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="ml-3 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          <Input
            isRequired
            {...register('dateOfBirth')}
            type="date"
            label="Ngày sinh"
            labelPlacement="outside"
            variant="bordered"
            errorMessage={errors.dateOfBirth?.message}
            isInvalid={!!errors.dateOfBirth}
            startContent={<FaCalendar className="mr-3" />}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('agreeTerms')}
              id="agreeTerms"
              className="rounded-sm"
            />
            <label htmlFor="agreeTerms" className="text-black text-sm">
              Đồng ý với{' '}
              <span className="text-blue-500 underline cursor-pointer">
                các điều khoản
              </span>{' '}
              của chúng tôi
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-700 text-sm mt-1">
              {errors.agreeTerms.message}
            </p>
          )}

          <Button
            type="submit"
            color="primary"
            className="relative z-10 w-full font-bold border-1 bg-black hover:text-white"
            isDisabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress className="animate-spin mr-2" size="sm" />
                Đang xử lý...
              </>
            ) : (
              'Đăng ký'
            )}
          </Button>
        </Form>

        <p className="text-center mt-4 text-black">
          Đã có tài khoản?{' '}
          <span
            onClick={() => navigate(path.login)}
            className="text-black font-bold hover:underline cursor-pointer"
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
