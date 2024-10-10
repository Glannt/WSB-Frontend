import { Button } from '@nextui-org/react';
import { TitleOverview } from './Overview/TitleOverview';
import EventUtilityModal from './Amenities/UtilitySingleModal';
import React from 'react';

export const TypeEvent: React.FC = () => {
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
          title="Phòng sự kiện"
          subTitle="Thích hợp cho sự kiện và hội thảo"
          description="Phòng sự kiện là không gian rộng lớn, linh hoạt phù hợp để tổ chức các sự kiện như hội thảo, hội nghị, hoặc các buổi lễ. Được trang bị đầy đủ âm thanh, ánh sáng và thiết bị hỗ trợ, phòng sự kiện đảm bảo mang lại trải nghiệm tốt nhất cho khách mời và ban tổ chức. Không gian có thể tùy chỉnh để đáp ứng mọi yêu cầu của sự kiện."
        />
      </div>
      <div className="m-14">{/* <DescriptionSingleType /> */}</div>
      <Button className="decoration-slice ml-14 mb-5 p-8" onClick={openModal}>
        Tiện ích
      </Button>
      {isOpen && <EventUtilityModal isOpen={isOpen} onClose={closeModal} />}
    </>
  );
};
