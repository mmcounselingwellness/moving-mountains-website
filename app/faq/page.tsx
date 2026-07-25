import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import SectionRenderer from "@/components/sections/SectionRenderer";
import ThrizerWidget from "@/components/ThrizerWidget";

const page = getPage("faq")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  robots: page.index ? "index" : "noindex",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const [intro, faqSection, ...rest] = page.sections;

  return (
    <>
      <SectionRenderer sections={[intro]} />
      <SectionRenderer sections={[faqSection]} />
      <ThrizerWidget />
      <SectionRenderer sections={rest} />
    </>
  );
}
