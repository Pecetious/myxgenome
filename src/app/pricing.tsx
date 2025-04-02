"use client";
import React from "react";
import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// Ürün Paketleri İçeriği
const PACKAGES = [
  {
    title: "Temel Genetik Sağlık Paketi",
    price: "120,00 ₺",
    description: "Genetik sağlık analizine başlamak isteyenler için temel bir paket. Kişisel genetik yapınızla ilgili başlangıç seviyesinde bilgiler alırsınız. Genetik yapınızdaki potansiyel riskler, bağışıklık sisteminizin durumu ve genetik geçmişiniz hakkında genel bir bakış açısı sağlar.",
    options: [
      { title: "Köken Analizi", description: " Kullanıcının yaş aralığı, mRNA aşısının yan etkileri (varsa), psikoanaliz sonuçları (ruhsal durum analizi), mutasyona uğramış gen sayısı ve bu mutasyona bağlı olabilecek hastalıklar riski." },
      { title: "Mutasyona Uğramış Gen Çizelgeniz", description: "Kullanıcının genetik yapısında var olan ve hastalık riskine yol açabilecek mutasyonların listesi." },
      { title: "Soy ve Genetik Köken Analizi", description: "Kullanıcının etnik kökeni ve ırksal geçmişini analiz eder, bunları renk (White, Black, Latino/Hispanic) ve ırk (East Asian, Southeast Asian, Indian, Middle Eastern) kategorilerine ayırır." },
      { title: "Bağışıklık Sistemi Profili", description: "Kullanıcının bağışıklık sistemi hakkında detaylı bilgi sağlar ve bu sisteme bağlı olarak hangi hastalıklara yatkın olduğunu gösterir." }
    ],
    routeParams: {
      packageType: "basic package"
    }
  },
  {
    title: "Gelişmiş Genetik ve Sağlık Paketi",
    price: "250,00 ₺",
    description: "Genetik yapınızı daha derinlemesine incelemek isteyenler için kapsamlı bir paket. Hem genetik hem de sağlık analizlerinizi genişletir. Özellikle genetik hastalık riski, kişiye özel sağlık önerileri ve psikolojik destek hizmetleri ile sağlığınızı bütüncül bir şekilde değerlendirmenize yardımcı olur.",
    options: [
      { title: "Temel Paket", description: "Temel genetik sağlık paketi içeriğini sunar." },
      { title: "25 Hastalık Analizi", description: "Kullanıcının genetik yatkınlıklarına bağlı olarak risk taşıyabileceği 25 farklı hastalığı analiz eder. Özellikle mevsimsel hastalıklar ve genetik eğilimler üzerine odaklanır." },
      { title: "Kişiye Özel Sağlık Önerileri", description: "Kullanıcının yaşam tarzına, genetik yapısına ve sağlık geçmişine göre öneriler sunar (beslenme, egzersiz, stres yönetimi).Kapsamlı genetik analiz raporu sunar." },
      { title: "Psikolojik Destek ve Online Psikoterapi", description: "Kişiye özel psikolojik destek ve online terapi seansları sunar." },
      { title: "7/24 Danışmanlık Desteği", description: "Kullanıcıya istediği zaman danışmanlık hizmeti sağlar, bir uzmanla her an iletişime geçme imkanı sağlar." }
    ],
    routeParams: {
      packageType: "advanced package"
    }
  },
  {
    title: "Premium Genetik Sağlık ve Yaşam Paketi",
    price: "400,00 ₺",
    description: "En kapsamlı genetik analiz ve sağlık hizmeti paketi. Soy köken analizinden bağışıklık sistemi derinlemesine analizine kadar birçok gelişmiş özellik sunar. Ayrıca, kişisel genetik danışmanlık ve evde sağlık hizmetleriyle sağlığınız konusunda derinlemesine bilgi alabilirsiniz.",
    options: [
      { title: "Gelişmiş Paket", description: "Gelişmiş genetik sağlık ve yaşam paketi içeriğini sunar." },
      { title: "Soy Genetik Köken Analizi Detaylı", description: "Kullanıcının soyunun detaylı bir şekilde analiz edilmesi. Aile geçmişi, genetik kökenler hakkında daha derinlemesine bir inceleme yapılır." },
      { title: "Bağışıklık Sistemi Derinlemesine Analiz", description: "Bağışıklık sistemi ile ilgili daha detaylı testler ve risk analizleri yapılır." },
      { title: "Evde Sağlık Desteği", description: "İstanbul ve Makedonya/Üsküp'ün belirli bölgelerinde, kullanıcılara evde sağlık hizmetleri sunulur." },
      { title: "Bireysel Genetik Danışmanlık", description: "Kullanıcıya özel genetik danışmanlık hizmeti verilir, genetik yapısına göre kişisel sağlık önerileri sunulur." }
    ],
    routeParams: {
      packageType: "premium package"
    }
  },
  {
    title: "Aile Sağlık ve Genetik Paket",
    price: "350,00 ₺",
    description: "Aile bireylerinizin genetik sağlığını analiz ederek, birlikte sağlık planlaması yapmanızı sağlar. Aile geçmişiniz, genetik riskler ve aile sağlığına yönelik öneriler sunulur. Aile içindeki genetik geçişler ve olası sağlık risklerini belirler.",
    options: [
      { title: "Temel Paket", description: "Temel genetik sağlık paketi içeriğini sunar." },
      { title: "Soy Genetik Köken Analizi (Aile)", description: " Kullanıcı ve ailesinin genetik geçmişi, soy analizleri yapılır. Aile bireylerinin genetik özellikleri de göz önünde bulundurulur." },
      { title: "Kişiye Özel Sağlık Önerileri (Aile)", description: "Aile bireyleri için kişisel sağlık önerileri oluşturulur." },
      { title: "Psikolojik Destek (Aile İlişkileri)", description: "Aile içindeki ilişkiler ve psikolojik sağlık için destek ve öneriler sunulur." },
      { title: "25 Hastalık Analizi (Aile Sağlığına Yönelik Riskler)", description: "Aile üyeleri arasında genetik hastalık geçişi ve olası riskler değerlendirilir." }
    ],
    routeParams: {
      packageType: "family package"
    }
  },
  {
    title: "VIP Premium Sağlık ve Genetik Paketi",
    price: "600,00 ₺",
    description: "Sağlık ve genetik analizinizi bir üst seviyeye taşıyan VIP paket. Bireysel genetik danışmanlık, özelleştirilmiş sağlık önerileri ve evde sağlık desteği gibi kapsamlı hizmetlerle sağlığınızı yönetmenizi sağlar. En yüksek düzeyde genetik bilgi ve sağlık hizmetini alabilirsiniz.",
    options: [
      { title: "Premium Paket", description: "Premium genetik sağlık paketi içeriğini sunar." },
      { title: "Bireysel Genetik Danışmanlık", description: "Kullanıcıya özel genetik danışmanlık hizmeti sunulur." },
      { title: "Evde Sağlık Desteği", description: "İstanbul ve Makedonya/Üsküp'ün belirli bölgelerinde, kullanıcılara evde sağlık hizmetleri sunulur." },
      { title: "Özelleştirilmiş Sağlık Danışmanlık", description: "Kullanıcıya özel sağlık danışmanlık hizmetleri sunulur. Genetik yapısına ve sağlık geçmişine göre özelleştirilmiş sağlık planı oluşturulur." },
    ],
    routeParams: {
      packageType: "vip package"
    }
  },
];

