import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}
export function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <Card
      color="transparent"
      shadow={false}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        className="grid place-items-start px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-3 grid place-content-center rounded-lg text-left text-blue-gray-900">
          <Image height={30} width={30} alt={title} src={icon} />
        </div>
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
          className="text-gray-500 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default FeatureCard;
