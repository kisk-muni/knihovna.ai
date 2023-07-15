export interface TeamMember {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  twitter?: string;
}

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
  team: TeamMember[];

  navigation: Link[];
  footerNavigation: Link[];
}

const siteConfig: SiteConfig = {
  title: "knihovna.ai",
  description: "",
  siteUrl: "https://knihovna.ai",
  siteLanguage: "cs",
  sinceYear: 2023,
  twitter: "https://twitter.com/knihovna_ai",
  team: [
    {
      id: "skyrik",
      name: "Petr Škyřík",
      description: "",
      avatar: "/avatars/petr-skyrik.jpeg",
    },
    {
      id: "kacova",
      name: "Natálie Káčová",
      description: "PM",
      avatar: "/avatars/natalie-kacova.jpeg",
    },
    {
      id: "tokmakova",
      name: "Evgeniia Tokmakova",
      description: "Výzkum",
      avatar: "/avatars/evgeniia-tokmakova.jpg",
    },
    {
      id: "penkava",
      name: "Matěj Pěnkava",
      description: "Výzkum",
      avatar: "/avatars/placeholder.jpg",
    },
    {
      id: "aldabaghova",
      name: "Jasmína Aldabaghová",
      description: "Výzkum",
      avatar: "/avatars/jasmina-aldabaghova.jpg",
    },
    {
      id: "cernocky",
      name: "Dalibor Černocký",
      description: "Výzkum",
      avatar: "/avatars/dalibor-cernocky.png",
    },
  ],
  navigation: [
    { title: "Domů", href: "/" },
    { title: "Náš tým", href: "/tym" },
    { title: "Blog", href: "/blog" },
  ],
  footerNavigation: [{ title: "Náš tým", href: "/tym" }],
};

export default siteConfig;
