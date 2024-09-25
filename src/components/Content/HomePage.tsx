import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button, Link } from '@nextui-org/react';
import { SubcriptionCard } from '../HomepageContent/SubcriptionCard';
import { TypeRoomCard } from '../HomepageContent/TypeRoomCard';
import { DescriptionUtil } from '../HomepageContent/DescriptionHomePage';
import HeroSection from './heroSection';
import RoomDecription from '../HomepageContent/RoomDecription';

export interface CarouselPropsSlider {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}
export const HomePage: React.FC<CarouselPropsSlider> = ({
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
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
          <TypeRoomCard />
          <TypeRoomCard />
          <TypeRoomCard />
          <TypeRoomCard />
        </div>
        <div className="flex justify-end mx-auto mt-10">
          <Button
            href="/list-room"
            as={Link}
            className="bg-sky-500 p-7 md:text-base lg:text-base xl:text-base 2xl:text-base hover:bg-sky-600"
          >
            See more
          </Button>
        </div>
      </div>
      {/* Utilities */}
      <div className="max-w-[1800px] h-[70rem] w-full m-auto relative py-16 px-4">
        <HeroSection />
      </div>
      <div className="max-w-[1800px] h-[50rem] w-full m-auto relative py-16 px-4">
        {/* <DescriptionUtil /> */}
        <RoomDecription />
      </div>
      <div className="max-w-[1800px] h-[70rem] w-full m-auto relative py-16 px-4">
        <HeroSection />
      </div>
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
