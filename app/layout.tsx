import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { Providers } from "./providers";
import TrackerComponent from "./tracker";

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
      <body className={`${inter.className}`}>
        <Toaster />
        <Providers>
          <div className={`flex flex-col min-h-screen max-w-full`}>
            {children}
            <Analytics />
          </div>
        </Providers>
      </body>
      <TrackerComponent />
    </html>
  );
}
