"use client";

import {
  ChevronDownIcon,
  DocumentTextIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
interface Props {
  list?: any;
}
const getSession = (): any | null => {
  try {
    // localStorage'dan 'session' verisini alın
    const sessionData = localStorage.getItem("session");

    // Eğer sessionData varsa ve geçerli bir JSON formatı ise
    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);

      // session objesinin içinde token'a ulaşmaya çalışıyoruz
      return parsedSession || null; // Eğer token yoksa null döner
    }
    return null; // 'session' verisi yoksa null döner
  } catch (error) {
    // Eğer JSON.parse sırasında bir hata oluşursa, null döner
    console.error("JSON parse error:", error);
    return null;
  }
};
const Sidebar = ({
  locale,
  openMedicalScan,
  openRaceTest,
  openThyroidTest,
  triggerRefresh,
}: {
  locale: any;
  openRaceTest: () => void;
  openMedicalScan: () => void;
  openThyroidTest: () => void;
  triggerRefresh: (callback: any) => void;
}) => {
  const [testCredits, setTestCredits] = useState<any>(null);
  const [resultsList, setResultsList] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const handlePurchaseTestCredits = (type: string) => {
    localStorage.setItem(
      "session",
      JSON.stringify({
        ...session, // Eski session verilerini koru
        selectedPackage: {
          // Yeni selectedPackage verisini ekle
          title:
            locale.purchaseTestCreditsTitle[session.selectedPackage.testType],
          type: session.subscriptionType,
          testCredits: 1,
          price: "50 ₺",
          testType: type,
        },
      })
    );
    router.push(`/en/payment`);
  };
  const getResults = async () => {
    const session = getSession();
    const { data } = await axios.get("/api/get-results", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    console.log(data);
    setResultsList(data);
  };
  const getTestCredits = async () => {
    const session = getSession();
    try {
      const { data } = await axios.get("/api/get-test-credits", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setTestCredits(data.testCredits);
      console.log(data); // API'den dönen değeri set et
    } catch (error) {
      console.error("Test kredileri alınırken hata oluştu:", error);
    }
  };
  useEffect(() => {
    setSession(getSession());
    getResults();
    getTestCredits();
    triggerRefresh(() => getResults());
    console.log(testCredits);
  }, []);
  return (
    <Card
      className="w-full md:max-w-[20rem] shadow-lg shadow-gray-200"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <List
        className="mb-2 p-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {/*  <ListItem
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
            <Button
              onClick={() => handlePurchaseTestCredits("race")}
              color="blue-gray"
              size="sm"
              variant="outlined"
              className=" capitalize tracking-widest"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {locale.testCreditButton}
            </Button>
          </ListItemPrefix>
          <Typography
            className="font-semibold "
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.creditText.race}
          </Typography>
          <ListItemSuffix
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Chip value={testCredits?.race} variant="ghost" color="blue-gray" />
          </ListItemSuffix>
        </ListItem>
        {session && session.subscriptionType !== "basic" && (
          <ListItem
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
              <Button
                onClick={() => handlePurchaseTestCredits("medical")}
                color="blue-gray"
                size="sm"
                variant="outlined"
                className=" capitalize tracking-widest"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {locale.testCreditButton}
              </Button>
            </ListItemPrefix>
            <Typography
              className="font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {locale.creditText.medical}
            </Typography>
            <ListItemSuffix
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Chip
                value={testCredits?.medical}
                variant="ghost"
                color="blue-gray"
              />
            </ListItemSuffix>
          </ListItem>
        )} */}

        <ListItem
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={openRaceTest}
        >
          <Typography
            className="font-semibold "
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.raceTestOpenTitle}
          </Typography>
        </ListItem>
        {session && session.subscriptionType !== "basic" && (
          <>
            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={openMedicalScan}
            >
              <Typography
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {locale.medicalScanOpenTitle}
              </Typography>
            </ListItem>
            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={openThyroidTest}
            >
              <Typography
                className="font-semibold "
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {locale.thyroidTestOpenTitle}
              </Typography>
            </ListItem>
          </>
        )}
        <hr className="font-bold text-black border border-blue-gray-100 my-2" />
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <ListItem
            className="p-0 flex flex-col w-full"
            selected={open === 1}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <DocumentTextIcon strokeWidth={2} className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {locale.resultsTitle}
              </Typography>
              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Chip
                  value={resultsList ? resultsList.length : 0}
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </AccordionHeader>
            <AccordionBody
              className="py-1 max-h-[300px] overflow-y-scroll w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <List
                className="p-0 w-full"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {resultsList &&
                  resultsList.map((item: any, i: number) => (
                    <ListItem
                      key={i}
                      onClick={() =>
                        router.push(
                          `/${locale.routeLang}/reports/${item.creation_date}`
                        )
                      }
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="w-full"
                    >
                      <Typography
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {item.creation_date}
                      </Typography>
                      <ListItemSuffix
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Typography
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {item.test_type.includes("race")
                            ? locale.testType.race
                            : item.test_type.includes("medical")
                            ? locale.testType.medical
                            : locale.testType.thyroid}
                        </Typography>
                      </ListItemSuffix>
                    </ListItem>
                  ))}
              </List>
            </AccordionBody>
          </ListItem>
        </Accordion>
        <hr className="font-bold text-black border border-blue-gray-100 my-2" />
        <ListItem
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => window.open("https://wa.me/13022037049", "_blank")}
        >
          <ListItemPrefix
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <PhoneIcon strokeWidth={2} className="size-5" />
          </ListItemPrefix>
          <Typography
            className="font-semibold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.consult}
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
