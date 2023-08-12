export interface TeamMember {
  id: string;
  name: string;
  description: string;
  displayOnTeamPage?: boolean;
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

  notion: {
    databases: {
      roadmap: string;
    };
  };
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
      displayOnTeamPage: true,
    },
    {
      id: "kacova",
      name: "Natálie Káčová",
      description: "PM",
      avatar: "/avatars/natalie-kacova.jpeg",
      displayOnTeamPage: true,
    },
    {
      id: "tokmakova",
      name: "Evgeniia Tokmakova",
      description: "Výzkum",
      avatar: "/avatars/evgeniia-tokmakova.jpg",
      displayOnTeamPage: true,
    },
    {
      id: "penkava",
      name: "Matěj Pěnkava",
      description: "Výzkum",
      avatar: "/avatars/placeholder.jpg",
      displayOnTeamPage: true,
    },
    {
      id: "aldabaghova",
      name: "Jasmína Aldabaghová",
      description: "Výzkum",
      avatar: "/avatars/jasmina-aldabaghova.jpg",
      displayOnTeamPage: true,
    },
    {
      id: "cernocky",
      name: "Dalibor Černocký",
      description: "Výzkum",
      avatar: "/avatars/dalibor-cernocky.png",
      displayOnTeamPage: true,
    },
    {
      id: "knihovnaai",
      name: "Tým knihovna.ai",
      description: "",
      avatar: "/avatars/knihovnaai.png",
      displayOnTeamPage: false,
    },
  ],
  navigation: [
    { title: "Domů", href: "/" },
    { title: "AI Příručka", href: "/prirucka" },
    { title: "Náš tým", href: "/tym" },
    // { title: "Roadmap", href: "/roadmap" },
    { title: "O projektu", href: "/o-projektu" },
    // { title: "Blog", href: "/blog" },
  ],
  footerNavigation: [
    { title: "Náš tým", href: "/tym" },
    { title: "O projektu", href: "/o-projektu" },
    //{ title: "Blog", href: "/blog" },
  ],
  notion: {
    databases: {
      roadmap: "664e6b73ea50434cbaad7d120c149446",
    },
  },
};

export default siteConfig;
