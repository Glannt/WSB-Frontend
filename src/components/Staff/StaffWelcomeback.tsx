export const StaffWelComeback: React.FC = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  return (
    <div className="relative">
      <div className="absolute top-60 left-60 w-[900px] h-[300px] bg-cover bg-center border-1 bg-white rounded-3xl shadow-xl">
        {/* Background gradient and welcome text */}
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-transparent rounded-3xl">
          <p className="text-white text-4xl font-bold mb-2">
            Welcome Back, Staff!
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
    </div>
  );
};
