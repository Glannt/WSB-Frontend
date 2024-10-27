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
import { useNavigate, useParams } from 'react-router-dom';
import { parseDate, CalendarDate } from '@internationalized/date';
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  DateRangePicker,
  DateValue,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeValue,
  Select,
  SelectItem,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import { toInteger } from 'lodash';
import {
  createBooking,
  getAllBuiding,
  getDetailRoom,
  getService,
  getSimilarType,
  getWalletByUserId,
} from '@/service/customer.api';
import { ListRooms } from '@/types/roomOverview';
import { useMutation, useQuery } from '@tanstack/react-query';
import { buildingCustomer } from '@/types/building.type';
import RoomTypeSwiper from './RoomTypeSlider';
import { Services } from '@/types/service.type';
import {
  createMultiBookingSchema,
  SchemacreateMultiBooking,
} from '@/utils/rules';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Building, Building2Icon } from 'lucide-react';
import { PolicyBooking } from '../Modal/Customer/PolicyBooking';
import ServiceModal from '../Modal/Customer/ServiceModal';
import { ConfirmBooking } from '../Modal/Customer/ConfirmBooking';
import { useCustomer } from '@/context/customer.context';
import path from '@/constants/path';
import { NotEnoughMoneyInWallet } from '../Modal/Customer/NotEnoughMoneyWallet';
import { getBookeddSlot, getBookedSlot } from '@/service/room.api';
import {
  BookedSlots,
  CustomerOrderBooking,
  SlotBooking,
} from '@/types/bookings';
import { getProfileFromLS } from '@/utils/auth';
import { Wallet } from '@/types/customer.type';
interface create {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const BookingRoomDetailMultiple = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSelectedDate, setIsSelectedDate] = useState<boolean>(false);
  const [isSelectedBuilding, setIsSelectedBuilding] = useState<boolean>(false);
  const [isConfirmBooking, setIsConfirmBooking] = useState<boolean>(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);
  const [selectedBase, setSelectedBase] = useState<string>('');
  const { roomId, roomBuilding } = useParams<{
    roomId: string;
    roomBuilding: string;
  }>();
  const [dateCheckIn, setDateCheckIn] = useState<string>('');
  const [dateCheckOut, setDateCheckOut] = useState<string>('');
  const [buildingsMap, setBuildingsMap] = useState<Record<string, string>>({});
  const { customer, refetch } = useCustomer();
  const [isNotEnoughMoney, setIsNotEnoughMoney] = useState<boolean>(false);
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const navigate = useNavigate();

  const confirmBooking = () => {
    setIsConfirmBooking(!isConfirmBooking);
  };
  const profile = getProfileFromLS();
  const getWalletByUserIdApi = async () => {
    const response = await getWalletByUserId(profile.userId);
    return response.data.data;
  };

  const { data: wallet } = useQuery<Wallet>({
    queryKey: ['wallet'],
    queryFn: getWalletByUserIdApi,
  });

  const toggleConfirmBooking = () => {
    if (wallet?.amount === undefined) {
      navigate(path.home);
      throw new Error('Bạn mất định dạng');
    }
    const totalBookingMoney = calculateTotalPrice();
    if (wallet?.amount < totalBookingMoney) {
      setIsNotEnoughMoney(!isNotEnoughMoney);
    } else {
      setIsConfirmBooking(!isConfirmBooking);
    }
  };

  const getAllBuidingApi = async () => {
    const response = await getAllBuiding();
    return response.data.data;
  };

  const { data: buildings, isLoading: isLoadingBuildings } = useQuery<
    buildingCustomer[]
  >({
    queryKey: ['buildings'],
    queryFn: getAllBuidingApi,
  });

  const buildingOptions =
    buildings?.map((building) => ({
      key: building.buildingId,
      label: building.buildingName,
    })) || [];

  const selectBuilding = buildingOptions.filter(
    (building) => building.label === roomBuilding
  );
  // console.log('selectBuilding', selectBuilding);

  const selectedBuildingKey =
    selectBuilding.length > 0 ? selectBuilding[0].key : null;
  const getRoomDetailApi = async () => {
    if (roomId === undefined) {
      return null;
    }
    const response = await getDetailRoom(roomId);
    return response.data.data;
  };

  const { data: roomDetail, isLoading } = useQuery<ListRooms>({
    queryKey: ['roomDetail', roomId],
    queryFn: getRoomDetailApi,
    enabled: !!roomId,
  });
  // const getAllBuildingApi = async () => {
  //   const response = await getAllBuiding();
  //   return response.data.data;
  // };
  // const {
  //   data: buildings,
  //   isLoading: isLoadingBuildings,
  //   refetch: refetchBuildings,
  // } = useQuery<buildingCustomer[]>({
  //   queryKey: ['buildings'],
  //   queryFn: getAllBuildingApi,
  // });
  const getRoomTypeApi = async () => {
    if (roomDetail?.roomType === undefined) {
      return null;
    }
    const response = await getSimilarType(roomDetail?.roomType);
    return response.data.data;
  };
  const {
    data: roomType,
    isLoading: isLoadingRoomType,
    refetch: refetchRoomType,
  } = useQuery<ListRooms[]>({
    queryKey: ['roomType', roomDetail?.roomType],
    queryFn: getRoomTypeApi,
    // enabled: !!roomId,
  });

  const getServiceApi = async () => {
    const response = await getService();
    return response.data.data;
  };

  const {
    data: services = [],
    isLoading: isLoadingServices,
    refetch: refetchServices,
  } = useQuery<Services[]>({
    queryKey: ['services'],
    queryFn: getServiceApi,
  });

  const timeSlots = [
    { id: 1, value: '07:00 - 10:00' },
    { id: 2, value: '11:00 - 14:00' },
    { id: 3, value: '15:00 - 18:00' },
    { id: 4, value: '19:00 - 22:00' },
  ];

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });
  const getBookedSlotApi = async () => {
    if (roomId === undefined) {
      return null;
    }
    const response = await getBookeddSlot(
      selectedBuildingKey || '',
      roomId,
      dateCheckIn,
      dateCheckOut
    );
    return response.data.data.bookedSlots;
  };

  const {
    data: slots,
    isLoading: isLoadingSlot,
    refetch: refetchSlots,
  } = useQuery<BookedSlots>({
    queryKey: ['slots', selectedBuildingKey, roomId, dateCheckIn, dateCheckOut],
    queryFn: getBookedSlotApi, // Pass the function reference, not the invocation
    enabled: !!roomId && !!dateCheckIn && !!dateCheckOut,
  });
  let largestSlotsArray: number[] = [];
  if (slots) {
    const slotKeys = Object.keys(slots); // Get all the keys (dates)

    let maxSlotsLength = 0;

    // Iterate over the keys and find the largest slots array
    slotKeys.forEach((date) => {
      const currentSlots = slots[date]; // Get the array of slots for the current date
      if (currentSlots.length > maxSlotsLength) {
        maxSlotsLength = currentSlots.length; // Update the maximum length
        largestSlotsArray = currentSlots; // Store the largest slots array
      }
    });
  }

  const initialQuantities = React.useMemo(() => {
    let initQuantities: { [key: string]: number } = {};
    selectedServices.forEach((serviceId) => {
      initQuantities[serviceId] = quantities[serviceId] || 0; // Default to 0 if no quantity exists
    });
    console.log('initQuantities', initQuantities);
    console.log('seletedService', selectedServices);

    return initQuantities;
  }, [selectedServices, quantities]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    reset,
    control,
  } = useForm<SchemacreateMultiBooking>({
    resolver: yupResolver(createMultiBookingSchema),
    defaultValues: {
      buildingId: selectedBuildingKey || '',
      roomId: roomId,
      checkinDate: '',
      checkoutDate: '',
      slots: [],
      items: {
        quantities: initialQuantities || {}, // Đặt initialQuantities vào defaultValues
      },
    },
  });

  const calculateTotalPrice = () => {
    const selectedSlots = getValues().slots || [];
    const { checkinDate, checkoutDate } = getValues();
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const oneDay = 24 * 60 * 60 * 1000; // Hours*Minutes*Seconds*Milliseconds
    const numberOfDays =
      Math.round(Math.abs((checkout.getTime() - checkin.getTime()) / oneDay)) +
        1 || 1;
    // Calculate room price based on the number of slots
    const roomPriceTotal =
      selectedSlots.length * (roomDetail?.price || 0) * numberOfDays;
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const selectedService = services.find(
        (service) => service.serviceId === serviceId
      );

      const quantity = quantities[serviceId] || 0;
      return (
        total +
        (selectedService ? selectedService.price * numberOfDays * quantity : 0)
      );
    }, 0);
    const totalPrice = roomPriceTotal + servicesTotal;
    setTotals(totalPrice);
    return totalPrice;
  };
  if (customer?.wallet.amount === undefined) {
    navigate(path.home);
    throw new Error('Bạn mất định dạng');
  } else {
  }
  const [selectedBooking, setSelectedBooking] =
    React.useState<CustomerOrderBooking | null>(null);
  // const CreateBookingMutation = useMutation({
  //   mutationFn: (formData: FormData) => createBooking(formData),
  // });

  // const handleCreateBooking = (
  //   data: SchemacreateMultiBooking,
  //   refetch: () => void
  // ) => {
  //   const formData = new FormData();
  //   if (roomId === undefined) {
  //     return Promise.reject(new Error('Room ID is undefined'));
  //   }
  //   formData.append('buildingId', data.buildingId);

  //   console.log('selectedBuildingKey nè', selectedBuildingKey);

  //   console.log('buildingId nè', data.buildingId);

  //   formData.append('roomId', roomId);
  //   formData.append('checkinDate', data.checkinDate);
  //   formData.append('checkoutDate', data.checkoutDate);
  //   // Append slots array (handle as multiple values)
  //   if (data.slots && data.slots.length > 0) {
  //     data.slots.forEach((slot, index) => {
  //       formData.append(`slots`, slot.toString());
  //     });
  //   }
  //   Object.entries(initialQuantities).forEach(([serviceId, quantity]) => {
  //     formData.append(`items[${serviceId}]`, quantity.toString()); // This creates items[serviceId]=quantity
  //   });

  //   CreateBookingMutation.mutate(formData, {
  //     onSuccess: (response) => {
  //       console.log('Booking created successfully');

  //       refetch();
  //       refetchRoomType();
  //       refetchServices();
  //       refetchSlots();
  //     },
  //     onError: (error) => {
  //       console.error('Error creating booking:', error);
  //     },
  //   });
  // };

  const data = getValues(); // Use getValues() to get the form data

  const details = {
    ...data,
    roomId: roomId,
  };
  console.log('details', details);
  const handleChangeDatePicker = (range: RangeValue<DateValue>) => {
    const start = range.start;
    const end = range.end;
    setValue('checkinDate', start.toString()); // Setting check-in date
    setValue('checkoutDate', end.toString()); // Setting check-out date
    setDateCheckIn(start.toString());
    setDateCheckOut(end.toString());
    if (range) {
      setIsDateSelected(true);
    }
  };
  // const onSubmit = (data: SchemacreateMultiBooking) => {
  //   const totalBookingMoney = calculateTotalPrice();
  //   if (
  //     customer.wallet.amount === undefined ||
  //     customer.wallet.amount < totalBookingMoney
  //   ) {
  //     setIsNotEnoughMoney(true);
  //     // return;
  //   } else {
  //     handleCreateBooking(data, refetch);
  //   }
  // };
  setValue('buildingId', selectedBuildingKey || '');

  const handleFieldChange = (
    field: keyof SchemacreateMultiBooking,
    value: any
  ) => {
    setValue(field, value);
  };
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity, // Cập nhật số lượng của món có id tương ứng
    }));
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
  const roomPrice = roomDetail?.price;
  const [totals, setTotals] = useState<number>(roomPrice!);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const amenities = [
    { icon: <FaWifi />, name: 'Wi-Fi miễn phí' },
    { icon: <FaParking />, name: 'Bãi đỗ xe' },
    { icon: <FaSwimmingPool />, name: 'Hồ bơi' },
    { icon: <FaCoffee />, name: 'Máy pha cà phê' },
    { icon: <MdAir />, name: 'Điều hòa không khí' },
    { icon: <MdTv />, name: 'TV thông minh' },
  ];
  const [selected, setSelected] = React.useState('photos');

  const roomPriceFormatted = new Intl.NumberFormat('vi-VN').format(
    Number(roomPrice)
  );

  const totalsFormatted = new Intl.NumberFormat('vi-VN').format(Number(totals));

  const handleSelectTimeSlot = (slot: (typeof timeSlots)[0]) => {
    if (dateCheckIn === format(new Date(), 'yyyy-MM-dd')) {
      if (
        format(new Date(), 'HH') >= slot.value.split(' - ')[0].split(':')[0]
      ) {
        return true;
      }
    }
  };
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
          {/* Form */}
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <div>
            <div className="mb-6">
              <div className="relative">
                <div className="w-full flex flex-row flex-wrap gap-4">
                  <Input
                    {...register('buildingId')}
                    size="lg"
                    label="Cơ sở"
                    classNames={{
                      label: 'text-lg dark:text-white/90',
                      input: 'border-0 focus:outline-none focus:border-none',
                      clearButton: 'pb-4',
                    }}
                    isReadOnly
                    value={roomBuilding}
                    color="primary"
                    // onChange={() => handleFieldChange('buildingId', selectedBuildingKey)}
                    className="text-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <DateRangePicker
                size="lg"
                label="Ngày đặt"
                classNames={{
                  label: 'text-md dark:text-white/90',
                  input: 'border-0 focus:outline-none focus:border-none',
                }}
                color="primary"
                // isDisabled={getValues().buildingId ? false : true}
                minValue={parseDate(format(selectedDate, 'yyyy-MM-dd'))}
                onChange={(range) => {
                  handleChangeDatePicker(range);
                  setIsSelectedDate(true);
                  calculateTotalPrice();
                }}
                className="w-full"
                errorMessage={
                  errors.checkinDate?.message ? '' : 'lỗi pick date'
                }
              />
            </div>
            <div className="mb-6">
              <div className="w-full flex flex-row flex-wrap gap-4">
                <Controller
                  control={control}
                  name="slots"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isDisabled={!isDateSelected}
                      value={selectedTimeSlot}
                      onChange={handleTimeSlotChange}
                      onSelectionChange={(keys) => {
                        // const newTimeSlot = Array.from(keys);
                        // handleFieldChange('slots', newTimeSlot.map(Number));
                        const newTimeSlot = Array.from(keys).map((key) =>
                          Number(key)
                        );
                        handleFieldChange('slots', newTimeSlot); // Send the array of numbers
                        calculateTotalPrice();
                      }}
                      errorMessage={
                        errors.slots?.message ? '' : 'Lỗi select slot'
                      }
                      isInvalid={errors.slots?.message ? true : false}
                      key="default"
                      color="primary"
                      label="Thời gian"
                      classNames={{
                        label: 'text-lg dark:text-white/90',
                      }}
                      size="lg"
                      placeholder="Chọn thời gian..."
                      selectionMode="multiple"
                      className="w-full rounded-md appearance-none"
                    >
                      {timeSlots.map((slot) => (
                        <SelectItem
                          isDisabled={
                            largestSlotsArray.includes(slot.id) ||
                            handleSelectTimeSlot(slot)
                          }
                          key={slot.id}
                        >
                          {slot.value}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl font-semibold">
                Giá ban đầu: {roomPriceFormatted} VNĐ
              </p>
            </div>

            <Button
              size="lg"
              className="bg-violet-300 shadow-lg font-bold text-black px-4 py-2 rounded-md hover:bg-violet-500 hover:text-blackA12 transition duration-300 flex items-center mb-6"
              onPress={toggleServiceModal}
            >
              <FaPlus className="mr-2" /> Thêm dịch vụ
            </Button>
            <ServiceModal
              isOpen={showServiceModal}
              onOpenChange={setShowServiceModal}
              services={services}
              quantities={quantities}
              selectedServices={selectedServices}
              handleServiceSelection={handleServiceSelection}
              handleQuantityChange={handleQuantityChange}
              calculateTotalPrice={calculateTotalPrice}
            />

            <div className="mb-6">
              <p className="text-2xl font-bold">

                Tổng đơn:{' '}
                {totalsFormatted === 'NaN'
                  ? roomPriceFormatted
                  : totalsFormatted}{' '}
                VNĐ

              </p>
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="policy"
                checked={policyAgreed}
                onChange={() => setPolicyAgreed(!policyAgreed)}
                className="mr-2 rounded-sm"
              />
              <label
                style={{ fontSize: '1.1rem' }}
                htmlFor="policy"
                className="text-sm text-gray-700"
              >
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
                  <PolicyBooking />
                  <Button
                    variant="shadow"
                    color="success"
                    onClick={togglePolicyModal}
                    className=" text-white px-4 py-2 rounded-md  transition duration-300 mt-5"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
            <button
              // type="submit"
              className={`w-full bg-blackA10 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blackA12 hover:scale-105 transition duration-300 ${
                (!policyAgreed || !isSelectedDate || !selectedTimeSlot) &&
                'opacity-50 cursor-not-allowed text-center'
              }`}
              disabled={!policyAgreed || !isSelectedDate || !selectedTimeSlot}
              onClick={toggleConfirmBooking}
            >
              <FaCheck className="inline-block mr-2 mb-1" /> Đặt phòng
            </button>
          </div>
          {isConfirmBooking && !isNotEnoughMoney && (
            <ConfirmBooking
              totals={totals}
              initialQuantities={initialQuantities}
              details={details}
              showConfirmModal={isConfirmBooking}
              toggleConfirmModal={toggleConfirmBooking}
              // onSubmit={onSubmit}
              setIsNotEnoughMoney={setIsNotEnoughMoney}
              handleSubmit={handleSubmit}
              refetchRoomType={refetchRoomType}
              refetchServices={refetchServices}
              refetchSlots={refetchSlots}
              // selectedBooking={selectedBooking}
            />
          )}
          {isNotEnoughMoney && !isConfirmBooking && (
            <NotEnoughMoneyInWallet
              showConfirmModal={isNotEnoughMoney}
              toggleConfirmModal={toggleConfirmBooking}
            />
          )}
          {/* </form> */}
        </div>
      </div>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className="text-yellow-400" />
        ))}
        <span className="ml-2">(4.8/5 dựa trên 120 đánh giá)</span>
      </div>
      <p className="text-gray-600 mb-4">
        Trải nghiệm sự sang trọng và thoải mái trong phòng king rộng rãi của
        chúng tôi. Hoàn hảo cho các cặp đôi hoặc doanh nhân tìm kiếm một kỳ nghỉ
        cao cấp.
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tiện nghi</h2>
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
        <h2 className="text-2xl font-bold mb-4">Các phòng tương tự</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
        <div className="w-full h-[500px] max-h-[500px]">
          {roomType && roomType.length > 0 ? (
            <RoomTypeSwiper roomType={roomType} />
          ) : (
            <div className="p-4 text-center"></div>
          )}
        </div>
      </div>
    </div>
  );
};
