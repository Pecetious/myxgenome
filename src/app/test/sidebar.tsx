"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
interface Props {
  list?: any;
  credits: number;
}
const Sidebar: FC<Props> = ({ list, credits }) => {
  const router = useRouter();
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
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
            Kalan Test Kredisi
          </Typography>
          <ListItemSuffix
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Chip value={credits} variant="ghost" color="blue-gray" />
          </ListItemSuffix>
        </ListItem>
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
                Sonuçlar
              </Typography>
              <ListItemSuffix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Chip
                  value={list ? list.length : 0}
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
                {list &&
                  list.map((item: any, i: number) => (
                    <ListItem
                      key={i}
                      onClick={() =>
                        router.push(`/reports/${item.creation_date}`)
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
