"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

interface OptionProps {
  src: string;
  title: string;
  children: React.ReactNode;
}

function Option({ src, title, children }: OptionProps) {
  return (
    <div className="flex gap-4">
      <div className="mb-4">
        <Image src={src} height={64} width={64} alt={title} />
      </div>
      <div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {title}
        </Typography>
        <Typography
          className="mb-2 md:w-10/12 font-normal !text-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {children}
        </Typography>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10">
      <Typography
        variant="h2"
        className="text-center mb-2"
        color="blue-gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Kökenlerinizi Keşfedin!
      </Typography>
      <Typography
        variant="lead"
        className="mb-16 w-full text-center font-normal !text-gray-500 lg:w-10/12"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        myXgenome, sizi benzersiz kılan DNA testi ile nereden geldiğinizi
        öğrenmenin güçlü deneyimini sunar. Fonasyon sesleri ve yüz analizi ile
        kökenlerinizi açığa çıkarır.
      </Typography>
      <div className="mt-8">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24 relative">
          <Image src="/image/dna.png" width={400} height={400} alt="dna" />
          <div className="space-y-8">
            <div className="my-4">
              <Option
                src="/icons/microphone.png"
                title="Ses Frekansı ile Genetik Analiz"
              >
                Kan örneğine ihtiyaç duymadan, yalnızca sesinizin frekanslarını
                analiz ederek genetik haritanızı çıkarıyoruz.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option
                src="/icons/analytics.png"
                title="Kişiye Özel Sağlık ve Genetik Raporu"
              >
                Yaş, cinsiyet ve genetik mutasyonları haritalayarak
                kişiselleştirilmiş sağlık ve beslenme önerileri sunuyoruz.
              </Option>
            </div>
            <Option
              src="/icons/lightning-bolt.png"
              title="Hızlı, Hassas ve Temassız Teknoloji"
            >
              Geleneksel testlere kıyasla çok daha hızlı ve kullanıcı dostu,
              yenilikçi bir biyoteknoloji deneyimi sunuyoruz.
            </Option>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <div className="my-4">
              <Option
                src="/icons/comfort.png"
                title="Tamamen Temassız ve Konforlu"
              >
                Kan veya tükürük örneği gerektirmeden, sadece ses analizi ile
                genetik bilgilerinize ulaşın.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option src="/icons/ai.png" title="Gelişmiş Yapay Zeka Desteği">
                En son yapay zeka algoritmaları ile genetik analizlerinizi
                yüksek doğrulukla değerlendiriyoruz.
              </Option>
            </div>
            <Option
              src="/icons/meal.png"
              title="Yaşam Tarzınıza Özel Rehberlik"
            >
              Genetik haritanıza göre spor, beslenme ve sağlık önerileri alarak
              daha bilinçli kararlar almanıza yardımcı oluyoruz.
            </Option>
          </div>
          <Image src="/image/words.jpg" width={400} height={400} alt="words" />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
