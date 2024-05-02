import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Fragment } from "react";

export default function FrameworkLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer size="small" />
    </Fragment>
  );
}
