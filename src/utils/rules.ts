import type { UseFormGetValues, RegisterOptions } from 'react-hook-form';
import * as Yup from 'yup';

const today = new Date();
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 13);
export const schema = Yup.object().shape({
  userName: Yup.string()
    .required('Username là bắt buộc')
    .min(5, 'Độ dài từ 5 đến 50 ký tự')
    .max(50, 'Độ dài từ 5 đến 50 ký tự'),
  fullName: Yup.string().required('Họ tên là bắt buộc'),
  email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
  phoneNumber: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^[0-9]+$/, 'Số điện thoại phải là số'),
  password: Yup.string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirm_password: Yup.string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
  dateOfBirth: Yup.date()
    .nullable() // Chấp nhận giá trị null
    .transform(
      (value, originalValue) => (originalValue === '' ? null : value) // Nếu giá trị rỗng, chuyển thành null
    )
    .required('Ngày sinh là bắt buộc')
    .max(today, 'Ngày sinh không hợp lệ') // Max date must be today
    .max(minDate, 'Bạn phải ít nhất 13 tuổi'),

  agreeTerms: Yup.boolean()
    .required('Bạn phải đồng ý với các điều khoản')
    .oneOf([true], 'Bạn phải đồng ý với các điều khoản'),
  role: Yup.string().default('CUSTOMER'),
});
export type Schema = Yup.InferType<typeof schema>;

export const schemaLogin = Yup.object().shape({
  userName: Yup.string()
    .required('Username là bắt buộc')
    .min(5, 'Độ dài từ 5 đến 50 ký tự')
    .max(50, 'Độ dài từ 5 đến 50 ký tự'),
  password: Yup.string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});
export type SchemaLogin = Yup.InferType<typeof schemaLogin>;

export const schemaAddRoom = Yup.object().shape({
  buildingId: Yup.string().default('BD001'),
  roomName: Yup.string().required('Tên phòng là bắt buộc'),
  price: Yup.number()
    .positive('Giá phải là số dương')
    .required('Giá là bắt buộc'),
  image: Yup.array()
    .of(Yup.mixed().required('Hình ảnh là bắt buộc'))
    .optional(),
  status: Yup.string().required('Trạng thái là bắt buộc'),
  roomTypeId: Yup.string().required('Loại phòng là bắt buộc'),
  listStaffID: Yup.array().of(Yup.string().default('')),
});

export type SchemaAddRoom = Yup.InferType<typeof schemaAddRoom>;

export const schemaUpdateRoom = Yup.object().shape({
  roomName: Yup.string().required('Thiếu tên phòng'),
  price: Yup.number().positive('Giá phải dương').required('Thiếu giá phòng'),
  image: Yup.array()
    .of(Yup.mixed().required('Hình ảnh là bắt buộc'))
    .optional(),
  status: Yup.string().required('Thiếu trạng thái phòng'),
  listStaffID: Yup.array().of(Yup.string().default('')),
});

export type SchemaUpdateRoom = Yup.InferType<typeof schemaUpdateRoom>;

export const schemaUpdateBuilding = Yup.object().shape({
  buildingName: Yup.string().required('Tên tòa nhà là bắt buộc'),
  buildingLocation: Yup.string().required('Địa chỉ là bắt buộc'),
  phoneContact: Yup.string().required('Liên hệ là bắt buộc'),
});

export type SchemaUpdateBuilding = Yup.InferType<typeof schemaUpdateBuilding>;

export const schemaAddStaff = Yup.object().shape({
  fullName: Yup.string()
    .required('Họ tên là bắt buộc')
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên phải ít hơn 50 ký tự'),

  phoneNumber: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .matches(
      /^\+?\d{10,15}$/,
      'Số điện thoại phải hợp lệ và chứa từ 10-15 chữ số'
    ),

  dateOfBirth: Yup.string()
    .required('Ngày sinh là bắt buộc')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Ngày sinh phải có định dạng YYYY-MM-DD')
    .test('is-18', 'Nhân viên phải ít nhất 18 tuổi', (value) => {
      const currentDate = new Date();
      const birthDate = new Date(value as string);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }),

  email: Yup.string().required('Email là bắt buộc').email('Email phải hợp lệ'),

  workShift: Yup.string().required('Ca làm việc là bắt buộc'),

  workDays: Yup.string()
    .required('Ngày làm việc là bắt buộc')
    .matches(
      /^[MTWFS]{1,7}$/,
      'Ngày làm việc phải là tổ hợp hợp lệ của các chữ cái đại diện cho các ngày (M, T, W, F, S)'
    ), // Ví dụ: 'MTW' cho Thứ Hai, Thứ Ba, Thứ Tư

  buildingId: Yup.string()
    .required('ID tòa nhà là bắt buộc')
    .length(36, 'ID tòa nhà phải dài 36 ký tự'), // Giả sử định dạng UUID

  // status: Yup.string()
  //   .required('Trạng thái là bắt buộc')
  //   .oneOf(['Active', 'Inactive'], 'Trạng thái không hợp lệ'),
});

