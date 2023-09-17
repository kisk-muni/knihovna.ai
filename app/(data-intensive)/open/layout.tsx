"use client";
import Container from "@/components/container";
import Tabs from "./tabs";
import Navbar from "@/components/navbar";

export default async function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow pt-[100px] bg-[#fafafa]">
      <Navbar fullWidth subNav={() => <Tabs />} />
      <Container>{children}</Container>
    </div>
  );
}
