import React from 'react';

export const DescriptionDoubleType: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Phòng Đôi tại WSB</h2>
            <p className="mb-4 text-lg">
              Phòng Đôi (Double Room) tại WSB cung cấp không gian thoải mái và
              linh hoạt, phù hợp cho các nhóm nhỏ hoặc đối tác làm việc cùng
              nhau.
            </p>

            <ul className="list-disc list-inside space-y-4 mb-6">
              <li>
                <span className="font-semibold">Tiện ích hiện đại:</span>
                <ul className="list-disc list-inside ml-5">
                  <li>Smart TV, máy chiếu hiện đại.</li>
                  <li>Bàn ghế làm việc đôi, phù hợp cho hai người.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Không gian rộng rãi:</span>
                <p>
                  Có thể chứa tối đa 10 người, phù hợp cho các cuộc họp nhóm
                  hoặc làm việc song song.
                </p>
              </li>
              <li>
                <span className="font-semibold">Vị trí thuận tiện:</span>
                <p>
                  Nằm tại trung tâm thành phố, dễ dàng di chuyển và thuận lợi.
                </p>
              </li>
              <li>
                <span className="font-semibold">Các tiện ích bổ sung:</span>
                <ul className="list-disc list-inside ml-5">
                  <li>Khu vực tiếp khách, phòng họp, và dịch vụ văn phòng.</li>
                  <li>Cà phê, trà, và in ấn miễn phí.</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">
              Lợi ích khi chọn phòng đôi:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Không gian hợp tác:</span> Phù
                hợp cho việc hợp tác, trao đổi giữa các đối tác hoặc nhóm làm
                việc nhỏ.
              </li>
              <li>
                <span className="font-semibold">Tiện ích đầy đủ:</span> Được
                trang bị các thiết bị cần thiết hỗ trợ cho quá trình làm việc
                hoặc họp hành.
              </li>
              <li>
                <span className="font-semibold">
                  Linh hoạt trong việc bố trí:
                </span>{' '}
                Dễ dàng thay đổi cách bố trí để phù hợp với nhu cầu làm việc của
                nhóm.
              </li>
              <li>
                <span className="font-semibold">Chi phí hợp lý:</span> Giải pháp
                hoàn hảo cho các nhóm hoặc đối tác muốn tối ưu chi phí nhưng vẫn
                cần không gian làm việc chuyên nghiệp.
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
                  Nhận email xác nhận từ WSB, làm thủ tục check-in và sử dụng
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
