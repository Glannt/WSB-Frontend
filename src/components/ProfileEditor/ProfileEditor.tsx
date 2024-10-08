// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { FaEye, FaEyeSlash, FaUpload, FaLock } from 'react-icons/fa';
// import { MdSave, MdRefresh } from 'react-icons/md';
// import { Outlet, useNavigate } from 'react-router';
// import path from '@/constants/path';
// import { Input } from '@nextui-org/react';
// import { Customer, phoneCodes } from '@/types/customer.type';
// import { useCustomer } from '@/context/customer.context';
// import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { changeProfile } from '@/service/customer.api';
// import { AxiosError, AxiosResponse } from 'axios';
// interface FormData {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   dateOfBirth: string;
//   avatar: string;
// }

// interface ShowPassword {
//   current: boolean;
//   new: boolean;
//   confirm: boolean;
// }

// const ProfileEditor: React.FC = () => {
//   const customer = useCustomer();

//   const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
//   const togglePolicyModal = () => {
//     setShowPolicyModal(!showPolicyModal);
//   };

//   const [formData, setFormData] = useState<FormData>({
//     fullName: 'John Doe',
//     email: 'johndoe@example.com',
//     phoneNumber: '+1 (123) 456-7890',
//     dateOfBirth: '1990-01-01',
//     avatar:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   });

