import React from "react";
import ReportCard from "./report-card";
import { getDictionary } from "../../dictionaries";

const Report = async ({
  params,
}: {
  params: Promise<{ lng: "en" | "tr"; report: string }>;
}) => {
  const { report, lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="min-h-screen w-full bg-gray-900/60 pt-[74px] flex justify-center">
      <div className="w-full lg:max-w-screen-2xl flex flex-col mx-auto">
        <ReportCard report={decodeURIComponent(report)} locale={dict.reportPage.card} />
      </div>
    </div>
  );
};

export default Report;
