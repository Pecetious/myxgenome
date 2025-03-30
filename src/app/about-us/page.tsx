"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";
import { motion } from "motion/react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-300 via-blue-gray-600 to-blue-gray-900 p-2 md:p-8 pt-16">
      <div className="w-full md:max-w-5xl mx-auto text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            color="white"
            className="text-center mb-6"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Hakkımızda
          </Typography>
        </motion.div>

        <Card
          className="mb-6 bg-opacity-40 backdrop-blur-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              color="white"
              className="mb-4 text-2xl md:text-3xl text-center md:text-start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              New Senses Uzay Teknoloji ve Sağlık Araştırmaları A.Ş.
            </Typography>
            <Typography
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Bu yeni çağın başlangıcında ekonomik ve sosyal yaşamda meydana
              gelen gelişmeler, yeni, güçlü ve yaratıcı insan modelinin
              evrileceği bir süreci başlatmıştır. Yapay zeka odaklı
              çalışmalarıyla şirketimiz, TÜBİTAK 2238 Üniversite Girişimcilik
              Programı&apos;nda 2.&apos;lik ödülü aldığı iş fikri ile 2015 yılında
              ticarileşme yolunda ilk adımını atmıştır. Bugüne kadar 5 ulusal ve
              2 uluslararası ödüle layık görülmüş olup, 3 kıtada faaliyetlerine
              devam etmektedir.
            </Typography>
          </CardBody>
        </Card>

        <Card
          className="mb-6 bg-opacity-40 backdrop-blur-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              color="white"
              className="mb-4 text-2xl md:text-3xl text-center md:text-start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Teknolojik Düzey
            </Typography>
            <Typography
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Şirketimiz, 4 akciğer kanseri türü, larenks kanseri, KOAH ve
              Covid-19’u teşhis edebilen yapay zekaya sahip bir teletıp
              uygulaması geliştirmiştir. İstanbul İl Sağlık Müdürlüğü ve İTÜ
              onayıyla başlatılan klinik çalışmalar sonucu 45 bin pozitif ve 50
              binin üzerinde negatif vaka üzerinden analiz yapılmıştır.
            </Typography>
          </CardBody>
        </Card>

        <Card
          className="mb-6 bg-opacity-40 backdrop-blur-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              color="white"
              className="mb-4 text-2xl md:text-3xl text-center md:text-start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Öne Çıkan Ürünler
            </Typography>
            <Typography
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Geliştirdiğimiz &apos;Yapay Zeka Destekli Tanı Kiti&apos; sayesinde Akciğer
              Kanseri (4 tür), Larenks Kanseri, Covid-19 ve KOAH tanısı
              mümkündür. Aynı zamanda Medicine 5.0 ile online doktor randevusu
              ve bağışıklığı destekleyici egzersiz seçenekleri sunulmaktadır.
            </Typography>
          </CardBody>
        </Card>

        <Card
          className="bg-opacity-40 backdrop-blur-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              color="white"
              className="mb-4 text-2xl md:text-3xl text-center md:text-start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Vizyonumuz
            </Typography>
            <Typography
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Yapay zeka yazılımımızın Alzheimer teşhisinde de kullanılabilmesi
              için çalışmalar devam etmektedir. Ayrıca klinik testlerin
              yaygınlaştırılması amacıyla geliştirdiğimiz kiosklar, Murat
              Dilmener, Özel Elit İstanbul Tıp Merkezi ve Cumhurbaşkanlığı
              Külliyesi gibi önemli noktalarda kullanılmaktadır.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
