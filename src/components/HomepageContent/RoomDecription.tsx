// import React, { useState, useEffect } from 'react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// interface Room {
//   name: string;
//   description: string;
//   image: string;
// }

// const RoomDecription: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   const rooms: Room[] = [
//     {
//       name: 'Phòng Deluxe',
//       description: 'Phòng Deluxe sang trọng với view thành phố tuyệt đẹp.',
//       image:
//         'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
//     },
//     {
//       name: 'Phòng Suite',
//       description: 'Phòng Suite rộng rãi với không gian riêng biệt.',
//       image:
//         'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     },
//     {
//       name: 'Phòng Gia đình',
//       description:
//         'Phòng Gia đình thoải mái với đầy đủ tiện nghi cho cả gia đình.',
//       image:
//         'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const goToPrevious = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full h-500px bg-gray-100">
//       <div className="w-full md:w-1/2 relative overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {rooms.map((room, index) => (
//             <img
//               key={index}
//               src={room.image}
//               alt={room.name}
//               className="w-full h-auto object-cover flex-shrink-0 rounded-lg shadow-lg transition-transform duration-300"
//             />
//           ))}
//         </div>
//         <button
//           onClick={goToPrevious}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-0 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <FaChevronLeft className="text-2xl text-gray-800" />
//         </button>
//         <button
//           onClick={goToNext}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-0 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <FaChevronRight className="text-2xl text-gray-800" />
//         </button>
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {rooms.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-50 opacity-50'}`}
//             />
//           ))}
//         </div>
//       </div>

//       <>
//         {/* <div className="w-full md:w-1/2 p-8 flex flex-col justify-startst items-center bg-white">
//           <h2 className="text-3xl font-bold mb-4 text-gray-800 transition-all duration-500">
//             {rooms[currentIndex].name}
//           </h2>

//           <div className="flex space-x-5">
//             <p className="text-lg text-gray-600 transition-all duration-500">
//               {rooms[currentIndex].description}
//             </p>
//             <p className="text-lg text-gray-600 transition-all duration-500">
//               {rooms[currentIndex].description}
//             </p>
//           </div>
//         </div> */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-startst items-center bg-white">
//           <div className="room-name text-3xl font-bold mb-6">
//             {rooms[currentIndex].name}
//           </div>

//           <div className="flex justify-center items-center border-black pt-6 space-x-8">
//             <div className="utility w-1/2 text-center px-4 space-y-8">
//               <p className="text-lg text-gray-600 transition-all duration-500">
//                 {rooms[currentIndex].description}
//               </p>
//               <p className="text-lg text-gray-600 transition-all duration-500">
//                 {rooms[currentIndex].description}
//               </p>
//             </div>

//             <div className="w-[2px] h-56 bg-gray-300"></div>

//             <div className="w-1/2 text-center px-4 space-y-8">
//               <p className="text-lg text-gray-600 transition-all duration-500">
//                 {rooms[currentIndex].description}
//               </p>
//               <p className="text-lg text-gray-600 transition-all duration-500">
//                 {rooms[currentIndex].description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </>
//     </div>
//   );
// };

// export default RoomDecription;

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Room {
  name: string;
  utilities: string[];
  image: string;
}

const RoomDecription: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const rooms: Room[] = [
    {
      name: 'phòng đơn',
      utilities: [
        'Bàn làm việc đơn rộng rãi',
        'Ghế văn phòng thoải mái',
        'Wi-Fi tốc độ cao',
        'Đèn bàn làm việc',
        'Ổ cắm điện và cổng USB',
        'Màn hình máy tính hỗ trợ',
        'Điều hòa không khí',
        'Hệ thống âm thanh cá nhân',
      ],
      image:
        'https://workflow.com.vn/wp-content/uploads/2024/07/b1f293e72e40e53c6d98a043c1cc3148.png',
    },
    {
      name: 'phòng đôi',
      utilities: [
        'Bàn làm việc cho 2 người',
        '2 ghế văn phòng thoải mái',
        'Wi-Fi tốc độ cao',
        'Đèn bàn làm việc riêng',
        'Màn hình máy tính kép',
        'Bảng ghi chú chung',
        'Điều hòa không khí',
        'Ổ cắm điện và cổng USB riêng',
      ],
      image:
        'https://workflow.com.vn/wp-content/uploads/2024/07/72d7d94d35b0d6bce9ae803e5e5b8975.png',
    },
    {
      name: 'phòng 7 người',
      utilities: [
        'Bàn làm việc dài cho 7 người',

        'Wi-Fi tốc độ cao',
        'Ổ cắm điện và cổng USB riêng',
        'Ghế văn phòng thoải mái cho cả nhóm',
        'Màn hình TV cho trình chiếu',
        'Bảng trắng lớn và bảng ghi chú',
        'Điều hòa công suất lớn',
        'Hệ thống âm thanh và microphone',
      ],
      image:
        'https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg',
    },
    {
      name: 'phòng 10 người',
      utilities: [
        'Bàn làm việc dài cho 10 người',
        'Ghế văn phòng cao cấp',
        'Wi-Fi tốc độ cao',
        'Điều hòa công suất lớn',
        'Phòng họp riêng biệt',
        'Màn hình lớn và máy chiếu',
        'Ổ cắm điện và cổng USB riêng',
        'Micro, camera cho hội nghị trực tuyến',
      ],
      image:
        'https://workflow.com.vn/wp-content/uploads/2024/05/z5404832229897_c592108c054d4505476d97f2bbd6f86e-2.png',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  return (
    <div className="flex justify-between flex-col md:flex-row w-full h-500px bg-white gap-11 shadow-2xl">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-start items-center bg-white">
        <div className="text-3xl font-bold mb-6 ">
          <span className="underline decoration-dotted underline-offset-4">
            Tiện ích
          </span>
          &nbsp;
          {rooms[currentIndex].name}
        </div>

        <div className="flex justify-start pt-11 space-x-8">
          <div className="utility w-1/2 px-4">
            {rooms[currentIndex].utilities
              .slice(0, Math.ceil(rooms[currentIndex].utilities.length / 2))
              .map((utility, idx) => (
                <p
                  key={idx}
                  className="font-bold text-xl text-right text-gray-600 mb-8 leading-relaxed underline decoration-dotted underline-offset-8"
                >
                  {utility}
                </p>
              ))}
          </div>

          <div className="w-[2px] h-64 bg-gray-300"></div>

          <div className="w-1/2 px-4 ">
            {rooms[currentIndex].utilities
              .slice(Math.ceil(rooms[currentIndex].utilities.length / 2))
              .map((utility, idx) => (
                <p
                  key={idx}
                  className="font-bold text-xl text-gray-600 mb-8 leading-relaxed underline decoration-dotted underline-offset-8"
                >
                  {utility}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {rooms.map((room, index) => (
            <img
              key={index}
              src={room.image}
              alt={room.name}
              className="w-full h-auto object-cover flex-shrink-0 rounded-lg shadow-lg transition-transform duration-300"
            />
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-0 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaChevronLeft className="text-2xl text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-0 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaChevronRight className="text-2xl text-gray-800" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {rooms.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-50 opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomDecription;
