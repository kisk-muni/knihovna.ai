interface Link {
  title: string;
  href: string;
}

interface SiteConfig {
  title: string;
  description: string;
  siteUrl: string;
  siteLanguage: string;
  sinceYear: number;

  // social
  twitter: string;
  github?: string;

  // team
  team: {
    name: string;
    description: string;
    avatar?: string;
    twitter?: string;
  }[];

  navigation: Link[];
  footerNavigation: Link[];
}

const siteConfig: SiteConfig = {
  title: "knihovna.ai",
  description: "Knihovna pro strojové učení",
  siteUrl: "https://knihovna.ai",
  siteLanguage: "cs",
  sinceYear: 2023,
  twitter: "https://twitter.com/knihovna_ai",
  team: [
    {
      name: "Petr Škyřík",
      description: "proste petr",
      avatar: "/avatars/petr-skyrik.jpeg",
    },
    {
      name: "Natálie Káčová",
      description: "PM",
      avatar: "/avatars/natalie-kacova.jpeg",
    },
    {
      name: "Evgeniia Tokmakova",
      description: "project",
      avatar: "/avatars/evgeniia-tokmakova.jpg",
    },
    {
      name: "Matěj Pěnkava",
      description: "project",
      avatar: "/avatars/placeholder.jpg",
    },
    {
      name: "Jasmína Aldabaghová",
      description: "project",
      avatar: "/avatars/jasmina-aldabaghova.jpg",
    },
    {
      name: "Dalibor Černocký",
      description: "project",
      avatar: "/avatars/dalibor-cernocky.png",
    },
  ],
  navigation: [
    { title: "Domů", href: "/" },
    { title: "Náš tým", href: "/tym" },
  ],
  footerNavigation: [{ title: "Náš tým", href: "/tym" }],
};

export default siteConfig;
