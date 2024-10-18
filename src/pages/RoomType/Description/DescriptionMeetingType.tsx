export const DescriptionMeetingType: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Không Gian Họp tại WSB</h2>
            <p className="mb-4 text-lg">
              Không gian họp tại WSB được trang bị đầy đủ tiện nghi, lý tưởng
              cho các cuộc họp, hội thảo hoặc đào tạo với đội ngũ chuyên nghiệp
              và trang thiết bị hiện đại.
            </p>

            <ul className="list-disc list-inside space-y-4 mb-6">
              <li>
                <span className="font-semibold">Thiết bị công nghệ:</span>
                <ul className="list-disc list-inside ml-5">
                  <li>
                    Công nghệ video conference và kết nối internet tốc độ cao.
                  </li>
                  <li>
                    Bảng trắng thông minh và hệ thống âm thanh chất lượng cao.
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Không gian chuyên nghiệp:</span>
                <p>
                  Được thiết kế để tạo ra môi trường làm việc hiệu quả và thoải
                  mái cho mọi thành viên trong cuộc họp.
                </p>
              </li>
              <li>
                <span className="font-semibold">Đội ngũ hỗ trợ tận tình:</span>
                <p>
                  Chúng tôi cung cấp đội ngũ nhân viên sẵn sàng hỗ trợ bạn trong
                  suốt thời gian sử dụng không gian.
                </p>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">
              Lợi ích khi chọn không gian họp:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Khả năng tương tác cao:</span>{' '}
                Phù hợp cho việc thảo luận và ra quyết định nhóm.
              </li>
              <li>
                <span className="font-semibold">Dịch vụ đi kèm:</span> Cung cấp
                đồ uống và thức ăn nhẹ cho cuộc họp của bạn.
              </li>
              <li>
                <span className="font-semibold">Địa điểm thuận lợi:</span> Nằm
                tại trung tâm, dễ dàng tiếp cận từ nhiều nơi.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-slate-200 rounded-2xl h-[400px] p-5 overflow-auto pt-12">
            <div className="text-3xl font-bold mb-7">Các bước tổ chức họp</div>

            {/* Bước 1 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200">
                1
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Lên kế hoạch họp</div>
                <div className="text-xl font-semi">
                  Xác định thời gian, địa điểm và nội dung cuộc họp.
                </div>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                2
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Đặt chỗ</div>
                <div className="text-xl font-semi">
                  Liên hệ với WSB để xác nhận đặt chỗ cho không gian họp.
                </div>
              </div>
            </div>

            {/* Bước 3 */}
            <div className="flex flex-row items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                3
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Tổ chức cuộc họp</div>
                <div className="text-xl font-semi">
                  Sử dụng không gian đã đặt và tận hưởng cuộc họp hiệu quả với
                  sự hỗ trợ từ đội ngũ WSB.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
