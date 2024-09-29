import React, { useState, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router';
import path from '@/constants/path';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!currentPassword)
      newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Confirm password is required';
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    }
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

  return (
    <div className="inset-0 flex items-center justify-center">
      {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4"> */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl gap-4 h-auto max-h-screen mx-auto w-382px">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Đổi mật khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200`}
                aria-invalid={errors.currentPassword ? 'true' : 'false'}
                aria-describedby="currentPassword-error"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p
                id="currentPassword-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200`}
                aria-invalid={errors.newPassword ? 'true' : 'false'}
                aria-describedby="newPassword-error"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p id="newPassword-error" className="mt-1 text-xs text-red-500">
                {errors.newPassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200`}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby="confirmPassword-error"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.confirmPassword}
              </p>
            )}
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
