"use client";
import { Navbar } from "@material-tailwind/react";
import EthnicityMap from "./ethnicity-map";
import Offcanvas from "./offcanvas";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import MedicalScanResult from "./medical-scan-result";

interface NavbarItemProps {
  title: string;
  section: string;
  selected: boolean;
  handleOffcanvas: () => void;
}

const NavbarItem: FC<NavbarItemProps> = ({
  title,
  section,
  selected = false,
  handleOffcanvas,
}) => {
  return (
    <a
      className={`w-screen md:w-fit md:text-nowrap md:text-center text-sm  md:text-lg mx-5 md:p-2 md:m-4 hover:cursor-pointer hover:text-green-800 hover:border-b-2 hover:border-b-green-800 transition-all ease-in-out ${
        selected ? "text-green-800" : "text-black"
      }`}
      onClick={handleOffcanvas}
    >
      {title}
    </a>
  );
};
const getSession = (): any | null => {
  try {
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      return parsedSession || null;
    }
    return null;
  } catch (error) {
    console.error("JSON parse error:", error);
    return null;
  }
};
const ReportCard = ({ report, locale }: { report: any; locale: any }) => {
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [testType,setTestType] = useState("")
  const [resultData, setResultData] = useState<any>(null);
  const [offcanvasData, setOffcanvasData] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<string>("heritage");
  const navItems = [
    {
      title: locale.offcanvasTitles[0],
      section: "general-analysis",
    },
    {
      title: locale.offcanvasTitles[1],
      section: "genes",
    },
    {
      title: locale.offcanvasTitles[2],
      section: "heritage",
    },
    {
      title: locale.offcanvasTitles[3],
      section: "immune-system",
    },
    /*  {
      title: "Hastalıklar",
      section: "diseases",
    }, */
  ];
  const openOffcanvas = (section: string, title: string) => {
    setOffcanvasData({
      ...offcanvasData,
      title,
    });
    setOffcanvasVisible(true);
    setSelectedSection(section);
  };
  useEffect(() => {
    const getResult = async () => {
      const session = getSession();
      const { data } = await axios.post(
        "/api/get-result",
        {
          date: report,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      setResultData(data.result);
      setTestType(data.test_type)
      setOffcanvasData({
        title: locale.offcanvasTitles[2],
        section_data: data.result,
      });
      setOffcanvasVisible(true);
    };
    getResult();
  }, [report]);
  return (
    <>
      {testType && testType.includes("race") && (
        <>
          {resultData && (
            <Navbar
              className="rounded-none border-b-2 border-b-gray-400 order-2 md:order-1 flex flex-row overflow-x-scroll sm:overflow-hidden items-center text-nowrap  min-h-20"
              color="white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {navItems.map((item) => (
                <NavbarItem
                  key={item.title}
                  title={item.title}
                  section={item.section}
                  selected={selectedSection === item.section}
                  handleOffcanvas={() =>
                    openOffcanvas(item.section, item.title)
                  }
                />
              ))}
            </Navbar>
          )}
          <div className="flex flex-col md:flex-row order-1 md:order-2">
            <Offcanvas
              locale={locale.offcanvas}
              data={offcanvasData}
              visible={offcanvasVisible}
            />
            {resultData && <EthnicityMap />}
          </div>
        </>
      )}
      {testType && testType.includes("medical") && <MedicalScanResult data={resultData} locale={locale.medicalScanResult} />}
    </>
  );
};
export default ReportCard;
