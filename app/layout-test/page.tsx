import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import SectionRenderer from "@/components/sections/SectionRenderer";
import StyleGuide from "@/components/StyleGuide";

const page = getPage("layout-test")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  robots: "noindex",
  alternates: { canonical: "/layout-test" },
};

export default function LayoutTestPage() {
  return (
    <>
      <SectionRenderer sections={page.sections} />
      <StyleGuide />
    </>
  );
}
