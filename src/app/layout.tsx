import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "RAC Capital Management - Leading Investment Solutions",
  description: "RAC Capital Management provides comprehensive investment solutions and financial services with a focus on long-term value creation and risk management.",
  keywords: ["investment", "capital management", "financial services", "portfolio management", "wealth management"],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
      >
        {children}
      </body>
    </html>
  );
}
