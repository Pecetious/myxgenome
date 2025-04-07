"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";

const WhatCanYouDoCard = ({ locale }: { locale: any }) => {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white text-center">
        <h2 className="text-lg md:text-xl font-bold tracking-wide">
          {locale.number}. {locale.title}
        </h2>
        <p className="text-sm md:text-base italic mt-1 opacity-90">
          {locale.slogan}
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          {locale.bodyText}
        </p>

        <div className="border-t pt-4">
          <p className="text-xs md:text-sm text-red-600 font-medium leading-snug">
            {locale.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatCanYouDoCard;
