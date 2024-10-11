import React from 'react';
import { TitleOverview } from './Overview/TitleOverview';
import { Button } from '@nextui-org/react';
import EventUtilityModal from './Amenities/UtilitySingleModal';
import RoomTypeSlider from '@/components/Slider/RoomTypeSlider';
import BuildingDescription from './Description/BuildingDescription';
import { DescriptionMeetingType } from './Description/DescriptionMeetingType';

export const TypeMeeting: React.FC = () => {
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
          title="Phòng họp"
          subTitle="Thích hợp cho các buổi họp nhóm"
          description="Phòng họp được trang bị các thiết bị hiện đại, phục vụ cho nhu cầu họp nhóm hoặc tổ chức buổi thảo luận. Không gian rộng rãi, thoải mái với đầy đủ tiện nghi giúp buổi họp diễn ra suôn sẻ và hiệu quả. Phù hợp cho các nhóm từ nhỏ đến lớn, đảm bảo tính bảo mật và chuyên nghiệp."
        />
      </div>
      <div className="m-14">
        <DescriptionMeetingType />
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
