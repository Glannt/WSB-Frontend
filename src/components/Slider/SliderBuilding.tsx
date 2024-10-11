import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SliderProps {
  images: string[];
}

export const SliderBuilding: React.FC<SliderProps> = ({ images }) => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="h-[52rem] py-8 relative"
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className="w-[37rem] h-[42rem] relative transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          <img
            src={image}
            alt={`slide_image_${index}`}
            className="w-full h-full object-cover rounded-2xl"
          />
        </SwiperSlide>
      ))}

      <div className="flex justify-center items-center relative bottom-8 space-x-4">
        <div className="swiper-pagination w-16"></div>
      </div>
    </Swiper>
  );
};
