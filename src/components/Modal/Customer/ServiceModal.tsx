import ServiceList from '@/components/Content/ServiceList';
import { Services } from '@/types/service.type';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from '@nextui-org/react';
import React from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  services: Services[];
  quantities: { [key: number]: number };
  selectedServices: string[];
  handleServiceSelection: (serviceId: string) => void;
  handleQuantityChange: (serviceId: string, quantity: number) => void;
  calculateTotalPrice: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onOpenChange,
  services,
  quantities,
  selectedServices,
  handleServiceSelection,
  handleQuantityChange,
  calculateTotalPrice,
}) => {
  const [selected, setSelected] = React.useState<string>('photos');
  const [serviceEquipments, setServiceEquipments] = React.useState<Services[]>(
    []
  );
  const [serviceFoods, setServiceFoods] = React.useState<Services[]>([]);
  React.useEffect(() => {
    if (services.length > 0) {
      const equipments = services.filter(
        (service) => service.serviceType === 'Thiết bị'
      );
      const foods = services.filter(
        (service) => service.serviceType === 'Đồ ăn'
      );

      setServiceEquipments(equipments);
      setServiceFoods(foods);
    }
  }, [services]);
  return (
    <Modal
      onClose={calculateTotalPrice}
      hideCloseButton={true}
      scrollBehavior="inside"
      size="4xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Dịch vụ</ModalHeader>
            <ModalBody>
              <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key.toString())}
              >
                <Tab key="photos" title="Thiết bị">
                  <ServiceList
                    services={serviceEquipments}
                    quantities={quantities}
                    selectedServices={selectedServices}
                    handleServiceSelection={handleServiceSelection}
                    handleQuantityChange={handleQuantityChange}
                  />
                </Tab>
                <Tab key="music" title="Đồ ăn">
                  <ServiceList
                    services={serviceFoods}
                    quantities={quantities}
                    selectedServices={selectedServices}
                    handleServiceSelection={handleServiceSelection}
                    handleQuantityChange={handleQuantityChange}
                  />
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
