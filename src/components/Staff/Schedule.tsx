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
import { registerLicense } from '@syncfusion/ej2-base';
const Schedule = () => {
  const localData: EventSettingsModel = {
    dataSource: [
      {
        EndTime: new Date(2019, 0, 11, 6, 30),
        StartTime: new Date(2019, 0, 11, 4, 0),
      },
    ],
  };
  registerLicense(
    'Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1JpR2NGfV5ycEVHYFZQRHxdR00SNHVRdkdnWH9ccXVVRGFfUEF2W0o='
  );
  const remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  const timeScale = { enable: true, interval: 60 * 4, slotCount: 4 };
  return (
    <>
      <ScheduleComponent
        startHour="7:00"
        endHour="23:00"
        timeScale={timeScale}
        currentView="Week"
        // eventSettings={{ dataSource: remoteData }}
        selectedDate={new Date(2019, 0, 11, 4, 0)}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <ViewDirective option="Week" />
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </>
  );
};

export default Schedule;
