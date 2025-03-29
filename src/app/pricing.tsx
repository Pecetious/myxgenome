"use client";
import React from "react";
import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";

const PRICING_OPTIONS = [
  "Köken Analizi",
  "Mutasyona Uğramış Muhtemel Gen Çizelgeniz",
];

export function Pricing() {
  return (
    <div className="grid min-h-screen place-items-center">
      <section className="container mx-auto px-10">
        <div className="grid place-items-center pb-20 text-center">
          <Typography
            variant="h2"
            color="blue-gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            En İyi Fiyat Garantisi
          </Typography>
          {/* <Typography variant="lead" className="mt-2 !text-gray-500 lg:w-5/12">
           
          </Typography> */}
        </div>
        <Card
          className="px-6 pb-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h3"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              myXgenome DNA Analizi
            </Typography>
            <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
              <div>
                <Typography
                  variant="paragraph"
                  className="mb-10 mt-2 w-full font-normal !text-gray-500"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Ses ve görüntü veriniz dışında başka bir şeye ihtiyacımız yok!
                  Verilerinizi tek seferlik analize alıp bir daha kullanmıyoruz
                  ve depolamıyoruz.
                </Typography>
                <div className="flex flex-wrap items-center gap-x-20 gap-y-6">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Teste neler dahil?
                  </Typography>
                  <hr className="w-72 bg-gray-500" />
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 justify-between gap-x-12 gap-y-2">
                  {PRICING_OPTIONS.map((option, key) => (
                    <div key={key} className="flex items-center gap-4">
                      <CheckIcon
                        className="h-4 w-4 text-gray-900"
                        strokeWidth={2}
                      />
                      <Typography
                        variant="paragraph"
                        className="font-normal !text-gray-500"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {option}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid place-items-center lg:justify-end">
                <Typography
                  variant="h1"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  99,90₺
                </Typography>
                <Button
                  color="gray"
                  className="my-3"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  satın al
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

export default Pricing;
