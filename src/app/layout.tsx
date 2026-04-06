import type { Metadata } from "next";
import localFont from "next/font/local";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const blackCasper = localFont({
  src: "../fonts/BlackCasper.ttf",
  variable: "--font-black-casper",
  display: "swap",
});

const ledLight = localFont({
  src: "../fonts/LEDLIGHT.otf",
  variable: "--font-led-light",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liam Woods — Archive",
  description:
    "Graphic design portfolio — Innovation, Society and Technology at Syracuse University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${blackCasper.variable} ${ledLight.variable} ${specialElite.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-body min-h-full">{children}</body>
    </html>
  );
}
