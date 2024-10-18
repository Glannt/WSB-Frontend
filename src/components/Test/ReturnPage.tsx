import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import http from '@/utils/http';
import path from '@/constants/path';

const ReturnPage = () => {
  const navigate = useNavigate();
  const [isCalled, setIsCalled] = useState(false);
  useEffect(() => {
    handleReturn();
  }, []);
  const handleReturn = async () => {
    if (isCalled) return;
    setIsCalled(true);
    // Get query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const vnp_SecureHash = queryParams.get('vnp_SecureHash');
    // Send query parameters back to the backend to verify payment
    try {
      const response = await axios.get(
        `http://localhost:8080/vnpay/return/orderReturn?${queryParams.toString()}`
      );

      // Assuming your backend returns a success message
      if (response.data.message === 'Top-up successful') {
        // alert('dô---');
        // Optionally handle any additional logic here
        navigate(path.home); // Redirect to the homepage or another page
        return;
      } else {
        navigate('/'); // Redirect to homepage or error page
      }
    } catch (error) {
      console.error('Error processing payment return:', error);
      alert(
        'An error occurred while processing the payment. Please try again.'
      );
      navigate('/'); // Redirect to homepage or error page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing your transaction, please wait...</p>
    </div>
  );
};

export default ReturnPage;
