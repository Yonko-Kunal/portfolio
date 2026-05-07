import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Mulish } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BottomBlur from "@/components/common/BottomBlur";
import OnekoCat from "@/components/common/OnekoCat";
import ScrollToTop from "@/components/common/ScrollToTop";
import ThemeAwareToaster from "@/components/common/ThemeAwareToaster";
import { Quote } from "@/components/common/Quote";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactLenis } from "@/lib/lenis";


import { siteConfig } from "@/config/Meta";
import Providers from "@/components/providers";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,

  authors: [
    {
      name: siteConfig.author.name,
    },
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  verification: {
    google: "c2bt68PTX0f7gyu3DsL8LcN9f3zYcRaeRg41lNKOORA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${plexMono.variable} ${plexSans.variable} ${mulish.className} antialiased`}
      >
        <ReactLenis root>
          <Providers>
            <TooltipProvider>
              <Navbar />
              <ScrollToTop />
              <BottomBlur />

              {children}

              <OnekoCat />
              <Quote />
              <Footer />
              <ThemeAwareToaster />
            </TooltipProvider>
          </Providers>

          <Analytics />
        </ReactLenis>
      </body>
    </html>
  );
}