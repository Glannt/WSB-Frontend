import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button, Link } from '@nextui-org/react';
import { SubcriptionCard } from '../HomepageContent/SubcriptionCard';
import { TypeRoomCard } from '../HomepageContent/TypeRoomCard';
import { DescriptionUtil } from '../HomepageContent/DescriptionHomePage';
import HeroSection from './heroSection';
import RoomDescription from '../HomepageContent/RoomDecription';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
import { getUser } from '@/service/customer.api';
import { setCustomerToLS } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';

export interface CarouselPropsSlider {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export const HomePage: React.FC<CarouselPropsSlider> = ({
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  useEffect(() => {
    getProfileUser();
  }, []);
  const getProfileUser = async () => {
    const response = await getUser();
    const customerData = response.data.data;
    setCustomerToLS(customerData); // Save customer to local storage
    return customerData;
  };

  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

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
    <>
      <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group z[-5]">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500 my-0"
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
      <div className="max-auto h-auto w-full m-auto py-16 px-4 -z-20">
        <h1 className="font-bold text-4xl ml-8 mb-14">Các loại phòng</h1>
        <div className="flex flex-row gap-4 w-full h-auto justify-evenly">
          <div
            onClick={() => navigate('single-space')}
            className="cursor-pointer"
          >
            <TypeRoomCard
              url="https://workflow.com.vn/wp-content/uploads/2024/07/b1f293e72e40e53c6d98a043c1cc3148.png"
              name="Phòng đơn"
              description="Giá cả phải chăng"
              className="hover:scale-105"
            />
          </div>
          <div
            onClick={() => navigate('double-space')}
            className="cursor-pointer"
          >
            <TypeRoomCard
              url="https://workflow.com.vn/wp-content/uploads/2024/07/72d7d94d35b0d6bce9ae803e5e5b8975.png"
              name="Phòng đôi"
              description="Rộng rãi thoải mái"
              className="hover:scale-105"
            />
          </div>
          <div
            onClick={() => navigate('meeting-space')}
            className="cursor-pointer"
          >
            <TypeRoomCard
              url="https://workflow.com.vn/wp-content/uploads/2024/07/675e66a2542d4618edc4802b0124c59e.jpg"
              name="Phòng họp"
              description="Thiết bị đầy đủ, tiện ích tốt"
              className="hover:scale-105"
            />
          </div>
          <div
            onClick={() => navigate('event-space')}
            className="cursor-pointer"
          >
            <TypeRoomCard
              url="https://workflow.com.vn/wp-content/uploads/2024/05/z5404832229897_c592108c054d4505476d97f2bbd6f86e-2.png"
              name="Phòng sự kiện"
              description="Càng đông càng xịn"
              className="hover:scale-105"
            />
          </div>
        </div>
        <div className="flex justify-end mx-auto mt-10">
          <Button
            onClick={() => navigate(path.rooms)}
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
        <RoomDescription />
      </div>
      {/* <div className="max-w-[1800px] h-[70rem] w-full m-auto relative py-16 px-4">
        <HeroSection />
      </div> */}
      {/* Subcription */}
      <div className="max-w-[1800px] h-[65rem] w-full m-auto relative py-16 px-4">
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
          <div className="rounded-lg border-solid border-2 border-sky-500 w-82">
            <Box maxWidth="700px">
              <Card size="3">
                <Inset clip="padding-box" side="top" pb="current">
                  <img
                    src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Bold typography"
                    style={{
                      display: 'block',
                      objectFit: 'cover',
                      width: '100%',
                      height: 140,
                      backgroundColor: 'var(--gray-5)',
                    }}
                  />
                </Inset>
                <Text asChild>
                  <h2 className="font-bold text-lg">Quick Start</h2>
                </Text>
                <Text as="div" color="gray" size="2">
                  Start building your next project in minutes
                </Text>
              </Card>
            </Box>
          </div>
          <div className="rounded-lg border-solid border-2 border-sky-500 w-82">
            <Box maxWidth="500px">
              <Card size="3">
                <Inset clip="padding-box" side="top" pb="current">
                  <img
                    src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Bold typography"
                    style={{
                      display: 'block',
                      objectFit: 'cover',
                      width: '100%',
                      height: 140,
                      backgroundColor: 'var(--gray-5)',
                    }}
                  />
                </Inset>
                <Text asChild>
                  <h2 className="font-bold text-lg">Quick Start</h2>
                </Text>
                <Text as="div" color="gray" size="2">
                  Start building your next project in minutes
                </Text>
              </Card>
            </Box>
          </div>
        </div>
      </div>
      {/* test */}
    </div>
  );
};
