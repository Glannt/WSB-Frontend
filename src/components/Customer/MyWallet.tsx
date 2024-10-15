import React, { useState } from 'react';
import { FaWallet, FaPlus } from 'react-icons/fa';
import TransactionHistory from './Setting/History/Transaction/TransactionHistory';
import { useNavigate } from 'react-router';

const MyWallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
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
            <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
          </div>
          <div className="flex justify-end">
            <button
              // onClick={handleAddFunds}
              disabled={isAdding}
              className="text-xl bg-blackA12 text-white h-12 p-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
              aria-label="Add funds to your wallet"
              onClick={() => navigate('/top-up')}
            >
              <FaPlus className="mr-2" />
              Nạp tiền
            </button>
          </div>
        </div>
      </div>
      <TransactionHistory />
    </>
  );
};

export default MyWallet;
