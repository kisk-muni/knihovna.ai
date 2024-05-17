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
  [key: string]: {
    name: { cs: string; en: string };
  };
} = {
  "O knihovně": { name: { cs: "O knihovně", en: "About the library" } },
  "Rozvoj (design) služeb": {
    name: {
      cs: "Rozvoj (design) služeb",
      en: "Service design and development",
    },
  },
  "Knihovní služby": {
    name: { cs: "Knihovní služby", en: "Library services" },
  },
  "Vzdělávání a podpora": {
    name: { cs: "Vzdělávání a podpora", en: "Education and support" },
  },
  "Komunitní role": { name: { cs: "Komunitní role", en: "Community role" } },
  "Sociální role": { name: { cs: "Sociální role", en: "Social role" } },
  "Knihovní procesy": {
    name: { cs: "Knihovní procesy", en: "Library processes" },
  },
};

type Translated =
  | string
  | {
      cs: string;
      en: string;
    };

export type Resouce = {
  title?: Translated;
  link?: Translated;
  description?: Translated;
  buttonText?: Translated;
  type: "tool" | "case-study" | "article" | "organisation" | "course";
};

export type Recommendation = {
  name: Translated;
  description: Translated;
  link?: Translated;
  driver?: Translated;
  consequences?: Translated;
  priority?: number;
  difficulty?: "easy" | "moderate" | "difficult";
  resources?: Resouce[];
};

export type Question = {
  id: string;
  category: string;
  questionText: Translated;
  type: "TrueFalse";
  answer?: boolean | null;
  info?: Translated;
  examples?: Translated;
  notes?: Translated;
  recommendation: Recommendation;
};

