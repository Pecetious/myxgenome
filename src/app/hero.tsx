"use client";

import { Button, Typography, Card } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/banner.jpg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography
            variant="h2"
            color="white"
            className="md:max-w-full lg:max-w-3xl"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            myXgenome genetik kökenlerinizi keşfetmenizi sağlayan DNA testi
            deneyimi ile dakikalar içerisinde kökenlerinizi öğrenin
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-6 mb-10 w-full md:max-w-full lg:max-w-3xl"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Dünya genelindeki kullanıcıların yaşamlarını geliştirmek için
            kurulmuş online ilk laboratuvar MyXgenome, kökenlerinizi sadece
            sesinizi ve bir fotoğrafınız ile raporlar.
          </Typography>
          <div>
            <Button
              variant="gradient"
              color="white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Hemen Dene
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
