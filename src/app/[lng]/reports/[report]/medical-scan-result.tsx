import { Card, CardBody, Typography } from "@material-tailwind/react";
type TestResult = {
  [key: string]: [string, number]; // Anahtar: Test adı, Değer: [Durum (string), Oran (number)]
};
const MedicalScanResult = ({ data, locale }: { data: any; locale: any }) => {
  console.log(data);
  return (
    <section className="w-full lg:max-w-screen-md min-h-screen p-6 md:mx-auto">
      {/* Ana Kart */}
      <Card
        className="bg-white shadow-lg rounded-xl border border-gray-200"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          className="p-6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {/* Başlık */}
          <Typography
            variant="h4"
            color="blue-gray"
            className="font-bold text-center mb-6"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {locale.title}
          </Typography>

          {/* Test Listesi */}
          <div className="space-y-4">
            {Object.entries(data as TestResult).map(
              ([testName, [status, percentage]], index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 px-4 border-b border-gray-200"
                >
                  {/* Test İsmi */}
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {testName}
                  </Typography>
                  {/* Test Sonucu */}
                  <div className="text-right">
                    <Typography
                      className={`font-semibold ${
                        status === "Pozitif" ? "text-red-600" : "text-green-600"
                      }`}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {status === "Pozitif"
                        ? locale.status.positive
                        : locale.status.negative}{" "}
                      {percentage}%
                    </Typography>
                  </div>
                </div>
              )
            )}
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default MedicalScanResult;
