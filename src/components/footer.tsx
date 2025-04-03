import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const CURRENT_YEAR = new Date().getFullYear();

export function Footer({ locale }: { locale: any }) {
  const router = useRouter(); // Initialize the router

  const handlePrivacyClick = () => {
    router.push("/privacy-policy"); // Navigate to /privacy-policy when the link is clicked
  };

  return (
    <footer className="bg-white text-black px-8 pt-16 pb-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* myXgenome Section */}
          <div>
            <Typography
              variant="h6"
              className="mb-4 text-gray-900 font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              myXgenome
            </Typography>
            <ul className="space-y-2">
              <li>
                <Typography
                  className="text-gray-700 hover:text-gray-600 transition-colors"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => router.push("/about-us")}
                >
                  {locale.mainLinks[0]}
                </Typography>
              </li>
              <li>
                <Typography
                  className="text-gray-700 hover:text-gray-600 transition-colors"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {locale.mainLinks[1]}
                </Typography>
              </li>
            </ul>
          </div>

          {/* Yasal Section */}
          <div>
            <Typography
              variant="h6"
              className="mb-4 text-gray-900 font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {locale.legalTitle}
            </Typography>
            <ul className="space-y-2">
              <li>
                <Typography
                  className="text-gray-700 hover:text-gray-600 hover:cursor-pointer transition-colors"
                  onClick={handlePrivacyClick} // Add onClick handler for the privacy link
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {locale.legalLinks[0]}
                </Typography>
              </li>
            </ul>
          </div>

          {/* İletişim Section */}
          <div>
            <Typography
              variant="h6"
              className="mb-4 text-gray-900 font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {locale.contactTitle}
            </Typography>
            <ul className="space-y-2">
              <li>
                <Typography
                  className="text-gray-700 hover:text-gray-600 transition-colors text-sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  dangerouslySetInnerHTML={{ __html: locale.contactLinks[0] }}
                  children={undefined}
                />
              </li>
              <li>
                <Typography
                  className="text-gray-700 hover:text-gray-600 transition-colors text-sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  children={undefined}
                  dangerouslySetInnerHTML={{ __html: locale.contactLinks[1] }}

                />
              </li>
              <li>
                <Typography
                  className="text-gray-700 hover:text-gray-600 transition-colors text-sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {locale.contactLinks[2]}
                </Typography>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-300 pt-4">
          <Typography
            className="text-gray-600"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            &copy; {CURRENT_YEAR} {locale.copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