export function Pricing() {
  const router = useRouter();
  return (
    <section className="w-full lg:max-w-screen-lg  min-h-screen p-3 md:mx-auto">
      <div className="grid place-items-center pb-20 text-center">
        <Typography variant="h2" color="blue-gray">
          En İyi Fiyat Garantisi
        </Typography>
      </div>

      {/* Ürünler Tek Satırda Gösterilecek */}
      <div className="flex flex-col gap-10">
        {PACKAGES.map((pkg, index) => (
          <Card key={index} className="px-6 pb-5 shadow-lg bg-blue-gray-50">
            <CardBody className="p-1 md:p-5">
              <Typography color="blue-gray" className="font-bold text-3xl md:text-4xl my-2">
                {pkg.title}
              </Typography>
              <Typography variant="paragraph" className="mb-5 text-gray-500 text-pretty">
                {pkg.description}
              </Typography>

              <div className="flex flex-wrap items-center gap-x-20 gap-y-6">
                <Typography variant="h6" color="gray">
                  Teste neler dahil?
                </Typography>
                <hr className="w-72 bg-gray-500" />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-2">
                {pkg.options.map((option, key) => (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <CheckIcon className="h-4 w-4 text-gray-900" strokeWidth={2} />
                      <Typography variant="paragraph" className="font-normal text-blue-gray-900">
                        {option.title}
                      </Typography>
                    </div>
                    <Typography variant="small" className="text-blue-gray-700">
                      {option.description}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="grid place-items-center mt-5">
                <Typography variant="h1" color="blue-gray">
                  {pkg.price}
                </Typography>
                <Button
                  color="gray"
                  className="my-3"
                  size="lg"
                  onClick={() => router.push(`/payment?package=${pkg.routeParams.packageType}&price=${pkg.price}&title=${pkg.title}`)}
                >
                  Satın Al
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
