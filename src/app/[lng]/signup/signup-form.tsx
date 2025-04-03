"use client";
import { signupValidations } from "@/constants/validations";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
type signup = {
  name: string;
  surname: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};
const SignupForm = ({ locale }: { locale: any }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleSignup = async (values: signup) => {
    try {
      const { data } = await axios.post("/api/register", {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      });
      const session = {
        token: data.token,
        expiresIn: Date.now() + 3600000,
        fullName: `${values.name} ${values.surname}`,
      };
      localStorage.setItem("session", JSON.stringify(session));
      document.cookie = `token=${data.token}; path=/; max-age=3600`;
      window.open("/", "_self");
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        acceptedTerms: false,
      }}
      validationSchema={signupValidations(locale.yupErrors)}
      onSubmit={handleSignup}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        touched,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="w-full">
              <Input
                label={locale.nameLabel}
                value={values.name}
                type="text"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                className="w-full"
                color="indigo"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              {touched.name && errors.name && (
                <Typography
                  className="text-red-500 font-semibold text-xs mt-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="inline-block h-4 w-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name}
                </Typography>
              )}
            </div>
            <div className="w-full">
              <Input
                label={locale.surnameLabel}
                value={values.surname}
                type="text"
                onChange={handleChange("surname")}
                onBlur={handleBlur("surname")}
                className="w-full"
                color="indigo"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              {touched.surname && errors.surname && (
                <Typography
                  className="text-red-500 font-semibold text-xs mt-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="inline-block h-4 w-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.surname}
                </Typography>
              )}
            </div>
          </div>

          <div>
            <Input
              label={locale.emailLabel}
              value={values.email}
              type="email"
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              className="w-full"
              color="indigo"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {touched.email && errors.email && (
              <Typography
                className="text-red-500 font-semibold text-xs mt-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block h-4 w-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email}
              </Typography>
            )}
          </div>

          <div>
            <Input
              label={locale.passwordLabel}
              value={values.password}
              type="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              className="w-full"
              color="indigo"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {touched.password && errors.password && (
              <Typography
                className="text-red-500 font-semibold text-xs mt-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block h-4 w-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password}
              </Typography>
            )}
          </div>
          <div>
            <Checkbox
              color="indigo"
              checked={values.acceptedTerms}
              onChange={(e) =>
                setFieldValue("acceptedTerms", !values.acceptedTerms)
              }
              label={
                <div
                  className="w-full font-medium text-xs inline md:text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html: locale.privacyPolicy.text,
                  }}
                />
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {touched.acceptedTerms && errors.acceptedTerms && (
              <Typography
                className="text-red-500 font-semibold text-xs mt-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block h-4 w-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.acceptedTerms}
              </Typography>
            )}
          </div>
          <div>
            {error && (
              <Typography
                variant="h6"
                color="red"
                className="text-center mb-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {error}
              </Typography>
            )}
            <p className="text-center my-2 ">
              {locale.linkToLogin.p}{" "}
              <span
                className="hover:underline hover:cursor-pointer text-blue-500"
                onClick={() => router.back()}
              >
                {locale.linkToLogin.span}
              </span>
            </p>
            <Button
              type="submit"
              color="indigo"
              fullWidth
              className="py-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 transition-all"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {locale.buttonTitle}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default SignupForm;
