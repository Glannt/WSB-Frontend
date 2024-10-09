import { Button } from '@nextui-org/react';
import { TitleOverview } from './Overview/TitleOverview';
import EventUtilityModal from './Amenities/EventUtilityModal';
import React from 'react';

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
        <TitleOverview />
      </div>
      <div className="m-14">{/* <DescriptionSingleType /> */}</div>
      <Button className="decoration-slice ml-14 mb-5" onClick={openModal}>
        Tiện ích
      </Button>
      {isOpen && <EventUtilityModal isOpen={isOpen} onClose={closeModal} />}
    </>
  );
};
