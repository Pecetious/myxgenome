"use client";

import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      size="md"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      handler={function (value: any): void {
        throw new Error("Function not implemented.");
      }}
    >
      <DialogHeader
        className="text-red-500 text-lg font-semibold"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        ⚠ Uyarı ve Yasal Bilgilendirme
      </DialogHeader>
      <DialogBody
        className="text-gray-700 text-sm space-y-1 md:space-y-3 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <p>
          📌 <strong>Bilgilendirme Amaçlıdır:</strong> MyXGenome raporu tıbbi
          bir teşhis veya tedavi aracı değildir.
        </p>
        <p>
          📌 <strong>Tıbbi Danışmanlık Yerine Geçmez:</strong> Genetik analiz
          sonuçlarınız hakkında detaylı bilgi almak veya sağlık durumunuzla
          ilgili karar vermek için mutlaka bir doktor, genetik danışman veya
          sağlık uzmanına başvurunuz.
        </p>
        <p>
          📌 <strong>Genetik Yatkınlık Kesinlik Anlamına Gelmez:</strong> Bu
          analizler belirli hastalıklar veya durumlar için olası genetik
          eğilimlerinizi gösterir, ancak kesin sonuçlar vermez.
        </p>
        <p>
          📌 <strong>Veri Güvenliği:</strong> Kişisel genetik verileriniz
          gizlilik çerçevesinde korunur ve üçüncü şahıslarla paylaşılmaz.
        </p>
        <p>
          📌 <strong>Kullanıcı Sorumluluğu:</strong> Bu raporda yer alan
          bilgileri kişisel sağlık kararları almak için kullanmadan önce bir
          uzmana danışmanız önerilir.
        </p>
        <p>
          💡 MyXGenome, size genetik bilginiz hakkında önemli içgörüler sunar,
          ancak sağlıkla ilgili nihai kararlarınızı profesyonel sağlık
          uzmanlarıyla değerlendirmeniz önemlidir.
        </p>
      </DialogBody>
      <DialogFooter
        className="w-full flex md:flex-col gap-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          color="red"
          size="sm"
          onClick={() => router.replace("/")}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Onaylamıyorum
        </Button>
        <Button
          color="blue"
          size="sm"
          onClick={onClose}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Onaylıyorum
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default WarningModal;
