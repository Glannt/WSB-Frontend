import React from 'react';

export const DescriptionSingleType: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Phòng Đơn tại WSB</h2>
            <p className="mb-4 text-lg">
              Phòng Đơn của chúng tôi mang đến một không gian làm việc riêng tư,
              thoải mái và yên tĩnh cho những ai cần một không gian làm việc lý
              tưởng.
            </p>

            <ul className="list-disc list-inside space-y-4 mb-6">
              <li>
                <span className="font-semibold">Tiện ích hiện đại:</span>
                <ul className="list-disc list-inside ml-5">
                  <li>Smart TV và máy chiếu hiện đại.</li>
                  <li>Bàn ghế làm việc tiện nghi.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">
                  Tiện ích văn phòng miễn phí:
                </span>
                <ul className="list-disc list-inside ml-5">
                  <li>Truy cập khu vực nghỉ ngơi và phòng họp.</li>
                  <li>Cà phê, trà, và dịch vụ in ấn miễn phí.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Vị trí thuận lợi:</span>
                <p>Nằm ngay tại trung tâm thành phố, dễ dàng di chuyển.</p>
              </li>
              <li>
                <span className="font-semibold">
                  Linh hoạt trong cách sắp xếp:
                </span>
                <p>Phù hợp cho cá nhân hoặc nhóm nhỏ, tối đa 5 người.</p>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">
              Lợi ích khi đặt phòng đơn:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">
                  Môi trường làm việc chuyên nghiệp:
                </span>{' '}
                Không gian yên tĩnh và tập trung, giúp nâng cao năng suất làm
                việc.
              </li>
              <li>
                <span className="font-semibold">Thiết bị hiện đại:</span> Trang
                bị đầy đủ thiết bị và dịch vụ phù hợp với nhu cầu của bạn.
              </li>
              <li>
                <span className="font-semibold">Không gian linh hoạt:</span> Dễ
                dàng tùy chỉnh không gian theo nhu cầu làm việc cá nhân.
              </li>
              <li>
                <span className="font-semibold">Chi phí hợp lý:</span> Lựa chọn
                phù hợp cho các nhu cầu ngắn hoặc dài hạn.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-slate-200 rounded-2xl h-[400px] p-5 overflow-auto pt-12">
            <div className="text-3xl font-bold mb-7">Các bước đặt phòng</div>

            {/* Bước 1 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200">
                1
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Khám phá</div>
                <div className="text-xl font-semi">
                  Tìm kiếm phòng phù hợp với nhu cầu của bạn.
                </div>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                2
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Tư vấn và đặt lịch</div>
                <div className="text-xl font-semi">
                  Xác định ngày, giờ, nhu cầu về không gian và các dịch vụ đi
                  kèm, nhận tư vấn và xác nhận đặt phòng.
                </div>
              </div>
            </div>

            {/* Bước 3 */}
            <div className="flex flex-row items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                3
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Sử dụng</div>
                <div className="text-xl font-semi">
                  Nhận email xác nhận từ WSB, làm thủ tục check-in và tận hưởng
                  không gian làm việc của bạn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
