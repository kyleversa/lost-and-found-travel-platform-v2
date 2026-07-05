import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lost & Found | Social Travel Journal",
    template: "%s | Lost & Found",
  },
  description:
    "Lost & Found is a social travel journal with Found for places you have been and Lost for places you want to go.",
  openGraph: {
    title: "Lost & Found | Social Travel Journal",
    description:
      "Explore dream trips and travel memories in two connected collections. View Finn Shepherd's demo profile.",
    type: "website",
    siteName: "Lost & Found",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lost & Found | Social Travel Journal",
    description:
      "A social travel journal with Found for memories and Lost for dream trips.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
