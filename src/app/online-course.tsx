"use client";

import React from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";

import FeatureCard from "@/components/feature-card";

const FEATURES = [
  {
    icon: "/icons/optical-microscope.png",
    title: "Genetik Analiz",
    description:
      "Görüntü ve ses verisinden yola çıkarak genetik mutasyonları belirler.",
  },
  {
    icon: "/icons/dna-helix.png",
    title: "Demografik Tespit",
    description:
      "Irk, yaş ve cinsiyet gibi faktörleri genetik yapıya dayalı olarak analiz eder.",
  },
  {
    icon: "/icons/analytics.png",
    title: "Kapsamlı Raporlama",
    description:
      "Veriler detaylı bir şekilde işlenerek kullanıcıya anlamlı ve bilimsel bir rapor sunar.",
  },
];

export function OnlineCourse() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto grid grid-cols-1 place-items-center lg:grid-cols-3">
        <div className="col-span-1 rounded-xl lg:mb-0 mb-12">
          <Image
            width={768}
            height={500}
            src="/image/online-course.jpg"
            className="h-full max-h-[500px] w-full object-cover scale-110 rounded-md"
            alt="online course"
          />
        </div>
        <div className="col-span-2 lg:pl-24">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            myXgenome
          </Typography>
          <Typography
            variant="lead"
            className="mb-5 max-w-lg px-4 text-left text-lg !text-gray-500 lg:px-0  "
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            myXgenome, biyoteknoloji ve yapay zekayı bir araya getirerek genetik
            analizde yeni bir dönemin kapılarını aralıyor. Geleceğin tıbbına
            bugünden adım atın!
          </Typography>

          <div className="col-span-2 grid grid-cols-1 gap-10 sm:grid-cols-3 ">
            {FEATURES.map(({ icon, title, description }) => (
              <FeatureCard key={title} icon={icon} title={title}>
                {description}
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnlineCourse;
