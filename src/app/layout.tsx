import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildWebApplicationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { createSharedMetadata } from "@/lib/seo/site";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = createSharedMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={[buildWebsiteJsonLd(), buildWebApplicationJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
