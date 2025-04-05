"use client";
import { useRef, useState } from "react";
import MedicalScanCard from "./medical-scan-card";
import TestCard from "./race-test-card";
import Sidebar from "./sidebar";
import ThyroidCard from "./thyroid-card";

const MainCard = ({ locale }: { locale: any }) => {
  const [openTest, setOpenTest] = useState(0);
  const triggerRefresh = (fn: () => void) => {
    // bunu ThyroidCard içinden çağıracağız
    refreshCallback.current = fn;
  };
  
  const refreshCallback = useRef<() => void>();
  
  const handleTestDone = () => {
    if (refreshCallback.current) {
      refreshCallback.current(); 
    }
  };
  
  return (
    <>
      <Sidebar
        locale={locale.sidebar}
        openRaceTest={() => setOpenTest(0)}
        openMedicalScan={() => setOpenTest(1)}
        openThyroidTest={() => setOpenTest(2)}
        triggerRefresh={triggerRefresh}
      />
      <TestCard locale={locale.testCard} visible={openTest === 0} refreshList={handleTestDone} />
      <MedicalScanCard locale={locale.testCard} visible={openTest === 1} refreshList={handleTestDone}/>
      <ThyroidCard
        locale={locale.thyroidCard}
        visible={openTest === 2}
        refreshList={handleTestDone}
      />
    </>
  );
};
export default MainCard;
