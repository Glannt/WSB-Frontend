import { Services } from '@/types/service.type';
import { Card, CardBody, Input } from '@nextui-org/react';
import React from 'react';

interface ServiceListProps {
  services: Services[];
  quantities: { [key: string]: number };
  selectedServices: string[];
  handleServiceSelection: (serviceId: string) => void;
  handleQuantityChange: (serviceId: string, quantity: number) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  quantities,
  selectedServices,
  handleServiceSelection,
  handleQuantityChange,
}) => {
  const formatRoomPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div key={service.serviceId} className="flex-col">
              <label htmlFor={service.serviceId.toString()}>
                <div
                  key={service.serviceId}
                  className="border rounded-lg p-4 flex items-center"
                >
                  {/* Uncomment when image URLs are available */}
                  {/* <img src={service.image} alt={service.serviceName} className="w-20 h-20 object-cover rounded-md mr-4" /> */}
                  <div>
                    <h4 className="font-semibold">{service.serviceName}</h4>
                    <p className="text-gray-600">
                      {formatRoomPrice(service.price)} VNĐ
                    </p>
                  </div>
                  <Input
                    variant="underlined"
                    className="h-12 w-20 ml-auto"
                    min={1}
                    type="number"
                    label="Số lượng"
                    placeholder="0"
                    value={'' + quantities[service.serviceId]}
                    onChange={(e) =>
                      handleQuantityChange(
                        service.serviceId.toString(),
                        Number(e.target.value)
                      )
                    }
                    labelPlacement="inside"
                  />
                  <input
                    id={service.serviceId.toString()}
                    type="checkbox"
                    checked={selectedServices.includes(service.serviceId)}
                    onChange={() => handleServiceSelection(service.serviceId)}
                    className="ml-auto size-5"
                  />
                </div>
              </label>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ServiceList;
