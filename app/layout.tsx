import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const sans = localFont({
  src: "../public/fonts/manrope-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 800",
});
const mono = localFont({
  src: "../public/fonts/ibm-plex-mono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
  preload: false,
  weight: "400",
});
export const metadata: Metadata = {
  title: "Hearthline — A shared path forward",
  description:
    "Connect decisions, commitments, and evidence in one shared project record. Explore the fictional Hearthline community coordination demo.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
