import { getDictionary } from "../dictionaries";
import LoginForm from "./login-form";

const Login = async ({ params }: { params: Promise<{ lng: "en" | "tr" }> }) => {
  const { lng } = await params;
  const dict = await getDictionary(lng);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 via-indigo-500 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-xl shadow-white border-2 border-indigo-600">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            {dict.loginPage.title}
          </h2>
          <LoginForm locale={dict.loginPage.form} />
        </div>
      </div>
    </div>
  );
};

export default Login;
