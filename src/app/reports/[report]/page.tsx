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
interface OffcanvasProps {
  visible: boolean;
  data: any;
}
const Offcanvas: FC<OffcanvasProps> = ({ visible = false, data = null }) => {
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    const sessionData = getSession();
    setSession(sessionData);
  }, []);
  const races = [
    "White",
    "Black",
    "Latino / Hispanic",
    "East Asian",
    "Southeast Asian",
    "Indian",
    "Middle Eastern",
  ];
  /* 

const ethnicityColors = {
  White: "rgba(255, 0, 0, 0.7)", // Kırmızı
  Black: "rgba(255, 165, 0, 0.7)", // Turuncu
  Latino_Hispanic: "rgba(255, 223, 0, 0.7)", // Sarı
  East_Asian: "rgba(0, 128, 0, 0.7)", // Yeşil
  Southeast_Asian: "rgba(0, 255, 255, 0.7)", // Açık Mavi
  Indian: "rgba(0, 0, 255, 0.7)", // Mavi
  Middle_Eastern: "rgba(128, 0, 128, 0.7)", // Mor
};
*/
  const colorScale = [
    "rgba(255, 0, 0, 0.0)", // red-700
    "rgba(255, 165, 0, 0.0)", // red-600
    "rgba(255, 223, 0, 0.0)", // red-500
    "rgba(0, 255, 255, 0.7)", // red-400
    "rgba(0, 0, 255, 0.7)", // red-300
    "rgba(255, 0, 0, 0.7)", // red-300
    "rgba(255, 165, 0, 0.7)", // red-300
  ];

  // This function assigns a color based on score index
  const getColorClass = (index: number) => {
    return colorScale[index] || colorScale[colorScale.length - 1];
  };
  const colorBasedScores = [
    data?.section_data.race_scores[0],
    data?.section_data.race_scores[1],
    data?.section_data.race_scores[2],
  ];

  const typeBasedScores = [
    data?.section_data.race_scores[3],
    data?.section_data.race_scores[4],
    data?.section_data.race_scores[5],
    data?.section_data.race_scores[6],
  ];
  const percentageCalculation = (array: number[]): number[] => {
    const total = array.reduce((sum, num) => sum + num, 0);
    return array.map((num) =>
      total === 0 ? 0 : parseFloat(((num / total) * 100).toFixed(2))
    );
  };
  const colorPercentages = percentageCalculation(colorBasedScores);
  const typePercentages = percentageCalculation(typeBasedScores);
  // Create sortedScores for race_scores sorted in descending order
  const sortedScores = data?.section_data.race_scores
    ? [...data.section_data.race_scores].sort((a: number, b: number) => b - a)
    : [];

  return (
    <Card
      className={` md:min-h-[640px] md:max-w-[50rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none order-2 sm:order-1 ${
        visible ? "" : "hidden"
      }`}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {data && data.title}
        </Typography>
      </div>

      {data &&
        (data.title === "Genel Analiz" ? (
          <List
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="w-full md:w-80"
          >
            <Typography
              className="text-lg font-semibold text-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {session.fullName}
            </Typography>
            <ListItem
              className="hover:cursor-default hover:bg-white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Tahmini Yaşınız:{" "}
              </Typography>
              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {data.section_data.age}
              </ListItemSuffix>
            </ListItem>

            <ListItem
              className="hover:cursor-default hover:bg-white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                variant="paragraph"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                MRNA Durumu{" "}
              </Typography>
              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  variant="paragraph"
                  className="text-sm text-center"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {data.section_data.mrna
                    ? "mRNA aşısı analizi sonucunda olası yan etkilerden etkilenmiş olabilirsiniz."
                    : "mRNA aşısı analizi sonucunda bir yan etki gözlemlenmemiştir."}
                </Typography>
              </ListItemSuffix>
            </ListItem>

            <ListItem
              className="hover:cursor-default hover:bg-white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                variant="paragraph"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Psiko Analiz
              </Typography>

              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  variant="paragraph"
                  className={`text-sm text-center rounded-md ${
                    data.section_data.psycho_analysis
                      ? "bg-red-100 text-red-900"
                      : "bg-green-100 text-green-900"
                  }`}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {data.section_data.psycho_analysis
                    ? "Stres seviyeniz yüksek görünüyor."
                    : "Stres seviyeniz normal."}
                </Typography>
              </ListItemSuffix>
            </ListItem>
            <ListItem
              className="hover:cursor-default hover:bg-white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                variant="paragraph"
                className="text-sm text-center font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Mutasyona Uğramış Gen Sayısı
              </Typography>
              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Chip
                  variant="ghost"
                  value={Object.entries(data.section_data.genes).length}
                  color="blue-gray"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem
              className="hover:cursor-default hover:bg-white"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                variant="paragraph"
                className="text-sm text-center font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Pozitif Çıkan Hastalıkların Sayısı
              </Typography>
              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Chip
                  variant="ghost"
                  value={
                    Object.entries(data.section_data.immune_system_profile)
                      .length
                  }
                  color="blue-gray"
                />
              </ListItemSuffix>
            </ListItem>
          </List>
        ) : data.title === "Genler" ? (
          <div>
            <Typography
              variant="paragraph"
              className="w-full md:max-w-[352px] text-sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Bu liste de yer alan genlerinizin etkilendiği düşünülmektedir.
              İlgili verilerin tıbbi bir bağlayıcılığı olmayıp paylaşılan
              listeye, yasal etik iznimiz ile topladığımız 1.650.000 ses verisi
              ile sizin sesinizin uyum oranına bakılarak ulaşılmıştır.
            </Typography>
            <List
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="overflow-y-scroll max-h-[500px]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Object.entries(data.section_data.genes).map(([gene, value]) => (
                <ListItem
                  key={gene}
                  className="hover:cursor-default hover:bg-white"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {gene}
                  <ListItemSuffix
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <Chip
                      className={` ${
                        (value as number) < 2
                          ? "text-green-900 bg-green-100"
                          : (value as number) < 3
                          ? "text-yellow-900 bg-yellow-100"
                          : "text-red-900 bg-red-100"
                      }`}
                      value={
                        (value as number) === 1
                          ? "Düşük"
                          : (value as number) === 2
                          ? "Orta"
                          : "Yüksek"
                      }
                    />
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </div>
        ) : data.title === "Soy ve Genetik Köken Analizi" ? (
          <List
            className="overflow-y-scroll w-full md:w-80"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {/* Renk Kategorizasyonu */}
            <Typography
              className="font-semibold underline underline-offset-8 w-full tracking-widest"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Renk Kategorizasyonu
            </Typography>
            {colorBasedScores.map((score, i) => (
              <ListItem
                key={i}
                className="hover:cursor-default hover:bg-white"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {races[i]}
                <ListItemSuffix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {colorPercentages[i]}%
                </ListItemSuffix>
              </ListItem>
            ))}

            {/* Irk Kategorizasyonu */}
            <Typography
              className="font-semibold underline underline-offset-8 w-full tracking-widest mt-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Irk Kategorizasyonu
            </Typography>
            {typeBasedScores.map((score, i) => (
              <ListItem
                key={i + 3}
                className="hover:cursor-default hover:bg-white"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: getColorClass(i + 3) }}
                  ></div>
                </ListItemPrefix>
                {races[i + 3]}
                <ListItemSuffix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {typePercentages[i]}%
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        ) : data.title === "Bağışıklık Sistemi Profili" ? (
          <div>
            <Typography
              variant="paragraph"
              className="w-full md:max-w-[352px] text-sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Bağışıklık Sistemi Profili’nde yer alan hastalıklar yalnızca bu
              hastalıklara yakalanma yatkınlığınızı gösterir. Her hangi bir
              tıbbi sonuç anlamı taşımaz.
            </Typography>
            <List
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="overflow-y-scroll w-full md:w-96"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Object.entries(data.section_data.immune_system_profile).map(
                ([key, value]) => {
                  const camelToTitle = (text: string) => {
                    text = text.charAt(0).toUpperCase() + text.slice(1);
                    const words = text.match(/[A-Z][a-z]*/g) || [];
                    return words
                      .join(" ")
                      .replace(/\b\w/g, (char) => char.toUpperCase());
                  };
                  return (
                    <ListItem
                      key={key}
                      className="hover:cursor-default hover:bg-white"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <div>
                        <Typography
                          variant="paragraph"
                          className="font-semibold"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {camelToTitle(key)}
                        </Typography>
                      </div>
                      <ListItemSuffix
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {((value as number) * 100).toFixed(2)}%
                      </ListItemSuffix>
                    </ListItem>
                  );
                }
              )}
            </List>
          </div>
        ) : null)}
    </Card>
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
          <Offcanvas visible={offcanvasVisible} data={offcanvasData} />
          {resultData && <EthnicityMap />}
        </div>
      </div>
    </div>
  );
};

export default Report;
