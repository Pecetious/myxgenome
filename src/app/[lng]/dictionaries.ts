import 'server-only';

const dictionaries = {
  en: import('./dictionaries/en.json').then((module) => module.default),
  tr: import('./dictionaries/tr.json').then((module) => module.default),
};

// getDictionary, verilen dildeki JSON dosyasını yükler ve döndürür
export const getDictionary = async (locale: 'en' | 'tr') => {
  const dictionary = await dictionaries[locale]; // Veriyi bekle
  if (!dictionary) {
    throw new Error(`Dictionary for ${locale} not found`); // Eğer veri yoksa hata fırlat
  }
  return dictionary;
};
