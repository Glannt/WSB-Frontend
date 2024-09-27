import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Flex, Box, Card, Text, Avatar, Inset, Strong } from '@radix-ui/themes';
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
      <div className="max-w-[1400px] h-[1000px] w-full m-auto relative py-16 px-4">
        <h1 className="font-bold text-black">Các loại phòng</h1>
        <div className="flex flex-row gap-4 w-full h-auto justify-center">
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
    </>
  );
};
