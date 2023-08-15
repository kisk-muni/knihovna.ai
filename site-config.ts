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

interface NavLink extends Link {
  private?: boolean;
}

export interface SiteConfig {
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

  navigation: NavLink[];
  privateNavigation: NavLink[];
  footerNavigation: NavLink[];

  notion: {
    databases: {
      roadmap: string;
      handbook: string;
      sprints: string;
      todos: string;
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
    { title: "Náš tým", href: "/tym" },
    { title: "O projektu", href: "/o-projektu" },
  ],
  privateNavigation: [
    { title: "AI Příručka", href: "/prirucka", private: true },
    { title: "Roadmap", href: "/roadmap", private: true },
    { title: "Blog", href: "/blog", private: true },
  ],
  footerNavigation: [
    { title: "Náš tým", href: "/tym" },
    { title: "O projektu", href: "/o-projektu" },
    // { title: "Blog", href: "/blog" },
  ],
  notion: {
    databases: {
      roadmap: "664e6b73ea50434cbaad7d120c149446",
      handbook: "ddce45ad40974edfa0746df7f3f6ecd4",
      todos: "b9a43c293aa64860b94c3c3f04d0d5e2",
      sprints: "bc7967210a6142b3b97b841e6a004c96",
    },
  },
};

export default siteConfig;
