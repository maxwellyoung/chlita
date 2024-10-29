import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const authenticSans = localFont({
  src: "../../public/fonts/authentic-sans-60.woff2",
  variable: "--font-authentic-sans",
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
  metadataBase: new URL("https://chlita.com"), // Replace with your actual domain
  title: {
    default: "Ch'lita | London-based Fashion Stylist & Consultant",
    template: "%s | Ch'lita",
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
    title: "Ch'lita | London-based Fashion Stylist & Consultant",
    description:
      "Professional fashion stylist and consultant based in London, offering personalized styling services and wardrobe consultation.",
    siteName: "Ch'lita",
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
    creator: "@chlita", // Replace with actual Twitter handle
    images: ["/chlitacorp.png"], // Add your Twitter card image
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${authenticSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
