import Container from "@/components/container";
import Tabs from "./tabs";
import BackgroundGradient from "@/components/background-gradient";

export default async function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow bg-[#fafafa]">
      <Tabs />
      <Container>{children}</Container>
    </div>
  );
}
