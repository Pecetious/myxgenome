import { CameraIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";

interface Props {
  onFileSelected: (selectedFile: any) => void;
}

const Selfie: FC<Props> = ({ onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      onFileSelected(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="flex flex-col items-center bg-white rounded-lg cursor-pointer w-full text-center">
        <span className="flex gap-2 items-center text-gray-800 bg-blue-gray-100 p-3 rounded-full hover:bg-blue-gray-200 transition-all ease-in-out">
          <CameraIcon strokeWidth={2} className="size-5" />
          Fotoğraf Seç
        </span>
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
        {file && (
          <span className="text-sm text-gray-500">
            {" "}
            <CameraIcon strokeWidth={2} />
            {file.name}
          </span>
        )}
      </label>

      {filePreview && (
        <div className="mt-2">
          <img
            src={filePreview}
            alt="Preview"
            className="max-w-full max-h-[300px] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Selfie;
