import Sidebar from "./sidebar";
import WarningModal from "./warning-modal";
import TestCard from "./test-card";
import { getDictionary } from "../dictionaries";

const Test = async ({ params }: { params: Promise<{ lng: "en" | "tr" }> }) => {
  const { lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row w-full lg:max-w-screen-2xl justify-between">
        <Sidebar locale={dict.testPage.sidebar}/>
        <TestCard locale={dict.testPage.testCard}/>
      </div>

      <WarningModal locale={dict.testPage.warningModal} />
      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
    </div>
  );
};

export default Test;
