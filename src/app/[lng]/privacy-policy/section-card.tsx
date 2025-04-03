"use client"
import { Card, CardBody, Typography } from "@material-tailwind/react"

const SectionCard = ({locale}: {locale: any}) => {
    return (
        <Card
        className="my-3"
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
            variant="h6"
            color="black"
            className="font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.title}
          </Typography>
          <Typography
            className="text-black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            children={undefined}
            dangerouslySetInnerHTML={{"__html": locale.text}}
          />

        </CardBody>
      </Card>
    )
}
export default SectionCard