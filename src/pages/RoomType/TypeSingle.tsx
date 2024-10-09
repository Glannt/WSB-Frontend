import React from 'react';
import { DescriptionSingleType } from './Description/DescriptionSingleType';
import { TitleOverview } from './Overview/TitleOverview';
import { Button } from '@nextui-org/react';
import EventUtilityModal from './Amenities/EventUtilityModal';

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
        <TitleOverview />
      </div>
      <div className="m-14">
        <DescriptionSingleType />
      </div>
      <Button className="decoration-slice ml-14 mb-5" onClick={openModal}>
        Tiện ích
      </Button>
      {isOpen && <EventUtilityModal isOpen={isOpen} onClose={closeModal} />}
    </>
  );
};
