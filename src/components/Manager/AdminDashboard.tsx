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
import RoomList from './TestRoomList';

const dataStats = [
  {
    title: 'Tổng số lượt đặt chỗ hôm nay',
    total: '150',
    rate: '15%',
    levelUp: true,
    icon: <FaCalendarCheck />,
  },
  {
    title: 'Tổng số lượt đặt chỗ trong tuần',
    total: '850',
    rate: '10%',
    levelUp: true,
    icon: <FaCalendarCheck />,
  },
  {
    title: 'Tổng số lượt đặt chỗ trong tháng',
    total: '3000',
    rate: '5%',
    levelDown: true,
    icon: <FaCalendarCheck />,
  },
  {
    title: 'Tổng số không gian làm việc',
    total: '120',
    icon: <FaBriefcase />,
  },
];

export const AdminDashboard: React.FC = () => {
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
        </div>
        <div className="mt-4 grid grid-cols-10 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartRoomBooking />
          <ChartOrder />
          {/* <ChartTwo /> */}
          {/* <ChartThree /> */}
          <div className="col-span-12 xl:col-span-8">
            {/* <TableOne /> */}
            {/* <RoomList /> */}
          </div>
        </div>
      </div>
    </>
  );
};
