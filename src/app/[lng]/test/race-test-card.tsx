"use client";
import Microphone from "@/components/microphone";
import MicrophoneConfirmModal from "@/components/microphone-confirm-modal";
import Selfie from "@/components/selfie";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ErrorModal = dynamic(() => import("./error-modal"), {
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
const TestCard = ({
  locale,
  visible = true,
  refreshList,
}: {
  locale: any;
  visible: boolean;
  refreshList: () => void;
}) => {
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [microphoneConfirmModal, setMicrophoneConfirmModal] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [recordings, setRecordings] = useState<any>([]);
  const [currentRecording, setCurrentRecording] = useState(0);
  const [testCredits, setTestCredits] = useState(0);
  const router = useRouter();
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
    if (!selfieFile || !blobUrl) {
      setError(locale.emptyFeildError);
      return;
    }
    const formData = new FormData();
    formData.append("selfie", selfieFile, "selfie.jpg");
    formData.append("cough_audio1", recordings[0], "cough_1.webm");
    formData.append("cough_audio2", recordings[1], "cough_2.webm");
    formData.append("cough_audio3", recordings[2], "cough_3.webm");
    formData.append("a_audio", recordings[3], "recording_a.webm");
    formData.append("u_audio", recordings[4], "recording_u.webm");
    formData.append("i_audio", recordings[5], "recording_i.webm");
    formData.append("email", session.email);
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/process-image-and-voice",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      console.log(data);
    } catch (err: any) {
      setError(err.response.data.error);
      setErrorOpen(true);
      console.error(err);
      setTimeout(() => {
        /* trigger  getResults(); */
        setProcessing(false);
      }, 120000);
    } finally {
      setLoading(false);
      setRecordings([]);
      setCurrentRecording(0);
      refreshList();
      getTestCredits();
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
  const handleFileSelected = (file: File) => {
    setSelfieFile(file);
  };
  const getTestCredits = async () => {
    const session = getSession();
    try {
      const { data } = await axios.get("/api/get-test-credits", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setTestCredits(data.testCredits.race); // API'den dönen değeri set et
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
          title: locale.purchaseRaceTestCreditsTitle,
          type: session.subscriptionType,
          testCredits: 1,
          price: "100 ₺",
          testType: "race",
        },
      })
    );
    router.push(`/${locale.lang}/payment`);
  };
  useEffect(() => {
    setSession(getSession());
    /*  const accepted = localStorage.getItem("test-warning");
    if (accepted) {
      setWarningModalOpen(false);
    } */
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
          className="flex flex-col gap-10"
        >
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
                <Chip value={testCredits} variant="ghost" className="text-lg" />
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
          <div className="lg:flex lg:gap-10">
            <div className="mb-4 w-full">
              {/* Selfie Component */}
              <div className="w-full h-full flex flex-col space-y-5 items-center justify-center p-2">
                <p className="text-lg text-center">{locale.selfie.test}</p>
                <Selfie
                  onFileSelected={handleFileSelected}
                  title={locale.selfie.buttonTitle}
                />
              </div>
            </div>
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
                {currentRecording < 3 ? (
                  <div className="p-2 text-center">
                    <h3 className="font-bold text-center">
                      {locale.microphone.coughTest.title}
                    </h3>
                    <p>{locale.microphone.coughTest.p1}</p>
                    <p>{locale.microphone.coughTest.p2}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-center">
                      {currentRecording === 3
                        ? "A"
                        : currentRecording === 4
                        ? "U"
                        : "İ"}{" "}
                      {locale.microphone.soundTest.sound}
                    </h3>
                    <p className="text-center">
                      {locale.microphone.soundTest.p1}
                      {currentRecording === 3
                        ? "AAA"
                        : currentRecording === 4
                        ? "UUU"
                        : "İİİ"}{" "}
                      {locale.microphone.soundTest.p2}
                    </p>
                  </>
                )}
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
          {selfieFile && recordings.length === 6 && (
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
          locale={locale.raceTestCardConfirmModal}
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

export default TestCard;
