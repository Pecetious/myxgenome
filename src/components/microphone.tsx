"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type MicrophoneProps = {
  onRecordComplete: (audioBlob: Blob) => void;
  openModal: () => void;
};

const Microphone: React.FC<MicrophoneProps> = ({
  onRecordComplete,
  openModal,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      onRecordComplete(audioBlob);
      setIsRecording(false);
      openModal();
    };

    mediaRecorderRef.current.start();
    setTimeout(() => {
      mediaRecorderRef.current?.stop();
    }, 4000);
  };

  return (
    <div className="flex items-center justify-center h-8 my-5">
      <button
        className="relative h-30 flex items-center mb-5"
        onClick={startRecording}
        disabled={isRecording}
      >
        <AnimatePresence mode="wait">
          {!isRecording ? (
            <motion.div
              key="mic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                className="absolute w-24 h-24 bg-indigo-700 rounded-full opacity-50"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <img
                src="/icons/mic.svg"
                className="w-16 h-16 bg-indigo-700 rounded-full p-1 "
                alt="Microphone"
              />
            </motion.div>
          ) : (
            <motion.div
              key="wave"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex gap-1"
            >
              {[1, 2, 3, 4, 5].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-3 bg-indigo-700 rounded-md"
                  animate={{
                    height: [10, 40, 20, 35, 15, 10],
                    y: [-10, 10, -5, 5, -10],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: bar * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default Microphone;
