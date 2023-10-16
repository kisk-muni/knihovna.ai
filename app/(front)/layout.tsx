import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { Fragment } from "react";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
