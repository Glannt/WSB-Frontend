import type { UseFormGetValues, RegisterOptions } from 'react-hook-form';
import * as Yup from 'yup';
// type FormData = {
//   email: string;
//   password: string;
//   confirm_password: string;
// };
// // type Rules = {
// //   [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions;
// // };
// type Rules = {
//   [key in keyof FormData]?: RegisterOptions<FormData, key>;
// };

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: { value: true, message: 'Email là bắt buộc' },
//     pattern:
//       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Mật khẩu là bắt buộc',
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 100 ký tự',
//     },
//     maxLength: {
//       value: 100,
//       message: 'Độ dài từ 6 - 100 ký tự',
//     },
//   },
//   confirm_password: {
//     required: { value: true, message: 'Xác nhận mật khẩu bắt buộc' },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 100 ký tự',
//     },
//     maxLength: {
//       value: 100,
//       message: 'Độ dài từ 6 - 100 ký tự',
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Mật khẩu không khớp'
//         : undefined,
//   },
// });
const today = new Date();
const minDate = new Date(
  today.getFullYear() - 13,
  today.getMonth(),
  today.getDate()
);
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
