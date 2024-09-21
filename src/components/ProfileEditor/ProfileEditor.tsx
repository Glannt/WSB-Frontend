import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import { MdSave, MdRefresh } from 'react-icons/md';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  avatar: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ShowPassword {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

const ProfileEditor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1 (123) 456-7890',
    dateOfBirth: '1990-01-01',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = useState<ShowPassword>({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsModified(true);
  };

  const handlePasswordToggle = (field: keyof ShowPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Check if new password and confirm new password match
    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordError('Passwords do not match');
      console.log(passwordError);

      return;
    }

    setPasswordError(''); // Clear any previous errors
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsModified(false);
      alert('Profile updated successfully!');
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '+1 (123) 456-7890',
      dateOfBirth: '1990-01-01',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setIsModified(false);
    setPasswordError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                required
                list="email-suggestions"
              />
              <datalist id="email-suggestions">
                <option value="@gmail.com" />
                <option value="@outlook.com" />
                <option value="@yahoo.com" />
              </datalist>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                required
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <div className="text-center">
              <img
                src={formData.avatar}
                alt="User Avatar"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <label
                htmlFor="avatar"
                className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <FaUpload className="mr-2" />
                Change Avatar
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type={showPassword.current ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
            <button
              type="button"
              onClick={() => handlePasswordToggle('current')}
              className="absolute inset-y-0 right-0 pr-3 mt-6 flex items-center text-sm leading-5"
            >
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type={showPassword.new ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
            <button
              type="button"
              onClick={() => handlePasswordToggle('new')}
              className="absolute inset-y-0 right-0 pr-3 mt-6 flex items-center text-sm leading-5"
            >
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            <button
              type="button"
              onClick={() => handlePasswordToggle('confirm')}
              className="absolute inset-y-0 right-0 pr-3 mt-6 flex items-center text-sm leading-5"
            >
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <MdRefresh className="mr-2" />
            Reset
          </button>
          <button
            type="submit"
            disabled={!isModified || isLoading}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving....
              </>
            ) : (
              <>
                <MdSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditor;
