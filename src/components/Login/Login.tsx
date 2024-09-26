import React, { FormEvent, useContext, useState } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { GoogleLogin } from '@react-oauth/google';
import { schemaLogin, SchemaLogin } from '@/utils/rules';
// import { postLogin } from '@/service/UserService';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { loginAccount } from '@/service/auth.api';
import { ErrorResponse } from '@/types/utils.type';
import { isAxiosUnprocessableEntityError } from '@/utils/utils';
import { AppContext } from '@/context/app.context';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
          console.log(data);

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
      // Set loading to false after the process is done
      setIsLoading(false);
    }
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Chào mừng trở lại!
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4 relative">
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 placeholder-gray-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blackA9 pl-10 bg-black bg-opacity-20"
              placeholder="Tên đăng nhập"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              {...register('userName')}
            />
            {errors.userName && (
              <p className="text-red-700 text-sm mt-1">
                {errors.userName?.message}
              </p>
            )}
            <FaEnvelope className="absolute left-3 top-3 text-black-400" />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-3 py-2 text-black placeholder-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blackA9 pl-10 bg-black bg-opacity-20"
              placeholder="Mật khẩu"
              autoComplete="on"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              {...register('password')}
            />
            <FaLock className="absolute left-3 top-3 text-black" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            {/* <label className="flex items-center text-white">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label> */}
            <a href="#" className="text-black hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          {/* <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </button> */}
          <button
            type="submit"
            className={` w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white  hover:text-gray-300 bg-blackA11 hover:bg-blackA12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
        <div className="mt-4">
          <button className="w-full bg-blackA11 text-white py-2 rounded-md font-bold hover:bg-blackA12 hover:text-gray-300 transition duration-300 flex items-center justify-center">
            <FaGoogle className="mr-2" /> Đăng nhập với Google
          </button>
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
        </div>
        <p className="text-center mt-4 text-black">
          Chưa có tải khoản?{' '}
          <a
            onClick={() => navigate('/sign-up')}
            className="text-black font-bold hover:underline cursor-pointer"
          >
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