export const questions: Question[] = [
  {
    id: "web-analytics",
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: {
      cs: "Používáte webovou analytiku pro sběr dat o využívání vašich služeb nad rámec povinných vykazovaných statistik?",
      en: "Do you use web analytics to collect data about the use of your services beyond the mandatory statistics?",
    },
    info: {
      cs: "Povinnými statistikami se rozumí například výpůjčky, návštěvnost, které se běžně vykazují ve výročních zprávách za účelem monitoringu knihoven. Smyslem webové analytiky je získat detailnější informace o interakcích uživatelů a následně na základě získaných dat jednat pro další zlepšení služeb.",
      en: "Mandatory statistics include, for example, loans, attendance, which are commonly reported in annual reports for library monitoring. The purpose of web analytics is to obtain more detailed information about user interactions and then act on the data obtained for further service improvement.",
    },
    examples: {
      cs: "uživatelské interakce na webu, typy rezervace, návštěvnost webu, sociální sítě, newsletter",
      en: "user interaction on the website, booking types, website traffic, social networks, newsletter",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Implementujte webovou analytiku pro detailnější sběr dat",
        en: "Implement web analytics for more detailed data collection",
      },
      description: {
        cs: "Zaměřte se na implementaci pokročilé webové analytiky, která vám umožní získávat detailní informace o interakcích uživatelů na vašem webu. Můžete vyzkoušet Google Analytics nebo Matomo Analytics.",
        en: "Focus on implementing advanced web analytics that allow you to gain detailed information about user interactions on your website. You can try Google Analytics or Matomo Analytics.",
      },
      consequences:
        "Knihovna nemusí být v prostředí internetu konkurenceschopná. ",
      resources: [
        {
          type: "tool",
          title: "Matomo",
          description:
            "Matomo je open-source nástroj pro webovou analytiku, který vám umožní sledovat návštěvnost vašeho webu a získávat detailní informace o uživatelských interakcích.",
          link: "https://matomo.org/",
          buttonText: "Prozkoumat",
        },
        {
          type: "tool",
          title: "Plausible Analytics",
          description:
            "Plausible Analytics je jednoduchý a etický nástroj pro webovou analytiku, který umožní sledovat základní informace o návštěvnosti vašeho webu a pomůže s nastavením sledování pokročilejších interakcí na webu.",
          link: "https://plausible.com/",
        },
      ],
    },
  },
  {
    id: "user-needs-monitoring",
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: {
      cs: "Monitorujete potřeby uživatelů i místních obyvatel pro zlepšení vašich služeb?",
      en: "Do you monitor the needs of users and local residents to improve your services?",
    },
    info: {
      cs: "Uživatelem se myslí obecně návštěvníci knihoven ve fyzickém i digitálním prostředí. Místními obyvateli se rozumí obyvatelé obce, města nebo regionu, kde knihovna působí. Monitorování potřeb uživatelů může knihovně pomoci navrhnout takové služby, aby oslovila a zapojila obyvate, kteří dosud s knihovnou neinteragují.",
      en: "By user, we mean generally library visitors in physical and digital environments. Local residents are residents of the municipality, city or region where the library operates. Monitoring user needs can help the library design services to reach and engage residents who have not yet interacted with the library.",
    },
    recommendation: {
      priority: 1,
      name: {
        cs: "Zahajte pravidelný průzkum potřeb uživatelů a místních obyvatel",
        en: "Start a regular survey of the needs of users and local residents",
      },
      difficulty: "easy",
      description: {
        cs: "Pravidelně provádějte průzkumy a dotazníky mezi uživateli a místními obyvateli, abyste lépe porozuměli jejich potřebám a přání.",
        en: "Conduct regular surveys and questionnaires among users and local residents to better understand their needs and wants.",
      },
      resources: [
        {
          type: "case-study",
          title:
            "Moravksá zemská knihovna sdílí svou nástěnku pro podněty čtenářů",
          description:
            "MZK v příspěvku prezentuje nástěnku, kde mohou čtenáři vyjadřovat svoje přání, názory a podněty. Tento způsob získávání zpětné vazby může být inspirací pro vaši knihovnu. Umístěte podobnou nástěnku na vhodné místo, aby vám návštěvníci zanechali anonymní zpětnou vazbu.",
          link: "https://duha.mzk.cz/blog/schranka-nastenky-pro-podnety-ctenaru",
        },
        {
          type: "tool",
          title: "100 metod",
          description:
            "Na webové stránce 100 metod najdete databázi metod pro průzkum potřeb uživatelů. U každé metody je uveden popis, postup a příklady využití a několik užitečných zdrojů.",
          link: "https://kisk.phil.muni.cz/100metod/poznavani",
        },
        {
          type: "tool",
          title: "Google Formuláře",
          description:
            "Google Formuláře jsou snadno použitelným bezplatným nástrojem pro tvorbu dotazníků a průzkumů.",
          link: "https://forms.google.com/",
        },
      ],
    },
  },
  {
    id: "ai-service-design",
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: {
      cs: "Navrhujete nebo zlepšujete služby pomocí AI nástrojů?",
      en: "Do you design or improve services using AI tools?",
    },
    examples: {
      cs: "pro personalizaci služeb nebo doporučování dokumentů",
      en: "for personalising services or recommending documents",
    },
    recommendation: {
      priority: 1,
      name: {
        cs: "Zvažte využití AI pro návrh a zlepšování služeb",
        en: "Consider using AI for service design and improvement",
      },
      // todo
      difficulty: "difficult",
      description: {
        cs: "Využití AI pro návrh a zlepšování služeb může zvýšit efektivitu a uživatelskou spokojenost. Zkuste nástroje jako Adobe Sensei nebo Salesforce Einstein pro personalizaci služeb a doporučování dokumentů.",
        en: "Using AI to design and improve services can increase efficiency and user satisfaction. Try tools like Adobe Sensei or Salesforce Einstein for service personalization and document recommendation.",
      },
      link: "https://www.adobe.com/sensei.html",
    },
  },

  {
    id: "chatbot-user-communication",
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText: {
      cs: "Využíváte pro komunikaci s uživateli chatbota nebo jinou formu virtuálního asistenta?",
      en: "Do you use a chatbot or other form of virtual assistant to communicate with users?",
    },
    info: {
      cs: "Komunikací se myslí řešení 80 % dotazů, které se běžně opakují a nevyžadují speciální znalosti či dovednosti. Chatbot může čerpat i z informací na webu (knihovny, obce) a jiných zdrojů, ke kterým mu dáme přístup.",
      en: "By communication, we mean solving 80% of queries that are routinely repeated and do not require special knowledge or skills. The chatbot can also draw on information on the web (libraries, municipalities) and other sources that we give it access to.",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zvažte nasazení chatbota nebo virtuálního asistenta pro komunikaci s uživateli",
        en: "Consider deploying a chatbot or virtual assistant to communicate with users",
      },
      description: {
        cs: "Pro zlepšení komunikace s uživateli můžete zvážit nasazení chatbota nebo jiné formy virtuálního asistenta. Tyto nástroje mohou pomoci rychleji a efektivněji odpovídat na běžné dotazy uživatelů.",
        en: "To improve communication with users, you may consider deploying a chatbot or other form of virtual assistant. These tools can help answer common user questions more quickly and efficiently.",
      },
      link: "https://www.databricks.com/solutions/accelerators/llms-customer-service-and-support",
    },
  },
  {
    id: "self-service",
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízíte samoobslužné služby?",
      en: "Do you offer self-service?",
    },
    examples: {
      cs: "výpůjčky, vracení knih, či přístup ke studovnám a pracováním prostorům",
      en: "borrowing, returning books, or access to study and work spaces",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Rozšiřte nabídku samoobslužných služeb",
        en: "Expand your self-service offer",
      },
      description: {
        cs: "Zvýšení dostupnosti samoobslužných služeb může zlepšit uživatelskou spokojenost a efektivitu knihovny. Zvažte možnosti výpůjček, vrácení knih a přístupu ke studovnám a pracovním prostranstvím bez nutnosti interakce s knihovníkem.",
        en: "Increasing the availability of self-service can improve user satisfaction and library efficiency. Consider options for borrowing, returning books, and accessing study and work areas without having to interact with a librarian.",
      },
      resources: [
        {
          type: "case-study",
          title: "Jak funguje samoobslužné půjčování v Jihlavě",
          description:
            "Seznamte se s projektem samoobslužného půjčování v Jihlavě.",
          link: "https://www.jihlava.cz/v-jihlavske-knihovne-funguje-samoobsluzne-pujcovani/d-561985",
        },
      ],
    },
  },
  {
    id: "unit-recommendation-engine",
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízí váš knihovní systém doporučování dokumentů a služeb (na základě historie výpůjček, dotazů, profilu uživatele)?",
      en: "Does your library system offer document and service recommendation (based on borrowing history, queries, user profile)?",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Zkuste implementovat doporučovací systém",
        en: "Try to implement a recommendation system",
      },
      description: {
        cs: "Využití knihovního systému pro doporučování dokumentů a služeb může zlepšit uživatelskou zkušenost a zvýšit využívání knihovny. Existuje mnoho nástrojů a knihovních systémů, které nabízejí funkce doporučování.",
        en: "Using a library system to recommend documents and services can improve the user experience and increase library usage. There are many tools and library systems that offer recommendation features.",
      },
      link: "https://towardsdatascience.com/building-a-book-recommendation-system-using-keras-1fba34180699",
    },
  },
  {
    id: "educational-materials-ai",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Vytváříte vzdělávací materiály pomocí AI?",
      en: "Are you creating educational materials using AI?",
    },
    examples: {
      cs: "generování prezentací, grafiky, výukových her",
      en: "generation of presentations, graphics, educational games",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zvažte využití AI pro tvorbu vzdělávacích materiálů",
        en: "Consider using AI to create educational materials",
      },
      description: {
        cs: "Využití AI pro generování vzdělávacích materiálů, jako jsou prezentace, grafiky nebo výukové hry, může šetřit čas a zdroje knihovny. Zkuste nástroje jako Canva nebo Storyboard That pro tvorbu grafiky.",
        en: "Using AI to generate educational materials such as presentations, graphics or learning games can save time and library resources. Try tools like Canva or Storyboard That for creating graphics.",
      },
      link: "https://www.canva.com/",
    },
  },
  {
    id: "ai-themed-workshops",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Poskytujete uživatelům praktické workshopy s AI nástroji a digitálními aplikacemi využívající AI?",
      en: "Do you provide users with hands-on workshops with AI tools and AI-enabled digital applications?",
    },
    examples: "ChatGPT, Canva, Scratch",
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zvažte poskytování praktických workshopů s online nástroji a AI",
        en: "Consider providing hands-on workshops with online tools and AI",
      },
      description: {
        cs: "Vytvářejte a poskytujte praktické workshopy, které zahrnují online nástroje a AI, jako je ChatGPT, Canva a Scratch. Tím poskytnete uživatelům příležitost naučit se pracovat s moderními technologiemi a zlepšit jejich digitální dovednosti.",
        en: "Create and deliver hands-on workshops that incorporate online tools and AI such as ChatGPT, Canva and Scratch. This will give users the opportunity to learn how to work with modern technology and improve their digital skills.",
      },
      resources: [
        {
          type: "article",
          title: "Příprava vzdělávacích lekcí s pomocí AI",
          description:
            "Autoři Michaela Mrázová a Jakub Maruš sdílejí praktické tipy na efektivní zadávání promptů, upozorňují na výhody a omezení těchto technologií a poskytují přehled dalších užitečných AI nástrojů.",
          link: "https://duha.mzk.cz/clanky/priprava-vzdelavacich-lekci-s-pomoci-ai",
        },
      ],
    },
  },
  {
    id: "ai-fundamentals-education",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Je vzdělávání v základech AI součástí vaší vzdělávací nabídky?",
      en: "Is training in AI fundamentals part of your educational offer?",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zahrňte vzdělávání v základech AI do vaší nabídky",
        en: "Include AI training in your offer",
      },
      description: {
        cs: "Zajistěte, aby vzdělávání v základech AI bylo součástí vaší vzdělávací nabídky. To pomůže uživatelům lépe porozumět této stále důležitější technologii a zlepšit jejich digitální gramotnost.",
        en: "Ensure that AI training is part of your educational offer. This will help users better understand this increasingly important technology and improve their digital literacy.",
      },
      resources: [
        {
          type: "organisation",
          title: "prg.ai",
          description:
            "Spolek propojující organizace, výzkumné i vzdělávací instituce, které se zabývají umělou inteligencí. Webový portál spolku může být užitečným zdrojem informací o AI a kontaktů pro spolupráci ve vaší knihovně.",
          link: "https://prg.ai/",
        },
        {
          type: "course",
          title: "Elements of AI",
          description:
            "A series of online courses showing off what be done with AI, and how to start creating AI methods. The courses combine theory with practical exercises and can be completed at your own pace.",
          link: "https://www.elementsofai.com/",
        },
      ],
    },
  },
  {
    id: "general-adult-education",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Vytváříte vzdělávací obsah pro dospělé v produktivním věku v závislosti na jejich potřebách?",
      en: "Do you create educational content for working-age adults based on their needs?",
    },
    info: {
      cs: "Podpora rozvoje kompetencí a flexibility dospělých je klíčová v kontextu technologických změn, co pronikají na trh práce. Dospělým můžeme mj. nabízet příležitosti k upskillingu (navýšení kompetencí) či reskillingu (osvojení si nových kompetencí).",
      en: "Supporting the development of adult competences and flexibility is crucial in the context of technological changes that are penetrating the labour market. Among other things, we can offer adults opportunities for upskilling (increasing competences) or reskilling (learning new competences).",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Vytvářejte vzdělávací obsah pro dospělé v produktivním věku",
        en: "Create educational content for working-age adults",
      },
      description: {
        cs: "Soustřeďte se na tvorbu vzdělávacího obsahu, který je zaměřen na potřeby dospělých v produktivním věku. Poskytujte informace a dovednosti, které jim pomohou v pracovním a osobním životě, a které jsou relevantní pro současnou dobu.",
        en: "Focus on creating educational content that addresses the needs of working-age adults. Provide information and skills that will help them in their working and personal lives and that are relevant to today's times.",
      },
    },
  },
  {
    id: "certificates-education",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Vystavujete certifikáty, osvědčení nebo mikrocertifikáty za účast ve vzdělávacích aktivitách?",
      en: "Do you issue certificates or micro-certificates for participation in educational activities?",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zvažte možnost vystavení certifikátů a osvědčení za účast ve vzdělávacích aktivitách",
        en: "Consider issuing certificates and testimonials for participation in training activities",
      },
      description: {
        cs: "Vystavování certifikátů, osvědčení nebo mikrocertifikátů za účast ve vzdělávacích aktivitách může motivovat uživatele ke kontinuálnímu vzdělávání a zapojení do programů knihovny.",
        en: "Issuing certificates, certificates or micro-certificates for participation in educational activities can motivate users to continue learning and participating in library programs.",
      },
      link: "https://www.etf.europa.eu/sites/default/files/2023-05/Micro-Credential%20Guidelines%20Final%20Delivery.pdf",
    },
  },
  {
    id: "internal-continuous-education",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Vzdělávají se zaměstnanci knihovny v digitálních dovednostech kontinuálně?",
      en: "Do library staff receive continuous training in digital skills?",
    },
    info: {
      cs: "Kontinuální vzdělávání neznamená pouze účast na kurzech, ale dlouhodobé vzdělávání a rozvoj dovedností na základě předem daných cílů.",
      en: "Continuing education is not just about attending courses, but about long-term learning and skills development based on predetermined goals.",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zajistěte kontinuální vzdělávání zaměstnanců v digitálních dovednostech",
        en: "Ensure continuous training of employees in digital skills",
      },
      description: {
        cs: "Zabezpečte, aby se zaměstnanci knihovny neustále vzdělávali v oblasti digitálních dovedností a byli schopni poskytovat uživatelům aktuální a kvalitní podporu.",
        en: "Ensure that library staff receive ongoing training in digital skills and are able to provide up-to-date and quality support to users.",
      },
      resources: [
        {
          type: "course",
          title: "Nabídka vzdělávacích akcí pro knihovníky",
          description:
            "Na stránce SKIP ČR najdete aktuální nabídku vzdělávacích akcí pro knihovníky. Nabídka obsahuje také sadu doporučených kurzů vzdělávací sekcí organizace SKIP. Většina kurzů v nabídce je zdarma.",
          link: "https://www.skipcr.cz/knihovnicke-akce",
        },
      ],
    },
  },
  {
    id: "digital-competences-development",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízíte uživatelům prostor pro rozvoj digitálních kompetencí?",
      en: "Do you offer users space to develop digital competences?",
    },
    examples: {
      cs: "skrze vzdělávací kurzy, workshopy, konzultace, nabídku licencí softwaru a zázemí k samostudiu?",
      en: "through training courses, workshops, consultations, software licenses and self-study facilities?",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Poskytněte uživatelům prostor pro rozvoj digitálních kompetencí",
        en: "Provide space for users to develop digital competences",
      },
      description: {
        cs: "Nabídněte uživatelům různé možnosti pro rozvoj digitálních kompetencí, jako jsou vzdělávací kurzy, workshopy a individuální konzultace s odborníky.",
        en: "Offer users various opportunities to develop their digital competences, such as training courses, workshops and individual consultations with experts.",
      },
    },
  },
  {
    id: "modern-technologies",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Umožňujete uživatelům pracovat s moderními technologiemi nad rámec PC a čteček?",
      en: "Do you enable users to work with modern technologies beyond PCs and readers?",
    },
    examples: {
      cs: "3D tisk, virtuální realita, šicí stroj, práce s roboty, půjčován}í kamer, mikrofonů, zvukových zařízení",
      en: "3D printing, virtual reality, sewing machine, working with robots, renting cameras, microphones, audio equipment",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Rozšiřte nabídku moderních technologií pro uživatele",
        en: "Expand the range of modern technologies for users",
      },
      description: {
        cs: "Umožněte uživatelům pracovat s moderními technologiemi nad rámec PC a čteček, jako jsou 3D tisk, virtuální realita, šicí stroje, práce s roboty a půjčování audiovizuálního vybavení.",
        en: "Allow users to work with modern technologies beyond PCs and readers, such as 3D printing, virtual reality, sewing machines, working with robots and renting audiovisual equipment.",
      },
      resources: [
        {
          type: "article",
          title: "Možnosti financování projektů knihoven",
          description:
            "Na speciální stránce Vědecké knihovny v Olomouci najdete zjednodušené informace o možnostech financování projektů knihoven z dotačních programů, projektů nebo grantů. Stránky obsahují také informace o aktuálních dotačních programech a grantech.",
          link: "https://www.vkol.cz/dotacni-programy-projekty-granty",
        },
      ],
    },
  },
  {
    id: "community-events",
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízíte prostory pro studium nebo co-working?",
      en: "Do you offer study or co-working spaces?",
    },
    info: {
      cs: "Mnoho potenciálních uživatelů knihoven potřebuje vykonávat digitální práci nebo studovat. Řada domácností však není vybavena dostatečným zázemím pro práci nebo studium z domova. Knihovnám se tak otevírá možnost oslovit nové uživatele. Aby se v knihovně cítili dobře, je potřeba zajistit jim pohodlná místa pro práci s vlastním i knihovním PC, snadné a rychlé připojení k internetu a elektrické síti, pohodlnou židli a prostor pro nerušenou práci.",
      en: "Many potential library users need to do digital work or study. However, many households are not equipped with adequate facilities for working or studying from home. This opens up the opportunity for libraries to reach new users. To make them feel comfortable in the library, it is necessary to provide them with comfortable places to work with their own and library PCs, easy and fast internet and power connections, a comfortable chair and space for undisturbed work.",
    },
    examples: {
      cs: "zázemí pro práci, studovny",
      en: "work facilities, study rooms",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Zaměřte se na poskytování prostor pro studium a co-working",
        en: "Focus on providing study and co-working spaces",
      },
      description: {
        cs: "Zvažte možnost poskytnutí prostorů pro studium a co-working, které umožní uživatelům pracovat a studovat v příjemném prostředí knihovny. Zajistěte rychlé připojení k internetu a dostatek zásuvek pro připojení k elektrické síti.",
        en: "Consider providing study and co-working spaces that allow users to work and study in a comfortable library environment. Ensure fast internet access and sufficient power outlets.",
      },
      resources: [
        {
          type: "case-study",
          title: "Jak fungují knihovny jako co-workingová centra?",
          description:
            "Přečtěte si článek o tom, jak fungují současná co-workingová centra a jakou příležitost zde mají právě knihovny. V článku najdete příklady současných knihoven v praze, které disponují dobrým zázemím pro studium či práci na vlastním počítači.",
          link: "https://www.flowee.cz/floweecity/praha/7375-nejlevnejsi-coworking-v-praze-vse-potrebne-najdete-v-knihovne",
        },
        {
          type: "case-study",
          title: "Metodické centrum pro výstavbu a rekonstrukci knihoven",
          description:
            "Metodické centrum nabízí konzultace a poradenství v různých oblastech spojených se stavbou, rekontrukcí nebo vybavením knihoven od plánování po realizaci.",
          link: "https://mcvrk.mzk.cz/o-nas#",
        },
      ],
    },
  },
  {
    id: "personal-tech-support",
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízíte uživatelům osobní konzultace a pomoc s technologiemi?",
      en: "Do you offer users personal consultation and help with technology?",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Poskytujte osobní konzultace a pomoc s technologiemi",
        en: "Provide personal consultation and assistance with technology",
      },
      description: {
        cs: "Nabídněte uživatelům možnost osobních konzultací a pomoci s technologiemi, aby se mohli lépe orientovat v digitálním prostředí a využívat moderní technologie.",
        en: "Offer users the opportunity for personal consultation and help with technology so they can better navigate the digital environment and use modern technologies.",
      },
      resources: [
        {
          type: "tool",
          title: "Moudrá síť",
          description:
            "Moudrá síť je projekt zaměřený na pomoc v digitálním světě. Poskytuje informace, asistenci v ovládání digitálních technologií.",
          link: "https://moudrasit.cz/",
        },
      ],
    },
  },
  {
    id: "userled-community-events",
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízíte uživatelům či organizacím (vzdělávacím, kulturním) nebo spolkům možnost pořádání vlastních komunitních akcí?",
      en: "Do you offer users or organizations (educational, cultural) or associations the opportunity to organize their own community events?",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Umožněte uživatelům rezervaci prostorů pro vlastní komunitní akce",
        en: "Allow users to reserve spaces for their own community events",
      },
      description: {
        cs: "Zajistěte rezervační systém, který umožní uživatelům rezervovat prostory pro organizaci vlastních komunitních akcí. To podporuje zapojení komunity a posiluje roli knihovny jako centra pro setkávání a sdílení znalostí. Informujte o těchto možnostech také místní organizace a spolky.",
        en: "Provide a reservation system that allows users to book spaces for organizing their own community events. This promotes community involvement and strengthens the library's role as a center for meetings and knowledge sharing. Also, inform local organizations and associations about these opportunities.",
      },
      resources: [
        {
          type: "tool",
          title: "Cal.com",
          description:
            "Bezplatná platforma pro vytvoření rezervačního formuláře vám umožní snadno spravovat rezervace a komunikovat s uživateli.",
          link: "https://cal.com/",
        },
      ],
    },
  },
  {
    id: "support-digitally-excluded",
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText: {
      cs: "Nabízíte služby podporující osoby digitálně vyloučené napříč celým věkovým spektrem?",
      en: "Do you offer services supporting digitally excluded individuals and those at risk of digital exclusion across all age groups?",
    },
    info: {
      cs: "Mezi rizikové skupiny patří osoby bez přístupu k technologiím, ale i osoby s nízkými digitálními dovednostmi (např. děti a mladiství ze socioekonomicky znevýhodněného prostředí, pasivní konzumenti obsahu, kteří nedovedou internet využívat produktivně), viz digitální profily od projektu Digitální inkluze.",
      en: "At-risk groups include individuals without access to technology, as well as those with low digital skills (e.g., children and youth from socioeconomically disadvantaged backgrounds, passive content consumers who cannot use the internet productively), see digital profiles from the Digital Inclusion project.",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Zaměřte se na navrhování služeb pro marginalizované osoby a ohrožené skupiny",
        en: "Focus on designing services for marginalized individuals and at-risk groups",
      },
      description: {
        cs: "Identifikujte potřeby marginalizovaných osob, sociálně vyloučených a ohrožených skupin ve vaší komunitě a navrhněte služby, které jim poskytnou podporu a možnost zapojení do knihovních aktivit.",
        en: "Identify the needs of marginalized individuals, socially excluded, and at-risk groups in your community and design services that provide them with support and opportunities for involvement in library activities.",
      },
      resources: [
        {
          type: "organisation",
          title: "Charakteristika a potřeby digitálně vyloučených osob",
          description:
            "Projekt mapuje digitální návyky a kompetence lidí, kteří mají problémy s využitím digitálních služeb. Na webové stránce lze prozkoumat podrobnější charakteristiku dětí z vyloučených lokalit, socioekonomicky znevýhodněných dospělých, a seniorů.",
          link: "http://inkluze.cesko.digital/",
        },
      ],
    },
  },
  {
    id: "support-disadvantaged-groups",
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText: {
      cs: "Pomáháte specificky skupinám v populaci, které mohou nové technologie ohrozit nebo znevýhodnit?",
      en: "Do you specifically help groups in the population who may be threatened or disadvantaged by new technologies?",
    },
    info: {
      cs: "Nové technologie mohou být ohrožením pro osoby s nízkými digitálními dovednostmi a s nízkým přístupem ke vzdělávání, ale také pro profese pod vlivem automatizace (např. pokladní, řidiči) či generativní AI (např. překladatelé, grafici).",
      en: "New technologies can be a threat to people with low digital skills and low access to education, but also to professions influenced by automation (e.g., cashiers, drivers) or generative AI (e.g., translators, graphic designers).",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Cíleně oslovujte skupiny uživatelů, které mohou být znevýhodněny novými technologiemi",
        en: "Provide assistance to specific groups that may be disadvantaged by new technologies",
      },
      description: {
        // todo
        cs: "Zajistěte, aby se s vaší nabídkou služeb seznámily skupiny v populaci, které mohou být ohroženy nebo znevýhodněny novými technologiemi. Účastněte se veřejného dění, akcí a festivalů, které nesouvisí s knihovnou a literaturou. Využijte znalosti vaší lokality abyste oslovili skupiny, které by jinak knihovnu nenavštívily.",
        en: "Ensure that groups in the population that may be threatened or disadvantaged by new technologies are familiar with your service offerings. Participate in public events, activities, and festivals unrelated to the library and literature. Use your knowledge of the locality to reach out to groups that would not otherwise visit the library.",
      },
    },
  },
  {
    id: "strategy-social-inequalities",
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText: {
      cs: "Je strategickým záměrem vaší knihovny snižovat sociální nerovnosti?",
      en: "Is it a strategic goal of your library to reduce social inequalities?",
    },
    info: {
      cs: "Součástí záměru je pravidelné vyhodnocování dosavadního pokroku.",
      en: "Part of the goal involves regularly evaluating the progress made so far.",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zahrňte snižování sociálních nerovností do strategického záměru knihovny",
        en: "Incorporate the reduction of social inequalities into the library's strategic plan",
      },
      description: {
        cs: "Stanovte snižování sociálních nerovností jako strategický záměr knihovny a pravidelně vyhodnocujte dosavadní pokrok. Zavádějte opatření a služby, které aktivně přispívají k posilování sociální soudržnosti ve vaší komunitě.",
        en: "Set reducing social inequalities as a strategic goal of the library and regularly evaluate the progress made so far. Implement measures and services that actively contribute to strengthening social cohesion in your community.",
      },
    },
  },
  {
    id: "help-in-distressing-situations",
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText: {
      cs: "Poskytujete poradenství a konzultace uživatelům v tíživé situaci?",
      en: "Do you provide advice and consultations to users in distressing situations?",
    },
    info: {
      cs: "Součástí poradenství je propojování uživatelů s dalšími organizacemi, informování o příležitostech ke vzdělávání, zapojení do komunitních akcí.",
      en: "Part of the counseling involves connecting users with other organizations, informing them about educational opportunities, and engaging them in community events.",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Poskytování poradenství a propojení s dalšími organizacemi pro uživatele v tíživé životní situaci",
        en: "Providing counseling",
      },
      // todo
      description: {
        cs: "Uživatelé v tíživé situaci se mohou potýkat s různými problémy, jako jsou finanční obtíže, ztráta zaměstnání nebo sociální izolace. Řada uživatelů nemusí vědět, že mohou získat pomoc v knihovně, pokud jim to není na první pohled zřejmé. Nabízejte uživatelům pomoc s hledáním práce, rady ohledně sociální a právní podpory.",
        en: "Users in distressing situations may face various problems, such as financial difficulties, loss of employment, or social isolation. Many users may not know that they can get help at the library if it is not immediately apparent to them. Offer users help with job search, advice on social and legal support.",
      },
    },
  },
  {
    id: "collaboration-local-authorities",
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText: {
      cs: "Spolupracujete v pořádání akcí, poskytování konkrétní služby s městem či obcí, spolky nebo neziskovými organizacemi?",
      en: "Do you collaborate in organizing events, providing specific services with the city or municipality, associations, or non-profit organizations?",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Spolupracujte s městem a neziskovými organizacemi",
        en: "Collaborate with the city and non-profit organizations",
      },
      description: {
        cs: "Navázání spolupráce s místními úřady, spolky a neziskovými organizacemi může zvýšit vaši dostupnost a poskytované služby. Zvažte vytvoření partnerství pro pořádání společných akcí nebo programů.",
        en: "Establishing partnerships with local authorities, associations, and non-profit organizations can enhance your accessibility and services provided. Consider creating partnerships for organizing joint events or programs.",
      },
    },
  },
  {
    id: "engage-volunteers-community-events",
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText: {
      cs: "Umožňujete uživatelům zapojení do organizace akcí a dobrovolnické zapojení do provozu knihovny?",
      en: "Do you allow users to participate in organizing events and volunteer in library operations?",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Nabízejte možnost zapojení dobrovolníků do aktivit knihovny",
        en: "Offer the opportunity to involve volunteers in library activities",
      },
      description: {
        cs: "Vytvoření programu pro dobrovolníky může posílit komunitní pouto a zvýšit dostupnost vaší knihovny. Využijte existující metodiky a platformy pro propojení s potenciálními dobrovolníky.",
        en: "Creating a volunteer program can strengthen the community bond and increase the accessibility of your library. Use existing methodologies and platforms to connect with potential volunteers.",
      },
      resources: [
        {
          type: "case-study",
          title:
            "Knihovny s větší zkušeností s dobrovolníky, které jsou ochotny své zkušenosti sdílet",
          description:
            "Na webu naleznete příklady knihoven, které pracují s dobrovolníky. U každé knihovny naleznete informace o tom, jakým způsobem dobrovolníky zapojují do svého provozu a odkaz na podstránku věnující se dobrovolnictví na jejich webu.",
          link: "https://ipk.nkp.cz/odborne-cinnosti/dobrovolnici-v-knihovnach/dobrovolnici_tabulka.htm",
        },
      ],
    },
  },
  {
    id: "evaluate-ai-benefit",
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: {
      cs: "Vyhodnocujete přínos umělé inteligence a automatizace pro zefektivnění knihovních procesů?",
      en: "Do you evaluate the benefits of artificial intelligence and automation for streamlining library processes?",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Vyhodnocení potenciálu využití umělé inteligence a automatizace",
        en: "Evaluation of artificial intelligence and automation usage",
      },
      description: {
        cs: "Pro zefektivnění knihovních procesů je dobré začít vytvořením odhadu ušetřených nákladů při využití umělé inteligence a automatizace. Zvažte současné časové a finanční náklady a porovnejte je s možnými úsporami.",
        en: "To streamline library processes, it's good to start by estimating the cost savings of using artificial intelligence and automation. Consider current time and financial costs and compare them to potential savings.",
      },
    },
  },
  {
    id: "text-generation-tools-use",
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: {
      cs: "Využíváte nástroje na generování textu?",
      en: "Do you use text generation tools (emails, promotions, official documents)?",
    },
    info: {
      cs: `Nástroje na generování textu mohou zefektivnit tvorbu e-mailů, propagace a oficiálních dokumentů.`,
      en: `Text generation tools can streamline the creation of emails, promotions, and official documents.`,
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Zvažte využití nástrojů na generování textů",
        en: "Consider using text generation tools",
      },
      description: {
        cs: "Využití nástrojů na generování textů může zefektivnit tvorbu e-mailů, propagace a oficiálních dokumentů. Stačí zadat konkrétní příkaz (prompt) a nástroj vytvoří libovolnou formu textu podle potřeb. Zkuste nástroje jako je ChatGPT pro generování obsahu.",
        en: "Using text generation tools can streamline the creation of emails, promotions, and official documents. Try tools like ChatGPT for content generation.",
      },
      resources: [
        {
          type: "tool",
          title: "ChatGPT",
          description:
            "Populární nástroj pro generování textů formou dialogu s chatbotem od společnosti OpenAI.",
          link: {
            cs: "https://openai.com/",
            en: "https://openai.com/",
          },
        },
      ],
    },
  },
  {
    id: "rfid-technology-use",
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: {
      cs: "Využíváte RFID technologie pro automatické třídění knih, kontrolu řazení nebo revizi?",
      en: "Do you use RFID technologies for automatic book sorting, sorting control, or inventory?",
    },
    info: {
      cs: "RFID je technologie, která umožňuje automatické identifikování a sledování knih a dalších dokumentů v knihovně.",
      en: "RFID is a technology that enables automatic identification and tracking of books and other documents in the library.",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Nasaďte RFID technologii v automatizaci knihovních procesů",
        en: "Implement RFID technology in library process automation",
      },
      description: {
        cs: "Zvažte využití RFID technologií pro automatizaci třídění knih, kontrolu řazení a revizi. RFID technologie mohou zvýšit efektivitu a přesnost knihovních procesů a usnadnit práci knihovníkům.",
        en: "Consider using RFID technologies for automating book sorting, sorting control, and inventory. RFID technologies can increase the efficiency and accuracy of library processes and make librarians' work easier.",
      },
      link: "https://www.bibliotheca.com/rfid-in-libraries-technology-that-helps-extend-impact/",
    },
  },
  {
    id: "content-analysis-tools-use",
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: {
      cs: "Využíváte nástroje pro analýzu obsahu, věcný popis a automatickou klasifikaci?",
      en: "Do you use tools for content analysis, subject description, and automatic classification?",
    },
    recommendation: {
      priority: 1,
      difficulty: "difficult",
      name: {
        cs: "Vuyžijte nástroje pro analýzu obsahu a automatickou klasifikaci",
        en: "Utilize tools for content analysis and automatic classification",
      },
      description: {
        cs: "Používání nástrojů pro analýzu obsahu, věcný popis a automatickou klasifikaci může usnadnit organizaci a řízení knihovního obsahu. Doporučujeme zkoumat možnosti nástrojů jako je OpenText Magellan nebo Microsoft Azure Cognitive Services.",
        en: "Using tools for content analysis, subject description, and automatic classification can facilitate the organization and management of library content. We recommend exploring options such as OpenText Magellan or Microsoft Azure Cognitive Services.",
      },
      link: {
        cs: "https://www.langchain.com/",
        en: "https://www.langchain.com/",
      },
    },
  },
  {
    id: "document-acquisition-ai-use",
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText: {
      cs: "Využíváte AI pro akvizici dokumentů?",
      en: "Do you use AI for document acquisition?",
    },
    info: {
      cs: "AI může pomoci s analýzou statistik výpůjček, vyhledávacích dotazů v katalogu, či s návrhem relevantnch jednotek k akvizici.",
      en: "AI can help with analyzing borrowing statistics, catalog search queries, or suggesting relevant units for acquisition.",
    },
    recommendation: {
      priority: 1,
      difficulty: "moderate",
      name: {
        cs: "Využívání umělé inteligence při akvizici dokumentů",
        en: "Using Artificial Intelligence in Document Acquisition",
      },
      description: {
        cs: "Zvažte využití umělé inteligence pro analýzu statistik výpůjček, vyhledávacích dotazů v katalogu a dalších relevantních dat pro lepší plánování akvizice dokumentů. Můžete použít nástroje jako je TensorFlow nebo Scikit-learn pro tvorbu modelů a analýzu dat.",
        en: "Consider using AI to analyze borrowing statistics, catalog search queries, and other relevant data to better plan document acquisition. You can use tools like TensorFlow or Scikit-learn to build models and analyze data.",
      },
      resources: [
        {
          type: "case-study",
          title: "Zapojení umělé inteligence do procesů akvizice",
          description:
            "Ve videu Mgr. Antonín Pokorný z Knihovny Univerzity Palackého představuje způsoby, kterými lze AI zapojit do jednotlivých procesů souvisejících s akvizicí, a jakým způsobem mohou tyto technologie přispět k efektivnějšímu a rychlejšímu získávání nových informačních zdrojů. Nechybí možné výhledy do budoucna týkající se dalšího využití AI v akvizici knihovního fondu včetně možností a hrozeb pro další rozvoj této oblasti.",
          link: "https://www.youtube.com/watch?v=R4m-MNhqOWg",
        },
      ],
    },
  },
  {
    id: "user-behavior-analysis",
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: {
      cs: "Myslíte si, že máte dostatečnou moc a vliv na technologie a prostředky v knihovně, abyste mohli rozvíjet knihovnu?",
      en: "Do you think you have enough power and influence over technologies and resources in the library to develop the library?",
    },
    recommendation: {
      priority: 1,
      difficulty: "easy",
      name: {
        cs: "Úzce spolupracujte s podobnými knihovnami za účelem sdílení zdrojů a zkušeností",
        en: "Collaborate closely with similar libraries to share resources and experiences",
      },
      description: {
        cs: "Technologický rozvoj knihovny často závisí na externích vlivech, jako jsou dodavatelé technologií nebo veřejné financování. Zejména menší knihovny nemusí mít potřebné prostředky, aby realizovaly žádoucí změny. Spolupráce více knihoven za účelem vytvoření společného plánu a sdílení zdrojů může v tomto problému značně pomoci.",
        en: "The technological development of a library often depends on external influences such as technology suppliers or public funding. Smaller libraries in particular may not have the necessary resources to implement the desired changes. Collaboration of multiple libraries to develop a common plan and share resources can greatly help in this problem.",
      },
    },
  },
];

