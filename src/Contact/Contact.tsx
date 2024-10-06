import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý dữ liệu form ở đây, ví dụ gửi lên server
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Chúng tôi luôn sẵn sàng giúp đỡ và trả lời mọi câu hỏi của bạn.
            Chúng tôi mong muốn được nghe từ bạn!
          </p>
        </div>

        <div className="mt-16 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 sm:p-12 md:border-r border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Gửi tin nhắn cho chúng tôi
              </h2>
              {submitted ? (
                <div className="text-green-600 text-lg">
                  Cảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ phản hồi sớm!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Chủ đề
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tin nhắn
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blackA10 hover:bg-blackA12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      Gửi tin nhắn
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="p-6 sm:p-12 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Thông tin liên hệ
              </h2>
              <div className="space-y-8">
                <div className="flex items-center">
                  <FaEnvelope className="text-black mr-4 text-xl" />
                  <a
                    href="mailto:wsbwebsite8@gmail.com"
                    className="text-gray-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                  >
                    wsbwebsite8@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-black mr-4 text-xl" />
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-black mr-4 text-xl mt-1" />
                  <p className="text-gray-600">
                    123 Đường Kinh Doanh, Phòng 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-black mr-4 text-xl" />
                  <p className="text-gray-600">Thứ Hai - Thứ Sáu: 9h - 17h</p>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Theo dõi chúng tôi
                </h3>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
