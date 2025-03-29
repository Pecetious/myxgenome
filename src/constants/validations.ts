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
  acceptedTerms: yup
    .string()
    .oneOf(["onaylandı"], "Gizlilik sözleşmesini kabul etmelisiniz."),
});

export const paymentInitValidations = yup.object().shape({
  gsmNumber: yup
    .string()
    .matches(/^\d{10}$/, "Geçerli bir telefon numarası girin")
    .required("Telefon numarası gereklidir."),
  identityNumber: yup
    .string()
    .matches(/^\d{11}$/, "Geçerli bir TCKN girin")
    .required("TCKN gereklidir."),
  address: yup.string().required("Adres gereklidir."),
  city: yup.string().required("Şehir gereklidir."),
  country: yup.string().required("Ülke gereklidir."),
});
