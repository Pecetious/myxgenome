import Hero from "./hero";
import OnlineCourse from "./online-course";
import WhyChooseUs from "./why-choose-us";
import Pricing from "./pricing";
import { getDictionary } from "./dictionaries";

export default async function Campaign({
  params,
}: {
  params: Promise<{ lng: "en" | "tr" }>;
}) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return (
    <>
      <Hero locale={dict.homePage.hero} />
      <OnlineCourse locale={dict.homePage.onlineCourse} />
      <WhyChooseUs locale={dict.homePage.whyChooseUs} />
      <Pricing locale={dict.homePage.pricing} />
    </>
  );
}
