"use client";
import Container from "@/components/container";
import Tabs from "./tabs";
import Footer from "@/components/footer";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@/components/fallback";

export default async function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Tabs />
      <ErrorBoundary fallbackRender={Fallback}>{children}</ErrorBoundary>
      <Footer />
    </div>
  );
}
