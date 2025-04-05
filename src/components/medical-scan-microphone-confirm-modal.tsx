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
  locale: any
}
const MicrophoneConfirmModal: FC<Props> = ({
  open,
  clickedNo,
  clickedYes,
  closeModal,
  recordingUrl,
  currentRecording,
  locale
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
          {locale.currentRecording[currentRecording]}
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
          <span>{locale.tryAgain}</span>
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
          <span>{locale.confirm}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MicrophoneConfirmModal;
