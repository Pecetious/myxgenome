"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Typography,
} from "@material-tailwind/react";

const CallbackPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const status = params.get("status");
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    if (timeLeft <= 0) {
      clearTimeout(timer);
      if (status === "success") {
        router.replace("/test");
      } else {
        router.replace("/");
      }
    }

    return () => clearTimeout(timer);
  }, [timeLeft, status, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-700 space-y-16">
      <Typography
        variant="h1"
        className={`font-semibold text-center drop-shadow-lg ${
          status === "success" ? "text-light-green-300 " : "text-red-500 "
        }`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {status === "success" ? "İşlem Başarılı" : "İşlem Başarısız"}
      </Typography>
      <Card
        className="w-full lg:max-w-md shadow-xl shadow-blue-gray-100"
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
              variant="h2"
              className="text-white uppercase text-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              myXgenome DNA Analizi
            </Typography>
            <Typography
              variant="h2"
              className="text-white text-center font-bold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
            120.00 ₺
            </Typography>
          </div>
        </CardHeader>
        <CardBody
          className="h-[30vh] flex flex-col justify-center items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h6"
            className="text-center my-5"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {status === "success"
              ? "Satın alma işleminiz başarıyla gerçekleşti. Test sayfasına yönlendiriliyorsunuz."
              : "Satın alma işleminiz başarısız oldu. Ana sayfaya yönlendiriliyorsunuz."}
          </Typography>
          <Progress
            value={(timeLeft / 5) * 100}
            color={status === "success" ? "light-green" : "red"}
            className="w-3/4 mt-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Typography
            variant="h6"
            className="text-center mt-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {timeLeft} saniye içinde yönlendiriliyorsunuz...
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

const CallbackPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CallbackPage />
  </Suspense>
);

export default CallbackPageWithSuspense;
