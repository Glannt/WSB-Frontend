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
  buildingId: Yup.string().default('1'),
  roomName: Yup.string().required('Room Name is required'),
  price: Yup.number()
    .positive('Price must be positive')
    .required('Price is required'),
  image: Yup.string().url('Must be a valid URL').optional(),
  status: Yup.string().required('Status is required'),
  roomTypeId: Yup.string().required('Room Type ID is required'),
});

export type SchemaAddRoom = Yup.InferType<typeof schemaAddRoom>;

export const schemaUpdateRoom = Yup.object().shape({
  roomName: Yup.string().required('Thiếu tên phòng'),
  price: Yup.number().positive('Giá phải dương').required('Thiếu giá phòng'),
  image: Yup.string()
    .url('Cần phải là URL')
    .matches(
      /^https?:\/\/.*\.amazonaws\.com\/.*$/,
      'Must be a valid AWS S3 URL'
    )
    .optional(),
  status: Yup.string().required('Thiếu trạng thái phòng'),
});

export type SchemaUpdateRoom = Yup.InferType<typeof schemaUpdateRoom>;
