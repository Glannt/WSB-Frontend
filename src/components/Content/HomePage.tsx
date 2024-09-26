import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button, Link } from '@nextui-org/react';
import { SubcriptionCard } from '../HomepageContent/SubcriptionCard';
import { TypeRoomCard } from '../HomepageContent/TypeRoomCard';
import { DescriptionUtil } from '../HomepageContent/DescriptionHomePage';
import HeroSection from './heroSection';
import RoomDecription from '../HomepageContent/RoomDecription';
import { useNavigate } from 'react-router';

export interface CarouselPropsSlider {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}
export const HomePage: React.FC<CarouselPropsSlider> = ({
  autoSlide = true,
  autoSlideInterval = 3000,
}) => {
  const slides = [
    {
      url: 'https://stylishclub.pt/wp-content/uploads/2023/05/stylish-club-blog-post-the-future-of-worsapce-design-banner-1024x683.jpg',
    },
    {
      url: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg',
    },
    {
      url: 'https://www.workdesign.com/wp-content/uploads/2021/04/shutterstock_682694722-scaled-e1619719883125.jpg',
    },

    {
      url: 'https://boweninteriors.com.au/wp-content/uploads/2022/06/Blog-5.jpg',
    },
    {
      url: 'https://studioasa.in/wp-content/uploads/2024/02/Bringing-the-Greens-Inside-the-Workspace.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const navigate = useNavigate();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    if (!autoSlide || isInteracting) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, currentIndex, isInteracting]);

  return (
    <div>
      <div className="max-w-[1400px] h-[780px] w-screen m-auto gap-10 py-16 relative group z[-5]">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500 my-0 mx-0"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <ChevronLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <ChevronRight onClick={nextSlide} size={30} />
        </div>
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`transition-all w-3 h-3 bg-white rounded-full ${currentIndex === slideIndex ? 'p-4' : 'bg-opacity-50'} text-2xl cursor-pointer`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Type room */}
      <div className="max-auto h-auto w-full m-auto py-16 px-4">
        <h1 className="font-bold text-4xl ml-8 mb-14">Các loại phòng</h1>
        <div className="flex flex-row gap-4 w-full h-auto justify-evenly">
          <TypeRoomCard
            url="https://workflow.com.vn/wp-content/uploads/2024/07/b1f293e72e40e53c6d98a043c1cc3148.png"
            name="Phòng đơn"
            description="Giá cả phải chăng"
          />
          <TypeRoomCard
            url="https://workflow.com.vn/wp-content/uploads/2024/07/72d7d94d35b0d6bce9ae803e5e5b8975.png"
            name="Phòng đôi"
            description="Rộng rãi thoải mái"
          />
          <TypeRoomCard
            url="https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg"
            name="Phòng 7"
            description="Thiết bị đầy đủ, tiện ích tốt"
          />
          <TypeRoomCard
            url="https://workflow.com.vn/wp-content/uploads/2024/05/z5404832229897_c592108c054d4505476d97f2bbd6f86e-2.png"
            name="Phòng 10"
            description="Càng đông càng xịn"
          />
          {/* <TypeRoomCard />
          <TypeRoomCard />
          <TypeRoomCard /> */}
        </div>
        <div className="flex justify-end mx-auto mt-10">
          <Button
            onClick={() => navigate('/list-room')}
            className="mt-8 bg-blackA12 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-black hover:shadow-2xl transition duration-300 ease-in-out flex items-center"
          >
            Xem thêm
          </Button>
        </div>
      </div>
      {/* Utilities */}
      <div className="max-w-[1800px] h-[50rem] w-full m-auto relative py-16 px-4">
        <HeroSection />
      </div>
      <div className="max-w-[1800px] h-[50rem] w-full m-auto relative py-16 px-4">
        {/* <DescriptionUtil /> */}
        <RoomDecription />
      </div>
      {/* <div className="max-w-[1800px] h-[70rem] w-full m-auto relative py-16 px-4">
        <HeroSection />
      </div> */}
      {/* Subcription */}
      <div className="max-w-[1800px] h-[80rem] w-full m-auto relative py-16 px-4">
        <div className="flex flex-row gap-4 w-full h-auto justify-evenly rounded-lg border-solid border-2 border-x-blackA5 bg-slate-100 py-5">
          <SubcriptionCard />
        </div>
      </div>
      {/* Feedback */}
      <div className="max-w-[1800px] h-[400px] w-full m-auto relative py-16 px-4">
        <h1 className="font-bold text-4xl mb-4 mt-8">Feedback</h1>
        <div className="flex flex-row gap-4 w-full h-auto justify-evenly">
          {/* Card 1 */}
          <div className="rounded-lg border-solid border-2 border-sky-500 p-4 max-w-[240px]">
            <div className="flex items-center gap-3">
              <img
                className="w-16 h-16 rounded-full"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                alt="Teodros Girmay"
              />
              <div>
                <h3 className="font-bold">Teodros Girmay</h3>
                <p className="text-gray-600">Engineering</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border-solid border-2 border-sky-500 p-4 max-w-[240px]">
            <div className="flex items-center gap-3">
              <img
                className="w-16 h-16 rounded-full"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                alt="Teodros Girmay"
              />
              <div>
                <h3 className="font-bold">Teodros Girmay</h3>
                <p className="text-gray-600">Engineering</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg border-solid border-2 border-blackA4 p-4 max-w-[240px]">
            <div className="flex items-center gap-3">
              <img
                className="w-16 h-16 rounded-full"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                alt="Teodros Girmay"
              />
              <div>
                <h3 className="font-bold">Teodros Girmay</h3>
                <p className="text-gray-600">Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* test */}
    </div>
  );
};
