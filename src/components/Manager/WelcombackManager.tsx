import { useManager } from '@/context/manager.context';
import { getProfileFromLS } from '@/utils/auth';
import { motion } from 'framer-motion';
import React from 'react';
export const ManagerWelComeback: React.FC = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const [name, setName] = React.useState<string>('Staff');
  const { manager, refetch } = useManager();
  React.useEffect(() => {
    const profile = getProfileFromLS();
    if (profile && profile.roleName === 'MANAGER') {
      setName(profile.userId); // Set name only if profile exists and role is STAFF
      console.log(name);
    }
    refetch();
  }, []);

  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 2 },
    },
  };
  return (
    <div className="relative">
      <motion.div
        className="absolute"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="absolute top-60 left-60 w-[900px] h-[300px] bg-cover bg-center border-1 bg-white rounded-3xl shadow-xl transition translate-x-10 duration-500">
          {/* Background gradient and welcome text */}
          <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-transparent rounded-3xl ">
            <p className="text-white text-4xl font-bold mb-2">
              Chào mừng quay trở lại {name}
            </p>
            <p className="text-white text-lg">
              We hope you have a productive day!
            </p>

            {/* Additional information */}
            <div className="text-white mt-4">
              <p>Today's Date: {currentDate}</p>
              <p>Current Time: {currentTime}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
