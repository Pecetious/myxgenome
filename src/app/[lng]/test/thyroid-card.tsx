"use client";

import Microphone from "@/components/microphone";
import MicrophoneConfirmModal from "@/components/microphone-confirm-modal";
import getSession from "@/utils/getSession";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorModal from "./error-modal";
import { useRouter } from "next/navigation";

const ThyroidCard = ({
  locale,
  visible = false,
  refreshList,
}: {
  locale: any;
  visible: boolean;
  refreshList: () => void;
}) => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [microphoneConfirmModal, setMicrophoneConfirmModal] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [recording, setRecording] = useState<any>(null);
  const [testCredits, setTestCredits] = useState(0);
  const router = useRouter();
  const getTestCredits = async () => {
    const session = getSession();
    try {
      const { data } = await axios.get("/api/get-test-credits", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setTestCredits(data.testCredits.thyroid);
      console.log(data.testCredits.thyroid); // API'den dönen değeri set et
    } catch (error) {
      console.error("Test kredileri alınırken hata oluştu:", error);
    }
  };
  const handlePurchaseTestCredits = () => {
    const session = getSession();
    localStorage.setItem(
      "session",
      JSON.stringify({
        ...session, // Eski session verilerini koru
        selectedPackage: {
          // Yeni selectedPackage verisini ekle
          title: locale.purchaseTestCreditsTitle,
          type: session.subscriptionType,
          testCredits: 1,
          price: "80 ₺",
          testType: "thyroid",
        },
      })
    );
    router.push(`/${locale.lang}/payment`);
  };
  const handleClickedYes = () => {
    console.log("Mikrofon kaydı onaylandı.");
    setMicrophoneConfirmModal(false);
  };
  const handleClickedNo = () => {
    console.log("Yeniden kayıt isteniyor.");
    setRecording(null);
    setMicrophoneConfirmModal(false);
  };
  const handleRecordingComplete = (newRecording: any) => {
    setRecording(newRecording);
    const url = URL.createObjectURL(newRecording);
    setBlobUrl(url);
    setMicrophoneConfirmModal(true);
  };
  const handleSubmit = async () => {
    const session = getSession();
    if (recording === null) {
      setError(locale.emptyFieldError);
      return;
    }
    const formData = new FormData();
    formData.append("u_audio", recording, "recording_u.webm");
    formData.append("email", session.email);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/thyroid-test", formData, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      console.log(data);
    } catch (err: any) {
      setError(err.response.data.error);
      setErrorOpen(true);
    } finally {
      setLoading(false);
      setRecording(null);
      refreshList();
      getTestCredits();
    }
  };
  useEffect(() => {
    getTestCredits();
  }, []);
  return (
    <>
      <Card
        className={`w-full md:w-3/4 shadow-lg shadow-gray-200 ${
          visible ? "" : "hidden"
        }`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="lg:flex lg:gap-10"
        >
          <div className="mb-4 w-full">
            <div className="max-w-fit mb-4">
              <ListItem
                className="shadow-md hover:bg-white hover:cursor-default"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  variant="h5"
                  className="text-nowrap mr-4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {locale.remainingCredits}
                </Typography>
                <ListItemSuffix
                  className="flex gap-5"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Chip
                    value={testCredits}
                    variant="ghost"
                    className="text-lg"
                  />
                  <Button
                    variant="outlined"
                    className="text-nowrap"
                    onClick={handlePurchaseTestCredits}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {locale.addTestCredits}
                  </Button>
                </ListItemSuffix>
              </ListItem>
            </div>
            <div className="p-2 space-y-2">
              <div className="font-bold border-blue-gray-500 border w-fit p-2 mx-auto rounded-lg shadow-md animate-breathing">
                <h3 className="font-bold text-center">
                  {locale.microphone.beforeYouBegin}
                </h3>
                <ul className="list-decimal list-inside ">
                  <li>{locale.microphone.beforeYouBeginList[0]}</li>
                  <li>{locale.microphone.beforeYouBeginList[1]}</li>
                </ul>
              </div>
              <>
                <h3 className="font-bold text-center">
                  {locale.microphone.soundTest.title}
                </h3>
                <p className="text-center">
                  {locale.microphone.soundTest.text}
                </p>
              </>
            </div>
            <div className="w-full h-[20vh] flex flex-col items-center justify-center">
              {!recording && (
                <>
                  <Microphone
                    onRecordComplete={handleRecordingComplete}
                    openModal={() => setMicrophoneConfirmModal(true)}
                  />
                  <Typography
                    variant="paragraph"
                    color="deep-orange"
                    className="my-2 font-bold text-lg text-center text-pretty"
                    style={{ color: "red" }}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {locale.microphone.externalMicText}
                  </Typography>
                </>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter
          className="flex justify-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {recording && (
            <Button
              onClick={handleSubmit}
              color="blue"
              size="lg"
              disabled={loading || testCredits === 0}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="animate-breathing"
            >
              {testCredits === 0
                ? locale.processing.insufficientTestCredits
                : loading
                ? locale.processing.loading
                : locale.processing.init}
            </Button>
          )}
        </CardFooter>
      </Card>
      {microphoneConfirmModal && (
        <MicrophoneConfirmModal
          open={microphoneConfirmModal}
          clickedNo={handleClickedNo}
          closeModal={() => setMicrophoneConfirmModal(false)}
          recordingUrl={blobUrl}
          clickedYes={handleClickedYes}
          locale={locale.thyroidTestMicrophoneConfirmModal}
        />
      )}
      <ErrorModal
        locale={locale.errorModal}
        visible={isErrorOpen}
        errorMessage={error}
      />
    </>
  );
};

export default ThyroidCard;
