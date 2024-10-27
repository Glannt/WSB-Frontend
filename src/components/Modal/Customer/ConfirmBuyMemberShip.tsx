import { useCustomer } from '@/context/customer.context';
import {
  getService,
  getWalletByUserId,
  postBuyMemberShipPackage,
} from '@/service/customer.api';
import { Details, InitialQuantities } from '@/types/room.type';
import { Services } from '@/types/service.type';
import {
  CustomerOrderBooking,
  CustomerOrderBookingHistory,
} from '@/types/bookings';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  SchemaBuyMemberShip,
  SchemacreateMultiBooking,
  shemaBuyMemberShip,
} from '@/utils/rules';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { MemberShip, Wallet } from '@/types/customer.type';
import { getProfileFromLS } from '@/utils/auth';
import { yupResolver } from '@hookform/resolvers/yup';

interface ConfirmBuyMemberShipProps {
  confirmBuyMemberShipModal: boolean;
  //   memberShipId: string | undefined;
  memberShip: MemberShip | undefined;
  onClose: () => void;
}

export const ConfirmBuyMemberShip: React.FC<ConfirmBuyMemberShipProps> = ({
  confirmBuyMemberShipModal,
  memberShip,
  onClose,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaBuyMemberShip>({
    resolver: yupResolver(shemaBuyMemberShip),
    defaultValues: {
      membershipId: memberShip?.id,
    },
  });
  const profile = getProfileFromLS();
  const { customer, refetch } = useCustomer();
  const BuyMemberShipMutation = useMutation({
    mutationFn: (formData: FormData) => postBuyMemberShipPackage(formData),
  });

  const handleBuyMemberShip = (data: SchemaBuyMemberShip) => {
    const formData = new FormData();
    if (memberShip?.id === undefined) {
      return Promise.reject(new Error('Room ID is undefined'));
    }
    console.log('data', data);

    formData.append('membershipId', memberShip.id);
    console.log(memberShip.id);

    BuyMemberShipMutation.mutate(formData, {
      onSuccess: (response) => {
        console.log('Booking created successfully');
        refetch();
        onClose();
      },
      onError: (error) => {
        console.error('Error creating booking:', error);
      },
    });
  };
  const onSubmit = (data: SchemaBuyMemberShip) => {
    handleBuyMemberShip(data);
  };
  return (
    <>
      {' '}
      {confirmBuyMemberShipModal && (
        <Modal
          onClose={onClose}
          hideCloseButton={true}
          isOpen={confirmBuyMemberShipModal}
          className="h-auto w-auto"
          classNames={{
            header: 'text-2xl',
            body: 'text-xl',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Xác nhận mua gói thành viên</ModalHeader>

                <ModalBody className="text-lg">
                  <div className="mt-2">
                    <h2 className="text-2xl font-bold">Tổng hóa đơn: </h2>
                  </div>

                  <div className="mt-4 p-4 rounded-lg shadow-inner shadow-primary-100">
                    <h3 className="text-xl font-bold">{memberShip?.name}</h3>
                    <p className="text-xl font-semibold">
                      Giá: {memberShip?.price.toLocaleString()} VND / Tháng
                    </p>
                  </div>
                  <p>
                    Bạn có chắc chắn muốn mua gói thành viên dưới đây không?
                  </p>
                </ModalBody>

                <ModalFooter className="flex justify-between">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Button
                      type="submit"
                      className="w-40 text-lg"
                      color="primary"
                      // onClick={toggleConfirmModal}
                    >
                      Xác nhận
                    </Button>
                  </form>
                  <Button
                    className="w-40 font-semibold text-lg"
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
