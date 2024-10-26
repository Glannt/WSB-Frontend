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

const RoomSlider = () => {
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
      name: 'Phòng họp',
      description: 'Thiết bị đầy đủ, tiện ích tốt',
      id: 3,
    },
    {
      url: 'https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg',
      name: 'Phòng sự kiện',
      description: 'Thiết bị đầy đủ, tiện ích tốt',
      id: 4,
    },
    // Add more room data as needed
  ];
  const handleNavigate = (x: string) => {
    if (x === 'Phòng đôi') {
      navigate(`/double-space`);
    } else if (x === 'Phòng đơn') {
      navigate(`/single-space`);
    } else if (x === 'Phòng họp') {
      navigate(`/meeting-space`);
    } else if (x === 'Phòng sự kiện') {
      navigate(`/event-space`);
    }
  };
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
      className="max-w-[90%] lg:max-w-[80%] w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className="flex flex-col gap-6 mb-20 pb-16 group relative shadow-lg rounded-xl px-6 py-8 lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer w-60 h-[360px] transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          <div
            //   onClick={() => navigate('room-detail/' + image.id)}
            className="cursor-pointer h-full w-full"
          >
            <TypeRoomCard
              url={image.url}
              name={image.name}
              description={image.description}
              className="h-full" // Make sure the card takes full height
            />
            <Button
              onClick={() => handleNavigate(image.name)}
              className="ml-7 mb-5 w-[90%] border border-blackA2 text-center text-black hover:bg-blackA9 hover:text-white hover:transition hover:duration-300 transition duration-500 ease-in-out"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </SwiperSlide>
      ))}

      <div className="flex justify-center items-center relative bottom-2 space-x-4">
        <div className="swiper-pagination w-16"></div>
      </div>
    </Swiper>
  );
};

export default RoomSlider;
