"use client"
import { Typography } from "@material-tailwind/react"

const Title = ({status,locale}: {status: string,locale: any}) => {
    return (
        <Typography
        variant="h1"
        className={`font-semibold text-center drop-shadow-lg ${
          status === "success" ? "text-light-green-300 " : "text-red-500 "
        }`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {status === "success" ? locale.success : locale.fail}
      </Typography>
    )
}

export default Title