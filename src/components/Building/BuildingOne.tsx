import { SliderBuilding } from '../Slider/SliderBuilding';
import img1 from '@/assets/images/img_1.jpg';
import img2 from '@/assets/images/img_2.jpg';
import img3 from '@/assets/images/img_3.jpg';
import img4 from '@/assets/images/img_4.jpg';
import img5 from '@/assets/images/img_5.jpg';
import img6 from '@/assets/images/img_6.jpg';
import img7 from '@/assets/images/img_7.jpg';
import RoomSlider from '../Slider/RoomSlider';

export const BuildingOne: React.FC = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3060219274423!2d-73.98823492346382!3d40.74844097138868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685158645145!5m2!1sen!2sus`;

  return (
    <div className="container">
      <h1 className="text-8xl text-center">Building 1</h1>
      <SliderBuilding images={images} />
      <div className="mt-1">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <div className="font-bold text-5xl">
              {' '}
              Giải pháp văn phòng tiết kiệm
            </div>
            <div className="mt-5 text-2xl text-justify leading-[25px] font-medium text-[18px] ">
              Đối với một môi trường văn phòng chuyên nghiệp tại trung tâm Thành
              phố Hồ Chí Minh, Việt Nam, cirCO Hoàng Diệu tọa lạc tại một vị trí
              lý tưởng, chỉ cách Quận 1 và Cầu Ông Lãnh 2 phút. Tại địa chỉ
              thuận tiện này, chúng tôi cung cấp hai tầng văn phòng riêng, phòng
              họp, bàn làm việc chuyên dụng, bàn làm việc linh hoạt và đa dạng
              tiện ích. Bên cạnh đó, cirCO Hoàng Diệu còn cung cấp không gian tổ
              chức sự kiện với sức chứa lớn lên đến 120 người. Các khu vực giải
              trí và sảnh tiếp khách hiện đại được bổ sung cùng với các tiện
              nghi nổi bật của cirCO bao gồm lễ tân, dịch vụ dọn dẹp, trạm in,
              không gian thư giãn và bốt điện thoại riêng. Ngoài các dịch vụ mà
              cirCO cung cấp, các tiện ích khác bao gồm McDonald’s, Trung tâm
              Thể dục & Yoga và Căn hộ, đều hiện hữu trong một tòa nhà. Ngoài
              ra, xung quanh cirCO Hoàng Diệu là các nhà hàng và quán cà phê địa
              phương mang lại nhiều lựa chọn cho bạn để tận hưởng thời gian nghỉ
              trưa và thuận tiện hơn trong việc gặp gỡ đối tác. Thêm vào đó, lối
              đi thuận tiện đến bãi đậu xe và khu trung tâm giúp bạn dễ dàng di
              chuyển khắp thành phố. Ghé thăm cirCO ngay hôm nay để tìm hiểu
              thêm những lợi ích mà chúng tôi có thể đem lại cho doanh nghiệp
              bạn.
            </div>
            <div className="mx-auto w-full px-4 mb-5 mt-10">
              <div className="flex items-center justify-start flex-row">
                <div className="mr-16">
                  <div className="font-bold text-4xl leading-loose mb-1">
                    54
                  </div>
                  <div className="text-xl leading-[25px]">Văn phòng Riêng</div>
                </div>
                <div className="mr-16">
                  <div className="font-bold text-4xl leading-loose mb-1">
                    90
                  </div>
                  <div className="text-xl leading-[25px] ">Phòng họp</div>
                </div>
                <div className="mr-16">
                  <div className="font-bold text-4xl leading-loose mb-1">
                    10
                  </div>
                  <div className="text-xl leading-[25px] ">Phòng sự kiện</div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full px-4 mb-5 mt-10">
              <div className="font-bold text-2xl leading-[24px] mb-8">
                Tiện nghi
              </div>
              <div className="flex flex-wrap h-auto justify-start items-baseline overflow-hidden transition duration-300 w-[70%]">
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className="font-medium">🕒</span>
                  <span className="text-xl">Mở cửa 24/7</span>
                </div>
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className=" font-medium">📞</span>
                  <span className="text-xl">Bốt điện thoại</span>
                </div>
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className=" font-medium">🏢</span>
                  <span className="text-xl">Phòng họp, hội nghị</span>
                </div>
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className=" font-medium">☕</span>
                  <span className="text-xl">Miễn phí trà và cà phê</span>
                </div>
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className=" font-medium">🔒</span>
                  <span className="text-xl">Bảo vệ và camera an ninh</span>
                </div>
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className=" font-medium">🛎️</span>
                  <span className="text-xl">Lễ tân</span>
                </div>
                <div className="flex items-center space-x-2 m-8 ml-0 text-2xl">
                  <span className=" font-medium">🅿️</span>
                  <span className="text-xl">Hầm đỗ xe</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
            <iframe
              src={mapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Selected Facility Map"
            ></iframe>
          </div>
        </div>
        <div className="h-[500px] rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 pt-10 mb-5">
          <RoomSlider />
        </div>
        <div></div>
      </div>
    </div>
  );
};
