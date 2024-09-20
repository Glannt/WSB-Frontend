import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  agreeTerms: boolean;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg')",
        // "url('https://www.dgicommunications.com/wp-content/uploads/2022/08/Design_a_Flexible_Workspace.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Create Your Account!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              required
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-700 text-sm mt-1">{passwordError}</p>
          )}
          <div className="relative">
            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2 rounded-sm"
              required
            />
            <label htmlFor="agreeTerms" className="text-black text-sm">
              Agree to Our Terms and Conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blackA11 text-white font-bold py-2 px-4 rounded-lg hover:bg-blackA12 transition duration-300"
            disabled={passwordError !== ''}
          >
            Sign Up
          </button>
        </form>
        <p className="text-black text-center mt-4">
          Already registered?{' '}
          <a href="sign-in" className="text-black hover:underline font-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
