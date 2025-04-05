"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const ErrorModal = ({
  locale,
  visible,
  errorMessage,
}: {
  locale: any;
  visible: boolean;
  errorMessage: string;
}) => {
  console.log(errorMessage);
  return (
    <Dialog
      open={visible}
      size="sm"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      handler={function (value: any): void {
        throw new Error("Function not implemented.");
      }}
    >
      <DialogHeader
        className="text-lg font-semibold text-red-500"
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
        {errorMessage &&
          (errorMessage.includes("Aynı anda yalnızca bir test yapabilirsiniz.")
            ? locale.dialogBody.oneTestOnly
            : errorMessage.includes("Fotoğrafta herhangi bir yüz bulunamadı.")
            ? locale.dialogBody.noFaceFound
            : locale.dialogBody.moreThanOneFaceFound)}
      </DialogBody>
      <DialogFooter
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {locale.dialogFooter.button}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
export default ErrorModal;
