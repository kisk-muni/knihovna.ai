import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <body
        className={`${inter.className} flex flex-col min-h-screen max-w-full overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
