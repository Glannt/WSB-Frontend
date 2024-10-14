// TopUp.tsx
import { createOrderTopUp } from '@/service/customer.api';
import React, { useState } from 'react';

const TopUp: React.FC = () => {
  const [amount, setAmount] = useState(0); // Số tiền nạp
  const [userId, setUserId] = useState(''); // ID người dùng
  const [urlReturn, setUrlReturn] = useState('http://localhost:3000'); // URL trả về

  const handleTopUp = () => {
    createOrderTopUp(amount, userId, urlReturn)
      .then((response) => {
        console.log('Order created successfully:', response.data);
        window.location.href = response.data; // chuyển hướng đến trang thanh toán

        // Xử lý phản hồi thành công
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        // Xử lý lỗi nếu có
      });
  };

  return (
    <div>
      <h1>Top Up</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Nhập số tiền nạp"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Nhập User ID"
      />
      <button onClick={handleTopUp}>Top Up</button>
    </div>
  );
};

export default TopUp;
