import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Fragment } from "react";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Navbar fullWidth />
      {children}
      <Footer fullWidth />
    </Fragment>
  );
}
