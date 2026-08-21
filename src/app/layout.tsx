import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ConciergeWidget from "@/src/components/ConciergeWidget";
import { CartProvider } from "@/src/context/CartContext";
import { SettingsProvider } from "@/src/context/SettingsContext";
import CartDrawer from "@/src/components/CartDrawer";
import BottomTabBar from "@/src/components/BottomTabBar";
import PwaInstallPrompt from "@/src/components/PwaInstallPrompt";
import ScrollToTop from "@/src/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.peony-collective.com"),
  title: "Peony Collective | Küratörlü İkinci El Lüks Moda",
  description: "Uzman onaylı ve orijinallik garantili ikinci el lüks çanta, saat, kıyafet ve aksesuar koleksiyonu. Sürdürülebilir lüksün adresi.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Peony C.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: ["ikinci el lüks", "orijinal lüks çanta", "ikinci el marka kıyafet", "lüks moda", "sürdürülebilir moda", "peony collective", "lüks saat"],
  authors: [{ name: "Peony Collective" }],
  creator: "Peony Collective",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.peony-collective.com",
    siteName: "Peony Collective",
    title: "Peony Collective | Küratörlü İkinci El Lüks Moda",
    description: "Uzman onaylı ve orijinallik garantili ikinci el lüks çanta, saat, kıyafet ve aksesuar koleksiyonu. Sürdürülebilir lüksün adresi.",
    images: [
      {
        url: "https://www.peony-collective.com/luxury_wardrobe_bg.png",
        width: 1200,
        height: 630,
        alt: "Peony Collective Lüks İkinci El Moda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peony Collective | Küratörlü İkinci El Lüks Moda",
    description: "Uzman onaylı ve orijinallik garantili ikinci el lüks çanta, saat, kıyafet ve aksesuar koleksiyonu. Sürdürülebilir lüksün adresi.",
    images: ["https://www.peony-collective.com/luxury_wardrobe_bg.png"],
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
      <body className="antialiased flex flex-col min-h-[100dvh] bg-[#0C0D10] text-[#1A1D24]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Peony Collective",
              "url": "https://www.peony-collective.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.peony-collective.com/?brand={search_term_string}",
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
              "url": "https://www.peony-collective.com",
              "logo": "https://www.peony-collective.com/logo.png",
              "description": "Orijinalliği onaylanmış ikinci el lüks çanta, kıyafet, ayakkabı ve aksesuar alım satım platformu."
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `
          }}
        />
        <CartProvider>
          <SettingsProvider>
            <Navbar />
            <CartDrawer />
            <div className="flex-grow pb-16 md:pb-0 bg-[#FBF9F6]">{children}</div>
            <Footer />
            <ConciergeWidget />
            <BottomTabBar />
            <PwaInstallPrompt />
            <ScrollToTop />
          </SettingsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
