import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { Button, Image } from '@nextui-org/react'; // Assuming you're using NextUI for the Button component
// import TypeRoomCard from './TypeRoomCard'; // Adjust the import based on your file structure
import { ListRooms } from '@/types/roomOverview';
import { useNavigate } from 'react-router';

interface RoomTypeSwiperProps {
  roomType: ListRooms[];
}

const RoomTypeSwiper: React.FC<RoomTypeSwiperProps> = ({ roomType }) => {
  console.log('roomType', roomType[0].roomType);

  const formatRoomPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleNavigate = () => {
    if (roomType[0].roomType === 'Phòng học 5 người') {
      navigate(`/double-space`);
    } else if (roomType[0].roomType === 'Phòng học 1 người') {
      navigate(`/single-space`);
    } else if (roomType[0].roomType === 'Phòng họp') {
      navigate(`/meeting-space`);
    } else if (roomType[0].roomType === 'Phòng sự kiện') {
      navigate(`/event-space`);
    }
  };

  const navigate = useNavigate();
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
      {roomType && roomType.length > 0 ? (
        roomType.map((room, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col gap-6 mb-20 pb-16 group relative shadow-lg rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="cursor-pointer h-full w-full">
              <Image
                src={room.roomImg?.[0] || ''}
                alt={room.roomName}
                className="w-full h-48 object-cover"
                //   layout="responsive"
                width={400}
                height={250} // Adjust according to your image aspect ratio
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{room.roomName}</h3>
                <p className="text-gray-600">
                  {formatRoomPrice(room.price)} VNĐ/slot
                </p>
              </div>
              <Button
                onClick={() => handleNavigate()}
                className="ml-7 mb-5 bg-transparent w-[90%] border border-blackA2 text-center text-black hover:bg-blackA9 hover:text-white hover:transition hover:duration-300 transition duration-500 ease-in-out"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="p-4 text-center">
            <p>No rooms available</p>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default RoomTypeSwiper;
