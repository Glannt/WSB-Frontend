import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, Schema } from '@/utils/rules';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '@/service/auth.api';
import { omit } from 'lodash';
import { ErrorResponse } from '@/types/utils.type';
import { isAxiosUnprocessableEntityError } from '@/utils/utils';
import { useNavigate } from 'react-router';
import { AppContext } from '@/context/app.context';
// import { getRules } from '@/utils/rules';

// };
const SignUp: React.FC = () => {
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) =>
      registerAccount(body),
  });
  const togglePolicyModal = () => {
    setShowPolicyModal(!showPolicyModal);
  };
  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    const body = omit(data, ['confirm_password']);
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true);
        navigate('/');
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<Schema, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              if (key in body) {
                // Extract the error value for the current key
                const errorValue = formError[key as keyof typeof formError];

                // Determine the appropriate error message type based on the value type
                let errorMessage: string;

                // If the error value is a string, use it as the error message
                if (typeof errorValue === 'string') {
                  errorMessage = errorValue;
                }
                // If the error value is a Date, convert it to a string in ISO format
                else if (errorValue instanceof Date) {
                  errorMessage = errorValue.toISOString();
                }
                // For other types (boolean, number, etc.), convert to a string
                else {
                  errorMessage = String(errorValue);
                }

                // Use setError to set the error for the corresponding field
                setError(key as keyof Omit<Schema, 'confirm_password'>, {
                  message: errorMessage,
                  type: 'Server',
                });
              }
            });
          }
        }
      },
    });
  });

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
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg h-full w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Tạo tài khoản!
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <FaUser
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="text"
              // name="fullName"
              // value={formData.fullName}
              // onChange={handleChange}
              placeholder="Tên đăng nhập"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('userName')}
            />
            {errors.userName && (
              <p className="text-red-700 text-sm mt-1">
                {errors.userName?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaUser
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="text"
              // name="fullName"
              // value={formData.fullName}
              // onChange={handleChange}
              placeholder="Họ và tên"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-700 text-sm mt-1">
                {errors.fullName?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaEnvelope
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="email"
              // name="email"
              // value={formData.email}
              // onChange={handleChange}
              placeholder="Email"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-700 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaPhone
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="tel"
              // name="phoneNumber"
              // value={formData.phoneNumber}
              // onChange={handleChange}
              placeholder="Số điện thoại"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className="text-red-700 text-sm mt-1">
                {errors.phoneNumber?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaLock
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              // name="password"
              // value={formData.password}
              // onChange={handleChange}
              placeholder="Mật khẩu"
              autoComplete="on"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('password')}
            />
            <button
              type="button"
              className={`absolute right-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <FaLock
              className={`absolute left-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              // name="confirmPassword"
              // value={formData.confirmPassword}
              // onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              autoComplete="on"
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('confirm_password')}
            />
            <button
              type="button"
              className={`absolute right-3 transform -translate-y-1/2 text-black ${errors ? `top-6` : `top-1/2`}`}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirm_password && (
              <p className="text-red-700 text-sm mt-1">
                {errors.confirm_password?.message}
              </p>
            )}
          </div>
          {passwordError && (
            <p className="text-red-700 text-sm mt-1">{passwordError}</p>
          )}
          <div className="relative">
            <FaCalendar
              className={`absolute left-3 transform -translate-y-1/2  text-black ${errors ? `top-6` : `top-1/2`}`}
            />
            <input
              type="date"
              // name="dateOfBirth"
              // value={formData.dateOfBirth}
              // onChange={handleChange}
              className="w-full bg-black bg-opacity-20 text-black placeholder-gray-800 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blackA9"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && (
              <p className="text-red-700 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              // name="agreeTerms"
              // checked={formData.agreeTerms}
              // onChange={handleChange}
              className="mr-2 rounded-sm"
              {...register('agreeTerms')}
            />
            <label htmlFor="agreeTerms" className="text-black text-sm">
              Đồng ý với{' '}
              <span
                onClick={togglePolicyModal}
                className="text-blue-500 underline cursor-pointer"
              >
                các điều khoản
              </span>{' '}
              của chúng tôi
            </label>
          </div>

          {errors.agreeTerms && (
            <p className="text-red-700 text-sm mt-1">
              {errors.agreeTerms.message}
            </p>
          )}

          <button
            type="submit"
            className={` w-full flex justify-center py-2 px-4 hover:text-gray-300 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blackA11 hover:bg-blackA12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <BiLoaderAlt className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Đang xử lý
              </>
            ) : (
              'Đăng ký'
            )}
          </button>
        </form>

        <p className="text-black text-center mt-4">
          Có tài khoản?{' '}
          <a href="sign-in" className="text-black hover:underline font-bold">
            Đăng nhập
          </a>
        </p>
      </div>
      {showPolicyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">
              Chính Sách Dịch Vụ Đặt Phòng Làm Việc
            </h3>
            <ul>
              <li>
                <strong>Điều kiện tham gia:</strong>
                <ul>
                  <li>
                    Người dùng phải từ 13 tuổi trở lên để sử dụng dịch vụ đặt
                    phòng.
                  </li>
                </ul>
              </li>

              <li>
                <strong>Quy định về giá phòng:</strong>
                <ul>
                  <li>
                    Giá phòng được tính dựa trên giờ thuê, loại phòng và ngày
                    đặt.
                  </li>
                </ul>
              </li>

              <li>
                <strong>Tính năng chính:</strong>
                <ul>
                  <li>Đặt phòng họp trực tuyến thông qua ứng dụng.</li>
                  <li>Hỗ trợ thanh toán qua bên thứ ba liên kết.</li>
                </ul>
              </li>

              <li>
                <strong>Quy trình giao dịch:</strong>
                <ul>
                  <li>Đăng ký tài khoản và đăng nhập.</li>
                  <li>Tham khảo thông tin và chọn phòng phù hợp.</li>
                  <li>Thực hiện đặt phòng qua hệ thống.</li>
                  <li>
                    Nhân viên xác nhận lịch đặt và thông báo tới khách hàng.
                  </li>
                  <li>Khách hàng xác nhận lịch và thanh toán trực tuyến.</li>
                </ul>
              </li>

              <li>
                <strong>Quy định về đặt cọc và thanh toán:</strong>
                <ul>
                  <li>
                    Khách hàng phải đặt cọc 30% trên tổng hóa đơn khi đặt phòng.
                  </li>
                  <li>Sau khi sử dụng dịch vụ, thanh toán phần còn lại.</li>
                  <li>
                    Chỉ chấp nhận thanh toán qua hình thức thanh toán trực
                    tuyến.
                  </li>
                  <li>
                    Đối với hóa đơn trên 5 triệu đồng, hệ thống sẽ yêu cầu xác
                    nhận trước khi thanh toán.
                  </li>
                  <li>Sau khi đặt cọc, không hoàn tiền nếu hủy đặt phòng.</li>
                  <li>Thời gian đặt phòng tối thiểu là 1 slot (1 tiếng).</li>
                </ul>
              </li>

              <li>
                <strong>Các điều kiện khác:</strong>
                <ul>
                  <li>
                    Khách hàng cần tuân thủ các quy định và điều kiện được đưa
                    ra từ hệ thống.
                  </li>
                </ul>
              </li>
            </ul>
            <button
              onClick={togglePolicyModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
