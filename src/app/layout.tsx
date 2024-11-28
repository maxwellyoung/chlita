import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GTMScript } from "@/components/gtm-script";
import { GTMNoscript } from "@/components/gtm-noscript";

const jost = localFont({
  src: [
    {
      path: "../../public/fonts/Jost-400-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Jost-500-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Jost-600-Semi.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Jost-700-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-futura",
  preload: true,
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chlita.com"),
  title: {
    default: "Ch'lita | London-based Fashion Stylist & Consultant",
    template: "Ch'lita | %s",
  },
  description:
    "Ch'lita is a professional fashion stylist and consultant based in London, offering personalized styling services, wardrobe consultation, and fashion direction.",
  keywords: [
    "fashion stylist",
    "London stylist",
    "wardrobe consultant",
    "fashion consultant",
    "personal styling",
    "Ch'lita",
    "Ch'lita London",
    "Ch'lita Stylist",
    "product designer",
    "merchandise designer",
    "product design",
    "fashion styling",
    "fashion direction",
    "wardrobe stylist",
    "wardrobe consultant",
    "wardrobe styling",
    "fashion styling services",
    "wardrobe consultation",
    "fashion direction services",
    "fashion styling London",
    "wardrobe consultant London",
    "wardrobe styling London",
    "fashion direction London",
  ],
  authors: [{ name: "Ch'lita" }],
  creator: "Ch'lita",
  publisher: "Ch'lita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Fashion",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://chlita.com",
    siteName: "Ch'lita",
    title: "Ch'lita | London-based Fashion Stylist & Consultant",
    description:
      "Professional fashion stylist and consultant based in London, offering personalized styling services and wardrobe consultation.",
    images: [
      {
        url: "/chlitacorp.png",
        width: 1200,
        height: 630,
        alt: "Ch'lita - Fashion Stylist & Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ch'lita | London-based Fashion Stylist & Consultant",
    description:
      "Professional fashion stylist and consultant based in London, offering personalized styling services and wardrobe consultation.",
    creator: "@chlita",
    images: ["/chlitacorp.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ch'lita",
              alternateName: "Ch'lita Fashion",
              url: "https://chlita.com",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <GTMNoscript />
        <GTMScript />
        {children}
      </body>
    </html>
  );
}
