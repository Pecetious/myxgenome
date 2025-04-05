"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";

const setLocaleCookie = (locale: string) => {
  document.cookie = `access-locale=${locale}; path=/; max-age=${
    60 * 60 * 24 * 30
  }`; // 30 days expiry
};

const getLocaleFromCookie = () => {
  const match = document.cookie.match(/(^| )access-locale=([^;]+)/);
  return match ? match[2] : "tr"; // Default to 'en' if no cookie
};

const LanguageSwitcher = ({ color }: { color: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = getLocaleFromCookie(); // Cookie'den mevcut dili al

  const handleLanguageChange = (newLocale: string) => {
    // Cookie'yi güncelle
    setLocaleCookie(newLocale);

    const segments = pathname.split("/");
    segments[1] = newLocale; // Dil kodunu değiştir
    const newPathname = segments.join("/");

    // Yeni URL'ye yönlendir
    router.push(newPathname);
  };

  return (
    <Menu>
      <MenuHandler>
        <button
          className={`flex items-center px-4 py-2 ${color} shadow-md rounded-md hover:shadow-lg`}
        >
          {currentLocale.toUpperCase()}
        </button>
      </MenuHandler>
      <MenuList
        className="space-y-2 bg-white p-2 rounded-md shadow-lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <MenuItem
          onClick={() => handleLanguageChange("tr")}
          className="hover:bg-gray-100"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          TR
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange("en")}
          className="hover:bg-gray-100"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          EN
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
