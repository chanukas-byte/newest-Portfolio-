import type { Metadata } from "next";
import { Bodoni_Moda, Mona_Sans } from "next/font/google";
import "./globals.css";

const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Chanuka Senevirathne | Data Engineer",
  description:
    "Portfolio of a data engineer building reliable pipelines, warehouses and platforms.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mona.variable} ${bodoni.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg uppercase font-body text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
