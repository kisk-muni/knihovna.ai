"use client";
import Container from "@/components/container";
import Tabs from "./tabs";
import BackgroundGradient from "@/components/background-gradient";
import Footer from "@/components/footer";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@/components/fallback";

export default async function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-sheet/60">
      <BackgroundGradient />
      <Tabs />
      <Container>
        <ErrorBoundary fallbackRender={Fallback}>{children}</ErrorBoundary>
      </Container>
      <Footer />
    </div>
  );
}
