import { Button, Image } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
interface TitleOverviewProps {
  title?: string;
  subTitle?: string;
  description?: string;
  image?: string;
}
export const TitleOverview: React.FC<TitleOverviewProps> = ({
  title,
  subTitle,
  description,
  image,
}) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 scale-100">
      <div className="lg:col-span-7">
        <Image
          src="https://storage.googleapis.com/circo-coworking--1550040568856.appspot.com/images/MG_5535_1718fda473.jpg"
          alt=""
          title=""
          className="rounded-3xl h-[400px] w-[950px] object-cover"
          isBlurred
        />
      </div>

      <div className="lg:col-span-3 mt-16">
        <div className="font-bold text-6xl text-center mb-5">{title}</div>
        <div className="font-semibold text-3xl text-pretty mb-5">
          {subTitle}
        </div>
        <div className="text-xl font-medium mb-4">{description}</div>
        <Button
          className="mt-10 w-full bg-transparent border border-blackA12 hover:transition hover:duration-700 hover:bg-black hover:text-[#f0ecec] p-7 shadow-lg"
          onClick={() => navigate(path.rooms)}
        >
          Đặt phòng ngay
        </Button>
      </div>
    </div>
  );
};
