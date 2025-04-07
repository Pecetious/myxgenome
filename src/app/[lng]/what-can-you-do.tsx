"use client";

import WhatCanYouDoCard from "@/components/what-can-you-do-card";
import { Alert, Typography } from "@material-tailwind/react";

const WhatCanYouDo = ({ locale }: { locale: any }) => {
  return (
    <div className="w-full lg:max-w-screen-xl lg:mx-auto min-h-screen mb-32">
      <Typography
        variant="h4"
        color="blue-gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="w-full md:max-w-1/10 p-2 text-4xl md:text-3xl mx-auto text-center mb-4"
      >
        {locale.title}
      </Typography>
      <div className="flex flex-col gap-10 md:grid grid-cols-2 md:gap-4">
        {locale.cardContents.map((card: any) => (
          <WhatCanYouDoCard locale={card} key={card.number} />
        ))}
      </div>
      <Alert className="w-fit md:w-full items-center justify-center m-1  my-4">
        <div className="-mr-12">
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="h2"
            className="text-center font-bold text-blue-gray-50"
          >
            {locale.generalNoteTitle}
          </Typography>
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="text-sm md:text-base  my-10 font-semibold text-blue-gray-50 w-full p-2 mx-auto"
          >
            {locale.generalNote}
          </Typography>
        </div>
      </Alert>
    </div>
  );
};

export default WhatCanYouDo;
