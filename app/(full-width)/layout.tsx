import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Fragment } from "react";

export default function DataIntensiveLayout({
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
