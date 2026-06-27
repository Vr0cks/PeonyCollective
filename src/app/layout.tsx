import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ConciergeWidget from "@/src/components/ConciergeWidget";
import { CartProvider } from "@/src/context/CartContext";
import CartDrawer from "@/src/components/CartDrawer";
import BottomTabBar from "@/src/components/BottomTabBar";
import PwaInstallPrompt from "@/src/components/PwaInstallPrompt";

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
  title: "Peony | İkinci El Lüks Moda Platformu",
  description: "Orijinalliği onaylanmış ikinci el lüks çanta, kıyafet, ayakkabı ve aksesuar alım satım platformu.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Peony C.",
  },
  icons: {
    apple: "/icon-192.png",
  },
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
      <body className="antialiased flex flex-col min-h-[100dvh] pb-16 md:pb-0">
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `
          }}
        />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <div className="flex-grow">{children}</div>
          <Footer />
          <ConciergeWidget />
          <BottomTabBar />
          <PwaInstallPrompt />
        </CartProvider>
      </body>
    </html>
  );
}
