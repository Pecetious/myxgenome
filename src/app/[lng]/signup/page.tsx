import { getDictionary } from "../dictionaries";
import SignupForm from "./signup-form";

const Signup = async ({ params }: { params: Promise<{ lng: "en" | "tr" }> }) => {
  const { lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 via-indigo-500 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-indigo-600 shadow-white">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            {dict.signupPage.title}
          </h2>
          <SignupForm locale={dict.signupPage.form} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
