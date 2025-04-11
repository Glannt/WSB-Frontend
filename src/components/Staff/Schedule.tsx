import React from 'react';
// import '../../node_modules/@syncfusion/ej2/material.css';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  EventSettingsModel,
  ViewDirective,
  ViewsDirective,
} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { L10n, registerLicense, setCulture } from '@syncfusion/ej2-base';
import { getWorkShift } from '@/service/staff.api';
import { useQuery } from '@tanstack/react-query';
import { WorkShift } from '@/types/staff.type';
import * as EJ2_LOCALE from '@/vi.json';
const Schedule = () => {
  const getWorkShiftApi = async () => {
    const response = await getWorkShift();
    return response.data.data;
  };

  const {
    data: workShift,
    isLoading,
    refetch,
  } = useQuery<WorkShift>({
    queryKey: ['workShift'],
    queryFn: getWorkShiftApi,
  });

  const days = {
    MONDAY: 1, // Thứ 2
    TUESDAY: 2, // Thứ 3
    WEDNESDAY: 3, // Thứ 4
    THURSDAY: 4, // Thứ 5
    FRIDAY: 5, // Thứ 6
    SATURDAY: 6, // Thứ 7
    SUNDAY: 0, // Chủ nhật
  };

  const getDayIndex = (day: keyof typeof days) => {
    return days[day];
  };

  const getDateByDay = (dayOfWeek: number, time: string) => {
    const currentDate = new Date(); // Ngày hiện tại
    const currentDay = currentDate.getDay(); // Thứ trong tuần hiện tại
    const diff = dayOfWeek - currentDay; // Tính khoảng cách ngày
    const resultDate = new Date(currentDate);
    resultDate.setDate(currentDate.getDate() + diff); // Cộng khoảng cách
    const [hour, minute] = time.split(':').map(Number); // Tách giờ và phút
    resultDate.setHours(hour, minute, 0); // Đặt giờ
    return resultDate;
  };

  const workDays = workShift?.workDays.split(',') as (keyof typeof days)[]; // Lấy ngày làm việc từ API

  const scheduleData: EventSettingsModel['dataSource'] = workDays?.map(
    (day, index) => ({
      Id: index + 1,
      Subject: `Ca làm việc ${day}`,
      StartTime: workShift?.startTime
        ? getDateByDay(getDayIndex(day), workShift.startTime)
        : new Date(),
      EndTime: workShift?.endTime
        ? getDateByDay(getDayIndex(day), workShift.endTime)
        : new Date(),
    })
  );

  L10n.load({ vi: EJ2_LOCALE.vi });
  // setCulture('vi');

  registerLicense(
    'Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1JpR2NGfV5ycEVHYFZQRHxdR00SNHVRdkdnWH9ccXVVRGFfUEF2W0o='
  );

  const remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  const timeScale = { enable: true, interval: 60 * 2, slotCount: 2 };

  return (
    <>
      <ScheduleComponent
        // locale="vi"
        startHour="06:00"
        endHour="24:00"
        timeScale={timeScale}
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date()}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </>
  );
};

export default Schedule;
