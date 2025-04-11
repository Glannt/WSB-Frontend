import ChartOne from '../DashboardComponent/Charts/ChartOne';
import ChartOrder from '../DashboardComponent/Charts/ChartOrder';
import ChartRoomBooking from '../DashboardComponent/Charts/ChartRoomBooking';

import CardDataStats from './CardDataStats';
import {
  FaCalendarCheck,
  FaUserClock,
  FaBriefcase,
  FaTimesCircle,
} from 'react-icons/fa';
import React from 'react';
import { Steam } from '../DashboardComponent/Charts/steam';
import { MdMeetingRoom } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import {
  BookingAnalyst,
  RoomTypeAnalyst,
  TotalBooking,
} from '@/types/dashboard.type';
import { useParams } from 'react-router';
import {
  getBookingAnalysisByMonth,
  getRoomTypeAnalysisByMonth,
  getTotalBookingInDate,
  getTotalBookingInMonth,
  getTotalBookingInWeek,
  getTotalSpace,
} from '@/service/owner.api';

// const Chart = React.lazy(() =>
//   import('@/components/DashboardComponent/Charts/steam').then((mod) => ({
//     default: mod.Steam,
//   }))
// );

export const OwnerDashBoard: React.FC = () => {
  const { buildingId } = useParams<{ buildingId: string }>();
  console.log('buildingId', buildingId);

  const getTotalBookingInWeekApi = async () => {
    const response = await getTotalBookingInWeek(buildingId as string);
    console.log(response.data.data);

    return response.data.data;
  };
  const { data: bookingInWeek } = useQuery<TotalBooking>({
    queryKey: ['bookingInWeek'],
    queryFn: getTotalBookingInWeekApi,
  });

  const getTotalBookingInMonthApi = async () => {
    const response = await getTotalBookingInMonth(buildingId as string);
    console.log(response.data.data);

    return response.data.data;
  };
  const { data: bookingInMonth } = useQuery<TotalBooking>({
    queryKey: ['bookingInMonth'],
    queryFn: getTotalBookingInMonthApi,
  });

  const getTotalBookingInDateApi = async () => {
    const response = await getTotalBookingInDate(buildingId as string);

    return response.data.data;
  };
  const { data: bookingInDate } = useQuery<TotalBooking>({
    queryKey: ['bookingInDate'],
    queryFn: getTotalBookingInDateApi,
  });
  console.log(bookingInDate);

  const getTotalTotalSpaceApi = async () => {
    const response = await getTotalSpace(buildingId as string);
    console.log(response.data.data);

    return response.data.data;
  };
  const { data: totalSpace } = useQuery<TotalBooking>({
    queryKey: ['totalSpace'],
    queryFn: getTotalTotalSpaceApi,
  });

  const getRoomTypeAnalysisByMonthApi = async () => {
    const response = await getRoomTypeAnalysisByMonth(buildingId as string);
    if (!response || !response.data || !response.data.data) {
      console.error('Invalid response structure:', response);
      return {}; // Return an empty object or a fallback value
    }

    return response.data.data.roomTypeAnalyst;
  };
  const { data: RoomTypeAnalysisByMonth } = useQuery<RoomTypeAnalyst>({
    queryKey: ['RoomTypeAnalysisByMonth'],
    queryFn: getRoomTypeAnalysisByMonthApi,
  });

  const getBookingAnalysisByMonthApi = async () => {
    const response = await getBookingAnalysisByMonth(buildingId as string);
    if (!response || !response.data || !response.data.data) {
      console.error('Invalid response structure:', response);
      return {}; // Return an empty object or a fallback value
    }

    return response.data.data.bookingAnalyst;
  };
  const { data: BookingAnalysisByMonth } = useQuery<BookingAnalyst>({
    queryKey: ['BookingAnalysisByMonth'],
    queryFn: getBookingAnalysisByMonthApi,
  });
  console.log('RoomTypeAnalysisByMonth', BookingAnalysisByMonth);

  const dataStats = [
    {
      title: 'Tổng số lượt đặt chỗ hôm nay',

      total: String(bookingInDate?.totalBookingSlot) || '0',

      rate: '15%',
      levelUp: true,
      icon: <MdMeetingRoom className="text-2xl" />,
    },
    {
      title: 'Tổng số lượt đặt chỗ trong tuần',
      total: bookingInWeek?.totalBookingSlot?.toString() || '0',
      rate: '10%',
      levelUp: true,
      icon: <FaCalendarCheck />,
    },
    {
      title: 'Tổng số lượt đặt chỗ trong tháng',
      total: bookingInMonth?.totalBookingSlot?.toString() || '0',
      rate: '5%',
      levelDown: true,
      icon: <FaCalendarCheck />,
    },
    {
      title: 'Tổng số không gian làm việc',
      total: totalSpace?.totalSpace?.toString() || '0',
      icon: <FaBriefcase />,
    },
  ];
  return (
    <>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {dataStats.map((data, index) => (
            <CardDataStats
              key={index}
              title={data.title}
              total={data.total}
              rate={data.rate}
              levelUp={data.levelUp}
              levelDown={data.levelDown}
            >
              {data.icon}
            </CardDataStats>
          ))}
          {/* {bookingInDate &&
            Object.entries(bookingInDate).map(([key, total], index) => (
              <CardDataStats
                key={index}
                title={key}
                total={total.toString()}
                rate={'0'} // Placeholder or calculated rate
                levelUp={false} // Placeholder or calculated level
                levelDown={false} // Placeholder or calculated level
              >
                <FaBriefcase />
              </CardDataStats>
            ))} */}
        </div>
        <div className="mt-4 grid grid-cols-10 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartRoomBooking roomTypeAnalysis={RoomTypeAnalysisByMonth} />
          <ChartOrder bookingAnalysis={BookingAnalysisByMonth} />
          {/* <ChartTwo /> */}
          {/* <ChartThree /> */}
          <div className="col-span-12 xl:col-span-8">
            {/* <TableOne /> */}
            {/* <RoomList /> */}
          </div>
        </div>
        <div className="h-full flex flex-col gap-2 mt-5">
          <h3 className="text-2xl font-semibold">Statistics</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Steam />
          </div>
        </div>
      </div>
    </>
  );
};
