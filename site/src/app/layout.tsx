import type { Metadata } from "next";
import { Archivo, Archivo_Black, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site, hero } from "@/content/portfolio";

const sans = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${hero.headline}`,
  description: hero.aboutTeaser,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} ${hand.variable} ${mono.variable} antialiased`}
      >
        <Nav />
        <main className="pt-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
