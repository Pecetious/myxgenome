"use client";

import { Input, Typography, Button } from "@material-tailwind/react";
import { Formik } from "formik";
import axios from "axios";
import { loginValidations } from "@/constants/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";
type login = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleLogin = async (values: login) => {
    try {
      const { data } = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });
      console.log(data);
      const session = {
        expiresIn: Date.now() + 3600000,
        fullName: `${data.name} ${data.surname}`,
        email: values.email,
        token: data.token,
      };
      localStorage.setItem("session", JSON.stringify(session));
      document.cookie = `token=${data.token}; path=/; max-age=3600`;
      window.open("/", "_self");
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 via-indigo-500 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-xl shadow-white border-2 border-indigo-600">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Giriş Yap
          </h2>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidations}
            onSubmit={handleLogin}
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
                {/* E-posta */}
                <div>
                  <Input
                    label="E-posta"
                    value={values.email}
                    type="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    className="w-full"
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

                {/* Parola */}
                <div>
                  <Input
                    label="Şifre"
                    value={values.password}
                    type="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    className="w-full"
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

                {/* Giriş Yap Butonu */}
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
                    Hesabınız yok mu?{" "}
                    <span
                      className="hover:underline hover:cursor-pointer text-blue-500"
                      onClick={() => router.push("/signup")}
                    >
                      Kayıt Olun
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
                    Giriş Yap
                  </Button>
                </div>

                {/* Şifremi Unuttum Bağlantısı */}
                {/* <div className="text-center mt-4">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Şifrenizi mi unuttunuz?
                  </a>
                </div> */}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
