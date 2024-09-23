import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaPlus, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
}
export const BookingRoomDetail = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);
  const roomPrice = 100;
  const foodServices = [
    {
      id: 1,
      name: 'Breakfast Buffet',
      price: 20,
      image:
        'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      name: 'Lunch Set',
      price: 25,
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      name: 'Dinner Platter',
      price: 30,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    },
  ];

  const timeSlots = [
    '07:00 - 10:00',
    '11:00 - 14:00',
    '15:00 - 18:00',
    '19:00 - 22:00',
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(e.target.value);
  };

  const toggleServiceModal = () => {
    setShowServiceModal(!showServiceModal);
  };

  const togglePolicyModal = () => {
    setShowPolicyModal(!showPolicyModal);
  };

  const handleServiceSelection = (serviceId: number) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceId)
        ? prevServices.filter((id) => id !== serviceId)
        : [...prevServices, serviceId]
    );
  };

  const calculateTotalPrice = () => {
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const selectedService = foodServices.find(
        (service) => service.id === serviceId
      );
      return total + (selectedService ? selectedService.price : 0);
    }, 0);

    return roomPrice + servicesTotal;
  };

  return (
    <div className="max-w-7xl mx-auto h-[700px] p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full h-[600px] flex">
        <div className="w-1/2 bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Luxurious Hotel Room"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">Deluxe Suite</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cơ sở
            </label>
            <div className="relative">
              <select
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                className="w-full p-2 border rounded-md pl-10 appearance-none"
              >
                <option value="">Chọn cơ sở...</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày đặt
            </label>
            <div className="relative">
              <input
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={handleDateChange}
                className="w-full p-2 border rounded-md pl-10"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slot thời gian
            </label>
            <div className="relative">
              <select
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                className="w-full p-2 border rounded-md pl-10 appearance-none"
              >
                <option value="">Chọn slot thời gian</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xl font-semibold">Giá ban đầu: ${roomPrice}</p>
          </div>
          <button
            onClick={toggleServiceModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center mb-6"
          >
            <FaPlus className="mr-2" /> Dịch vụ đồ ăn
          </button>
          {showServiceModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
                <h3 className="text-2xl font-bold mb-4">Đặt đồ ăn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {foodServices.map((service) => (
                    <div
                      key={service.id}
                      className="border rounded-lg p-4 flex items-center"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-gray-600">${service.price}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleServiceSelection(service.id)}
                        className="ml-auto"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={toggleServiceModal}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="mb-6">
            <p className="text-2xl font-bold">
              Total Price: ${calculateTotalPrice()}
            </p>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="policy"
              checked={policyAgreed}
              onChange={() => setPolicyAgreed(!policyAgreed)}
              className="mr-2"
            />
            <label htmlFor="policy" className="text-sm text-gray-700">
              Tôi đồng ý với{' '}
              <button
                onClick={togglePolicyModal}
                className="text-blue-500 underline"
              >
                chính sách đặt phòng
              </button>
            </label>
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
                        Người dùng phải từ 13 tuổi trở lên để sử dụng dịch vụ
                        đặt phòng.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Quy định về giá phòng:</strong>
                    <ul>
                      <li>
                        Giá phòng được tính dựa trên giờ thuê, loại phòng và
                        ngày đặt.
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
                      <li>
                        Khách hàng xác nhận lịch và thanh toán trực tuyến.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Quy định về đặt cọc và thanh toán:</strong>
                    <ul>
                      <li>
                        Khách hàng phải đặt cọc 30% trên tổng hóa đơn khi đặt
                        phòng.
                      </li>
                      <li>Sau khi sử dụng dịch vụ, thanh toán phần còn lại.</li>
                      <li>
                        Chỉ chấp nhận thanh toán qua hình thức thanh toán trực
                        tuyến.
                      </li>
                      <li>
                        Đối với hóa đơn trên 5 triệu đồng, hệ thống sẽ yêu cầu
                        xác nhận trước khi thanh toán.
                      </li>
                      <li>
                        Sau khi đặt cọc, không hoàn tiền nếu hủy đặt phòng.
                      </li>
                      <li>
                        Thời gian đặt phòng tối thiểu là 1 slot (1 tiếng).
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Các điều kiện khác:</strong>
                    <ul>
                      <li>
                        Khách hàng cần tuân thủ các quy định và điều kiện được
                        đưa ra từ hệ thống.
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
          <button
            className={`w-full bg-black text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-300 ${
              !policyAgreed && 'opacity-50 cursor-not-allowed text-center'
            }`}
            disabled={!policyAgreed}
          >
            <FaCheck className="inline-block mr-2" /> Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};
