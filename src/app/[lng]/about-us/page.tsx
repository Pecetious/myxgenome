import Title from "./title";
import { getDictionary } from "../dictionaries";
import SectionCard from "./section-card";

export default async function AboutUs({
  params,
}: {
  params: Promise<{ lng: "en" | "tr" }>;
}) {
  const { lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-300 via-blue-gray-600 to-blue-gray-900 p-2 md:p-8 pt-16">
      <div className="w-full md:max-w-5xl mx-auto text-white">
        <Title text={dict && dict.aboutUsPage.title} />
        {dict && dict.aboutUsPage.sections.map((sct, index) => (
          <SectionCard locale={sct} key={index} />
        ))}
      </div>
    </div>
  );
}
