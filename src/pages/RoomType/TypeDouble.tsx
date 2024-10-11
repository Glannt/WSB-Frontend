import { Button } from '@nextui-org/react';
import { TitleOverview } from './Overview/TitleOverview';
import EventUtilityModal from './Amenities/UtilitySingleModal';
import React from 'react';
import RoomTypeSlider from '@/components/Slider/RoomTypeSlider';
import BuildingDescription from './Description/BuildingDescription';
import { DescriptionDoubleType } from './Description/DescriptionDoubleType';

export const TypeDouble: React.FC = () => {
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
          title="Phòng đôi"
          subTitle="Thích hợp cho 2 người"
          description="Phòng đôi là lựa chọn lý tưởng cho các cặp đôi hoặc hai người làm việc chung. Với không gian thoải mái, thiết kế hiện đại, phòng đôi cung cấp đầy đủ tiện nghi để tạo điều kiện làm việc hoặc thư giãn. Đây là không gian tuyệt vời để cùng nhau chia sẻ những khoảnh khắc sáng tạo hoặc thư giãn."
        />
      </div>
      <div className="m-14">
        <DescriptionDoubleType />
      </div>
      <div className="m-14">{/* <DescriptionSingleType /> */}</div>
      <Button className="decoration-slice ml-14 mb-5" onClick={openModal}>
        Tiện ích
      </Button>
      <div className="m-14">
        <RoomTypeSlider />
      </div>
      <div className="m-14">
        <BuildingDescription />
      </div>
      {isOpen && <EventUtilityModal isOpen={isOpen} onClose={closeModal} />}
    </>
  );
};