export type SchemaAddStaff = Yup.InferType<typeof schemaAddStaff>;

export const schemaUpdatePassword = Yup.object().shape({
  currentPassword: Yup.string().required('Mật khẩu hiện tại là bắt buộc'),
  newPassword: Yup.string()
    .required('Mật khẩu mới là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'), // Bạn có thể thêm nhiều quy tắc hơn nếu cần
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

export type SchemaUpdatePassword = Yup.InferType<typeof schemaUpdatePassword>;

export const schemaUpdateService = Yup.object().shape({
  bookingId: Yup.string().required('ID đặt phòng là bắt buộc'), // Required bookingId
  items: Yup.object()
    .shape({
      // The 'quantities' object will have dynamic keys (service IDs)
      quantities: Yup.object()
        .test(
          'is-valid-quantities',
          'Số lượng phải là số hợp lệ lớn hơn 0',
          (quantities) => {
            // Ensure that all keys in the quantities object are valid service IDs
            if (!quantities) return true; // If quantities is undefined, skip validation

            return Object.entries(quantities).every(([key, value]) => {
              // Validate each value is a number and greater than 0
              return typeof value === 'number' && value >= 1;
            });
          }
        )
        .optional()
        .nullable(), // Optional quantities object
    })
    .optional()
    .nullable(), // Optional items
});

// Type for the form values inferred from the schema
export type SchemaUpdateService = Yup.InferType<typeof schemaUpdateService>;

export const createMultiBookingSchema = Yup.object({
  buildingId: Yup.string().required('Cần có cơ sở').min(1, 'Phải chọn 1 cơ sở'),
  roomId: Yup.string()
    .required('ID phòng là bắt buộc')
    .min(1, 'ID phòng không được để trống'),
  checkinDate: Yup.string().required('Ngày nhận phòng là bắt buộc'),
  // .matches(
  //   /^\d{4}-\d{2}-\d{2}$/,
  //   'Ngày nhận phòng phải có định dạng YYYY-MM-DD'
  // ),
  checkoutDate: Yup.string().required('Ngày trả phòng là bắt buộc'),
  // .matches(
  //   /^\d{4}-\d{2}-\d{2}$/,
  //   'Ngày trả phòng phải có định dạng YYYY-MM-DD'
  // )
  // .test(
  //   'is-after-checkin',
  //   'Ngày trả phòng phải sau ngày nhận phòng',
  //   function (value) {
  //     const { checkinDate } = this.parent;
  //     return new Date(value) > new Date(checkinDate);
  //   }
  // ),

  slots: Yup.array()
    .of(
      Yup.number()
        .required('Slot is required')
        .min(1, 'Slot number must be at least 1')
    )
    .min(1, 'At least one slot must be selected')
    .max(4, 'No more than 4 slots allowed per booking'),
  items: Yup.object()
    .shape({
      // The 'quantities' object will have dynamic keys (service IDs)
      quantities: Yup.object()
        .test(
          'is-valid-quantities',
          'Quantities must be valid numbers greater than 0',
          (quantities) => {
            // Ensure that all keys in the quantities object are valid service IDs
            if (!quantities) return true; // If quantities is undefined, skip validation

            return Object.entries(quantities).every(([key, value]) => {
              // Validate each value is a number and greater than 0
              return typeof value === 'number' && value >= 1;
            });
          }
        )
        .optional()
        .nullable(), // Optional quantities object
    })
    .optional()
    .nullable(), // Optional items
});
export type SchemacreateMultiBooking = Yup.InferType<
  typeof createMultiBookingSchema
>;

export const schemaTopUp = Yup.object().shape({
  amount: Yup.number()
    .required('Số tiền là bắt buộc')
    .min(10000, 'Số tiền phải ít nhất là 10,000 VND'),
});
export type SchemaTopUp = Yup.InferType<typeof schemaTopUp>;

export const schemaCancelBooking = Yup.object().shape({
  bookingId: Yup.string(),
});

export type SchemaCancelBooking = Yup.InferType<typeof schemaCancelBooking>;
