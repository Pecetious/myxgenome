"use client";
// import CheckoutButton from "@/components/checkout-button";
import { paymentInitValidations } from "@/constants/validations";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
const getSession = (): any | null => {
  try {
    // localStorage'dan 'session' verisini alın
    const sessionData = localStorage.getItem("session");

    // Eğer sessionData varsa ve geçerli bir JSON formatı ise
    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);

      // session objesinin içinde token'a ulaşmaya çalışıyoruz
      return parsedSession || null; // Eğer token yoksa null döner
    }
    return null; // 'session' verisi yoksa null döner
  } catch (error) {
    // Eğer JSON.parse sırasında bir hata oluşursa, null döner
    console.error("JSON parse error:", error);
    return null;
  }
};
const Payment = () => {
  const router = useRouter();
  const handlePaymentInit = async (values: any) => {
    const session = getSession();
    try {
      const { data: ipify } = await axios.get(
        "https://api.ipify.org?format=json"
      );
      const { data } = await axios.post(
        "/api/payment-init",
        {
          gsmNumber: values.gsmNumber,
          identityNumber: values.identityNumber,
          address: values.address,
          ip: ipify.ip,
          city: values.city,
          country: values.country,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      console.log(data);
      window.open(data.html_code.paymentPageUrl, "_self");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-gray-300 via-blue-gray-600 to-blue-gray-800 pt-[75px] md:pt-0">
      <Formik
        initialValues={{
          gsmNumber: "",
          identityNumber: "",
          address: "",
          city: "",
          country: "",
        }}
        validationSchema={paymentInitValidations}
        onSubmit={handlePaymentInit}
      >
        {({ values, handleChange, handleSubmit, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Card
              className="w-full lg:max-w-lg shadow-lg shadow-indigo-600 border-2 border-indigo-600"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                className="bg-[url('/image/banner.jpg')] bg-cover bg-no-repeat relative h-[250px] bg-center "
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="inset-0 absolute bg-gray-900/60 flex flex-col space-x-5 items-center justify-center">
                  <Typography
                    className="text-3xl md:text-5xl font-bold text-white uppercase text-center"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    myXgenome DNA Analizi
                  </Typography>
                  <Typography
                    className="text-3xl md:text-4xl text-white text-center font-bold"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    120.90 ₺
                  </Typography>
                </div>
              </CardHeader>
              <CardBody
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="space-y-4">
                  <div className="md:flex md:space-x-2">
                    <div className="w-full">
                      <div className="text-sm font-medium text-gray-700">
                        Telefon Numarası
                      </div>
                      <Input
                        type="text"
                        name="gsmNumber"
                        value={values.gsmNumber}
                        onChange={handleChange}
                        placeholder={"e.g., 5350000000"}
                        className="w-full"
                        maxLength={10}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      {touched.gsmNumber && errors.gsmNumber && (
                        <div className="text-red-500 text-sm">
                          {errors.gsmNumber}
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <div className="text-sm font-medium text-gray-700">
                        TCKN
                      </div>
                      <Input
                        type="text"
                        name="identityNumber"
                        value={values.identityNumber}
                        onChange={handleChange}
                        placeholder="e.g., 74300864791"
                        className="w-full"
                        maxLength={11}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      {touched.identityNumber && errors.identityNumber && (
                        <div className="text-red-500 text-sm">
                          {errors.identityNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:flex md:space-x-2">
                    <div className="w-full">
                      <div className="text-sm font-medium text-gray-700">
                        Şehir
                      </div>
                      <Input
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        placeholder="e.g., İstanbul"
                        className="w-full"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      {touched.city && errors.city && (
                        <div className="text-red-500 text-sm">
                          {errors.city}
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <div className="text-sm font-medium text-gray-700">
                        Ülke
                      </div>
                      <Input
                        type="text"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        placeholder="e.g., Türkiye"
                        className="w-full"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      {touched.country && errors.country && (
                        <div className="text-red-500 text-sm">
                          {errors.country}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      Adres
                    </div>
                    <Input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      placeholder="e.g., Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1"
                      className="w-full"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                    />
                    {touched.address && errors.address && (
                      <div className="text-red-500 text-sm">
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>

              <div className="p-4">
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 transition-all"
                  disabled={Object.keys(errors).length > 0}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Ödeme Yap
                </Button>
              </div>
            </Card>
          </form>
        )}
      </Formik>
      {/* <iframe
        src="https://sandbox-cpp.iyzipay.com/?token=e9b3d56b-fc63-422b-a3e1-595a92f9c67b&lang=tr&iframe=true"
        className="w-full max-w-2xl h-[600px] border rounded-lg"
      ></iframe> */}
    </div>
  );
};

export default Payment;
