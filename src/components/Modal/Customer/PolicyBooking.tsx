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
            <li>
              Khách hàng phải đặt cọc 30% trên tổng hóa đơn khi đặt phòng.
            </li>
            <li>Sau khi sử dụng dịch vụ, thanh toán phần còn lại.</li>
            <li>
              Chỉ chấp nhận thanh toán qua hình thức thanh toán trực tuyến.
            </li>
            <li>
              Đối với hóa đơn trên 5 triệu đồng, hệ thống sẽ yêu cầu xác nhận
              trước khi thanh toán.
            </li>
            <li>Sau khi đặt cọc, không hoàn tiền nếu hủy đặt phòng.</li>
            <li>Thời gian đặt phòng tối thiểu là 1 slot (1 tiếng).</li>
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
