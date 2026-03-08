import 'server-only';

export type Locale = "en" | "fr";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  // Par défaut, on retourne l'anglais si la langue n'est pas trouvée
  return dictionaries[locale]?.() ?? dictionaries.en();
};