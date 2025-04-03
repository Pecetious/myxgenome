"use client";
import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import EthnicityMap from "./ethnicity-map";
import Offcanvas from "./offcanvas";

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


const Report = () => {
  const params: any = useParams();
  const report = decodeURIComponent(params.report);
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [offcanvasData, setOffcanvasData] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<string>("heritage");

  const openOffcanvas = (section: string, title: string) => {
    setOffcanvasData({
      ...offcanvasData,
      title,
    });
    setOffcanvasVisible(true);
    setSelectedSection(section);
  };
  const navItems = [
    {
      title: "Genel Analiz",
      section: "general-analysis",
    },
    {
      title: "Genler",
      section: "genes",
    },
    {
      title: "Soy ve Genetik Köken Analizi",
      section: "heritage",
    },
    {
      title: "Bağışıklık Sistemi Profili",
      section: "immune-system",
    },
    /*  {
      title: "Hastalıklar",
      section: "diseases",
    }, */
  ];
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
      console.log(data);
      setResultData(data.result);
      setOffcanvasData({
        title: "Soy ve Genetik Köken Analizi",
        section_data: data.result,
      });
      setOffcanvasVisible(true);
    };
    getResult();
  }, [report]);
  return (
    <div className="min-h-screen w-full bg-gray-900/60 pt-[74px] flex justify-center">
      <div className="w-full lg:max-w-screen-2xl flex flex-col mx-auto">
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
                handleOffcanvas={() => openOffcanvas(item.section, item.title)}
              />
            ))}
          </Navbar>
        )}
        <div className="flex flex-col md:flex-row order-1 md:order-2">
          <Offcanvas/>
          {resultData && <EthnicityMap />}
        </div>
      </div>
    </div>
  );
};

export default Report;
