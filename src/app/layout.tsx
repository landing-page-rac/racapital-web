import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            .font-optima {
              font-family: 'Optima', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-optima antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
