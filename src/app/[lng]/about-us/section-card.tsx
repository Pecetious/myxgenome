"use client"
import { Card, CardBody, Typography } from "@material-tailwind/react"

const SectionCard = ({locale}: {locale: any}) => {
    return (
        <Card
        className="mb-6 bg-opacity-40 backdrop-blur-md"
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
            color="white"
            className="mb-4 text-2xl md:text-3xl text-center md:text-start"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.title}
          </Typography>
          <Typography
            color="black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
           {locale.text}
          </Typography>
        </CardBody>
      </Card>

    )
}
export default SectionCard