import React, { useContext, useState } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { schemaLogin, SchemaLogin } from '@/utils/rules';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { loginAccount } from '@/service/auth.api';
import { ErrorResponse } from '@/types/utils.type';
import { isAxiosUnprocessableEntityError } from '@/utils/utils';
import { AppContext } from '@/context/app.context';
import path from '@/constants/path';
import { useCustomer } from '@/context/customer.context';
import { Form, Input, Button, CircularProgress } from '@heroui/react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadings, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const { refetch } = useCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SchemaLogin>({
    resolver: yupResolver(schemaLogin),
  });

  const loginAccountMutation = useMutation({
    mutationFn: (body: SchemaLogin) => loginAccount(body),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      loginAccountMutation.mutate(data, {
        onSuccess: () => {
          setIsAuthenticated(true);
          refetch();
          navigate('/');
        },
        onError: (error) => {
          if (
            isAxiosUnprocessableEntityError<ErrorResponse<SchemaLogin>>(error)
          ) {
            const formError = error.response?.data.data;
            if (formError) {
              Object.keys(formError).forEach((key) => {
                if (key in data) {
                  setError(key as keyof SchemaLogin, {
                    message: formError[key as keyof SchemaLogin],
                    type: 'Server',
                  });
                }
              });
            }
          }
        },
      });
    } catch (err) {
      console.error('Error during submission:', err);
    } finally {
      setIsLoading(false);
    }
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg')",
      }}
    >
      <div className=" bg-opacity-70 p-10 m-20 rounded-lg shadow-lg w-full max-w-lg backdrop-blur-sm ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Chào mừng trở lại!
        </h2>

        <Form
          onSubmit={onSubmit}
          className="justify-center items-center gap-4 space-y-4"
        >
          {/* Username */}
          <Input
            isRequired
            {...register('userName')}
            label="Tên đăng nhập"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Nhập tên đăng nhập"
            errorMessage={errors.userName?.message}
            isInvalid={!!errors.userName}
            startContent={<FaEnvelope className="mr-3" />}
            classNames={{
              input: 'py-5 text-base',
              label: ' font-semibold',
            }}
          />

          {/* Password */}
          <Input
            isRequired
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            variant="bordered"
            labelPlacement="outside"
            radius="md"
            classNames={{
              input: 'py-3 text-base',
              label: ' font-semibold',
            }}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            startContent={<FaLock className="mr-3" />}
            endContent={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-3 focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="8rem" />
                ) : (
                  <FaEye className="8rem" />
                )}
              </button>
            }
          />

          {/* Quên mật khẩu */}
          <div className="flex justify-end">
            <a href="#" className="text-black hover:underline text-sm">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit */}
          {/* <Button
            type="submit"
            color="primary"
            className="w-full font-bold border-1 hover:transition-all hover:ease-in-out hover:duration-300 "
            isDisabled={isLoadings}
          >
            {isLoadings ? (
              <>
                <BiLoaderAlt className="animate-spin mr-2 h-5 w-5" />
                Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button> */}

          {/* Hiệu ứng overlay */}

          <Button
            type="submit"
            color="primary"
            className="relative z-10 w-full font-bold border-1 bg-black hover:text-white"
            isDisabled={isLoadings}
          >
            {isLoadings ? (
              <>
                <CircularProgress className="animate-spin mr-2" size="sm" />
                Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </Form>

        {/* Google login */}
        <div className="mt-4">
          <Button
            className="w-full bg-black text-white font-bold"
            startContent={<FaGoogle />}
          >
            Đăng nhập với Google
          </Button>
        </div>

        <p className="text-center mt-4 text-black">
          Chưa có tài khoản?{' '}
          <span
            onClick={() => navigate(path.register)}
            className="text-black font-bold hover:underline cursor-pointer"
          >
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
