import * as yup from "yup";

export const loginValidations = yup.object().shape({
  email: yup
    .string()
    .email("Geçersiz e-posta girdiniz.")
    .required("E-postanızı giriniz."),
  password: yup.string().required("Şifrenizi giriniz."),
});

export const signupValidations = yup.object().shape({
  name: yup.string().required("Adınızı giriniz"),
  surname: yup.string().required("Soyadınızı giriniz"),
  email: yup
    .string()
    .email("Geçersiz e-posta girdiniz.")
    .required("E-postanızı giriniz."),
  password: yup
    .string()
    .required("Şifrenizi giriniz.")
    .min(5, "Şifre en az 5 haneli olmalıdır."),
});
