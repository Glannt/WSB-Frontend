import React, { useState, useEffect } from 'react';
import { FaWallet, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentConfirmation = () => {
  const [walletBalance, setWalletBalance] = useState(1000);
  const [orderTotal, setOrderTotal] = useState(850);
  const [discount, setDiscount] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (isPaymentSuccessful) {
      setTransactionId(Math.random().toString(36).substr(2, 9));
      setTimestamp(new Date().toLocaleString());
    }
  }, [isPaymentSuccessful]);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setWalletBalance((prevBalance) => prevBalance - orderTotal);
      setIsProcessing(false);
      setIsPaymentSuccessful(true);
    }, 2000);
  };

  const isWalletBalanceSufficient = walletBalance >= orderTotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Payment Confirmation
        </h1>

        {!isPaymentSuccessful ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Order Summary
              </h2>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${orderTotal + discount}</span>
                </p>
                <p className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${discount}</span>
                </p>
                <p className="flex justify-between font-bold mt-2">
                  <span>Total:</span>
                  <span>${orderTotal}</span>
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Wallet Balance
              </h2>
              <div className="bg-blue-100 p-4 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <FaWallet className="text-blue-500 mr-2" />
                  <span className="font-medium">Current Balance:</span>
                </div>
                <span className="font-bold">${walletBalance}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Amount to be deducted: ${orderTotal}</p>
                <p>
                  Remaining balance: $
                  {isWalletBalanceSufficient
                    ? (walletBalance - orderTotal).toFixed(2)
                    : walletBalance.toFixed(2)}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-md text-white font-bold text-lg relative ${isWalletBalanceSufficient ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
              onClick={handlePayment}
              disabled={!isWalletBalanceSufficient || isProcessing}
              aria-label={
                isWalletBalanceSufficient
                  ? 'Confirm Payment'
                  : 'Insufficient Balance'
              }
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : isWalletBalanceSufficient ? (
                'Confirm Payment'
              ) : (
                'Insufficient Balance'
              )}
            </motion.button>

            {!isWalletBalanceSufficient && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md flex items-start"
                role="alert"
              >
                <FaExclamationTriangle className="flex-shrink-0 mr-2 mt-1" />
                <div>
                  <p className="font-bold">Insufficient Balance</p>
                  <p className="text-sm">
                    Please top up your wallet to complete this payment.
                  </p>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Payment Successful
              </h2>
              <div className="bg-gray-100 p-4 rounded-md text-left">
                <p className="mb-2">
                  <strong>Transaction ID:</strong> {transactionId}
                </p>
                <p className="mb-2">
                  <strong>Amount Paid:</strong> ${orderTotal}
                </p>
                <p>
                  <strong>Timestamp:</strong> {timestamp}
                </p>
              </div>
              <p className="mt-4 text-gray-600">
                Thank you for your payment. A confirmation email has been sent
                to your registered email address.
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
