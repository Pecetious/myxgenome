"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import Footer from "./footer";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
});

export function Layout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: any;
}) {
  return (
    <ThemeProvider>
      <Navbar locale={locale.navbar} />
      {children}
      <Footer locale={locale.footer} />
    </ThemeProvider>
  );
}

export default Layout;
