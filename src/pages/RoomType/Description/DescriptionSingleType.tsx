import React from 'react';

export const DescriptionSingleType: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              Tại CirCO, chúng tôi mang đến cho Quý khách một sự kiện hoàn hảo
            </h2>
            <p className="mb-4 text-lg">
              Với sự chuẩn bị chu đáo từ đội ngũ nhân viên chuyên nghiệp:
            </p>

            <ul className="list-disc list-inside space-y-4 mb-6">
              <li>
                <span className="font-semibold">
                  Cơ sở vật chất hiện đại và tiện nghi:
                </span>
                <ul className="list-disc list-inside ml-5">
                  <li>Smart TV và máy chiếu hiện đại.</li>
                  <li>Hệ thống điều khiển phòng họp thông minh.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">
                  Tiện ích văn phòng miễn phí, giúp tối ưu chi phí:
                </span>
                <ul className="list-disc list-inside ml-5">
                  <li>Khu vực nghỉ ngơi và phòng họp tiện lợi.</li>
                  <li>Khu tiếp khách thoải mái.</li>
                  <li>Dịch vụ massage, cà phê, trà, in ấn...</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Vị trí đắc địa:</span>
                <p>
                  Nằm ngay tại khu vực trung tâm thành phố, thuận tiện di
                  chuyển.
                </p>
              </li>
              <li>
                <span className="font-semibold">Không gian rộng rãi:</span>
                <p>Có thể linh động bố trí cho từ 50 đến 150 người.</p>
              </li>
              <li>
                <span className="font-semibold">Hỗ trợ set-up:</span>
                <p>
                  Đội ngũ kỹ thuật chuyên nghiệp sẽ hỗ trợ thiết lập và layout
                  sảnh sự kiện theo yêu cầu của Quý khách.
                </p>
              </li>
              <li>
                <span className="font-semibold">Dịch vụ ăn uống:</span>
                <p>
                  Cung cấp các lựa chọn ẩm thực đa dạng để phục vụ nhu cầu của
                  Quý khách.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Hỗ trợ truyền thông sự kiện:
                </span>
                <p>
                  Đội ngũ của chúng tôi sẵn sàng hỗ trợ công tác truyền thông,
                  giúp sự kiện của Quý khách trở nên nổi bật hơn.
                </p>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">
              Lợi ích nổi bật khi tổ chức sự kiện tại CirCO:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Dịch vụ chuyên nghiệp:</span>{' '}
                Đội ngũ nhân viên tận tâm và chuyên nghiệp sẽ đồng hành cùng Quý
                khách.
              </li>
              <li>
                <span className="font-semibold">Tiện nghi đa dạng:</span> Đầy đủ
                các thiết bị hiện đại hỗ trợ cho mọi nhu cầu của sự kiện.
              </li>
              <li>
                <span className="font-semibold">Không gian linh hoạt:</span> Tùy
                chỉnh không gian phù hợp với quy mô và tính chất của sự kiện.
              </li>
              <li>
                <span className="font-semibold">
                  Dịch vụ ăn uống phong phú:
                </span>{' '}
                Đảm bảo nhu cầu ẩm thực cho mọi đối tượng tham dự.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-slate-200 rounded-2xl h-[400px] p-5 overflow-auto pt-12">
            <div className="text-3xl font-bold mb-7">Các bước thực hiện</div>

            {/* Step 1 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200">
                1
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Khám phá</div>
                <div className="text-xl font-semi">Tìm phòng phù hợp</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                2
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Tư vấn và đặt lịch</div>
                <div className="text-xl font-semi">
                  Xác định ngày-giờ, nhu cầu về layout sự kiện và các dịch vụ đi
                  kèm. Nhận tư vấn từ cirCO và đặt lịch.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-row items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                3
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Sử dụng</div>
                <div className="text-xl font-semi">
                  Nhận email xác nhận từ cirCO. Check-in tại lễ tân và sử dụng
                  sảnh sự kiện.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
