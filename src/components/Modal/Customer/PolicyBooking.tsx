import { Button } from '@nextui-org/react';

// interface PolicyBookingProps {
//   togglePolicyModal: () => void;
// }

export const PolicyBooking: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">
        Chính Sách Dịch Vụ Đặt Phòng Làm Việc
      </h3>
      <ul>
        <li>
          <strong>Điều kiện tham gia:</strong>
          <ul>
            <li>
              Người dùng phải từ 13 tuổi trở lên để sử dụng dịch vụ đặt phòng.
            </li>
          </ul>
        </li>

        <li>
          <strong>Quy định về giá phòng:</strong>
          <ul>
            <li>
              Giá phòng được tính dựa trên giờ thuê, loại phòng và ngày đặt.
            </li>
          </ul>
        </li>

        <li>
          <strong>Tính năng chính:</strong>
          <ul>
            <li>Đặt phòng họp trực tuyến thông qua ứng dụng.</li>
            <li>Hỗ trợ thanh toán qua bên thứ ba liên kết.</li>
          </ul>
        </li>

        <li>
          <strong>Quy trình giao dịch:</strong>
          <ul>
            <li>Đăng ký tài khoản và đăng nhập.</li>
            <li>Tham khảo thông tin và chọn phòng phù hợp.</li>
            <li>Thực hiện đặt phòng qua hệ thống.</li>
            <li>Nhân viên xác nhận lịch đặt và thông báo tới khách hàng.</li>
            <li>Khách hàng xác nhận lịch và thanh toán trực tuyến.</li>
          </ul>
        </li>

        <li>
          <strong>Quy định về đặt cọc và thanh toán:</strong>
          <ul>
            <li>Khách hàng phải trả trước 100% hóa đơn khi đặt phòng.</li>
            <li>
              Chỉ chấp nhận thanh toán qua hình thức thanh toán trực tuyến.
            </li>
            <li>
              Đối với hóa đơn trên 5 triệu đồng, phải chờ hệ thống xử lý yêu cầu
              xác nhận trước khi thanh toán.
            </li>
            <li>
              Sau khi đặt cọc, nếu hủy phòng trước 24 tiếng sẽ hoàn 100% số tiền
              trên tổng hóa đơn nếu hủy đặt phòng.
            </li>
            <li>
              Sau khi đặt cọc, nếu hủy phòng trong khoảng 24 tiếng tới 6 tiếng
              trước thời gian nhận phòng làm việc chỉ hoàn 50% số tiền trên tổng
              hóa đơn nếu hủy đặt phòng.
            </li>
            <li>
              Trường hợp còn lại nếu hủy phòng thì sẽ không hoàn trả tiền.
            </li>
            <li>Thời gian đặt phòng tối thiểu là 1 slot (3 tiếng).</li>
            <li>
              <strong className="text-red-400 font-bold">Lưu ý:</strong> Mọi
              giao dịch đều thông qua ví điện tử.
            </li>
          </ul>
        </li>

        <li>
          <strong>Các điều kiện khác:</strong>
          <ul>
            <li>
              Khách hàng cần tuân thủ các quy định và điều kiện được đưa ra từ
              hệ thống.
            </li>
          </ul>
        </li>
      </ul>
      {/* <Button
        variant="shadow"
        color="success"
        onClick={togglePolicyModal}
        className=" text-white px-4 py-2 rounded-md  transition duration-300 mt-5"
      >
        Close
      </Button> */}
    </>
  );
};
