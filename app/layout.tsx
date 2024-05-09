import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import TrackerComponent from "./tracker";
import { AppProvider } from "@/lib/hooks/use-app";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <body className={`${inter.className}`}>
        <Toaster />
        <div className={`flex flex-col min-h-screen max-w-full`}>
          {children}
          <Analytics />
        </div>
      </body>
      <TrackerComponent />
    </AppProvider>
  );
}
