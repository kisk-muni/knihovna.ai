import BackgroundGradient from "@/components/background-gradient";
import { Button } from "@/components/button";
import Container from "@/components/container";
import { getMaterialsPages } from "@/lib/notion/get-materials-data";
import Link from "next/link";
import { Pagination, SideNavigation } from "./navigation";
import {
  DocsSchema,
  QueryResultWithMarkdownContents,
} from "@/lib/notion/schema";

type NavItem = {
  name: string;
  href: string;
  items?: NavItem[];
};

function prepareNavitems(
  items?: QueryResultWithMarkdownContents<DocsSchema>[],
  parentHref?: string
) {
  if (!items) return undefined;
  const navItems: NavItem[] = items.map((item) => {
    const name = item.properties.Title.title[0].plain_text;
    const slug = item.properties.Slug.rich_text[0]?.plain_text;
    const href = parentHref + (slug ? "/" + slug : "");
    return {
      name,
      href,
      items: item.properties["Sub-pages"].items
        ? prepareNavitems(item.properties["Sub-pages"].items, href)
        : undefined,
    };
  });
  return navItems;
}

export default async function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = await getMaterialsPages();
  const navItems = prepareNavitems(items, "/materialy");
  return (
    <div>
      <BackgroundGradient.Radial />
      <Container className="pt-[72px] h-full flex">
        <aside
          className="h-screen flex-shrink-0 w-full md:w-52 pt-4 md:flex flex-col items-start fixed md:sticky top-[72px] z-10 hidden"
          style={{
            flex: "0 0 240px",
            minHeight: "calc(100vh - 72px)",
          }}
        >
          <SideNavigation items={navItems} />
          <Button theme="gray" size="small" className="cursor-not-allowed">
            Sdílet
            <svg
              width="16"
              height="16"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block ml-0.5 -mt-px"
            >
              <path
                d="M5.71345 8.63481C5.52176 8.28989 5.22096 8.01839 4.85827 7.86292C4.49558 7.70745 4.09153 7.67682 3.70955 7.77584C3.32757 7.87485 2.98928 8.0979 2.74778 8.40998C2.50628 8.72206 2.37524 9.1055 2.37524 9.5001C2.37524 9.89471 2.50628 10.2781 2.74778 10.5902C2.98928 10.9023 3.32757 11.1254 3.70955 11.2244C4.09153 11.3234 4.49558 11.2928 4.85827 11.1373C5.22096 10.9818 5.52176 10.7103 5.71345 10.3654M5.71345 8.63481C5.85595 8.89131 5.9375 9.18581 5.9375 9.5001C5.9375 9.81439 5.85595 10.1097 5.71345 10.3654M5.71345 8.63481L13.2865 4.42789M5.71345 10.3654L13.2865 14.5723M13.2865 4.42789C13.3976 4.637 13.5492 4.82188 13.7325 4.97171C13.9158 5.12155 14.1272 5.23333 14.3542 5.30053C14.5812 5.36773 14.8194 5.38899 15.0547 5.36308C15.29 5.33717 15.5178 5.26461 15.7248 5.14963C15.9318 5.03464 16.1137 4.87956 16.2601 4.69343C16.4064 4.5073 16.5142 4.29387 16.577 4.06561C16.6399 3.83736 16.6567 3.59885 16.6263 3.36405C16.5959 3.12924 16.519 2.90285 16.4002 2.6981C16.1659 2.29462 15.7826 1.99917 15.3328 1.87525C14.883 1.75134 14.4026 1.80886 13.9947 2.03544C13.5869 2.26202 13.2842 2.63959 13.1518 3.08696C13.0193 3.53434 13.0677 4.01582 13.2865 4.42789ZM13.2865 14.5723C13.1729 14.7769 13.1007 15.0018 13.074 15.2342C13.0473 15.4667 13.0666 15.7022 13.1309 15.9271C13.1952 16.1521 13.3032 16.3622 13.4486 16.5455C13.5941 16.7288 13.7743 16.8816 13.9788 16.9952C14.1834 17.1088 14.4083 17.1811 14.6408 17.2078C14.8732 17.2345 15.1087 17.2151 15.3337 17.1508C15.5587 17.0866 15.7688 16.9786 15.952 16.8331C16.1353 16.6876 16.2881 16.5074 16.4017 16.3029C16.6312 15.8898 16.6872 15.4024 16.5574 14.9481C16.4276 14.4937 16.1225 14.1095 15.7094 13.88C15.2963 13.6505 14.809 13.5945 14.3546 13.7244C13.9002 13.8542 13.516 14.1592 13.2865 14.5723Z"
                stroke="currentColor"
                style={{
                  stroke: "currentColor",
                  strokeOpacity: "1",
                }}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </aside>
        <div className="ml-8 pt-16 w-full">
          {children}
          <Pagination items={navItems} />
        </div>
      </Container>
    </div>
  );
}
