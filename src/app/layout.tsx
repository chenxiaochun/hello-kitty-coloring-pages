import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const metadata: Metadata = {
  title: "Hello Kitty Coloring Pages",
  description:
    "Browse and color cute Hello Kitty coloring pages online. Fun, free, and made for kids!",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: "Hello Kitty Coloring Pages",
    description:
      "Browse and color cute Hello Kitty coloring pages online. Fun, free, and made for kids!",
    type: "website",
    locale: "en_US",
    siteName: "Hello Kitty Coloring Pages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Kitty Coloring Pages",
    description:
      "Browse and color cute Hello Kitty coloring pages online. Fun, free, and made for kids!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
