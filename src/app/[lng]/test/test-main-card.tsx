"use client";
import { useState } from "react";
import MedicalScanCard from "./medical-scan-card";
import TestCard from "./race-test-card";
import Sidebar from "./sidebar";

const MainCard = ({ locale }: { locale: any }) => {
  const [openTest, setOpenTest] = useState(0);
  return (
    <>
      <Sidebar
        locale={locale.sidebar}
        openMedicalScan={() => setOpenTest(1)}
        openRaceTest={() => setOpenTest(0)}
      />
      <TestCard locale={locale.testCard} visible={openTest === 0} />
      <MedicalScanCard locale={locale.testCard} visible={openTest === 1} />

    </>
  );
};
export default MainCard;
