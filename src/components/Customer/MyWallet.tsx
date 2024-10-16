import React, { useState } from 'react';
import { FaWallet, FaPlus } from 'react-icons/fa';
import TransactionHistory from './Setting/History/Transaction/TransactionHistory';

import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
import { getWalletByUserId } from '@/service/customer.api';
import { getProfileFromLS } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';
import { Wallet } from '@/types/customer.type';

const MyWallet: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const navigate = useNavigate();

  // const handleAddFunds = () => {
  //   setIsAdding(true);
  //   setTimeout(() => {
  //     const success = Math.random() > 0.3;
  //     if (success) {
  //       setBalance((prevBalance) => prevBalance + 100);
  //       setError('');
  //     } else {
  //       setError('Transaction failed. Please try again.');
  //     }
  //     setIsAdding(false);
  //   }, 1500);
  // };

  const profile = getProfileFromLS();
  const getWalletByUserIdApi = async () => {
    const response = await getWalletByUserId(profile.userId);
    return response.data.data;
  };

  const { data: wallet } = useQuery<Wallet>({
    queryKey: ['wallet'],
    queryFn: getWalletByUserIdApi,
  });

  const formattedWallet = new Intl.NumberFormat('vi-VN').format(
    Number(wallet?.amount)
  );
  console.log(wallet);
  // const [balance, setBalance] = useState<number>(0);

  return (
    <>
      <div className="max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-black via-slate-600 to-gray-400 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Ví Điện Tử</h2>
            <FaWallet className="text-3xl" />
          </div>
          <div className="mt-4">
            <p className="text-sm">Số dư tiện tại</p>
            <p className="text-4xl font-bold">${formattedWallet}</p>
          </div>
          <div className="flex justify-end">
            <Button
              // onClick={handleAddFunds}
              disabled={isAdding}
              className="text-xl bg-blackA12 text-white h-12 p-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
              onClick={() => navigate('/top-up')}
            >
              <FaPlus className="mr-2" />
              Nạp tiền
            </Button>
          </div>
        </div>
      </div>
      <TransactionHistory />
    </>
  );
};

export default MyWallet;
