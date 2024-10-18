export const DescriptionEventType: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              Không Gian Sự Kiện tại WSB
            </h2>
            <p className="mb-4 text-lg">
              Không gian sự kiện tại WSB được thiết kế để tổ chức các buổi hội
              thảo, sự kiện ra mắt sản phẩm, hoặc các bữa tiệc nhỏ với không khí
              sang trọng và chuyên nghiệp.
            </p>

            <ul className="list-disc list-inside space-y-4 mb-6">
              <li>
                <span className="font-semibold">Thiết kế linh hoạt:</span>
                <p>
                  Không gian có thể được điều chỉnh để phù hợp với các loại sự
                  kiện khác nhau, từ hội thảo đến tiệc cocktail.
                </p>
              </li>
              <li>
                <span className="font-semibold">Trang thiết bị hiện đại:</span>
                <ul className="list-disc list-inside ml-5">
                  <li>Hệ thống âm thanh và ánh sáng chuyên nghiệp.</li>
                  <li>
                    Màn hình LED lớn cho các bài thuyết trình và quảng cáo.
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Dịch vụ hỗ trợ:</span>
                <p>
                  Đội ngũ nhân viên tận tình hỗ trợ bạn trong suốt sự kiện, đảm
                  bảo mọi thứ diễn ra suôn sẻ.
                </p>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">
              Lợi ích khi chọn không gian sự kiện:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Không gian ấn tượng:</span> Gây
                ấn tượng mạnh với khách mời và đối tác của bạn.
              </li>
              <li>
                <span className="font-semibold">Dịch vụ hoàn hảo:</span> Đảm bảo
                mọi nhu cầu của bạn được đáp ứng nhanh chóng.
              </li>
              <li>
                <span className="font-semibold">Địa điểm lý tưởng:</span> Nằm
                tại trung tâm, dễ dàng tiếp cận cho mọi người tham gia.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-slate-200 rounded-2xl h-[400px] p-5 overflow-auto pt-12">
            <div className="text-3xl font-bold mb-7">
              Các bước tổ chức sự kiện
            </div>

            {/* Bước 1 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200">
                1
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Lên kế hoạch</div>
                <div className="text-xl font-semi">
                  Xác định mục tiêu và quy mô sự kiện của bạn.
                </div>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="flex flex-row mb-4 items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                2
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Thảo luận và đặt chỗ</div>
                <div className="text-xl font-semi">
                  Gặp gỡ với đội ngũ WSB để thảo luận về nhu cầu của bạn và xác
                  nhận đặt chỗ.
                </div>
              </div>
            </div>

            {/* Bước 3 */}
            <div className="flex flex-row items-center">
              <div className="flex items-center justify-center w-12 h-12 p-6 rounded-full bg-blue-200">
                3
              </div>
              <div className="flex flex-col ml-10">
                <div className="text-xl font-bold">Tổ chức sự kiện</div>
                <div className="text-xl font-semi">
                  Tận hưởng sự kiện của bạn với sự hỗ trợ chuyên nghiệp từ đội
                  ngũ WSB.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
