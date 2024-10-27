import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const authenticSans = localFont({
  src: "../../public/fonts/authentic-sans-60.woff2",
  variable: "--font-authentic-sans",
});

export const metadata: Metadata = {
  title: "Ch'lita",
  description: "Ch’lita is a stylist and consultant based in London.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${authenticSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
