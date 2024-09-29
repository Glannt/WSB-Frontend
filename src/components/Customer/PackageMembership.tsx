import React, { useState } from 'react';
import { FaUserCircle, FaCreditCard, FaHistory, FaBell } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import { SubcriptionCard } from '../HomepageContent/SubcriptionCard';

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

  const renderTabContent = (): JSX.Element => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Membership Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Package:</p>
            <p className="font-medium">{membershipData.packageName}</p>
          </div>
          <div>
            <p className="font-bold">Status:</p>
            <p className="text-green-400 font-medium">
              {membershipData.status}
            </p>
          </div>
          <div>
            <p className="font-bold">Expiration Date:</p>
            <p className="font-medium">{membershipData.expirationDate}</p>
          </div>
          <div>
            <p className="font-bold">Price:</p>
            <p className="font-medium">{membershipData.price}</p>
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
      </div>
    );
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 mt-5 text-center text-gray-800">
        Package Membership
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
        {/* <div className="flex items-center justify-center"> */}

        {/* </div> */}

        {renderTabContent()}
        {showNotification && (
          <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 relative ">
            <div className="flex items-center">
              <FaBell className="text-yellow-500 mr-2" />
              <p className="font-medium">
                Your membership will expire in 30 days. Renew now to avoid
                interruption.
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
      {/* <div className="w-500px">
        <SubcriptionCard />
      </div> */}
    </>
  );
};

export default PackageMembership;
