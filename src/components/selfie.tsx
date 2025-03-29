import { FC, useState } from "react";
interface Props {
  onFileSelected: (selectedFile: any) => void;
}
const Selfie: FC<Props> = ({ onFileSelected }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Dosya seçildiyse, önizleme URL'si oluştur
    if (selectedFile) {
      const previewUrl: any = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);

      // Dosyayı dışarıya aktarma (parent bileşene)
      onFileSelected(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleFileChange}
        className="my-2"
      />

      {/* Dosyanın önizlemesi */}
      {filePreview && (
        <div>
          <img
            src={filePreview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Selfie;
