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
import { motion } from 'framer-motion';
import { Button, Divider, Input, Link, Textarea } from '@nextui-org/react';
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
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
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

          <div className="mt-16 bg-white border-1 border-gray-300 shadow-2xl rounded-lg overflow-hidden">
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
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        label="Họ và tên"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="sm"
                        size="lg"
                        required
                        className="mt-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        label="Địa chỉ Email"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="sm"
                        size="lg"
                        required
                        className="mt-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        name="subject"
                        id="subject"
                        label="Chủ đề"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="sm"
                        size="lg"
                        required
                        className="mt-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        id="message"
                        rows={4}
                        label="Tin nhắn"
                        variant="bordered"
                        labelPlacement="outside"
                        radius="sm"
                        required
                        size="lg"
                        className="mt-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      ></Textarea>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blackA12 hover:bg-blackA12 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                      >
                        Gửi tin nhắn
                      </Button>
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
                    <Link
                      href="mailto:wsbwebsite8@gmail.com"
                      className="text-gray-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                    >
                      wsbwebsite8@gmail.com
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-black mr-4 text-xl" />
                    <Link
                      href="tel:+1234567890"
                      className="text-gray-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                    >
                      +1 (234) 567-890
                    </Link>
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
                <Divider className="mt-10 mb-0" />
                <div className="mt-8">
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
    </motion.div>
  );
};

export default Contact;