type FullyTranslated = {
  cs: string;
  en: string;
};

export function getLibraryReadiness(score: number): {
  signal: "critical" | "healthy" | "warning";
  range: FullyTranslated;
  type: FullyTranslated;
  condition: FullyTranslated;
  description: FullyTranslated;
} {
  if (score <= 20) {
    return {
      signal: "critical",
      range: {
        cs: "Méně než 20",
        en: "Below 20",
      },
      type: { cs: "Základní knihovna", en: "a basic library" },
      condition: {
        cs: "Nízká",
        en: "Low",
      },
      description: {
        cs: "Vaše knihovna je na začátku cesty k připravenosti na dopady AI a využití AI v knihovnách.",
        en: "Your library is at the beginning of the journey to AI readiness and AI use in libraries.",
      },
    };
  }
  if (score >= 21 && score <= 49) {
    return {
      signal: "warning",
      range: {
        cs: "Mezi 21 a 49",
        en: "Between 21 and 49",
      },
      condition: {
        cs: "Nízká",
        en: "Low",
      },
      type: { cs: "Rozvíjející se knihovna", en: "a developing library" },
      description: {
        cs: "Vaše knihovna se rozhoupává k řešení připravenosti na AI.",
        en: "Your library is starting to address AI readiness.",
      },
    };
  }
  if (score >= 50 && score <= 75) {
    return {
      range: {
        cs: "Mezi 50 a 75",
        en: "Between 50 and 75",
      },
      signal: "healthy",
      type: { cs: "Moderní knihovna", en: "a modern library" },
      condition: {
        cs: "Dobrá",
        en: "Good",
      },
      description: {
        cs: "Jste průkopníci. Vaše knihovna jde příkladem ostatním.",
        en: "You are pioneers. Your library sets an example for other libraries.",
      },
    };
  }
  return {
    signal: "healthy",
    range: {
      cs: "Více než 75",
      en: "Above 75",
    },
    condition: {
      cs: "Výborná",
      en: "Excellent",
    },
    type: { cs: "Knihovna budoucnosti", en: "an ultra-modern library" },
    description: {
      cs: "Pohybujete se na hraně aktuálních trendů v knihovnictví.",
      en: "You are on the cutting edge of current library trends.",
    },
  };
}
