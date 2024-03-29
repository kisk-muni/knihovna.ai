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

export type Question = TrueFalse;

export type TrueFalse = {
  category: string;
  questionText: string;
  type: "TrueFalse";
  answer?: boolean;
  info?: string;
  examples?: string;
  notes?: string;
  recommendation?: {
    name: string;
    description: string;
    link?: string;
  };
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
    oices: ["Krajská knihovna", "Obecní knihovna", "Městská knihovna"],
  }, */
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: "Analyzujete svá data pomocí AI nástrojů?",
    examples: "knihovní fond, uživatelská data, výpůjčky, akvizice",
    recommendation: {
      name: "Začněte analyzovat data pomocí AI nástrojů",
      description:
        "Zvažte využití AI nástrojů pro analýzu dat, jako je knihovní fond, uživatelská data, výpůjčky a akvizice. Například můžete použít platformy jako IBM Watson nebo Google Cloud AI.",
      link: "https://www.ibm.com/watson",
    },
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      "Používáte webovou analytiku pro sběr dat o využívání vašich služeb nad rámec povinných statistik za účelem zlepšování služeb?",
    examples:
      "uživatelské interakce na webu, typy rezervace, návštěvnost webu, sociální sítě, newsletter",
    recommendation: {
      name: "Implementujte webovou analytiku pro detailnější sběr dat",
      description:
        "Zaměřte se na implementaci pokročilé webové analytiky, která vám umožní získávat detailní informace o interakcích uživatelů na vašem webu. Můžete vyzkoušet Google Analytics nebo Matomo Analytics.",
      link: "https://analytics.google.com/",
    },
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      "Monitorujete potřeby uživatelů ale i místních obyvatel pro zlepšení vašich služeb?",
    notes: "",
    recommendation: {
      name: "Zahajte pravidelný průzkum potřeb uživatelů a místních obyvatel",
      description:
        "Pravidelně provádějte průzkumy a dotazníky mezi uživateli a místními obyvateli, abyste lépe porozuměli jejich potřebám a přání. Můžete využít nástroje jako Google Forms nebo SurveyMonkey.",
      link: "https://www.google.com/forms",
    },
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: "Navrhujete nebo zlepšujete služby pomocí AI nástrojů?",
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      "Využíváte pro komunikaci s uživateli chatbota nebo jinou formu virtuálního asistenta??",
    info: "Dotazy se myslí 80% dotazů, které se běžně opakují a nevyžadují speciální znalosti či dovednosti.",
    recommendation: {
      name: "Zvažte nasazení chatbota nebo virtuálního asistenta pro komunikaci s uživateli",
      description:
        "Pro zlepšení komunikace s uživateli můžete zvážit nasazení chatbota nebo jiné formy virtuálního asistenta. Tyto nástroje mohou pomoci rychleji a efektivněji odpovídat na běžné dotazy uživatelů.",
      link: "https://chatbotsmagazine.com/top-ai-chatbot-platforms-52d75bb89c56",
    },
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText: "Nabízíte samoobslužné služby?",
    examples:
      "výpůjčky, vracení knih, či přístup ke studovnám a pracováním prostrům",
    recommendation: {
      name: "Rozšiřte nabídku samoobslužných služeb",
      description:
        "Zvýšení dostupnosti samoobslužných služeb může zlepšit uživatelskou spokojenost a efektivitu knihovny. Zvažte možnosti výpůjček, vrácení knih a přístupu ke studovnám a pracovním prostranstvím bez nutnosti interakce s knihovníkem.",
    },
  },
  /* {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      "Profilujete uživatele na základě historických dat o výpůjčkách, interakcích s knihovnou a dat z ostatních zdrojů?",
    recommendation: {
      name: "Zaměřte se na profilování uživatelů",
      description:
        "Zvažte využití historických dat o výpůjčkách, interakcích s knihovnou a dalších dostupných informací pro lepší porozumění potřebám uživatelů. To vám umožní lépe cílit služby a nabídku knih.",
    },
  }, */
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      "Nabízí váš knihovní systém doporučování dokumentů a služeb (na základě historie výpůjček, dotazů, profilu uživatele)?",
    recommendation: {
      name: "Zkuste implementovat doporučovací systém",
      description:
        "Využití knihovního systému pro doporučování dokumentů a služeb může zlepšit uživatelskou zkušenost a zvýšit využívání knihovny. Existuje mnoho nástrojů a knihovních systémů, které nabízejí funkce doporučování.",
      link: "https://en.wikipedia.org/wiki/Library_catalog#Library_discovery_services",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: "Vytváříte vzdělávací materiály pomocí AI?",
    examples: "generování prezentací, grafiky, výukových her",
    recommendation: {
      name: "Zvažte využití AI pro tvorbu vzdělávacích materiálů",
      description:
        "Využití AI pro generování vzdělávacích materiálů, jako jsou prezentace, grafiky nebo výukové hry, může šetřit čas a zdroje knihovny. Zkuste nástroje jako Canva nebo Storyboard That pro tvorbu grafiky.",
      link: "https://www.canva.com/",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Poskytujete uživatelům praktické workshopy s online nástroji a AI?",
    examples: "ChatGPT, Canva, Scratch",
    recommendation: {
      name: "Zvažte poskytování praktických workshopů s online nástroji a AI",
      description:
        "Vytvářejte a poskytujte praktické workshopy, které zahrnují online nástroje a AI, jako je ChatGPT, Canva a Scratch. Tím poskytnete uživatelům příležitost naučit se pracovat s moderními technologiemi a zlepšit jejich digitální dovednosti.",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Je vzdělávání v základech AI součástí vaší vzdělávací nabídky?",
    recommendation: {
      name: "Zahrňte vzdělávání v základech AI do vaší nabídky",
      description:
        "Zajistěte, aby vzdělávání v základech AI bylo součástí vaší vzdělávací nabídky. To pomůže uživatelům lépe porozumět této stále důležitější technologii a zlepšit jejich digitální gramotnost.",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Vytváříte vzdělávací obsah pro dospělé v produktivním věku v závislosti na jejich potřebách?",
    recommendation: {
      name: "Vytvářejte vzdělávací obsah pro dospělé v produktivním věku",
      description:
        "Soustřeďte se na tvorbu vzdělávacího obsahu, který je zaměřen na potřeby dospělých v produktivním věku. Poskytujte informace a dovednosti, které jim pomohou v pracovním a osobním životě, a které jsou relevantní pro současnou dobu.",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Vystavujete certifikáty, osvědčení nebo mikrocertifikáty za účast ve vzdělávacích aktivitách?",
    recommendation: {
      name: "Zvažte možnost vystavení certifikátů a osvědčení za účast ve vzdělávacích aktivitách",
      description:
        "Vystavování certifikátů, osvědčení nebo mikrocertifikátů za účast ve vzdělávacích aktivitách může motivovat uživatele ke kontinuálnímu vzdělávání a zapojení do programů knihovny.",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Vzdělávají se zaměstnanci knihovny v digitálních dovednostech kontinálně?",
    info: "Kontinuální vzdělávání neznamená pouze účast na kurzech, ale dlouhodobé vzdělávání a rozvoj dovedností na základě předem daných cílů.",
    recommendation: {
      name: "Zajistěte kontinuální vzdělávání zaměstnanců v digitálních dovednostech",
      description:
        "Zabezpečte, aby se zaměstnanci knihovny neustále vzdělávali v oblasti digitálních dovedností a byli schopni poskytovat uživatelům aktuální a kvalitní podporu.",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Nabízíte uživatelům prostor pro rozvoj digitálních kompetencí?",
    examples: "skrze vzdělávací kurzy, workshopy, konzultace",
    recommendation: {
      name: "Poskytněte uživatelům prostor pro rozvoj digitálních kompetencí",
      description:
        "Nabídněte uživatelům různé možnosti pro rozvoj digitálních kompetencí, jako jsou vzdělávací kurzy, workshopy a individuální konzultace s odborníky.",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      "Umožňujete uživatelům pracovat s moderními technologiemi nad rámec PC a čteček?",
    examples:
      "3D tisk, Virtuální realita, šicí stroj, práce s roboty, půjčování kamer, mikrofonů, zvukových zařízení",
    recommendation: {
      name: "Rozšiřte nabídku moderních technologií pro uživatele",
      description:
        "Umožněte uživatelům pracovat s moderními technologiemi nad rámec PC a čteček, jako jsou 3D tisk, virtuální realita, šicí stroje, práce s roboty a půjčování audiovizuálního vybavení.",
    },
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText: "Nabízíte prostory pro studium nebo co-working?",
    info: "Samozřejmostí je rychlé připojení k internetu a dostatek zásuvek pro připojení k elektrické síti.",
    examples: "zázemí pro práci, studovny",
    recommendation: {
      name: "Zaměřte se na poskytování prostor pro studium a co-working",
      description:
        "Zvažte možnost poskytnutí prostorů pro studium a co-working, které umožní uživatelům pracovat a studovat v příjemném prostředí knihovny. Zajistěte rychlé připojení k internetu a dostatek zásuvek pro připojení k elektrické síti.",
    },
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText:
      "Nabízíte uživatelům osobní konzultace a pomoc s technologiemi?",
    recommendation: {
      name: "Poskytujte osobní konzultace a pomoc s technologiemi",
      description:
        "Nabídněte uživatelům možnost osobních konzultací a pomoci s technologiemi, aby se mohli lépe orientovat v digitálním prostředí a využívat moderní technologie.",
    },
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText:
      "Nabízíte uživatelům možnost pořádání vlastních komunitních akcí?",
    recommendation: {
      name: "Umožněte uživatelům rezervaci prostorů pro vlastní komunitní akce",
      description:
        "Zajistěte rezervační systém, který umožní uživatelům rezervovat prostory pro organizaci vlastních komunitních akcí. To podporuje zapojení komunity a posiluje roli knihovny jako centra pro setkávání a sdílení znalostí.",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Nabízíte služby podporující digitálně vyloučené osoby napříč celým věkovým spektrem?",
    recommendation: {
      name: "Zaměřte se na navrhování služeb pro marginalizované osoby a ohrožené skupiny",
      description:
        "Identifikujte potřeby marginalizovaných osob, sociálně vyloučených a ohrožených skupin ve vaší komunitě a navrhněte služby, které jim poskytnou podporu a možnost zapojení do knihovních aktivit.",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Pomáháte specificky skupinám v populaci, které mohou nové technologie ohrozit nebo znevýhodnit?",
    recommendation: {
      name: "Poskytujte pomoc specifickým skupinám, které mohou být znevýhodněny novými technologiemi",
      description:
        "Vyviněte programy a služby, které specificky cílí na skupiny v populaci, které by mohly být ohroženy nebo znevýhodněny novými technologiemi. Poskytněte jim vzdělávání a podporu v používání moderních technologií.",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Je strategickým záměrem vaší knihovny snižovat sociální nerovnosti?",
    info: "Součástí záměru je pravidelné vyhodnocování dosavadního pokroku.",
    recommendation: {
      name: "Zahrňte snižování sociálních nerovností do strategického záměru knihovny",
      description:
        "Stanovte snižování sociálních nerovností jako strategický záměr knihovny a pravidelně vyhodnocujte dosavadní pokrok. Zavádějte opatření a služby, které aktivně přispívají k posilování sociální soudržnosti ve vaší komunitě.",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Poskytujete poradenství a konzultace uživatelům v tíživé situaci?",
    info: "Součástí poradenství je propojování uživatelů s dalšími organizacemi, informování o příležitostech ke vzdělávání, zapojení do komunitních akcí.",
    recommendation: {
      name: "Poskytování poradenství",
      description:
        "Zvažte implementaci online chatu nebo systému rezervace konzultací, abyste mohli efektivně poskytovat poradenství uživatelům v tíživé situaci. Můžete využít platformy jako je LiveChat nebo Calendly.",
      link: "https://cal.com/",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Spolupracujete v pořádání akcí, poskytování konkrétní služby s městem či obcí, spolky nebo neziskovými organizacemi?",
    recommendation: {
      name: "Spolupráce s městem a neziskovými organizacemi",
      description:
        "Navázání spolupráce s místními úřady, spolky a neziskovými organizacemi může zvýšit vaši dostupnost a poskytované služby. Zvažte vytvoření partnerství pro pořádání společných akcí nebo programů.",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Umožňujete uživatelům zapojení do organizace akcí a dobrovolnické zapojení do provozu knihovny?",
    recommendation: {
      name: "Zapojení do dobrovolnických aktivit",
      description:
        "Vytvoření strukturovaného programu pro dobrovolníky může posílit komunitní pouto a zvýšit dostupnost vaší knihovny. Využijte platformy jako je VolunteerMatch pro propojení s potenciálními dobrovolníky.",
      link: "https://www.volunteermatch.org/",
    },
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Vyhodnocujete přínos umělé inteligence a automatizace pro zefektivnění knihovních procesů?",
    recommendation: {
      name: "Vyhodnocení využití umělé inteligence a automatizace",
      description:
        "Pro zefektivnění knihovních procesů je dobré začít vytvořením odhadu ušetřených nákladů při využití umělé inteligence a automatizace. Zvažte současné časové a finanční náklady a porovnejte je s možnými úsporami.",
    },
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: "Používáte pro vyhledávání nebo řazení knih roboty?",
    recommendation: {
      name: "Robotické vyhledávání a řazení knih",
      description:
        "Pokud tvoří vyhledávání a řazení knih podstatný náklad vaší knihovny, zvažte možnosti využití robotů pro vyhledávání a řazení knih, což může výrazně zefektivnit vaše procesy. Existují specializované roboty pro tuto činnost, například knihovní roboty od společnosti Bibliotheca.",
      link: "https://www.bibliotheca.com/library-solutions/library-automation/library-robots",
    },
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Využíváte nástroje pro analýzu obsahu, věcný popis, automatickou klasifikaci nebo tvorbu klíčových slov dokumentů?",
    recommendation: {
      name: "Nástroje pro analýzu obsahu a automatickou klasifikaci",
      description:
        "Používání nástrojů pro analýzu obsahu, věcný popis a automatickou klasifikaci může usnadnit organizaci a řízení knihovního obsahu. Doporučujeme zkoumat možnosti nástrojů jako je OpenText Magellan nebo Microsoft Azure Cognitive Services.",
      link: "https://azure.microsoft.com/en-us/services/cognitive-services/",
    },
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Využíváte AI pro akvizici dokumentů (na základě statistik výpůjček, vyhledávacích dotazů v katalogu apod.)?",
    recommendation: {
      name: "Využívání umělé inteligence pro akvizici dokumentů",
      description:
        "Zvažte využití umělé inteligence pro analýzu statistik výpůjček, vyhledávacích dotazů v katalogu a dalších relevantních dat pro lepší plánování akvizice dokumentů. Můžete použít nástroje jako je TensorFlow nebo Scikit-learn pro tvorbu modelů a analýzu dat.",
      link: "https://www.tensorflow.org/",
    },
  },
];
