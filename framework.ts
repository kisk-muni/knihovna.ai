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

type Translated = string | {
  cs: string;
  en: string;
}

export type TrueFalse = {
  category: string;
  questionText: Translated;
  type: "TrueFalse";
  answer?: boolean;
  info?: Translated;
  examples?: Translated;
  notes?: Translated;
  recommendation: {
    name: Translated;
    description: Translated;
    link?: Translated;
  };
};

export const questions = <TrueFalse[]>[
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: {cs: "Analyzujete svá data pomocí AI nástrojů?", en: "Are you analyzing your data with AI tools?"},
    examples: {cs: "knihovní fond, uživatelská data, výpůjčky, akvizice", en: "library collection, user data, loans, acquisitions"},
    recommendation: {
      name: {cs: "Začněte analyzovat data pomocí AI nástrojů", en: "Start analysing data with AI tools"},
      description:
        {cs: "Zvažte využití AI nástrojů pro analýzu dat, jako je knihovní fond, uživatelská data, výpůjčky a akvizice. Například můžete použít platformy jako IBM Watson nebo Google Cloud AI.", en: "Consider using AI tools to analyze data such as library holdings, user data, borrowing and acquisitions. For example, you can use platforms like IBM Watson or Google Cloud AI."},
      link: "https://www.ibm.com/watson",
    },
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      {cs: "Používáte webovou analytiku pro sběr dat o využívání vašich služeb nad rámec povinných statistik?", en: "Do you use web analytics to collect data about the use of your services beyond the mandatory statistics?"},
    examples:
      {cs: "uživatelské interakce na webu, typy rezervace, návštěvnost webu, sociální sítě, newsletter", en: "user interaction on the website, booking types, website traffic, social networks, newsletter"},
    recommendation: {
      name: {cs: "Implementujte webovou analytiku pro detailnější sběr dat", en: "Implement web analytics for more detailed data collection"},
      description:
        {cs: "Zaměřte se na implementaci pokročilé webové analytiky, která vám umožní získávat detailní informace o interakcích uživatelů na vašem webu. Můžete vyzkoušet Google Analytics nebo Matomo Analytics.", en: "Focus on implementing advanced web analytics that allow you to gain detailed information about user interactions on your website. You can try Google Analytics or Matomo Analytics."},
      link: "https://analytics.google.com/",
    },
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText:
      {cs: "Monitorujete potřeby uživatelů ale i místních obyvatel pro zlepšení vašich služeb?", en: "Do you monitor the needs of users and local residents to improve your services?"},
    notes: "",
    recommendation: {
      name: {cs: "Zahajte pravidelný průzkum potřeb uživatelů a místních obyvatel", en: "Start a regular survey of the needs of users and local residents"},
      description:
        {cs: "Pravidelně provádějte průzkumy a dotazníky mezi uživateli a místními obyvateli, abyste lépe porozuměli jejich potřebám a přání. Můžete využít nástroje jako Google Forms nebo SurveyMonkey.", en: "Conduct regular surveys and questionnaires among users and local residents to better understand their needs and wants. You can use tools such as Google Forms or SurveyMonkey."},
      link: "https://www.google.com/forms",
    },
  },
  {
    category: Category["Rozvoj (design) služeb"],
    type: "TrueFalse",
    questionText: {cs: "Navrhujete nebo zlepšujete služby pomocí AI nástrojů?", en: "Do you design or improve services using AI tools?"},
    examples: {cs: "pro personalizaci služeb nebo doporučování dokumentů", en: "for personalising services or recommending documents"},
    recommendation: {
      name: {cs: "Zvažte využití AI pro návrh a zlepšování služeb", en: "Consider using AI for service design and improvement"},
      description:
        {cs: "Využití AI pro návrh a zlepšování služeb může zvýšit efektivitu a uživatelskou spokojenost. Zkuste nástroje jako Adobe Sensei nebo Salesforce Einstein pro personalizaci služeb a doporučování dokumentů.", en: "Using AI to design and improve services can increase efficiency and user satisfaction. Try tools like Adobe Sensei or Salesforce Einstein for service personalization and document recommendation."},
      link: "https://www.adobe.com/sensei.html",
    },
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      {cs: "Využíváte pro komunikaci s uživateli chatbota nebo jinou formu virtuálního asistenta?", en: "Do you use a chatbot or other form of virtual assistant to communicate with users?"},
    info: {cs: "Komunikací se myslí řešení 80 % dotazů, které se běžně opakují a nevyžadují speciální znalosti či dovednosti.", en: "By communication, we mean solving 80% of queries that are routinely repeated and do not require special knowledge or skills."},
    recommendation: {
      name: {cs: "Zvažte nasazení chatbota nebo virtuálního asistenta pro komunikaci s uživateli", en: "Consider deploying a chatbot or virtual assistant to communicate with users"},
      description:
        {cs: "Pro zlepšení komunikace s uživateli můžete zvážit nasazení chatbota nebo jiné formy virtuálního asistenta. Tyto nástroje mohou pomoci rychleji a efektivněji odpovídat na běžné dotazy uživatelů.", en: "To improve communication with users, you may consider deploying a chatbot or other form of virtual assistant. These tools can help answer common user questions more quickly and efficiently."},
      link: "https://chatbotsmagazine.com/top-ai-chatbot-platforms-52d75bb89c56",
    },
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText: {cs: "Nabízíte samoobslužné služby?", en: "Do you offer self-service?"},
    examples:
      {cs: "výpůjčky, vracení knih, či přístup ke studovnám a pracováním prostorům", en: "borrowing, returning books, or access to study and work spaces"},
    info: {cs: "Chatbot může čerpat i z informací na webu (knihovny, obce) a jiných zdrojů, ke kterým mu dáme přístup.", en: "The chatbot can also draw on information on the web (libraries, municipalities) and other sources that we give it access to."},
    recommendation: {
      name: {cs: "Rozšiřte nabídku samoobslužných služeb", en: "Expand your self-service offer"},
      description:
        {cs: "Zvýšení dostupnosti samoobslužných služeb může zlepšit uživatelskou spokojenost a efektivitu knihovny. Zvažte možnosti výpůjček, vrácení knih a přístupu ke studovnám a pracovním prostranstvím bez nutnosti interakce s knihovníkem.", en: "Increasing the availability of self-service can improve user satisfaction and library efficiency. Consider options for borrowing, returning books, and accessing study and work areas without having to interact with a librarian."},
    },
  },
  {
    category: Category["Knihovní služby"],
    type: "TrueFalse",
    questionText:
      {cs: "Nabízí váš knihovní systém doporučování dokumentů a služeb (na základě historie výpůjček, dotazů, profilu uživatele)?", en: "Does your library system offer document and service recommendation (based on borrowing history, queries, user profile)?"},
    recommendation: {
      name: {cs: "Zkuste implementovat doporučovací systém", en: "Try to implement a recommendation system"},
      description:
        {cs: "Využití knihovního systému pro doporučování dokumentů a služeb může zlepšit uživatelskou zkušenost a zvýšit využívání knihovny. Existuje mnoho nástrojů a knihovních systémů, které nabízejí funkce doporučování.", en: "Using a library system to recommend documents and services can improve the user experience and increase library usage. There are many tools and library systems that offer recommendation features."},
      link: "https://en.wikipedia.org/wiki/Library_catalog#Library_discovery_services",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText: {cs: "Vytváříte vzdělávací materiály pomocí AI?", en: "Are you creating educational materials using AI?"},
    examples: {cs: "generování prezentací, grafiky, výukových her", en: "generation of presentations, graphics, educational games"},
    recommendation: {
      name: {cs: "Zvažte využití AI pro tvorbu vzdělávacích materiálů", en: "Consider using AI to create educational materials"},
      description:
        {cs: "Využití AI pro generování vzdělávacích materiálů, jako jsou prezentace, grafiky nebo výukové hry, může šetřit čas a zdroje knihovny. Zkuste nástroje jako Canva nebo Storyboard That pro tvorbu grafiky.", en: "Using AI to generate educational materials such as presentations, graphics or learning games can save time and library resources. Try tools like Canva or Storyboard That for creating graphics."},
      link: "https://www.canva.com/",
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Poskytujete uživatelům praktické workshopy s AI nástroji a digitálními aplikacemi vzužívající AI?", en: "Do you provide users with hands-on workshops with AI tools and AI-enabled digital applications?"},
    examples: "ChatGPT, Canva, Scratch",
    recommendation: {
      name: {cs: "Zvažte poskytování praktických workshopů s online nástroji a AI", en: "Consider providing hands-on workshops with online tools and AI"},
      description:
        {cs: "Vytvářejte a poskytujte praktické workshopy, které zahrnují online nástroje a AI, jako je ChatGPT, Canva a Scratch. Tím poskytnete uživatelům příležitost naučit se pracovat s moderními technologiemi a zlepšit jejich digitální dovednosti.", en: "Create and deliver hands-on workshops that incorporate online tools and AI such as ChatGPT, Canva and Scratch. This will give users the opportunity to learn how to work with modern technology and improve their digital skills."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Je vzdělávání v základech AI součástí vaší vzdělávací nabídky?", en: "Is training in AI fundamentals part of your educational offer?"},
    recommendation: {
      name: {cs: "Zahrňte vzdělávání v základech AI do vaší nabídky", en: "Include AI training in your offer"},
      description:
        {cs: "Zajistěte, aby vzdělávání v základech AI bylo součástí vaší vzdělávací nabídky. To pomůže uživatelům lépe porozumět této stále důležitější technologii a zlepšit jejich digitální gramotnost.", en: "Ensure that AI training is part of your educational offer. This will help users better understand this increasingly important technology and improve their digital literacy."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Vytváříte vzdělávací obsah pro dospělé v produktivním věku v závislosti na jejich potřebách?", en: "Do you create educational content for working-age adults based on their needs?"},
    info: {cs: "Podpora rozvoje kompetencí a flexibility dospělých je klíčová v kontextu technologických změn, co pronikají na trh práce. Dospělým můžeme mj. nabízet příležitosti k upskillingu (navýšení kompetencí) či reskillingu (osvojení si nových kompetencí).", en: "Supporting the development of adult competences and flexibility is crucial in the context of technological changes that are penetrating the labour market. Among other things, we can offer adults opportunities for upskilling (increasing competences) or reskilling (learning new competences)."},
    recommendation: {
      name: {cs: "Vytvářejte vzdělávací obsah pro dospělé v produktivním věku", en: "Create educational content for working-age adults"},
      description:
        {cs: "Soustřeďte se na tvorbu vzdělávacího obsahu, který je zaměřen na potřeby dospělých v produktivním věku. Poskytujte informace a dovednosti, které jim pomohou v pracovním a osobním životě, a které jsou relevantní pro současnou dobu.", en: "Focus on creating educational content that addresses the needs of working-age adults. Provide information and skills that will help them in their working and personal lives and that are relevant to today's times."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Vystavujete certifikáty, osvědčení nebo mikrocertifikáty za účast ve vzdělávacích aktivitách?", en: "Do you issue certificates, certificates or micro-certificates for participation in educational activities?"},
    recommendation: {
      name: {cs: "Zvažte možnost vystavení certifikátů a osvědčení za účast ve vzdělávacích aktivitách", en: "Consider issuing certificates and testimonials for participation in training activities"},
      description:
        {cs: "Vystavování certifikátů, osvědčení nebo mikrocertifikátů za účast ve vzdělávacích aktivitách může motivovat uživatele ke kontinuálnímu vzdělávání a zapojení do programů knihovny.", en: "Issuing certificates, certificates or micro-certificates for participation in educational activities can motivate users to continue learning and participating in library programs."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Vzdělávají se zaměstnanci knihovny v digitálních dovednostech kontinuálně?", en: "Do library staff receive continuous training in digital skills?"},
    info: {cs: "Kontinuální vzdělávání neznamená pouze účast na kurzech, ale dlouhodobé vzdělávání a rozvoj dovedností na základě předem daných cílů.", en: "Continuing education is not just about attending courses, but about long-term learning and skills development based on predetermined goals."},
    recommendation: {
      name: {cs: "Zajistěte kontinuální vzdělávání zaměstnanců v digitálních dovednostech", en: "Ensure continuous training of employees in digital skills"},
      description:
        {cs: "Zabezpečte, aby se zaměstnanci knihovny neustále vzdělávali v oblasti digitálních dovedností a byli schopni poskytovat uživatelům aktuální a kvalitní podporu.", en: "Ensure that library staff receive ongoing training in digital skills and are able to provide up-to-date and quality support to users."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Nabízíte uživatelům prostor pro rozvoj digitálních kompetencí?", en: "Do you offer users space to develop digital competences?"},
    examples:
      {cs: "skrze vzdělávací kurzy, workshopy, konzultace, nabídku licencí softwaru a zázemí k samostudiu?", en: "through training courses, workshops, consultations, software licenses and self-study facilities?"},
    recommendation: {
      name: {cs: "Poskytněte uživatelům prostor pro rozvoj digitálních kompetencí", en: "Provide space for users to develop digital competences"},
      description:
        {cs: "Nabídněte uživatelům různé možnosti pro rozvoj digitálních kompetencí, jako jsou vzdělávací kurzy, workshopy a individuální konzultace s odborníky.", en: "Offer users various opportunities to develop their digital competences, such as training courses, workshops and individual consultations with experts."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
    type: "TrueFalse",
    questionText:
      {cs: "Umožňujete uživatelům pracovat s moderními technologiemi nad rámec PC a čteček?", en: "Do you enable users to work with modern technologies beyond PCs and readers?"},
    examples:
      {cs: "3D tisk, virtuální realita, šicí stroj, práce s roboty, půjčován}í kamer, mikrofonů, zvukových zařízení", en: "3D printing, virtual reality, sewing machine, working with robots, renting cameras, microphones, audio equipment"},
    recommendation: {
      name: {cs: "Rozšiřte nabídku moderních technologií pro uživatele", en: "Expand the range of modern technologies for users"},
      description:
        {cs: "Umožněte uživatelům pracovat s moderními technologiemi nad rámec PC a čteček, jako jsou 3D tisk, virtuální realita, šicí stroje, práce s roboty a půjčování audiovizuálního vybavení.", en: "Allow users to work with modern technologies beyond PCs and readers, such as 3D printing, virtual reality, sewing machines, working with robots and renting audiovisual equipment."},
    },
  },
  {
    category: Category["Komunitní role"],
    type: "TrueFalse",
    questionText: {cs: "Nabízíte prostory pro studium nebo co-working?", en: "Do you offer study or co-working spaces?"},
    info: {cs: "Samozřejmostí je rychlé připojení k internetu a dostatek zásuvek pro připojení k elektrické síti.", en:"Of course there is a fast internet connection and plenty of sockets to connect to the mains."},
    examples: {cs: "zázemí pro práci, studovny", en: "work facilities, study rooms"},
    recommendation: {
      name: {cs: "Zaměřte se na poskytování prostor pro studium a co-working", en: "Focus on providing study and co-working spaces"},
      description:
        {cs: "Zvažte možnost poskytnutí prostorů pro studium a co-working, které umožní uživatelům pracovat a studovat v příjemném prostředí knihovny. Zajistěte rychlé připojení k internetu a dostatek zásuvek pro připojení k elektrické síti.", en: "Consider providing study and co-working spaces that allow users to work and study in a comfortable library environment. Ensure fast internet access and sufficient power outlets."},
    },
  },
  {
    category: Category["Vzdělávání a podpora"],
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
      "Nabízíte uživatelům či organizacím (vzdělávacím, kulturním) nebo spolkům možnost pořádání vlastních komunitních akcí?",
    recommendation: {
      name: "Umožněte uživatelům rezervaci prostorů pro vlastní komunitní akce",
      description:
        "Zajistěte rezervační systém, který umožní uživatelům rezervovat prostory pro organizaci vlastních komunitních akcí. To podporuje zapojení komunity a posiluje roli knihovny jako centra pro setkávání a sdílení znalostí. Informujte o těchto možnostech také místní organizace a spolky.",
    },
  },
  {
    category: Category["Sociální role"],
    type: "TrueFalse",
    questionText:
      "Nabízíte služby podporující osoby digitální vyloučené a osobz v ohrožení digitálním vyloučením napříč celým věkovým spektrem?",
    info: "Mezi rizikové skupiny patří osoby bez přístupu k technologiím, ale i osoby s nízkými digitálními dovednostmi (např. děti a mladiství ze socioekonomicky znevýhodněného prostředí, pasivní konzumenti obsahu, kteří nedovedou internet využívat produktivně), viz digitální profily od projektu Digitální inkluze.",
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
    info: "Nové technologie mohou být ohrožením pro osoby s nízkými digitálními dovednostmi a s nízkým přístupem ke vzdělávání, ale také pro profese pod vlivem automatizace (např. pokladní, řidiči) či generativní AI (např. překladatelé, grafici).",
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
    category: Category["Komunitní role"],
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
    questionText:
      "Využíváte nástroje na generování textů (e-maily, propagace, oficiální dokumenty)?",
    recommendation: {
      name: "Zvažte využití nástrojů na generování textů",
      description:
        "Využití nástrojů na generování textů může zefektivnit tvorbu e-mailů, propagace a oficiálních dokumentů. Zkuste nástroje jako je OpenAI nebo GPT-3 pro generování obsahu.",
      link: "https://openai.com/",
    },
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Využíváte RFID technologie pro automatické třídění knih, kontrolu řazení nebo revizi?",
    recommendation: {
      name: "Nasaďte RFID technologii v automatizaci knihovních procesů",
      description:
        "Zvažte využití RFID technologií pro automatizaci třídění knih, kontrolu řazení a revizi. RFID technologie mohou zvýšit efektivitu a přesnost knihovních procesů a usnadnit práci knihovníkům.",
    },
  },
  {
    category: Category["Knihovní procesy"],
    type: "TrueFalse",
    questionText:
      "Využíváte nástroje pro analýzu obsahu, věcný popis, automatickou klasifikaci nebo tvorbu klíčových slov (digitalizovaných nebo digitálních) dokumentů?",
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
      "Využíváte AI pro akvizici dokumentů (návrhy na nákup na základě statistik výpůjček, vyhledávacích dotazů v katalogu apod.)?",
    recommendation: {
      name: "Využívání umělé inteligence pro akvizici dokumentů",
      description:
        "Zvažte využití umělé inteligence pro analýzu statistik výpůjček, vyhledávacích dotazů v katalogu a dalších relevantních dat pro lepší plánování akvizice dokumentů. Můžete použít nástroje jako je TensorFlow nebo Scikit-learn pro tvorbu modelů a analýzu dat.",
      link: "https://www.tensorflow.org/",
    },
  },
];
