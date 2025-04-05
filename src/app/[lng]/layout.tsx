import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Layout, Navbar, Footer } from "@/components";
import { getDictionary } from "./dictionaries";
export async function generateStaticParams() {
  return [
    { lng: "en" }, // İngilizce için
    { lng: "tr" }, // Türkçe için
  ];
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MYXGENOME",
  description:
    " myXgenome genetik kökenlerinizi keşfetmenizi sağlayan DNA test deneyimi ile dakikalar içerisinde kökenlerinizi öğrenin",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: 'en' | 'tr' }>
}) {
   const {lng} = await params;
    const dict = await getDictionary(lng);
  return (
    <html lang={lng}>
      <head>
        <script
          defer
          data-site="myxgenome.com"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
      </head>
      <body className={roboto.className}>
        <Layout>
          <Navbar locale={dict.navbar} />
          {children}
          <Footer locale={dict.footer}/>
        </Layout>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </body>
    </html>
  );
}
