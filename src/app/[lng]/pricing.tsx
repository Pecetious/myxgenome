"use client";
import React from "react";
import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
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

export function Pricing({ locale }: { locale: any }) {
  const router = useRouter();
  const session = getSession();
  return (
    <section className="w-full lg:max-w-screen-lg  min-h-screen p-3 md:mx-auto">
      <div className="grid place-items-center pb-20 text-center">
        <Typography
          variant="h2"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {locale.title}
        </Typography>
      </div>

      {/* Ürünler Tek Satırda Gösterilecek */}
      <div className="flex flex-col gap-10">
        {locale.packages.map((pkg: any, index: number) => (
          <Card
            key={index}
            className="px-6 pb-5 shadow-lg bg-blue-gray-50"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <CardBody
              className="p-1 md:p-5"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                color="blue-gray"
                className="font-bold text-3xl md:text-4xl my-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {pkg.title}
              </Typography>
              <Typography
                variant="paragraph"
                className="mb-5 text-gray-500 text-pretty"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {pkg.description}
              </Typography>

              <div className="flex flex-wrap items-center gap-x-20 gap-y-6">
                <Typography
                  variant="h6"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {locale.packageQuestion}
                </Typography>
                <hr className="w-72 bg-gray-500" />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-2">
                {pkg.options.map((option: any, key: string) => (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <CheckIcon
                        className="h-4 w-4 text-gray-900"
                        strokeWidth={2}
                      />
                      <Typography
                        variant="paragraph"
                        className="font-normal text-blue-gray-900"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {option.title}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      className="text-blue-gray-700"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {option.description}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="grid place-items-center mt-5">
                <Typography
                  variant="h1"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {pkg.price}
                </Typography>
                <Button
                  color="gray"
                  className="my-3"
                  size="lg"
                  onClick={() => {
                    router.push("/payment");
                    localStorage.setItem(
                      "session",
                      JSON.stringify({
                        ...session, // Eski session verilerini koru
                        selectedPackage: {
                          // Yeni selectedPackage verisini ekle
                          price: pkg.price,
                          title: pkg.title,
                          type: pkg.routeParams.packageType,
                        },
                      })
                    );
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {locale.buttonTitle}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
