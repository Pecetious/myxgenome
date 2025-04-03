"use client";

import {
  ChevronDownIcon,
  DocumentTextIcon,
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
const Sidebar = ({locale}: {locale: any}) => {
  const [testCredits,setTestCredits] = useState(0)
  const [resultsList,setResultsList] = useState<any>(null)
  const router = useRouter();
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const getResults = async () => {
    const session = getSession();
    const { data } = await axios.get("/api/get-results", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    setResultsList(data);
    console.log(data);
  };
  const getTestCredits = async () => {
    const session = getSession();
    try {
      const { data } = await axios.get("/api/get-test-credits", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setTestCredits(data.testCredits); // API'den dönen değeri set et
    } catch (error) {
      console.error("Test kredileri alınırken hata oluştu:", error);
    }
  }; 
  useEffect(()=> {
    getResults()
    getTestCredits();
  },[])
  return (
    <Card
      className=" w-full md:max-w-[20rem] shadow-xl shadow-blue-gray-900/5"
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
        <ListItem
          className="hover:cursor-default hover:bg-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            className="font-semibold "
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.creditText}
          </Typography>
          <ListItemSuffix
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Chip value={testCredits} variant="ghost" color="blue-gray" />
          </ListItemSuffix>
        </ListItem>
        <Button
          onClick={() => router.push("/payment")}
          color="blue-gray"
          size="sm"
          variant="outlined"
          className="text-lg capitalize tracking-widest"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {locale.testCreditButton}
        </Button>
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
            className="p-0 flex flex-col"
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
            <AccordionBody className="py-1">
              <List
                className="p-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {resultsList &&
                  resultsList.map((item: any, i: number) => (
                    <ListItem
                      key={i}
                      onClick={() =>
                        router.push(`${locale.routeLang}/reports/${item.creation_date}`)
                      }
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <Typography
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {item.creation_date}
                      </Typography>
                    </ListItem>
                  ))}
              </List>
            </AccordionBody>
          </ListItem>
        </Accordion>
      </List>
    </Card>
  );
};

export default Sidebar;
