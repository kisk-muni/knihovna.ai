"use client";
import Container from "@/components/container";
import Navbar from "@/components/nav-bar";

export default async function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow bg-[#fafafa]">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}
