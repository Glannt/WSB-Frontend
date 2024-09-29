import React, { useState } from 'react';
import { FaWallet, FaPlus } from 'react-icons/fa';
import TransactionHistory from './TransactionHistory';

const MyWallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [error, setError] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

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
            <h2 className="text-2xl font-bold">My Wallet</h2>
            <FaWallet className="text-3xl" />
          </div>
          <div className="mt-4">
            <p className="text-sm">Current Balance</p>
            <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
          </div>
          <div className="flex justify-end">
            <button
              // onClick={handleAddFunds}
              disabled={isAdding}
              className="text-xl bg-blackA12 text-white h-12 p-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
              aria-label="Add funds to your wallet"
            >
              <FaPlus className="mr-2" />
              Nạp tiền
            </button>
          </div>
        </div>

        {/* <div className="p-6">
          <button
            // onClick={handleAddFunds}
            disabled={isAdding}
            className="bg-blackA12 text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-3xl ease-in-out flex items-center hover:scale-105 transition duration-100 shadow-lg"
            aria-label="Add funds to your wallet"
          >
            {isAdding ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <FaPlus className="mr-2" />
            )}
            {isAdding ? 'Adding Funds...' : 'Add Funds'}
          </button>
          {error && (
            <p className="mt-4 text-red-500 text-center animate-pulse">
              {error}
            </p>
          )}
        </div> */}
      </div>
      <TransactionHistory />
    </>
  );
};

export default MyWallet;
