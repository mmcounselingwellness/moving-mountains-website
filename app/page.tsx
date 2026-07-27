import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import SectionRenderer from "@/components/sections/SectionRenderer";

const page = getPage("home")!;

export const metadata: Metadata = {
  title: page.seoTitle || page.title,
  description: page.description,
  robots: page.index ? "index" : "noindex",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <SectionRenderer sections={page.sections} />;
}
