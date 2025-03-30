import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { FC } from "react";
interface Props {
  open: boolean;
  clickedNo: () => void;
  clickedYes: () => void;
  closeModal: () => void;
  recordingUrl: string;
  currentRecording: number;
}
const MicrophoneConfirmModal: FC<Props> = ({
  open,
  clickedNo,
  clickedYes,
  closeModal,
  recordingUrl,
  currentRecording,
}) => {
  return (
    <Dialog
      open={open}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      handler={function (value: any): void {
        throw new Error("Function not implemented.");
      }}
    >
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          color="black"
          className="font-semibold my-2 p-2"
        >
          {currentRecording === 0
            ? "Öksürük sesini duyuyor musunuz? (1.adım)"
            : currentRecording === 1
            ? "Öksürük sesini duyuyor musunuz? (2.adım)"
            : currentRecording === 2
            ? "Öksürük sesini duyuyor musunuz? (3.adım)"
            : currentRecording === 3
            ? "'A' sesini duyabiliyor musunuz?"
            : currentRecording === 4
            ? "'U' sesini duyabiliyor musunuz?"
            : currentRecording === 5
            ? "'İ' sesini duyabiliyor musunuz ?"
            : ""}
        </Typography>
        <audio controls src={recordingUrl} className="mb-4 w-full" />
      </DialogBody>
      <DialogFooter
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="text"
          color="red"
          onClick={clickedNo}
          className="mr-1"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <span>Tekrar Dene</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            clickedYes();
            closeModal();
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <span>Evet</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MicrophoneConfirmModal;
