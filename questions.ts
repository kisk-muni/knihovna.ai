// eslint-disable-next-line import/no-anonymous-default-export
type Question =
  | string
  | {
      questionText: string;
      type: "TrueFalse" | "MultipleChoice";
    };

type Theme = {
  title: string;
  questions: Question[];
};

export default <Theme[]>[
  {
    title: "Rozvoj (design) služeb",
    questions: [
      "Analyzujete data o svých uživatelích a návštěvnících pomocí AI nástrojů? (příklad nástroje pro analýzu dat)",
      "Sbíráte kontinuálně (automatizovaně) data o využívání vašich služeb a komunikačních kanálů?",
      "Monitorujete kontinuálně uživatelské potřeby a příležitosti pro intervenci ve vašem místním kontextu?",
      "Navrhujete nebo zlepšujete služby pomocí AI nástrojů? (příklad nástroje pro návrhy, designování, prototypování)",
    ],
  },
  {
    title: "Knihovní služby",
    questions: [
      "Využíváte v komunikaci s uživateli chatboty nebo virtuální asistenty (online nebo v knihovně)?",
      "Nabízíte samoobslužné služby (výpůjčky, vracení, studovny nebo celá knihovna)?",
      "Profilujete uživatele na základě historických dat o výpůjčkách, interakcích s knihovnou a dat z ostatních zdrojů?",
      "Využíváte pro vyhledávání doporučovací systémy?",
    ],
  },
  {
    title: "Vzdělávání a podpora",
    questions: [
      "Vytváříte vzdělávací materiály pomocí AI (prezentace, grafiky, výukové hry)? (příklad nástroje)",
      "Poskytujete uživatelům praktické workshopy s online nástroji? (příklad nástroje)",
      "Je vzdělávání v základech AI součástí vašeho vzdělávacího balíčku?",
      "Používáte analytické nástroje pro personalizaci učení?",
      "Vytváříte vzdělávací obsah na dospělé v závislosti na jejich potřebách?",
      "Prostupuje gamifikace vzdělávání vašimi službami?",
    ],
  },
  {
    title: "Komunitní role",
    questions: [
      "Nabízíte uživatelům prostor pro rozvoj digitálních kompetencí (přístup k chytrým technologiím v knihovně nebo půjčování domů)?",
      "Nabízíte uživatelům osobní konzultace a pomoc s technologiemi?",
      "Umožňujete uživatelům rezervaci prostor prostřednictvím rezervačního systému pro organizaci vlastních komunitních akcí?",
      "Mohou uživatelé využívat rezervované prostory knihovny bezkontaktně?",
    ],
  },
  {
    title: "Sociální role",
    questions: [
      "Navrhujete služby na základě potřeb marginalizovaných osob, sociálně vyloučených a ohrožených skupin?",
      "Pomáháte specificky skupinám v populaci, které mohou nové technologie ohrozit nebo znevýhodnit?",
      "Je strategickým záměrem vaší knihovny sociální nerovnosti neposilovat, ale naopak přispívat k jejich odstraňování?",
      "Umíte poradit uživatelům v tíživé situaci, nasměrovat je k příslušným organizacím (být rozcestníkem), informovat je o příležitostech ke vzdělávání, zapojení do komunitních akcí, zlepšení své situace?",
      "Spolupracujete (v čem? – v pořádání akcí, poskytování konkrétní služby) s městem, spolky nebo neziskovými organizacemi?",
      "Umožňujete uživatelům (nebo potenciálním uživatelům) zapojení do organizace akce, provozu knihovny (dobrovolnictví v knihovnách)?",
    ],
  },
  {
    title: "Knihovní procesy",
    questions: [
      "Vyhodnocujete přínos umělé inteligence a automatizace pro zefektivnění knihovních procesů?",
      "Používáte pro vyhledávání nebo řazení knih roboty?",
      "Využíváte AI pro popis dokumentů (katalogizace, klasifikace, sumarizace apod.)?",
      "Využíváte AI pro akvizici dokumentů (na základě statistik výpůjček, vyhledávacích dotazů v katalogu apod.)?",
    ],
  },
];
