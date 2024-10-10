// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css'; // Import Swiper styles
// import { Navigation, Pagination } from 'swiper/modules';

// import { useNavigate } from 'react-router-dom';
// import { TypeRoomCard } from '../HomepageContent/TypeRoomCard';

// const RoomSlider = () => {
//   const navigate = useNavigate();

//   return (
//     <Swiper
//       modules={[Navigation, Pagination]}
//       navigation
//       grabCursor={true}
//       centeredSlides={true}
//       loop={true}
//       slidesPerView={'auto'}
//       pagination={{ clickable: true }}
//       className="mySwiper"
//       spaceBetween={5} // Space between slides
//     >
//       <SwiperSlide>
//         <div
//           onClick={() => navigate('room-detail/' + 1)}
//           className="cursor-pointer"
//         >
//           <TypeRoomCard
//             url="https://workflow.com.vn/wp-content/uploads/2024/07/b1f293e72e40e53c6d98a043c1cc3148.png"
//             name="Phòng đơn"
//             description="Giá cả phải chăng"
//           />
//         </div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div
//           onClick={() => navigate('room-detail/' + 2)}
//           className="cursor-pointer"
//         >
//           <TypeRoomCard
//             url="https://workflow.com.vn/wp-content/uploads/2024/07/72d7d94d35b0d6bce9ae803e5e5b8975.png"
//             name="Phòng đôi"
//             description="Rộng rãi thoải mái"
//           />
//         </div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div
//           onClick={() => navigate('room-detail/' + 3)}
//           className="cursor-pointer"
//         >
//           <TypeRoomCard
//             url="https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg"
//             name="Phòng 7"
//             description="Thiết bị đầy đủ, tiện ích tốt"
//           />
//         </div>
//       </SwiperSlide>
//       {/* Add more SwiperSlides as needed */}
//     </Swiper>
//   );
// };

// export default RoomSlider;
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import { RxArrowTopRight } from 'react-icons/rx';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { useNavigate } from 'react-router-dom';
import { TypeRoomCard } from '../HomepageContent/TypeRoomCard';
import { Button } from '@nextui-org/react';

const RoomTypeSlider = () => {
  const navigate = useNavigate();

  const images = [
    {
      url: 'https://workflow.com.vn/wp-content/uploads/2024/07/b1f293e72e40e53c6d98a043c1cc3148.png',
      name: 'Phòng đơn',
      description: 'Giá cả phải chăng',
      id: 1,
    },
    {
      url: 'https://workflow.com.vn/wp-content/uploads/2024/07/72d7d94d35b0d6bce9ae803e5e5b8975.png',
      name: 'Phòng đôi',
      description: 'Rộng rãi thoải mái',
      id: 2,
    },
    {
      url: 'https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg',
      name: 'Phòng 7',
      description: 'Thiết bị đầy đủ, tiện ích tốt',
      id: 3,
    },
    {
      url: 'https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg',
      name: 'Phòng 10',
      description: 'Thiết bị đầy đủ, tiện ích tốt',
      id: 4,
    },
    // Add more room data as needed
  ];

  return (
    <Swiper
      breakpoints={{
        340: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className="flex flex-col gap-6 mb-20 group relative shadow-lg rounded-xl px-6 py-8 lg:h-[300px] lg:w-[350px] overflow-hidden cursor-pointer w-80 h-[360px] transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          <div
            //   onClick={() => navigate('room-detail/' + image.id)}
            className="cursor-pointer h-full w-full"
          >
            <img
              src={image.url}
              className="h-full w-full" // Make sure the card takes full height
            />
          </div>
        </SwiperSlide>
      ))}

      <div className="flex justify-center items-center relative bottom-2 space-x-4">
        <div className="swiper-pagination w-16"></div>
      </div>
    </Swiper>
  );
};

export default RoomTypeSlider;
