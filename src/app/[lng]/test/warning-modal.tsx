"use client";

import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WarningModal = ({locale}: {locale: any}) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(true);
  const testWarning = localStorage.getItem("test-warning");
  useEffect(() => {
    if (testWarning ==="accepted") {
      setOpen(false);
    }
  }, []);
  return (
    <Dialog
      open={isOpen}
      size="md"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      handler={function (value: any): void {
        throw new Error("Function not implemented.");
      }}
    >
      <DialogHeader
        className="text-red-500 text-lg font-semibold"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        ⚠ {locale.dialogHeader}
      </DialogHeader>
      <DialogBody
        className="text-gray-700 text-sm space-y-1 md:space-y-3 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {locale.dialogBody.map((rule: any, index: number) =>(
        <p key={index}>
          📌 <strong>{rule.title}</strong> {rule.text}
        </p>

        ) )}
       
        <p>
          💡 {locale.dialogBodyEnd}
        </p>
      </DialogBody>
      <DialogFooter
        className="w-full flex md:flex-col gap-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          color="red"
          size="sm"
          onClick={() => router.replace("/")}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {locale.dialogFooter.disagree}
        </Button>
        <Button
          color="blue"
          size="sm"
          onClick={() => {
            localStorage.setItem("test-warning", "accepted");
            setOpen(false);
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {locale.dialogFooter.agree}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default WarningModal;
