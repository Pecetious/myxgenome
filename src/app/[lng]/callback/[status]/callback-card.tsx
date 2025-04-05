"use client"
import { Card, CardBody, CardHeader, Progress, Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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
const CallbackCard = ({status,locale}: {status: string,locale: any}) => {
    const session = getSession();
    const router = useRouter();
      const [timeLeft, setTimeLeft] = useState(5);
      useEffect(() => {
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        if (timeLeft <= 0) {
          clearTimeout(timer);
          if (status === "success") {
            router.replace("/");
          } else {
            router.replace("/");
          }
        }
    
        return () => clearTimeout(timer);
      }, [timeLeft, status, router]);
    
    return (
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
              {session.selectedPackage.title}
            </Typography>
            <Typography
              variant="h2"
              className="text-white text-center font-bold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
            {session.selectedPackage.price}
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
              ? locale.text.success
              : locale.text.fail}
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
            {timeLeft} {locale.reroute}
          </Typography>
        </CardBody>
      </Card>
    )
}
const CallbackCardWithSuspense = ({status,locale}: {status: string,locale: any}) => (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackCard status={status} locale={locale}/>
    </Suspense>
  );
export default CallbackCardWithSuspense