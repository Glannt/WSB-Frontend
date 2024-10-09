import { Button } from '@nextui-org/react';
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
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <div className="lg:col-span-7">
        <img
          src="https://storage.googleapis.com/circo-coworking--1550040568856.appspot.com/images/MG_5535_1718fda473.jpg"
          alt=""
          title=""
          className="rounded-3xl h-[400px] w-full"
        />
      </div>

      <div className="lg:col-span-3 mt-16">
        <div className="font-bold text-6xl text-center mb-5">Phòng đơn</div>
        <div className="font-semibold text-3xl text-pretty mb-5">
          Thích hợp cho 1 người
        </div>
        <div className="text-xl font-medium mb-4">
          Phòng dành cho sự riêng tư, cần tập trung. Đây là không gian lý tưởng
          để làm việc, học tập hoặc thư giãn một mình. Với thiết kế hiện đại,
          phòng đơn đảm bảo mang đến sự thoải mái và yên tĩnh, giúp bạn dễ dàng
          tập trung vào công việc hoặc những sở thích cá nhân.
        </div>
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
