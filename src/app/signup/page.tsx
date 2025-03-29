"use client";
import { Input, Typography, Button, Checkbox } from "@material-tailwind/react";
import { Formik } from "formik";
import axios from "axios";
import { signupValidations } from "@/constants/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";
type signup = {
  name: string;
  surname: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};
const Signup = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 via-indigo-500 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-indigo-600 shadow-white">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Kayıt Ol
          </h2>

          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              acceptedTerms: false,
            }}
            validationSchema={signupValidations}
            onSubmit={handleSignup}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-row gap-2 w-full">
                  <div className="w-full">
                    <Input
                      label="Ad"
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
                      label="Soyad"
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
                    label="E-posta"
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
                    label="Şifre"
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
                    onChange={handleChange("acceptedTerms")}
                    label={
                      <Typography
                        color="blue-gray"
                        className="flex font-medium"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Typography
                          as="a"
                          href="/privacy-policy"
                          target="_blank"
                          color="blue"
                          className="font-medium transition-colors hover:text-blue-700"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Hizmet ve Gizlilik Şartları&apos;nı&nbsp;
                        </Typography>
                        onaylıyorum.
                      </Typography>
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
                    Hesabınız var mı?{" "}
                    <span
                      className="hover:underline hover:cursor-pointer text-blue-500"
                      onClick={() => router.back()}
                    >
                      Giriş Yapın
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
                    Kayıt Ol
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Şartlar ve koşullar
                  </a>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
