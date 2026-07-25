import type { Metadata } from "next";
import { Fraunces, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import ConsentBanner from "@/components/chrome/ConsentBanner";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--fraunces-font",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--raleway-font",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mmcounselingwellness.com"),
  title: "Moving Mountains Counseling & Wellness",
  description: "Therapist in Princeton, MA — anxiety, depression, grief & trauma counseling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${raleway.variable}`}>
      <body className="font-raleway bg-custom text-gray-900 min-h-full">
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
