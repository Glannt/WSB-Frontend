import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, Schema } from '@/utils/rules';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '@/service/auth.api';
import { omit } from 'lodash';
import { ErrorResponse } from '@/types/utils.type';
import { isAxiosUnprocessableEntityError } from '@/utils/utils';
import { useNavigate } from 'react-router';
import { AppContext } from '@/context/app.context';
// import { getRules } from '@/utils/rules';

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) =>
      registerAccount(body),
  });
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
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
              if (key in body) {
                // Extract the error value for the current key
                const errorValue = formError[key as keyof typeof formError];

                // Determine the appropriate error message type based on the value type
                let errorMessage: string;

                // If the error value is a string, use it as the error message
                if (typeof errorValue === 'string') {
                  errorMessage = errorValue;
                }
                // If the error value is a Date, convert it to a string in ISO format
                else if (errorValue instanceof Date) {
                  errorMessage = errorValue.toISOString();
                }
                // For other types (boolean, number, etc.), convert to a string
                else {
                  errorMessage = String(errorValue);
                }

                // Use setError to set the error for the corresponding field
                setError(key as keyof Omit<Schema, 'confirm_password'>, {
                  message: errorMessage,
                  type: 'Server',
                });
              }
            });
          }
        }
      },
    });
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg')",
        // "url('https://www.dgicommunications.com/wp-content/uploads/2022/08/Design_a_Flexible_Workspace.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg h-full w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Create Your Account!
        </h2>
        <form onSubmit={onSubmit} className="space-y-7">
          <div className="relative">
            <FaUser
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-8` : `top-1/2`}`}
            />
            <input
              type="text"
              // name="fullName"
              // value={formData.fullName}
              // onChange={handleChange}
              placeholder="Username"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 my-2 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('userName')}
            />
            {errors.userName && (
              <p className="text-red-700 text-sm mt-1">
                {errors.userName?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaUser
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-8` : `top-1/2`}`}
            />
            <input
              type="text"
              // name="fullName"
              // value={formData.fullName}
              // onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 my-2 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-700 text-sm mt-1">
                {errors.fullName?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaEnvelope
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="email"
              // name="email"
              // value={formData.email}
              // onChange={handleChange}
              placeholder="Email"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-700 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaPhone
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="tel"
              // name="phoneNumber"
              // value={formData.phoneNumber}
              // onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className="text-red-700 text-sm mt-1">
                {errors.phoneNumber?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaLock
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              // name="password"
              // value={formData.password}
              // onChange={handleChange}
              placeholder="Password"
              autoComplete="on"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('password')}
            />
            <button
              type="button"
              className={`absolute right-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaLock
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              // name="confirmPassword"
              // value={formData.confirmPassword}
              // onChange={handleChange}
              placeholder="Confirm Password"
              autoComplete="on"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('confirm_password')}
            />
            <button
              type="button"
              className={`absolute right-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirm_password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.confirm_password?.message}
              </p>
            )}
          </div>
          {passwordError && (
            <p className="text-red-700 text-sm mt-1">{passwordError}</p>
          )}
          <div className="relative">
            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="date"
              // name="dateOfBirth"
              // value={formData.dateOfBirth}
              // onChange={handleChange}
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && (
              <p className="text-red-700 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              // name="agreeTerms"
              // checked={formData.agreeTerms}
              // onChange={handleChange}
              className="mr-2 rounded-sm"
              {...register('agreeTerms')}
            />
            <label htmlFor="agreeTerms" className="text-black text-sm">
              Agree to Our Terms and Conditions
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-700 text-sm mt-1">
              {errors.agreeTerms.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blackA11 text-white font-bold py-2 px-4 rounded-lg hover:bg-blackA12 transition duration-300"
            disabled={passwordError !== ''}
          >
            Sign Up
          </button>
        </form>
        <p className="text-black text-center mt-4">
          Already registered?{' '}
          <a href="sign-in" className="text-black hover:underline font-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
