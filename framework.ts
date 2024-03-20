// eslint-disable-next-line import/no-anonymous-default-export
export const urlName = "evaluace";

export enum Category {
  "O knihovně" = "O knihovně",
  "Rozvoj (design) služeb" = "Rozvoj (design) služeb",
  "Knihovní služby" = "Knihovní služby",
  "Vzdělávání a podpora" = "Vzdělávání a podpora",
  "Komunitní role" = "Komunitní role",
  "Sociální role" = "Sociální role",
  "Knihovní procesy" = "Knihovní procesy",
}

export const categories: {
  [key in Category]: {
    name: string;
  };
} = {
  "O knihovně": { name: "O knihovně" },
  "Rozvoj (design) služeb": { name: "Rozvoj (design) služeb" },
  "Knihovní služby": { name: "Knihovní služby" },
  "Vzdělávání a podpora": { name: "Vzdělávání a podpora" },
  "Komunitní role": { name: "Komunitní role" },
  "Sociální role": { name: "Sociální role" },
  "Knihovní procesy": { name: "Knihovní procesy" },
};

export type Question = TrueFalse | SingleChoice;

export type TrueFalse = {
  category: string;
  questionText: string;
  type: "TrueFalse";
  answer?: boolean;
};

export type MultipleChoice = {
  category: string;
  type: "MultipleChoice";
  questionText: string;
  choices: string[];
  answer?: string[];
};

export type SingleChoice = {
  category: string;
  type: "SingleChoice";
  questionText: string;
  choices: string[];
  answer?: string;
};

export const questions = <Question[]>[
  /* {
    category: Category["O knihovně"],
    type: "SingleChoice",
    questionText: "Jaký typ knihovny nejlépe odpovídá vaší organizaci?",
    choices: ["Krajská knihovna", "Obecní knihovna", "Městská knihovna"],
  }, */
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      "Analyzujete data o svých uživatelích a návštěvnících pomocí AI nástrojů? (příklad nástroje pro analýzu dat)",
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      "Sbíráte kontinuálně (automatizovaně) data o využívání vašich služeb a komunikačních kanálů?",
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      "Monitorujete kontinuálně uživatelské potřeby a příležitosti pro intervenci ve vašem místním kontextu?",
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      "Navrhujete nebo zlepšujete služby pomocí AI nástrojů? (příklad nástroje pro návrhy, designování, prototypování)",
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      "Využíváte v komunikaci s uživateli chatboty nebo virtuální asistenty (online nebo v knihovně)?",
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      "Nabízíte samoobslužné služby (výpůjčky, vracení, studovny nebo celá knihovna)?",
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      "Profilujete uživatele na základě historických dat o výpůjčkách, interakcích s knihovnou a dat z ostatních zdrojů?",
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText: "Využíváte pro vyhledávání doporučovací systémy?",
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Vytváříte vzdělávací materiály pomocí AI (prezentace, grafiky, výukové hry)? (příklad nástroje)",
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Poskytujete uživatelům praktické workshopy s online nástroji? (příklad nástroje)",
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Je vzdělávání v základech AI součástí vašeho vzdělávacího balíčku?",
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: "Používáte analytické nástroje pro personalizaci učení?",
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Vytváříte vzdělávací obsah na dospělé v závislosti na jejich potřebách?",
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: "Prostupuje gamifikace vzdělávání vašimi službami?",
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText:
      "Nabízíte uživatelům prostor pro rozvoj digitálních kompetencí (přístup k chytrým technologiím v knihovně nebo půjčování domů)?",
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText:
      "Nabízíte uživatelům osobní konzultace a pomoc s technologiemi?",
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText:
      "Umožňujete uživatelům rezervaci prostor prostřednictvím rezervačního systému pro organizaci vlastních komunitních akcí?",
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText:
      "Mohou uživatelé využívat rezervované prostory knihovny bezkontaktně?",
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Navrhujete služby na základě potřeb marginalizovaných osob, sociálně vyloučených a ohrožených skupin?",
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Pomáháte specificky skupinám v populaci, které mohou nové technologie ohrozit nebo znevýhodnit?",
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Je strategickým záměrem vaší knihovny sociální nerovnosti neposilovat, ale naopak přispívat k jejich odstraňování?",
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Umíte poradit uživatelům v tíživé situaci, nasměrovat je k příslušným organizacím (být rozcestníkem), informovat je o příležitostech ke vzdělávání, zapojení do komunitních akcí, zlepšení své situace?",
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Spolupracujete (v čem? – v pořádání akcí, poskytování konkrétní služby) s městem, spolky nebo neziskovými organizacemi?",
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Umožňujete uživatelům (nebo potenciálním uživatelům) zapojení do organizace akce, provozu knihovny (dobrovolnictví v knihovnách)?",
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Vyhodnocujete přínos umělé inteligence a automatizace pro zefektivnění knihovních procesů?",
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: "Používáte pro vyhledávání nebo řazení knih roboty?",
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Využíváte AI pro popis dokumentů (katalogizace, klasifikace, sumarizace apod.)?",
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Využíváte AI pro akvizici dokumentů (na základě statistik výpůjček, vyhledávacích dotazů v katalogu apod.)?",
  },
];
