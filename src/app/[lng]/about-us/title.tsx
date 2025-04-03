"use client"
import { Typography } from "@material-tailwind/react";
import { motion } from "motion/react";
const Title = ({text}: {text: any}) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h1"
          color="white"
          className="text-center my-6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {text}
        </Typography>
      </motion.div>
    )
}
export default Title