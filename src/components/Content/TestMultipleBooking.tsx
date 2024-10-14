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
import http from '@/utils/http';
interface create {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Create booking function
// const createBooking = async (data: SchemacreateMultiBooking) => {
//   const { buildingId, roomId, checkinDate, checkoutDate, slots } = data;

//   // Prepare the FormData
//   const params = new FormData();
//   params.append('buildingId', buildingId);
//   params.append('roomId', roomId);
//   params.append('checkinDate', checkinDate);
//   params.append('checkoutDate', checkoutDate);

//   // Append slots array (handle as multiple values)
//   if (slots && slots.length > 0) {
//     slots.forEach((slot) => {
//       params.append('slots', slot.toString());
//     });
//   }

//   try {
//     // Send the FormData as the request body
//     const response = await http.post(
//       `/api/customer/create-multi-booking`,
//       params,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     console.log('Booking created successfully:', response.data);
//     return response.data; // Return the response data if needed
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     throw new Error('Failed to create booking'); // Throw an error to be caught in the calling function
//   }
// };

export const TestBookingRoomDetailMultiple = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedBase, setSelectedBase] = useState<string>('');
  const { roomId } = useParams<{ roomId: string }>();
  const [Buildings, setBuildings] = useState<buildingCustomer[]>([]);
  const [buildingsMap, setBuildingsMap] = useState<Record<string, string>>({});
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
  // useEffect(() => {
  //   if (buildings) {
  //     setBuildings(buildings);
  //   }
  // }, [buildings]);
  useEffect(() => {
    if (buildings && buildings.length > 0) {
      // Assuming buildings have 'id' as key and 'name' as value
      const buildingMap = buildings.reduce(
        (acc, building) => {
          acc[building.buildingId] = building.buildingName; // or another key-value pair from buildingCustomer type
          return acc;
        },
        {} as Record<string, string>
      );

      setBuildingsMap(buildingMap);
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

  const timeSlots = [
    { id: 1, value: '07:00 - 10:00' },
    { id: 2, value: '11:00 - 14:00' },
    { id: 3, value: '15:00 - 18:00' },
    { id: 4, value: '19:00 - 22:00' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    control,
  } = useForm<SchemacreateMultiBooking>({
    resolver: yupResolver(createMultiBookingSchema),
    defaultValues: {
      buildingId: '',
      roomId: roomId,
      checkinDate: '',
      checkoutDate: '',
      slots: [],
    },
  });

  const CreateBookingMutation = useMutation({
    mutationFn: (formData: FormData) => createBooking(formData),
  });

  const handleCreateBooking = (data: SchemacreateMultiBooking) => {
    alert(`handleCreateBooking ${data}`);
    const formData = new FormData();
    if (roomId === undefined) {
      return Promise.reject(new Error('Room ID is undefined'));
    }
    formData.append('buildingId', data.buildingId);
    formData.append('roomId', roomId);
    formData.append('checkinDate', data.checkinDate);
    formData.append('checkoutDate', data.checkoutDate);
    // Append slots array (handle as multiple values)
    if (data.slots && data.slots.length > 0) {
      data.slots.forEach((slot, index) => {
        formData.append(`slots`, slot.toString());
        console.log(slot);
      });
    }
    CreateBookingMutation.mutate(formData, {
      onSuccess: () => {
        alert('Tạo thành công');
        console.log('Booking created successfully');
      },
      onError: (error) => {
        console.error('Error creating booking:', error);
        alert('Lỗi khi tạo booking');
      },
    });
  };
  const handleChangeDatePicker = (range: RangeValue<DateValue>) => {
    const start = range.start;
    const end = range.end;

    setValue('checkinDate', start.toString()); // Setting check-in date
    setValue('checkoutDate', end.toString()); // Setting check-out date
    console.log(getValues());
  };
  // onSubmit function now just calls handleCreateBooking
  // const onSubmit = handleSubmit((data: SchemacreateMultiBooking) => {
  //   handleCreateBooking(data);
  // });
  const onSubmit = (data: SchemacreateMultiBooking) => {
    handleCreateBooking(data);
  };
  const handleFieldChange = (
    field: keyof SchemacreateMultiBooking,
    value: any
  ) => {
    setValue(field, value);
    console.log(getValues());
  };

  const roomPrice = roomDetail?.price;
  const [totals, setTotals] = useState<number>(roomPrice!);

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
          <div className="relative overflow-hidden rounded-lg shadow-lg my-8"></div>
          <div className="flex mt-4 gap-2 overflow-x-auto"></div>
        </div>
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">{roomDetail?.roomName}</h2>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <div className="relative">
                <div className="w-full flex flex-row flex-wrap gap-4">
                  <Select
                    {...register('buildingId')}
                    value={selectedBase}
                    onSelectionChange={(keys) => {
                      const newBuildingId = Array.from(keys).join('');
                      handleFieldChange('buildingId', newBuildingId);
                    }}
                    key="default"
                    color="primary"
                    label="Cơ sở"
                    placeholder="Chọn cơ sở..."
                    className="w-full rounded-md appearance-none"
                    endContent={
                      <div className="pb-3">
                        <Building2Icon />
                      </div>
                    }
                  >
                    {buildingsMap && Object.keys(buildingsMap).length > 0 ? (
                      Object.entries(buildingsMap).map(
                        ([id, buildingName], index) => (
                          <SelectItem key={id} value={buildingName}>
                            {buildingName}
                          </SelectItem>
                        )
                      )
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
                color="primary"
                minValue={parseDate(format(selectedDate, 'yyyy-MM-dd'))}
                onChange={(range) => handleChangeDatePicker(range)}
                className="w-full"
                errorMessage={
                  errors.checkinDate?.message ? '' : 'lỗi pick date'
                }
              />
              {/* <input
                {...register('checkinDate')}
                type="date"
                onChange={(e) => {
                  // Update the form state using setValue
                  // setValue('checkinDate', e.target.value);
                  handleFieldChange('checkinDate', e.target.value.toString());
                }}
              />
              <input
                {...register('checkoutDate')}
                type="date"
                onChange={(e) => {
                  handleFieldChange('checkoutDate', e.target.value.toString());
                }}
              /> */}
              {errors.checkinDate?.message ? <p>Lỗi</p> : <>khong lõi</>}
            </div>
            <div className="mb-6">
              <div className="w-full flex flex-row flex-wrap gap-4">
                <Controller
                  control={control}
                  name="slots"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      // {...register('slots')}
                      value={selectedTimeSlot}
                      //   onChange={handleTimeSlotChange}
                      onSelectionChange={(keys) => {
                        // const newTimeSlot = Array.from(keys);
                        // handleFieldChange('slots', newTimeSlot.map(Number));
                        const newTimeSlot = Array.from(keys).map((key) =>
                          Number(key)
                        );
                        handleFieldChange('slots', newTimeSlot); // Send the array of numbers
                      }}
                      errorMessage={
                        errors.slots?.message ? '' : 'Lỗi select slot'
                      }
                      key="default"
                      color="primary"
                      label="Thời gian"
                      placeholder="Chọn thời gian..."
                      selectionMode="multiple"
                      className="w-full rounded-md appearance-none"
                    >
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.id}>{slot.value}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="mb-6">
              <p className="text-2xl font-bold">Tổng đơn: ${totals}</p>
            </div>

            <div className="mb-6 flex items-center">
              <Button
                type="submit"
                className={`w-full bg-blackA10 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blackA12 hover:scale-105 transition duration-300`}
                // onClick={handleSubmit(onSubmit)}
              >
                <FaCheck className="inline-block mr-2 mb-1" /> Xác nhận
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
