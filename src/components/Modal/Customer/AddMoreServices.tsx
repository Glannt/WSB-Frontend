import { Services } from '@/types/service.type';
import { CustomerOrderBookingHistory, ServiceItems } from '@/types/bookings.ts';
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { getService, updateServiceBooking } from '@/service/customer.api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaUpdateService, SchemaUpdateService } from '@/utils/rules';

interface AddMoreServicesProps {
  isOpen: boolean;
  onClose: () => void;
  booking: CustomerOrderBookingHistory | null;
  refetchBooking: () => void;
}

export const AddMoreServices: React.FC<AddMoreServicesProps> = ({
  isOpen,
  onClose,
  booking,
  refetchBooking,
}) => {
  const getServiceApi = async () => {
    const response = await getService();
    return response.data.data;
  };

  const { data: services = [] } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });

  const initialQuantities = React.useMemo(() => {
    const quantities: { [key: string]: number } = {};
    if (booking?.serviceItems) {
      Object.entries(booking.serviceItems).forEach(
        ([serviceName, quantity]) => {
          const service = services.find((s) => s.serviceName === serviceName);
          if (service) {
            quantities[service.serviceId] = quantity; // Chuyển đổi sang ID dịch vụ
          }
        }
      );
    }
    return quantities;
  }, [booking, services]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    reset,
  } = useForm<SchemaUpdateService>({
    resolver: yupResolver(schemaUpdateService),
    defaultValues: {
      bookingId: booking?.bookingId || '',
      items: {
        quantities: initialQuantities || {}, // Đặt initialQuantities vào defaultValues
      },
    },
  });
  React.useEffect(() => {
    if (isOpen) {
      // Kiểm tra nếu modal đang mở
      reset({
        bookingId: booking?.bookingId || '',
        items: {
          quantities: initialQuantities || {}, // Cập nhật giá trị khi modal mở
        },
      });
    }
  }, [isOpen, booking, initialQuantities, reset]);
  // Mutation to update services
  const UpdateServiceMutation = useMutation({
    mutationFn: (formData: FormData) => updateServiceBooking(formData),
    onSuccess: () => {
      console.log('Service update successful');
      refetchBooking();
      onClose(); // Close the modal on success
    },
    onError: (error) => {
      console.error('Error updating services:', error);
    },
  });

  const [selected, setSelected] = React.useState('photos');
  const [quantities, setQuantities] = React.useState<ServiceItems>(
    initialQuantities // Initialize from booking if available
  );
  console.log(quantities);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(newQuantity, 0), // Update quantity for selected service
    }));
  };
  console.log(quantities);

  // Handle form submission
  const onSubmit = () => {
    const formData = new FormData();

    // Append booking ID
    if (booking?.bookingId) {
      formData.append('bookingId', booking.bookingId);
    }
    Object.entries(quantities).forEach(([serviceId, quantity]) => {
      console.log(serviceId);

      formData.append(`items[${serviceId}]`, quantity.toString()); // This creates items[serviceId]=quantity
    });
    // Perform mutation
    UpdateServiceMutation.mutate(formData);
  };
  return (
    <>
      <Modal
        hideCloseButton={true}
        scrollBehavior="inside"
        size="4xl"
        isOpen={isOpen}
        onClose={onClose} // Correctly passing onClose to the Modal component
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Dịch vụ</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key.toString())}
              >
                <Tab key="photos" title="Thiết bị">
                  <Card>
                    <CardBody>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div key={service.serviceId} className="flex-col">
                            <label htmlFor={service.serviceId.toString()}>
                              <div className="border rounded-lg p-4 flex items-center">
                                <img
                                  // src={service.image}
                                  // alt={service.name}
                                  className="w-20 h-20 object-cover rounded-md mr-4"
                                />
                                <div>
                                  <h4 className="font-semibold">
                                    {service.serviceName}
                                  </h4>
                                  <p className="text-gray-600">
                                    ${service.price}
                                  </p>
                                </div>
                                <Input
                                  variant="underlined"
                                  className="h-12 w-20 ml-auto"
                                  min={0}
                                  type="number"
                                  label="Số lượng"
                                  placeholder="0"
                                  value={String(
                                    quantities[service.serviceId] || 0
                                  )} // Số lượng tương ứng với từng món
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      service.serviceId.toString(),
                                      Number(e.target.value)
                                    )
                                  }
                                  labelPlacement="inside"
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="music" title="Đồ ăn">
                  <Card>
                    <CardBody>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                className="hover:transtion hover:duration-500 shadow-md"
              >
                Đặt thêm
              </Button>
              <Button
                color="danger"
                onPress={onClose}
                className="hover:transtion hover:duration-500 shadow-md"
              >
                Đóng
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
