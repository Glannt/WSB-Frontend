import React, { FormEvent, useState } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 placeholder-gray-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blackA9 pl-10 bg-black bg-opacity-20"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="absolute left-3 top-3 text-black-400" />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-3 py-2 text-black placeholder-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blackA9 pl-10 bg-black bg-opacity-20"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="absolute left-3 top-3 text-black" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            {/* <label className="flex items-center text-white">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label> */}
            <a href="#" className="text-black hover:underline">
              Forgot password?
            </a>
          </div>
          {/* <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
            ) : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </button> */}
          <button
            type="submit"
            className={` w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blackA11 hover:bg-blackA12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Loading...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-4">
          <button className="w-full bg-blackA11 text-white py-2 rounded-md font-bold hover:bg-blackA12 transition duration-300 flex items-center justify-center">
            <FaGoogle className="mr-2" /> Login with Google
          </button>
        </div>
        <p className="text-center mt-4 text-black">
          Don't have an account?{' '}
          <a href="sign-up" className="text-black font-bold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
