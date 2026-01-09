import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/common/Footer";
import { Quote } from "@/components/common/Quote";
import { ThemeProvider } from "next-themes";
import OnekoCat from "@/components/common/OnekoCat";
import { ViewTransitions } from "next-view-transitions";
import ThemeAwareToaster from "@/components/common/ThemeAwareToaster";
import { siteConfig } from "@/config/Meta";
import BottomBlur from "@/components/common/BottomBlur";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
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
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${plexMono.variable} ${plexSans.variable} ${plexSans.className} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="theme"
          >
            <TooltipProvider>
              <Navbar />
              <BottomBlur />
              {children}
              <OnekoCat />
              <Quote />
              <Footer />
              <ThemeAwareToaster />
            </TooltipProvider>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
