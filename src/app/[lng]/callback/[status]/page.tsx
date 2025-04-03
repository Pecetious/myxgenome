import { getDictionary } from "../../dictionaries";
import CallbackCardWithSuspense from "./callback-card";
import Title from "./title";

const CallbackPage = async ({
  params,
}: {
  params: Promise<{ lng: "en" | "tr"; status: "success" | "fail" }>;
}) => {
  const { lng, status } = await params;
  const dict = await getDictionary(lng);
  console.log(status)
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-700 space-y-16">
      <Title status={status} locale={dict.callbackPage.title}/>
      <CallbackCardWithSuspense status={status} locale={dict.callbackPage.card} />
    </div>
  );
};

export default CallbackPage;
