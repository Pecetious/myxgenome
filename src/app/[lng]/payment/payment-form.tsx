"use client";

import { paymentInitValidations } from "@/constants/validations";
import {
  MinusCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
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
import { useEffect, useState } from "react";

const PaymentForm = ({ locale }: { locale: any }) => {
  const [session, setSession] = useState<any>(null);
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
  const [error, setError] = useState<any>(null);
  const [testCreditsCounter, setTestCreditsCounter] = useState(-1);
  const handlePaymentInit = async (values: any) => {
    const session = getSession();
    if (testCreditsCounter === 0) return;
    try {
      const { data: ipify } = await axios.get(
        "https://api.ipify.org?format=json"
      );
      let body;
      if (session.selectedPackage.testCredits) {
        body = {
          gsmNumber: values.gsmNumber,
          identityNumber: values.identityNumber,
          address: values.address,
          ip: ipify.ip,
          city: values.city,
          country: values.country,
          type: session.subscriptionType,
          testCredits: testCreditsCounter,
          testType: session.selectedPackage.testType,
          lang: locale.lang,
        };
        console.log(body);
      } else {
        body = {
          gsmNumber: values.gsmNumber,
          identityNumber: values.identityNumber,
          address: values.address,
          ip: ipify.ip,
          city: values.city,
          country: values.country,
          type: session.selectedPackage.type,
          lang: locale.lang,
        };
        console.log(body);
      }
      const { data } = await axios.post("/api/payment-init", body, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      console.log(data);
      window.open(data.html_code.paymentPageUrl, "_self");
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.error);
    } finally {
      localStorage.setItem(
        "session",
        JSON.stringify({
          ...session, // Eski session verilerini koru
          selectedPackage: {
            // Yeni selectedPackage verisini ekle
            ...session.selectedPackage,
            testCredits: testCreditsCounter,
            price: `${
              session.selectedPackage.testType === "thyroid"
                ? testCreditsCounter * 80
                : session.selectedPackage.testType === "race"
                ? testCreditsCounter * 100
                : testCreditsCounter * 50
            } ₺`,
          },
        })
      );
    }
  };
  const handleIncrement = () => {
    setTestCreditsCounter(testCreditsCounter + 1);
  };
  const handleDecrement = () => {
    if (testCreditsCounter === 0) return;
    setTestCreditsCounter(testCreditsCounter - 1);
  };
  useEffect(() => {
    const sessionData = getSession();
    setSession(sessionData);
    if (sessionData?.selectedPackage?.testCredits) {
      setTestCreditsCounter(sessionData.selectedPackage.testCredits);
    }
  }, []);
  return (
    <Formik
      initialValues={{
        gsmNumber: "",
        identityNumber: "",
        address: "",
        city: "",
        country: "",
      }}
      validationSchema={paymentInitValidations(locale.yupErrors)}
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
                  {session && session.selectedPackage.title}
                </Typography>
                <Typography
                  className="text-3xl md:text-4xl text-white text-center font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {session && session.selectedPackage.testCredits
                    ? `${
                        session.selectedPackage.testType === "thyroid"
                          ? testCreditsCounter * 80
                          : session.selectedPackage.testType === "race"
                          ? testCreditsCounter * 100
                          : testCreditsCounter * 50
                      } ₺`
                    : session &&
                      session.selectedPackage &&
                      session.selectedPackage.price}
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
                      {locale.labels.gsmNumber}
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
                      {locale.labels.identityNumber}
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
                      {locale.labels.city}
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
                      <div className="text-red-500 text-sm">{errors.city}</div>
                    )}
                  </div>

                  <div className="w-full">
                    <div className="text-sm font-medium text-gray-700">
                      {locale.labels.country}
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
                    {locale.labels.address}
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
                    <div className="text-red-500 text-sm">{errors.address}</div>
                  )}
                </div>
                {session && session.selectedPackage.testCredits && (
                  <div className="flex w-2/3 mx-auto items-center justify-center gap-4">
                    <MinusIcon
                      strokeWidth={2}
                      className="font-medium size-10 cursor-pointer rounded-full hover:bg-blue-gray-200 hover:text-white"
                      onClick={handleDecrement}
                    />

                    <Typography
                      color="blue-gray"
                      variant="h4"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {testCreditsCounter}
                    </Typography>
                    <PlusIcon
                      strokeWidth={2}
                      className="font-medium size-10 cursor-pointer rounded-full hover:bg-blue-gray-200 hover:text-white"
                      onClick={handleIncrement}
                    />
                  </div>
                )}
              </div>
            </CardBody>
            {error && (
              <Typography
                variant="h5"
                className="text-center text-red-700"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {locale.error}
              </Typography>
            )}
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
                {locale.buttonTitle}
              </Button>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
};
export default PaymentForm;
