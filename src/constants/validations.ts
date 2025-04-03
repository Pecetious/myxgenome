import * as yup from "yup";

export const loginValidations = (errors: any) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(errors.email.email)
      .required(errors.email.required),
    password: yup.string().required(errors.password.required),
  });
};

export const signupValidations = (errors: any) => {
  return yup.object().shape({
    name: yup.string().required(errors.name.required),
    surname: yup.string().required(errors.surname.required),
    email: yup
      .string()
      .email(errors.email.email)
      .required(errors.email.required),
    password: yup
      .string()
      .required(errors.password.required)
      .min(5, errors.password.min),
    acceptedTerms: yup.boolean().oneOf([true], errors.acceptedTerms.oneOf),
  });
};
export const paymentInitValidations = (errors: any) => {
  return yup.object().shape({
    gsmNumber: yup
      .string()
      .matches(/^\d{10}$/, errors.gsmNumber.matches)
      .required(errors.gsmNumber.required),
    identityNumber: yup
      .string()
      .matches(/^\d{11}$/, errors.identityNumber.matches)
      .required(errors.identityNumber.required),
    address: yup.string().required(errors.address.required),
    city: yup.string().required(errors.city.required),
    country: yup.string().required(errors.country.required),
  });
};
