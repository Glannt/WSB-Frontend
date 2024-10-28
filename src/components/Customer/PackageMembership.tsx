import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaCreditCard, FaHistory, FaBell } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import { SubcriptionCard } from '../HomepageContent/SubcriptionCard';
import { getCustomerFromLS } from '@/utils/auth';
import { MemberShipPage } from './MemberShipPage';
import { useCustomer } from '@/context/customer.context';

interface MembershipData {
  packageName: string;
  status: string;
  expirationDate: string;
  price: string;
}

const PackageMembership: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info');
  const [showNotification, setShowNotification] = useState<boolean>(true);

  const membershipData: MembershipData = {
    packageName: 'Premium Plan',
    status: 'Active',
    expirationDate: '2023-12-31',
    price: '$99.99',
  };

  const today = new Date();
  const expirationDate = new Date(today.setMonth(today.getMonth() + 1));
  membershipData.expirationDate = expirationDate.toLocaleDateString();
  const { customer, refetch } = useCustomer();

  interface Membership {
    membershipId: string;
    membershipName: string;
    discount: number;
    amount: number;
    // Add other properties if needed
  }

  const [membership, setMembership] = useState<Membership | null>(null);

  useEffect(() => {
    if (customer?.membership && typeof customer.membership !== 'string') {
      setMembership(customer.membership as Membership);
    }
  }, [customer]);

  useEffect(() => {
    refetch();
  }, [customer]);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  const renderTabContent = (): JSX.Element => {
    return (
      <>
        {membership && (
          <>
            <h2 className="text-3xl font-bold mb-10 mt-5 text-center text-gray-800">
              Gói Thành Viên
            </h2>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Thông tin gói</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold">Gói:</p>
                    <p className="font-medium">
                      {membership.membershipName === 'GOLD' ? 'Vàng' : 'Bạc'}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Trạng thái:</p>
                    <p className="text-green-400 font-medium">
                      {membershipData.status === 'Active' && 'Hoạt động'}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Ngày hết hạn:</p>
                    <p className="font-medium">
                      {membershipData.expirationDate}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Giá:</p>
                    <p className="font-medium">
                      {formatPrice(membership.amount)} VNĐ
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  {/* <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mr-4"
                aria-label="Upgrade membership"
              >
                Upgrade
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                aria-label="Renew membership"
              >
                Renew
              </button> */}
                </div>
                {showNotification && (
                  <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 relative ">
                    <div className="flex items-center">
                      <FaBell className="text-yellow-500 mr-2" />
                      <p className="font-medium">
                        Quyền thành viên của bạn sẽ hết hạn sau 30 ngày. Hãy gia
                        hạn ngay để tránh bị gián đoạn.
                      </p>
                    </div>
                    <button
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                      onClick={() => setShowNotification(false)}
                      aria-label="Close notification"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {!membership && <MemberShipPage />}
      </>
    );
  };

  return (
    <>
      {/* <div className="flex items-center justify-center"> */}

      {/* </div> */}

      {renderTabContent()}
      {/* <div className="w-500px">
        <SubcriptionCard />
      </div> */}
    </>
  );
};

export default PackageMembership;
