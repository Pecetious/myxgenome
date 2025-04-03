import SectionCard from "../privacy-policy/section-card";
import { getDictionary } from "../dictionaries";

const PrivacyPolicy = async ({
  params,
}: {
  params: Promise<{ lng: "en" | "tr" }>;
}) => {
  const { lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-300 via-blue-gray-600 to-blue-gray-800 p-12">
      <div className="container w-full mx-auto h-fit  text-black p-4 xs:px-10">
        <h1 className="font-bold tracking-[1px] text-center">
          {dict.privacyPolicyPage.title}
        </h1>
        {dict.privacyPolicyPage.sections.map((sct) => (
          <SectionCard locale={sct} />
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
