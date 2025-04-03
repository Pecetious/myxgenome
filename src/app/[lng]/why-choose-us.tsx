"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

interface OptionProps {
  src: string;
  title: string;
  children: React.ReactNode;
}

function Option({ src, title, children }: OptionProps) {
  return (
    <div className="flex gap-4">
      <div className="mb-4">
        <Image src={src} height={64} width={64} alt={title} />
      </div>
      <div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {title}
        </Typography>
        <Typography
          className="mb-2 md:w-10/12 font-normal !text-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {children}
        </Typography>
      </div>
    </div>
  );
}

export function WhyChooseUs({ locale }: { locale: any }) {
  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10">
      <Typography
        variant="h2"
        className="text-center mb-2"
        color="blue-gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {locale.title}
      </Typography>
      <Typography
        variant="lead"
        className="mb-16 w-full text-center font-normal !text-gray-500 lg:w-10/12"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {locale.description}
      </Typography>
      <div className="mt-8">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24 relative">
          <Image src="/image/dna.png" width={400} height={400} alt="dna" />
          <div className="space-y-8">
            {locale.options1.map((opt: any) => (
              <div className="my-4 flex gap-4">
                <Option title={opt.title} src={opt.src}>
                  {opt.description}
                </Option>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            {locale.options2.map((opt: any) => (
              <div className="my-4 flex gap-4">
                <Option title={opt.title} src={opt.src}>
                  {opt.description}
                </Option>
              </div>
            ))}
          </div>
          <Image src="/image/words.jpg" width={400} height={400} alt="words" />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
