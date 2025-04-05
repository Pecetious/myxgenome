"use client";
import Microphone from "@/components/microphone";
import MicrophoneConfirmModal from "@/components/medical-scan-microphone-confirm-modal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ErrorModal = dynamic(() => import('./error-modal'), {
  ssr: false,
});
const getSession = (): any | null => {
  try {
    // localStorage'dan 'session' verisini alın
    const sessionData = localStorage.getItem("session");

    // Eğer sessionData varsa ve geçerli bir JSON formatı ise
    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);

      // session objesinin içinde token'a ulaşmaya çalışıyoruz
      return parsedSession || null; // Eğer token yoksa null döner
    }
    return null; // 'session' verisi yoksa null döner
  } catch (error) {
    // Eğer JSON.parse sırasında bir hata oluşursa, null döner
    console.error("JSON parse error:", error);
    return null;
  }
};
const MedicalScanCard = ({
  locale,
  visible = false,
}: {
  locale: any;
  visible: boolean;
}) => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [microphoneConfirmModal, setMicrophoneConfirmModal] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [recordings, setRecordings] = useState<any>([]);
  const [currentRecording, setCurrentRecording] = useState(0);
  const [testCredits, setTestCredits] = useState(0);
  const handleClickedYes = () => {
    console.log("Mikrofon kaydı onaylandı");
    if (currentRecording > 5) {
      return;
    }
    setCurrentRecording(currentRecording + 1);
    console.log(currentRecording);
    console.log(recordings);
  };

  const handleSubmit = async () => {
    const session = getSession();
    if (recordings.length < 3) {
      setError(locale.emptyFeildError);
      return;
    }
    const formData = new FormData();
    formData.append("a_audio", recordings[0], "recording_a.webm");
    formData.append("u_audio", recordings[1], "recording_u.webm");
    formData.append("i_audio", recordings[2], "recording_i.webm");
    formData.append("email", session.email);
    setLoading(true);

    try {
      const { data } = await axios.post("/api/medical-scan", formData, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      console.log(data);
    } catch (err: any) {
      setError(err.response.data.error);
      setErrorOpen(true);
      setTimeout(() => {
        /* trigger  getResults(); */
        setProcessing(false);
      }, 120000);
    } finally {
      setLoading(false);
      /*  await getTestCredits();
      await getResults(); */
      setRecordings([]);
      // setSelfieFile(null);
      setCurrentRecording(0);
    }
  };
  const handleClickedNo = () => {
    console.log("Yeniden kayıt isteniyor.");
    setRecordings((prevRecordings: any[]) => {
      const updatedRecordings = [...prevRecordings];
      updatedRecordings.pop();
      return updatedRecordings;
    });
    console.log(recordings);
    setMicrophoneConfirmModal(false);
  };

  const handleRecordingComplete = (newRecording: any) => {
    setRecordings((prevRecordings: any[]) => {
      const updatedRecordings = [...prevRecordings];
      updatedRecordings[currentRecording] = newRecording;
      return updatedRecordings;
    });
    const url = URL.createObjectURL(newRecording);
    setBlobUrl(url);
    setMicrophoneConfirmModal(true);
  };
  const getTestCredits = async () => {
    const session = getSession();
    try {
      const { data } = await axios.get("/api/get-test-credits", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setTestCredits(data.testCredits); // API'den dönen değeri set et
    } catch (error) {
      console.error("Test kredileri alınırken hata oluştu:", error);
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
            {/* Microphone Component */}
            <div className="p-2 space-y-2 ">
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
                  {currentRecording === 0
                    ? "A"
                    : currentRecording === 1
                    ? "U"
                    : "İ"}{" "}
                  {locale.microphone.soundTest.sound}
                </h3>
                <p className="text-center">
                  {locale.microphone.soundTest.p1}
                  {currentRecording === 0
                    ? "AAA"
                    : currentRecording === 1
                    ? "UUU"
                    : "İİİ"}
                  {locale.microphone.soundTest.p2}
                </p>
              </>
            </div>
            <div className="w-full h-[20vh] flex flex-col items-center justify-center">
              {recordings.length < 6 && (
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
          {processing && (
            <p className="text-yellow-500 text-center mb-2">
              {locale.processing.text}
            </p>
          )}
          {recordings.length === 3 && (
            <Button
              onClick={handleSubmit}
              color="blue"
              size="lg"
              disabled={loading || processing || testCredits === 0}
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
          currentRecording={currentRecording}
          clickedYes={handleClickedYes}
          locale={locale.medicalScanCardConfirmModal}
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

export default MedicalScanCard;
