// export default TopUp;
import path from '@/constants/path';
import { createOrderTopUp } from '@/service/customer.api';
import { getProfileFromLS } from '@/utils/auth';
import { schemaTopUp, SchemaTopUp } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router';

const TopUpPage = () => {
  // const [amount, setAmount] = useState('');
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const denominations = [
    '10.000',
    '20.000',
    '50.000',
    '100.000',
    '200.000',
    '500.000',
  ];

  const profile = getProfileFromLS();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    control,
  } = useForm<SchemaTopUp>({
    resolver: yupResolver(schemaTopUp),
    defaultValues: {
      amount: 0,
    },
  });
  const topUpMutation = useMutation({
    mutationFn: (formdata: FormData) => createOrderTopUp(formdata),
  });

  // const handleTopUpMuation = async (data: SchemaTopUp) => {
  //   const formdata = new FormData();
  //   if (data.amount === undefined)

  //   formdata.append('amount', data.amount);
  //   formdata.append('userId', profile.userId);
  //   formdata.append('urlReturn', 'localhost:3000/');
  //   try {
  //     await topUpMutation.mutate(data, {
  //       onSuccess: (response) => {
  //         window.location.href = response.data;

  //         console.log('Top-up successfully');
  //       },
  //       onError: (error) => {
  //         console.log('Error:', error);
  //       },
  //     });
  //   } catch (error) {
  //     setError('amount', {
  //       type: 'manual',
  //       message: 'Something went wrong. Please try again.',
  //     });
  //   }
  // };

  // const onSubmit = (data: SchemaTopUp) => {
  //   handleTopUpMuation(data);
  // };
  const [isProcessing, setIsProcessing] = useState(false);
  const handleTopUpMutation = async (data: SchemaTopUp) => {
    if (isProcessing) return; // Prevent duplicate submission
    setIsProcessing(true);
    const formData = new FormData();

    // Ensure amount is valid before appending
    if (data.amount !== undefined && data.amount !== null) {
      formData.append('amount', String(data.amount)); // Convert amount to string if necessary
    } else {
      setError('amount', {
        type: 'manual',
        message: 'Amount is required.',
      });
      return; // Exit the function if amount is invalid
    }
    console.log(profile.userId);

    formData.append('userId', profile.userId); // Append userId from profile
    // formData.append(
    //   'urlReturn',
    //   'http://localhost:8080/vnpay/return/orderReturn'
    // ); // Append return URL

    try {
      // Use mutation and handle the result with onSuccess/onError callbacks
      setLoading(true);
      await topUpMutation.mutate(formData, {
        onSuccess: (response) => {
          window.location.href = response.data; // Redirect on success
          console.log('Top-up successfully');
        },
        onError: (error) => {
          console.log('Error:', error); // Log error if mutation fails
          setError('amount', {
            type: 'manual',
            message: 'Failed to process the top-up. Please try again.',
          });
        },
      });
    } catch (error) {
      setError('amount', {
        type: 'manual',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Submit handler for form
  const onSubmit = (data: SchemaTopUp) => {
    handleTopUpMutation(data);
  };
  const handleDenominationClick = (value: string) => {
    // setMoney(numericAmount);
    // setValue('amount', numericAmount);
    setMoney(value);
    const numericAmount = Number(value.replace(/\./g, ''));
    setValue('amount', numericAmount);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const [money, setMoney] = useState('');

  const formatMoney = (value: string) => {
    // Xóa tất cả ký tự không phải số
    const numericValue = value.replace(/\D/g, '');
    const numericAmount = Number(value.replace(/\./g, ''));
    setValue('amount', numericAmount);
    // Định dạng giá trị theo kiểu tiền tệ với dấu chấm
    const formattedValue = new Intl.NumberFormat('vi-VN').format(
      Number(numericValue)
    );

    setMoney(formattedValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Nạp vào ví</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Số tiền
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">VNĐ &nbsp;</span>
              </div>
              <Input
                type="text"
                value={money}
                onChange={(e) => formatMoney(e.target.value)}
                name="amount"
                id="amount"
                className={`ml-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md `}
                isInvalid={errors.amount?.message ? true : false}
                errorMessage={errors.amount?.message}
                placeholder="Nhập số tiền"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gợi ý mệnh giá
            </label>
            <div className="grid grid-cols-3 gap-2">
              {denominations.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  onClick={() => handleDenominationClick(value)}
                >
                  {value} VNĐ
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
            ) : (
              'Top Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopUpPage;
