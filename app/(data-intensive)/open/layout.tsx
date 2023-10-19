"use client";
import Tabs from "./tabs";
import Footer from "@/components/footer";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@/components/fallback";
import { Fragment } from "react";

export default async function OpenProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Tabs />
      <ErrorBoundary fallbackRender={Fallback}>{children}</ErrorBoundary>
      <Footer />
    </Fragment>
  );
}
