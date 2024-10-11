import React from 'react';
import { DescriptionSingleType } from './Description/DescriptionSingleType';
import { TitleOverview } from './Overview/TitleOverview';
import { Button } from '@nextui-org/react';
import UtilitySingleModal from './Amenities/UtilitySingleModal';
import RoomTypeSlider from '@/components/Slider/RoomTypeSlider';
import BuildingDescription from './Description/BuildingDescription';

export const TypeSingle: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="m-14 w-100% h-100%">
        <TitleOverview
          title="Phòng đơn"
          subTitle="Thích hợp cho 1 người"
          description="Phòng dành cho sự riêng tư, cần tập trung. Đây là không gian lý tưởng
          để làm việc, học tập hoặc thư giãn một mình. Với thiết kế hiện đại,
          phòng đơn đảm bảo mang đến sự thoải mái và yên tĩnh, giúp bạn dễ dàng
          tập trung vào công việc hoặc những sở thích cá nhân."
        />
      </div>
      <div className="m-14">
        <DescriptionSingleType />
      </div>
      <Button
        className="decoration-slice ml-14 mb-5 pl-8 pr-8"
        onClick={openModal}
      >
        Tiện ích
      </Button>
      <div className="m-14">
        <RoomTypeSlider />
      </div>
      <div className="m-14">
        <BuildingDescription />
      </div>
      {isOpen && <UtilitySingleModal isOpen={isOpen} onClose={closeModal} />}
    </>
  );
};
