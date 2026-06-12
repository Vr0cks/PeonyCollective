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
  keywords: ["ikinci el lüks", "orijinal lüks çanta", "ikinci el marka kıyafet", "lüks moda", "sürdürülebilir moda", "peony collective"],
  authors: [{ name: "Peony Collective" }],
  creator: "Peony Collective",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://peonycollective.com",
    siteName: "Peony Collective",
    title: "Peony | İkinci El Lüks Moda Platformu",
    description: "Orijinalliği onaylanmış ikinci el lüks çanta, kıyafet, ayakkabı ve aksesuar alım satım platformu.",
    images: [
      {
        url: "https://peonycollective.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Peony Collective Lüks İkinci El",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peony | İkinci El Lüks Moda Platformu",
    description: "Orijinalliği onaylanmış ikinci el lüks çanta, kıyafet, ayakkabı ve aksesuar alım satım platformu.",
    images: ["https://peonycollective.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Peony Collective",
              "url": "https://peonycollective.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://peonycollective.com/?brand={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Peony Collective",
              "url": "https://peonycollective.com",
              "logo": "https://peonycollective.com/logo.png",
              "description": "Orijinalliği onaylanmış ikinci el lüks çanta, kıyafet, ayakkabı ve aksesuar alım satım platformu."
            })
          }}
        />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <ConciergeWidget />
      </body>
    </html>
  );
}
