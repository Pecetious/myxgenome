"use client";

import { Button, Typography, Card } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

function Hero({locale}: {locale: any}) {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/banner.jpg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography
            color="white"
            className="text-4xl md:text-5xl md:max-w-full lg:max-w-3xl"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.title}
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-6 mb-10 w-full md:max-w-full lg:max-w-3xl"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.subtitle}
          </Typography>
          <div>
            <Button
              variant="gradient"
              color="white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => router.push("/payment")}
            >
              {locale.buttonTitle}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
