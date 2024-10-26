import {
  Button,
  DatePicker,
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
import { useForm } from 'react-hook-form';
import { parseDate, CalendarDate } from '@internationalized/date';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getCheckBookingByEmail,
  getCheckBookingByPhone,
} from '@/service/staff.api';
import { omit } from 'lodash';
import { TableVerifyBooking } from './TableVerifyBooking';
import { CheckBooking } from '@/types/bookings';

interface VerifyBookingProps {
  refetchOrderBooking: () => void;
}
export const VerifyBooking: React.FC<VerifyBookingProps> = ({
  refetchOrderBooking,
}) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState('phoneNumber');
  const [selectedDate, setSelectedDate] = React.useState(
    parseDate(new Date().toISOString().split('T')[0])
  );
  const onClose = () => {
    setIsOpenModal(false);
  };
  const onOpenModal = () => {
    setIsOpenModal(true);
  };
  //   const handleDateChange = (value: CalendarDate) => {
  //     setSelectedDate(new Date(value.toString()));
  //   };
  const currentDate = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    reset,
  } = useForm({});
  const handleChangeField = (field: any, value: any) => {
    setValue(field, value);
    console.log(getValues());
  };

  React.useEffect(() => {
    console.log('selectedDate', selectedDate);
    const dateWithoutCalendar = omit(
      selectedDate,
      'day',
      'month',
      'year',
      'era'
    ); // Bỏ thuộc tính calendar
    handleChangeField('date', selectedDate);
    console.log('useEffect', getValues().date);
  }, [selectedDate]);
  React.useEffect(() => {
    if (isOpenModal === false) {
      reset();
    }
  }, []);

  const getCheckBookingByEmailApi = async (date: string, email: string) => {
    const response = await getCheckBookingByEmail(date, email);
    console.log('getCheckBooking by Email', response.data.data);
    return response.data.data;
  };
  const {
    data: checkBookingByEmail = [],
    isLoading: isLoadingEmail,
    refetch: checkBookingByEmailRefetch,
  } = useQuery<CheckBooking[]>({
    queryKey: ['checkBookingByEmail', getValues().date, getValues().email],
    queryFn: () =>
      getCheckBookingByEmailApi(getValues().date, getValues().email),
    enabled: !!getValues().email,
  });
  const getCheckBookingByPhoneNumberApi = async (
    date: string,
    phonenumber: string
  ) => {
    const response = await getCheckBookingByPhone(date, phonenumber);
    console.log('getCheckBooking by phone', response.data.data);
    return response.data.data;
  };
  const {
    data: checkBookingByPhone = [],
    isLoading: isLoadingPhone,
    refetch: checkBookingByPhoneRefetch,
  } = useQuery<CheckBooking[]>({
    queryKey: [
      'checkBookingByPhone',
      getValues().date,
      getValues().phonenumber,
    ],
    queryFn: () =>
      getCheckBookingByPhoneNumberApi(
        getValues().date,
        getValues().phonenumber
      ),
    enabled: !!getValues().phonenumber,
  });
  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);
    // The query will automatically run if phonenumber and date are valid
  };
  return (
    <>
      <div className="flex justify-around items-center">
        <Button
          className="p-10 font-bold text-xl bg-green-100"
          onClick={onOpenModal}
        >
          Tìm kiếm theo số điện thoại/email
        </Button>
      </div>
      {isOpenModal && (
        <Modal
          motionProps={{
            variants: {
              enter: {
                scale: 1,
                y: 'var(--slide-enter)',
                opacity: 1,
                // ... (more properties)
              },
              exit: {
                scale: 1.1,
                y: 'var(--slide-exit)',
                opacity: 0,
                // ... (more properties)
              },
            },
          }}
          onClose={onClose}
          hideCloseButton={true}
          isOpen={isOpenModal}
          className="h-auto mx-auto w-full max-w-[1200px]"
          classNames={{
            base: 'm-5',
            header: 'text-2xl',
            body: 'text-xl',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Tìm đơn đặt phòng</ModalHeader>

                <ModalBody className="text-lg">
                  <Tabs
                    aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={(key) => setSelected(key.toString())}
                    classNames={{
                      tabList: 'rounded-lg',
                      tab: 'text-xl',
                    }}
                    variant="underlined"
                  >
                    <Tab
                      key="phoneNumber"
                      title="Tìm theo số điện thoại"
                      //   className="mb-5"
                    >
                      <DatePicker
                        size="lg"
                        color="primary"
                        onChange={(value) => handleChangeField('date', value)}
                        defaultValue={selectedDate}
                        label="Ngày đặt"
                        className="w-full mb-7"
                      />
                      <Input
                        size="lg"
                        color="primary"
                        label="Số điện thoại"
                        onValueChange={(value) =>
                          handleChangeField('phonenumber', value)
                        }
                      />
                    </Tab>
                    <Tab key="email" title="Tìm theo email">
                      <DatePicker
                        size="lg"
                        color="success"
                        onChange={(value) => handleChangeField('date', value)}
                        defaultValue={selectedDate}
                        label="Ngày đặt"
                        className="w-full mb-7"
                      />
                      <Input
                        color="success"
                        size="lg"
                        label="Email"
                        onValueChange={(value) =>
                          handleChangeField('email', value)
                        }
                      />
                    </Tab>
                  </Tabs>
                  <TableVerifyBooking
                    booking={
                      Array.isArray(checkBookingByEmail) &&
                      checkBookingByEmail.length > 0
                        ? checkBookingByEmail
                        : Array.isArray(checkBookingByPhone) &&
                            checkBookingByPhone.length > 0
                          ? checkBookingByPhone
                          : undefined
                    } // Handle case where both are undefined or empty
                    refetch={() => {
                      if (
                        Array.isArray(checkBookingByEmail) &&
                        checkBookingByEmail.length > 0
                      ) {
                        checkBookingByEmailRefetch();
                      } else if (
                        Array.isArray(checkBookingByPhone) &&
                        checkBookingByPhone.length > 0
                      ) {
                        checkBookingByPhoneRefetch();
                      }
                    }}
                    refetchOrderBooking={refetchOrderBooking}
                  />
                </ModalBody>

                <ModalFooter className="flex justify-between">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Button
                      type="submit"
                      className="w-40 font-semibold text-lg p-7"
                      color="primary"
                      // onClick={toggleConfirmModal}
                    >
                      Xác nhận
                    </Button>
                  </form>
                  <Button
                    className="w-40 font-semibold text-lg p-7"
                    color="danger"
                    variant="light"
                    // onPress={() => {
                    //   onClose;
                    //   console.log('onClose');
                    // }}
                    onClick={onClose}
                  >
                    Đóng
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
