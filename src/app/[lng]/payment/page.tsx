import { useSearchParams } from "next/navigation";
import PaymentForm from "./payment-form";
import { getDictionary } from "../dictionaries";

const Payment = async ({
  params,
}: {
  params: Promise<{ lng: "en" | "tr" }>;
}) => {
  const { lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-gray-300 via-blue-gray-600 to-blue-gray-800 pt-[75px] md:pt-0">
      <PaymentForm
        locale={dict.paymentPage.form}
      />
    </div>
  );
};

export default Payment;
