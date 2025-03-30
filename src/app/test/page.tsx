"use client";
import Microphone from "@/components/microphone";
import MicrophoneConfirmModal from "@/components/microphone-confirm-modal";
import Selfie from "@/components/selfie";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import WarningModal from "./warning-modal";

const Test = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [currentRecording, setCurrentRecording] = useState(0);
  const [recordings, setRecordings] = useState<any>([]);
  const [microphoneConfirmModal, setMicrophoneConfirmModal] = useState(false);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [resultsList, setResultsList] = useState<any>(null);
  const [testCredits, setTestCredits] = useState<number>(0);
  const [warningModalOpen, setWarningModalOpen] = useState(true);
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
  const handleSubmit = async () => {
    const session = getSession();
    if (!selfieFile || !blobUrl) {
      setError("Lütfen tüm alanları doldurduğunuzdan emin olun.");
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
    } catch (err) {
      setError(err);
      console.error(err);
      setTimeout(() => {
        getResults();
        setProcessing(false);
      }, 120000);
    } finally {
      setLoading(false);
      await getTestCredits();
      setRecordings([]);
      setSelfieFile(null);
      setCurrentRecording(0);
    }
  };

  const handleRecordingComplete = (newRecording: any) => {
    setRecordings((prevRecordings: any[]) => {
      const updatedRecordings = [...prevRecordings];
      updatedRecordings[currentRecording] = newRecording;
      return updatedRecordings;
    });

    console.log(newRecording);
    const url = URL.createObjectURL(newRecording);
    setBlobUrl(url);
    setMicrophoneConfirmModal(true);
  };

  const handleFileSelected = (file: File) => {
    setSelfieFile(file);
  };

  const handleClickedYes = () => {
    console.log("Mikrofon kaydı onaylandı");
    if (currentRecording > 5) {
      return;
    }
    setCurrentRecording(currentRecording + 1);
    console.log(currentRecording);
    console.log(recordings);
  };
  const getResults = async () => {
    const session = getSession();
    const { data } = await axios.get("/api/get-results", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    setResultsList(data);
    console.log(data);
  };
  useEffect(() => {
    const accepted = localStorage.getItem("test-warning");
    if (accepted) {
      setWarningModalOpen(false);
    }
    getResults();
    getTestCredits();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row w-full lg:max-w-screen-2xl justify-between">
        <Sidebar list={resultsList} credits={testCredits} />
        <Card
          className="w-full md:w-3/4 shadow-lg shadow-gray-200 "
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
              {/* Selfie Component */}
              <div className="w-full h-full flex flex-col space-y-5 items-center justify-center p-2">
                <p className="text-lg text-center">
                  Yüzünüzün net bir şekilde göründüğü bir selfie&apos;nizi
                  ekleyin.
                </p>
                <Selfie onFileSelected={handleFileSelected} />
              </div>
            </div>
            <div className="mb-4 w-full">
              {/* Microphone Component */}
              <div className="p-2 space-y-2 ">
                <div className="font-bold border-blue-gray-500 border w-fit p-2 mx-auto rounded-lg shadow-md animate-breathing">
                  <h3 className="font-bold">Teste Başlamadan Önce</h3>
                  <ul className="list-decimal list-inside ">
                    <li>Sessiz bir ortama geçin.</li>
                    <li>Derin bir nefes alın.</li>
                  </ul>
                </div>
                {currentRecording < 3 ? (
                  <div className="p-2 text-center">
                    <h3 className="font-bold text-center">Öksürük Testi</h3>
                    <p>
                      Bu aşamada sizden arka arkaya 3 öksürük kaydı alınacaktır.
                    </p>
                    <p>
                      Lütfen her kayıtta net ve belirgin bir şekilde öksürünüz.
                      İşlem sırasında mikrofona yakın olun ve arka planda
                      gürültü olmamasına dikkat edin.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-center">
                      {currentRecording === 3
                        ? "A"
                        : currentRecording === 4
                        ? "U"
                        : "İ"}{" "}
                      Sesi
                    </h3>
                    <p className="text-center">
                      Lütfen kesintisiz ve net bir şekilde{" "}
                      {currentRecording === 3
                        ? "AAA"
                        : currentRecording === 4
                        ? "UUU"
                        : "İİİ"}{" "}
                      sesi çıkarınız. İşlem sırasında mikrofona yakın olun ve
                      arka planda gürültü olmamasına dikkat edin.
                    </p>
                  </>
                )}
              </div>
              <div className="w-full h-[20vh] flex items-center justify-center">
                {recordings.length < 6 && (
                  <Microphone
                    onRecordComplete={handleRecordingComplete}
                    openModal={() => setMicrophoneConfirmModal(true)}
                  />
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
                İşleminiz devam ediyor, bu birkaç dakika sürebilir. İşlem
                bittiğinde sonucunuzu listede göreceksiniz.
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
                  ? "Yetersiz test kredisi"
                  : loading
                  ? "Yükleniyor..."
                  : "Gönder"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      {microphoneConfirmModal && (
        <MicrophoneConfirmModal
          open={microphoneConfirmModal}
          closeModal={() => setMicrophoneConfirmModal(false)}
          recordingUrl={blobUrl}
          currentRecording={currentRecording}
          clickedYes={handleClickedYes}
        />
      )}
      <WarningModal
        isOpen={warningModalOpen}
        onClose={() => {
          localStorage.setItem("test-warning", "accepted");
          setWarningModalOpen(false);
        }}
      />
      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
    </div>
  );
};

export default Test;