//   const [showPassword, setShowPassword] = useState<ShowPassword>({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isModified, setIsModified] = useState<boolean>(false);
//   const [passwordError, setPasswordError] = useState<string>('');
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm<Customer>({
//     defaultValues: {
//       fullName: customer?.fullName ?? '',
//       email: customer?.email ?? '',
//       phoneNumber: customer?.phoneNumber ?? '',
//       dateOfBirth: customer?.dateOfBirth ?? '',
//     },
//   });
//   const updateProfile = useMutation({
//     mutationFn: async (data: Omit<Customer, 'wallet' | 'roleName'>) =>
//       changeProfile(data),
//     onSuccess: () => {
//       setIsLoading(false);
//       setIsModified(false);
//       alert('Profile updated successfully!');
//       reset(); // Reset form after submission
//     },
//     onError: (error) => {
//       console.error('Error updating profile:', error);
//       setIsLoading(false);
//     },
//   });
//   const onSubmit = async (data: Omit<Customer, 'wallet' | 'roleName'>) => {
//     // Simulate API call and reset loading states
//     if (isModified) {
//       setIsLoading(true);
//       updateProfile.mutate(data);
//     }
//   };

//   const handleInputChange = (field: keyof Customer, value: any) => {
//     setValue(field, value);
//     setIsModified(true);
//   };

//   // const onSubmit = async (data: FormData) => {
//   //   // Check if new password and confirm new password match
//   //   // if (data.newPassword !== data.confirmNewPassword) {
//   //   //   return; // Display password error handled via react-hook-form validation
//   //   // }
//   //   const handlePasswordToggle = (field: keyof ShowPassword) => {
//   //     setShowPassword({ ...showPassword, [field]: !showPassword[field] });
//   //   };

//   //   const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
//   //     const file = e.target.files?.[0];
//   //     if (file) {
//   //       const reader = new FileReader();
//   //       reader.onloadend = () => {
//   //         setFormData({ ...formData, avatar: reader.result as string });
//   //         setIsModified(true);
//   //       };
//   //       reader.readAsDataURL(file);
//   //     }
//   //   };

//   //   setPasswordError(''); // Clear any previous errors
//   //   setIsLoading(true);
//   //   // Simulate API call
//   //   setTimeout(() => {
//   //     setIsLoading(false);
//   //     setIsModified(false);
//   //     alert('Profile updated successfully!');
//   //   }, 2000);
//   // };

//   // const handleReset = () => {
//   //   setFormData({
//   //     fullName: 'John Doe',
//   //     email: 'johndoe@example.com',
//   //     phoneNumber: '+1 (123) 456-7890',
//   //     dateOfBirth: '1990-01-01',
//   //     avatar:
//   //       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   //     currentPassword: '',
//   //     newPassword: '',
//   //     confirmNewPassword: '',
//   //   });
//   //   setIsModified(false);
//   //   setPasswordError('');
//   // };

//   return (
//     <>
//       <h2 className="text-3xl font-bold mb-10 mt-5 text-center text-gray-800">
//         Chỉnh sửa thông tin
//       </h2>
//       <div className="flex flex-col gap-4 h-auto max-h-screen mx-auto p-6 bg-white shadow-lg rounded-lg w-382px">
//         {/* <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Edit Profile
//       </h2> */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="flex flex-col md:flex-row md:space-x-4">
//             <div className="w-full md:w-2/3 space-y-6">
//               <Input
//                 isClearable
//                 isRequired
//                 label="Họ và tên"
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                 {...register('fullName', { required: 'Full name is required' })}
//                 value={customer?.fullName ?? ''}
//                 onChange={(e) => handleInputChange('fullName', e.target.value)}
//                 errorMessage={errors.fullName?.message}
//               />
//               <Input
//                 label="Email"
//                 type="email"
//                 id="email"
//                 {...register('email', { required: 'Email is required' })}
//                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                 value={customer?.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 errorMessage={errors.email?.message}
//               />
//               <Input
//                 label="Số điện thoại"
//                 type="tel"
//                 {...register('phoneNumber', {
//                   required: 'Phone number is required',
//                 })}
//                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                 value={customer?.phoneNumber}
//                 onChange={(e) =>
//                   handleInputChange('phoneNumber', e.target.value)
//                 }
//                 startContent={
//                   <div className="flex items-center">
//                     <label className="sr-only" htmlFor="phoneCode">
//                       Phone Code
//                     </label>
//                     <select
//                       className="outline-none border-0 bg-transparent text-default-400 text-small"
//                       id="phoneCode"
//                       name="phoneCode"
//                     >
//                       {phoneCodes.map(({ code, country }) => (
//                         <option key={code} value={code}>
//                           {code} ({country})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 }
//                 errorMessage={errors.phoneNumber?.message}
//               />
//               {/*
//                 <datalist id="email-suggestions">
//                   <option value="@gmail.com" />
//                   <option value="@outlook.com" />
//                   <option value="@yahoo.com" />
//                 </datalist> */}
//               <Input
//                 label="Ngày sinh"
//                 type="date"
//                 {...register('dateOfBirth', {
//                   required: 'Date of birth is required',
//                 })}
//                 className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                 value={
//                   customer?.dateOfBirth
//                     ? dayjs(customer.dateOfBirth).format('YYYY-MM-DD')
//                     : ''
//                 } // Format date to 'YYYY-MM-DD'
//                 onChange={(e) =>
//                   handleInputChange('dateOfBirth', e.target.value)
//                 }
//                 errorMessage={errors.dateOfBirth?.message}
//               />
//             </div>
//             <div className="w-full md:w-1/3 mt-6 md:mt-0">
//               <div>
//                 <div className="text-center">
//                   <img
//                     src={formData.avatar}
//                     alt="User Avatar"
//                     className="w-32 h-32 mx-auto rounded-full object-cover"
//                   />
//                   <label
//                     htmlFor="avatar"
//                     className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//                   >
//                     <FaUpload className="mr-2" />
//                     Thay ảnh đại diện
//                   </label>
//                   <input
//                     type="file"
//                     id="avatar"
//                     name="avatar"
//                     // onChange={handleAvatarChange}
//                     className="hidden"
//                     accept="image/*"
//                   />
//                 </div>
//               </div>
//               <div className="px-3 py-5 block text-sm text-gray-700 font-bold">
//                 Bảo mật
//               </div>
//               <div className="px-8 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <FaLock className="text-black text-sm" />
//                   <span className="text-sm text-gray-700">Mật khẩu</span>
//                 </div>
//                 <a
//                   onClick={() => navigate(path.settings + '/change-password')}
//                   className="cursor-pointer px-4 py-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium scale-75 text-black bg-white hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//                 >
//                   Đổi mật khẩu
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               // onClick={handleReset}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//             >
//               <MdRefresh className="mr-2" />
//               Đặt lại
//             </button>
//             <button
//               type="submit"
//               disabled={!isModified || isLoading}
//               className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
//                 (!isModified || isLoading) && 'opacity-50 cursor-not-allowed'
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Saving....
//                 </>
//               ) : (
//                 <>
//                   <MdSave className="mr-2" />
//                   Lưu thay đổi
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//       {/* {showPolicyModal && (

//       )} */}
//       <Outlet />
//     </>
//   );
// };

// export default ProfileEditor;

import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUpload, FaLock } from 'react-icons/fa';
import { MdSave, MdRefresh } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { changeProfile } from '@/service/customer.api';
import { Customer, phoneCodes } from '@/types/customer.type';
import { Input } from '@nextui-org/react';
import { useCustomer } from '@/context/customer.context';
import { getProfileFromLS } from '@/utils/auth';
import path from '@/constants/path';

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
      alert('Profile updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    },
  });

  const handleInputChange = (field: keyof Customer, value: any) => {
    setValue(field, value);
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

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 mt-5 text-center text-gray-800">
        Chỉnh sửa thông tin
      </h2>
      <div className="flex flex-col gap-4 h-auto max-h-screen mx-auto p-6 bg-white shadow-lg rounded-lg w-382px">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-2/3 space-y-6">
              <Input
                isClearable
                isRequired
                label="Họ và tên"
                {...register('fullName', { required: 'Full name is required' })}
                defaultValue={customer?.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                errorMessage={errors.fullName?.message}
              />
              <Input
                label="Email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                onChange={(e) => handleInputChange('email', e.target.value)}
                errorMessage={errors.email?.message}
              />
              <Input
                label="Số điện thoại"
                type="tel"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                })}
                onChange={(e) =>
                  handleInputChange('phoneNumber', e.target.value)
                }
                errorMessage={errors.phoneNumber?.message}
              />
              <Input
                label="Ngày sinh"
                type="date"
                {...register('dateOfBirth', {
                  required: 'Date of birth is required',
                })}
                value={dayjs(customer?.dateOfBirth).format('YYYY-MM-DD')}
                onChange={(e) =>
                  handleInputChange('dateOfBirth', e.target.value)
                }
                errorMessage={errors.dateOfBirth?.message}
              />
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
                  className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <FaUpload className="mr-2" />
                  Thay ảnh đại diện
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
              <div className="px-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-black text-sm" />
                  <span className="text-sm text-gray-700">Mật khẩu</span>
                </div>
                <a
                  onClick={() => navigate(path.settings + '/change-password')}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50"
                >
                  Đổi mật khẩu
                </a>
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
    </>
  );
};

export default ProfileEditor;
