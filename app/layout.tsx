import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moving Mountains Counseling & Wellness",
  description: "Therapist in Princeton, MA — anxiety, depression, grief & trauma counseling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-raleway bg-custom text-gray-900 min-h-full">
        {children}
      </body>
    </html>
  );
}
