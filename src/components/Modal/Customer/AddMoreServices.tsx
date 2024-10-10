// import { CustomerOrderBookingHistory } from '@/types/bookings';
// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   Tab,
//   Tabs,
// } from '@nextui-org/react';
// import React from 'react';

// interface AddMoreServicesProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
// const foodServices = [
//   {
//     id: 1,
//     name: 'Breakfast Buffet',
//     price: 20,
//     image:
//       'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//   },
//   {
//     id: 2,
//     name: 'Lunch Set',
//     price: 25,
//     image:
//       'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//   },
//   {
//     id: 3,
//     name: 'Dinner Platter',
//     price: 30,
//     image:
//       'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
//   },
// ];
// export const AddMoreServices: React.FC<AddMoreServicesProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [selected, setSelected] = React.useState('photos');
//   const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
//     {
//       1: 1,
//       2: 1,
//       3: 1,
//     }
//   );
//   const [selectedServices, setSelectedServices] = React.useState<number[]>([]);
//   const handleQuantityChange = (id: string, newQuantity: number) => {
//     // calculateTotalPrice();
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [id]: newQuantity, // Cập nhật số lượng của món có id tương ứng
//     }));
//   };
//   const handleServiceSelection = (serviceId: number) => {
//     setSelectedServices((prevServices) =>
//       prevServices.includes(serviceId)
//         ? prevServices.filter((id) => id !== serviceId)
//         : [...prevServices, serviceId]
//     );
//   };
//   return (
//     <>
//       <Modal
//         // onClose={calculateTotalPrice}
//         hideCloseButton={true}
//         scrollBehavior="inside"
//         size="4xl"
//         isOpen={isOpen}
//         // onOpenChange={onOpenChange}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Dịch vụ</ModalHeader>
//               <ModalBody>
//                 {/* <div className="flex w-full flex-col fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"> */}
//                 <Tabs
//                   aria-label="Options"
//                   selectedKey={selected}
//                   onSelectionChange={(key) => setSelected(key.toString())}
//                 >
//                   <Tab key="photos" title="Thiết bị">
//                     <Card>
//                       <CardBody>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {foodServices.map((service) => (
//                             <div className="flex-col">
//                               <label htmlFor={service.id.toString()}>
//                                 <div
//                                   key={service.id}
//                                   className="border rounded-lg p-4 flex items-center"
//                                 >
//                                   <img
//                                     src={service.image}
//                                     alt={service.name}
//                                     className="w-20 h-20 object-cover rounded-md mr-4"
//                                   />
//                                   <div>
//                                     <h4 className="font-semibold">
//                                       {service.name}
//                                     </h4>
//                                     <p className="text-gray-600">
//                                       ${service.price}
//                                     </p>
//                                   </div>
//                                   {/* <span className="flex justify-end-end"> */}
//                                   {
//                                     <Input
//                                       variant="underlined"
//                                       className="h-12 w-20 ml-auto"
//                                       min={1}
//                                       type="number"
//                                       label="Số lượng"
//                                       placeholder="0"
//                                       value={'' + quantities[service.id]} // Số lượng tương ứng với từng món
//                                       onChange={(e) =>
//                                         handleQuantityChange(
//                                           service.id.toString(),
//                                           Number(e.target.value)
//                                         )
//                                       }
//                                       labelPlacement="inside"
//                                       startContent={
//                                         <div className="pointer-events-none flex items-center">
//                                           {/* <span className="text-default-400 text-small"></span> */}
//                                         </div>
//                                       }
//                                     />
//                                   }
//                                   {/* <div className="flex flex-col items-end justify-end"> */}
//                                   <input
//                                     id={service.id.toString()}
//                                     type="checkbox"
//                                     checked={selectedServices.includes(
//                                       service.id
//                                     )}
//                                     onChange={() =>
//                                       handleServiceSelection(service.id)
//                                     }
//                                     className="ml-auto size-5"
//                                   />
//                                   {/* </span> */}
//                                   {/* </div> */}
//                                 </div>
//                               </label>
//                               <div></div>
//                             </div>
//                           ))}
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Tab>
//                   <Tab key="music" title="Đồ ăn">
//                     <Card>
//                       <CardBody>
//                         Ut enim ad minim veniam, quis nostrud exercitation
//                         ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                         Duis aute irure dolor in reprehenderit in voluptate
//                         velit esse cillum dolore eu fugiat nulla pariatur.
//                       </CardBody>
//                     </Card>
//                   </Tab>
//                 </Tabs>
//                 {/* </div> */}
//                 {/* <p>
//                       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                       Nullam pulvinar risus non risus hendrerit venenatis.
//                       Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                     </p>
//                     <p>
//                       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                       Nullam pulvinar risus non risus hendrerit venenatis.
//                       Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                     </p>
//                     <p>
//                       Magna exercitation reprehenderit magna aute tempor
//                       cupidatat consequat elit dolor adipisicing. Mollit dolor
//                       eiusmod sunt ex incididunt cillum quis. Velit duis sit
//                       officia eiusmod Lorem aliqua enim laboris do dolor
//                       eiusmod. Et mollit incididunt nisi consectetur esse
//                       laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
//                       deserunt nostrud ad veniam.
//                     </p> */}
//               </ModalBody>
//               <ModalFooter>
//                 {/* <Button color="danger" variant="light" onPress={onClose}>
//                       Đóng
//                     </Button> */}
//                 <Button color="primary" onPress={onClose}>
//                   Đóng
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
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
import React from 'react';

interface AddMoreServicesProps {
  isOpen: boolean;
  onClose: () => void;
}

const foodServices = [
  {
    id: 1,
    name: 'Breakfast Buffet',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    name: 'Lunch Set',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    name: 'Dinner Platter',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
  },
];

export const AddMoreServices: React.FC<AddMoreServicesProps> = ({
  isOpen,
  onClose,
}) => {
  const [selected, setSelected] = React.useState('photos');
  const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
    {
      1: 1,
      2: 1,
      3: 1,
    }
  );
  const [selectedServices, setSelectedServices] = React.useState<number[]>([]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity, // Cập nhật số lượng của món có id tương ứng
    }));
  };

  const handleServiceSelection = (serviceId: number) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceId)
        ? prevServices.filter((id) => id !== serviceId)
        : [...prevServices, serviceId]
    );
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
                      {foodServices.map((service) => (
                        <div key={service.id} className="flex-col">
                          <label htmlFor={service.id.toString()}>
                            <div className="border rounded-lg p-4 flex items-center">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-20 h-20 object-cover rounded-md mr-4"
                              />
                              <div>
                                <h4 className="font-semibold">
                                  {service.name}
                                </h4>
                                <p className="text-gray-600">
                                  ${service.price}
                                </p>
                              </div>
                              <Input
                                variant="underlined"
                                className="h-12 w-20 ml-auto"
                                min={1}
                                type="number"
                                label="Số lượng"
                                placeholder="0"
                                value={'' + quantities[service.id]} // Số lượng tương ứng với từng món
                                onChange={(e) =>
                                  handleQuantityChange(
                                    service.id.toString(),
                                    Number(e.target.value)
                                  )
                                }
                                labelPlacement="inside"
                              />
                              <input
                                id={service.id.toString()}
                                type="checkbox"
                                checked={selectedServices.includes(service.id)}
                                onChange={() =>
                                  handleServiceSelection(service.id)
                                }
                                className="ml-auto size-5"
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
            <Button color="primary" onPress={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
