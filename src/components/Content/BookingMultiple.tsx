import React, { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaCheck,
  FaStar,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaCoffee,
} from 'react-icons/fa';
import { MdAir, MdTv } from 'react-icons/md';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { parseDate, CalendarDate } from '@internationalized/date';
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  DateRangePicker,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import { toInteger } from 'lodash';
import {
  getAllBuiding,
  getDetailRoom,
  getService,
  getSimilarType,
} from '@/service/customer.api';
import { ListRooms } from '@/types/roomOverview';
import { useQuery } from '@tanstack/react-query';
import { buildingCustomer } from '@/types/building.type';
import RoomTypeSwiper from './RoomTypeSlider';
import { Services } from '@/types/service.type';
interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const BookingRoomDetailMultiple = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);
  const [selectedBase, setSelectedBase] = useState<string>('');
  const { roomId } = useParams<{ roomId: string }>();
  const [Buildings, setBuildings] = useState<buildingCustomer[]>([]);
  const getRoomDetailApi = async () => {
    if (roomId === undefined) {
      return null;
    }
    const response = await getDetailRoom(roomId);
    return response.data.data;
  };
  const {
    data: roomDetail,
    isLoading,
    refetch,
  } = useQuery<ListRooms>({
    queryKey: ['roomDetail', roomId],
    queryFn: getRoomDetailApi,
    enabled: !!roomId,
  });
  const getAllBuildingApi = async () => {
    if (roomDetail?.roomType === undefined) {
      return null;
    }
    const response = await getAllBuiding();
    return response.data.data;
  };
  const {
    data: buildings,
    // isLoading,
    // refetch,
  } = useQuery<buildingCustomer[]>({
    queryKey: ['buildings'],
    queryFn: getAllBuildingApi,
    // enabled: !!roomId,
  });
  useEffect(() => {
    if (buildings) {
      setBuildings(buildings);
    }
  }, [buildings]);
  const getRoomTypeApi = async () => {
    if (roomDetail?.roomType === undefined) {
      return null;
    }
    const response = await getSimilarType(roomDetail?.roomType);
    return response.data.data;
  };
  const {
    data: roomType,
    // isLoading,
    // refetch,
  } = useQuery<ListRooms[]>({
    queryKey: ['roomType', roomDetail?.roomType],
    queryFn: getRoomTypeApi,
    // enabled: !!roomId,
  });

  const getServiceApi = async () => {
    const response = await getService();
    return response.data.data;
  };

  const { data: services = [] } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });

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

  const timeSlots = [
    '07:00 - 10:00',
    '11:00 - 14:00',
    '15:00 - 18:00',
    '19:00 - 22:00',
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    1: 1,
    2: 1,
    3: 1,
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    // calculateTotalPrice();
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity, // Cập nhật số lượng của món có id tương ứng
    }));
  };

  // const building = ['Cơ sở 1', 'Cơ sở 2'];

  const handleBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBase(e.target.value);
  };

  const handleDateChange = (value: CalendarDate) => {
    setSelectedDate(new Date(value.toString()));
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(e.target.value);
  };

  const toggleServiceModal = () => {
    setShowServiceModal(!showServiceModal);
  };

  const togglePolicyModal = () => {
    setShowPolicyModal(!showPolicyModal);
  };

  const handleServiceSelection = (serviceId: string) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceId)
        ? prevServices.filter((id) => id !== serviceId)
        : [...prevServices, serviceId]
    );
  };
  // const [rooms, setRooms] = useState([
  //   { id: 'D01', name: 'Cozy Single', category: 'single', basePrice: 50 },
  //   { id: 'D02', name: 'Spacious Double', category: 'double', basePrice: 80 },
  //   {
  //     id: 'D03',
  //     name: 'Meeting Room (7)',
  //     category: 'meeting7',
  //     basePrice: 120,
  //   },
  //   {
  //     id: 'D04',
  //     name: 'Meeting Room (10)',
  //     category: 'meeting10',
  //     basePrice: 150,
  //   },
  // ]);
  // const { roomId } = useParams<{ roomId: string }>();
  // const room = rooms.find((room) => room.id === roomId);
  // const similarRooms = similarRooms1.filter((room) => room.id !== roomId);

  // if (!room) {
  //   return <div>Phòng không tồn tại</div>;
  // }

  // console.log(room);
  const roomPrice = roomDetail?.price;
  const [totals, setTotals] = useState<number>(roomPrice!);

  const calculateTotalPrice = () => {
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const selectedService = services.find(
        (service) => service.serviceId === serviceId
      );
      // Giả sử `quantities` là một đối tượng quản lý số lượng cho mỗi service theo id
      const quantity = quantities[serviceId] || 0; // Lấy số lượng từ state, mặc định là 1

      return (
        total +
        toInteger(selectedTimeSlot.length / 13) * roomDetail!.price +
        (selectedService ? selectedService.price * quantity : 0)
      );
    }, 0);

    setTotals(roomPrice! + servicesTotal);
    return roomPrice! + servicesTotal;
  };

  const [selectedImage, setSelectedImage] = useState<number>(0);
  // React.useEffect(() => {
  //   if (roomDetail?.roomImg && roomDetail.roomImg.length > 0) {
  //     setSelectedImage(roomDetail.roomImg[0]);
  //   }
  // }, [roomDetail]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const amenities = [
    { icon: <FaWifi />, name: 'Free Wi-Fi' },
    { icon: <FaParking />, name: 'Parking' },
    { icon: <FaSwimmingPool />, name: 'Pool' },
    { icon: <FaCoffee />, name: 'Coffee Machine' },
    { icon: <MdAir />, name: 'Air Conditioning' },
    { icon: <MdTv />, name: 'Smart TV' },
  ];
  const [selected, setSelected] = React.useState('photos');

  return (
    <div className="mx-72 h-full p-8 flex-row items-center justify-center">
      <div className="bg-white overflow-hidden w-full h-full flex">
        <div className="md:w-1/2">
          <div className="relative overflow-hidden rounded-lg shadow-lg my-8">
            {roomDetail?.roomImg && roomDetail.roomImg.length > 0 && (
              <img
                src={roomDetail.roomImg[selectedImage]} // Safely accessing the selected image
                alt={`Room Image ${selectedImage + 1}`}
                className="w-full h-[400px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            )}
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {roomDetail?.roomImg && roomDetail.roomImg.length > 0 ? (
              roomDetail.roomImg.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-md ${
                    index === selectedImage ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))
            ) : (
              <p>No images available</p> // Fallback if roomImg is undefined or empty
            )}
          </div>
        </div>
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">{roomDetail?.roomName}</h2>
          <div className="mb-6">
            <div className="relative">
              <div className="w-full flex flex-row flex-wrap gap-4">
                <Select
                  value={selectedBase}
                  onChange={handleBaseChange}
                  key="default"
                  color="default"
                  label="Cơ sở"
                  placeholder="Chọn cơ sở..."
                  className="w-full rounded-md appearance-none"
                >
                  {Buildings && Buildings.length > 0 ? (
                    Buildings.map((building, index) => (
                      <SelectItem key={index} value={building.buildingName}>
                        {building.buildingName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-buildings">
                      No buildings available
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <DateRangePicker
              label="Ngày đặt"
              minValue={parseDate(format(selectedDate, 'yyyy-MM-dd'))}
              // defaultValue={{
              //   start: parseDate('2024-04-01'),
              //   end: parseDate('2024-04-08'),
              // }}
              className="w-full"
            />

            {/* <DatePicker
              onChange={handleDateChange}
              value={parseDate(format(selectedDate, 'yyyy-MM-dd'))}
              label="Ngày đặt"
              className="w-full"
            /> */}
          </div>
          <div className="mb-6">
            <div className="w-full flex flex-row flex-wrap gap-4">
              <Select
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                key="default"
                color="default"
                label="Thời gian"
                placeholder="Chọn thời gian..."
                selectionMode="multiple"
                className="w-full rounded-md appearance-none"
              >
                {timeSlots.map((slot) => (
                  <SelectItem key={slot}>{slot}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xl font-semibold">Giá ban đầu: ${roomPrice}</p>
          </div>

          <Button
            className="bg-violet-300 shadow-lg font-bold text-black px-4 py-2 rounded-md hover:bg-violet-500 hover:text-blackA12 transition duration-300 flex items-center mb-6"
            onPress={onOpen}
          >
            <FaPlus className="mr-2" /> Thêm dịch vụ
          </Button>
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
                  <ModalHeader className="flex flex-col gap-1">
                    Dịch vụ
                  </ModalHeader>
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
                                <div
                                  key={service.serviceId}
                                  className="flex-col"
                                >
                                  <label htmlFor={service.serviceId.toString()}>
                                    <div
                                      key={service.serviceId}
                                      className="border rounded-lg p-4 flex items-center"
                                    >
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
                                      {
                                        <Input
                                          variant="underlined"
                                          className="h-12 w-20 ml-auto"
                                          min={1}
                                          type="number"
                                          label="Số lượng"
                                          placeholder="0"
                                          value={
                                            '' + quantities[service.serviceId]
                                          } // Số lượng tương ứng với từng món
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              service.serviceId.toString(),
                                              Number(e.target.value)
                                            )
                                          }
                                          labelPlacement="inside"
                                          startContent={
                                            <div className="pointer-events-none flex items-center"></div>
                                          }
                                        />
                                      }
                                      <input
                                        id={service.serviceId.toString()}
                                        type="checkbox"
                                        checked={selectedServices.includes(
                                          service.serviceId
                                        )}
                                        onChange={() =>
                                          handleServiceSelection(
                                            service.serviceId
                                          )
                                        }
                                        className="ml-auto size-5"
                                      />
                                    </div>
                                  </label>
                                  <div></div>
                                </div>
                              ))}
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="music" title="Đồ ăn">
                        <Card>
                          <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
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
                </>
              )}
            </ModalContent>
          </Modal>

          <div className="mb-6">
            <p className="text-2xl font-bold">Tổng đơn: ${totals}</p>
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="policy"
              checked={policyAgreed}
              onChange={() => setPolicyAgreed(!policyAgreed)}
              className="mr-2 rounded-sm"
            />
            <label htmlFor="policy" className="text-sm text-gray-700">
              Tôi đồng ý với{' '}
              <button
                onClick={togglePolicyModal}
                className="text-blue-500 underline"
              >
                Chính sách đặt phòng
              </button>
            </label>
          </div>
          {showPolicyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
                <h3 className="text-2xl font-bold mb-4">
                  Chính Sách Dịch Vụ Đặt Phòng Làm Việc
                </h3>
                <ul>
                  <li>
                    <strong>Điều kiện tham gia:</strong>
                    <ul>
                      <li>
                        Người dùng phải từ 13 tuổi trở lên để sử dụng dịch vụ
                        đặt phòng.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Quy định về giá phòng:</strong>
                    <ul>
                      <li>
                        Giá phòng được tính dựa trên giờ thuê, loại phòng và
                        ngày đặt.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Tính năng chính:</strong>
                    <ul>
                      <li>Đặt phòng họp trực tuyến thông qua ứng dụng.</li>
                      <li>Hỗ trợ thanh toán qua bên thứ ba liên kết.</li>
                    </ul>
                  </li>

                  <li>
                    <strong>Quy trình giao dịch:</strong>
                    <ul>
                      <li>Đăng ký tài khoản và đăng nhập.</li>
                      <li>Tham khảo thông tin và chọn phòng phù hợp.</li>
                      <li>Thực hiện đặt phòng qua hệ thống.</li>
                      <li>
                        Nhân viên xác nhận lịch đặt và thông báo tới khách hàng.
                      </li>
                      <li>
                        Khách hàng xác nhận lịch và thanh toán trực tuyến.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Quy định về đặt cọc và thanh toán:</strong>
                    <ul>
                      <li>
                        Khách hàng phải đặt cọc 30% trên tổng hóa đơn khi đặt
                        phòng.
                      </li>
                      <li>Sau khi sử dụng dịch vụ, thanh toán phần còn lại.</li>
                      <li>
                        Chỉ chấp nhận thanh toán qua hình thức thanh toán trực
                        tuyến.
                      </li>
                      <li>
                        Đối với hóa đơn trên 5 triệu đồng, hệ thống sẽ yêu cầu
                        xác nhận trước khi thanh toán.
                      </li>
                      <li>
                        Sau khi đặt cọc, không hoàn tiền nếu hủy đặt phòng.
                      </li>
                      <li>
                        Thời gian đặt phòng tối thiểu là 1 slot (1 tiếng).
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Các điều kiện khác:</strong>
                    <ul>
                      <li>
                        Khách hàng cần tuân thủ các quy định và điều kiện được
                        đưa ra từ hệ thống.
                      </li>
                    </ul>
                  </li>
                </ul>
                <button
                  onClick={togglePolicyModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-5"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button
            className={`w-full bg-blackA10 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blackA12 hover:scale-105 transition duration-300 ${
              (!policyAgreed || !selectedBase || !selectedTimeSlot) &&
              'opacity-50 cursor-not-allowed text-center'
            }`}
            disabled={!policyAgreed}
          >
            <FaCheck className="inline-block mr-2 mb-1" /> Xác nhận
          </button>
        </div>
      </div>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className="text-yellow-400" />
        ))}
        <span className="ml-2">(4.8/5 based on 120 reviews)</span>
      </div>
      <p className="text-gray-600 mb-4">
        Experience luxury and comfort in our spacious king room. Perfect for
        couples or business travelers seeking a premium stay.
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Amenities</h2>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2">{amenity.icon}</span>
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Similar Rooms</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
        <div className="w-full h-[500px] max-h-[500px]">
          {/* {roomType && roomType.length > 0 ? (
            roomType.map((room, index) =>
              room?.roomImg && room.roomImg.length > 0 ? (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src={room.roomImg[0]}
                    alt={room.roomName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{room.roomName}</h3>
                    <p className="text-gray-600">
                      Starting from {room.price}$/night
                    </p>
                  </div>
                </div>
              ) : (
                <div key={index} className="p-4 text-center">
                  <p>No image available</p>
                </div>
              )
            )
          ) : (
            <div className="p-4 text-center">
              <p>No rooms available</p>
            </div>
          )} */}
          {roomType && roomType.length > 0 ? (
            <RoomTypeSwiper roomType={roomType} />
          ) : (
            <div className="p-4 text-center">
              <p></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
