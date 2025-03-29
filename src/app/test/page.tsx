"use client";
import Microphone from "@/components/microphone";
import MicrophoneConfirmModal from "@/components/microphone-confirm-modal";
import Selfie from "@/components/selfie";
import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

const Test = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [recording, setRecording] = useState<any>(null);
  const [microphoneConfirmModal, setMicrophoneConfirmModal] = useState(false);
  const [selfieFile, setSelfieFile] = useState<File | null>(null); // Selfie file state
  const [email, setEmail] = useState(""); // Email state
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
  const handleSubmit = async () => {
    const session = getSession();
    if (!selfieFile || !blobUrl) {
      setError("Lütfen tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    // Verileri toplamak için FormData nesnesi oluşturuyoruz
    const formData = new FormData();
    formData.append("selfie", selfieFile, "selfie.jpg"); // Selfie dosyasını formData'ya ekle
    formData.append("u_audio", recording, "recording_u.webm"); // Mikrofon kaydını formData'ya ekle
    formData.append("email", session.email); // Email'i formData'ya ekle

    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/process-image-and-voice",
        formData
      );
    } catch (err) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecordingComplete = (newRecording: any) => {
    const formData = new FormData();
    setRecording(newRecording);
    console.log(newRecording);
    formData.append("u_audio", newRecording, "recording_u.webm");
    const url = URL.createObjectURL(newRecording);
    setBlobUrl(url);
    setMicrophoneConfirmModal(true);
  };

  const handleFileSelected = (file: File) => {
    setSelfieFile(file); // Selfie dosyasını state'e kaydediyoruz
  };

  const handleClickedYes = () => {
    console.log("Mikrofon kaydı onaylandı");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card
        className="max-w-lg p-6 shadow-lg "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="mb-4">
            {/* Selfie Component */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center p-2">
              <Selfie onFileSelected={handleFileSelected} />
            </div>
          </div>
          <div className="mb-4">
            {/* Microphone Component */}
            <div className="w-full h-[20vh] bg-gray-200 flex items-center justify-center">
              <Microphone
                onRecordComplete={handleRecordingComplete}
                openModal={() => setMicrophoneConfirmModal(true)}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter
          className="flex justify-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            onClick={handleSubmit}
            color="blue"
            disabled={loading}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {loading ? "Yükleniyor..." : "Gönder"}
          </Button>
        </CardFooter>
      </Card>
      {microphoneConfirmModal && (
        <MicrophoneConfirmModal
          open={microphoneConfirmModal}
          closeModal={() => setMicrophoneConfirmModal(false)}
          recordingUrl={blobUrl}
          clickedYes={handleClickedYes}
        />
      )}
      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
    </div>
  );
};

export default Test;
