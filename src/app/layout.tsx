import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const authenticSans = localFont({
  src: "../../public/fonts/authentic-sans-60.woff2",
  variable: "--font-authentic-sans",
});

export const metadata: Metadata = {
  title: "Ch'lita",
  description: "Ch'lita is a stylist and consultant based in London.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${authenticSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
