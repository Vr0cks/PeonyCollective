import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ConciergeWidget from "@/src/components/ConciergeWidget";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Peony | İkinci El Lüks Moda Platformu",
  description: "Orijinalliği onaylanmış ikinci el lüks çanta, kıyafet, ayakkabı ve aksesuar alım satım platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#FCFCFB] text-[#1A1A1A] antialiased flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <ConciergeWidget />
      </body>
    </html>
  );
}
