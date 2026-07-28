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
      <StyleGuide />
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h1 className="font-fraunces text-5xl font-bold text-heading border-t border-gray-200 pt-16">
          Section &amp; Layout Tests
        </h1>
      </div>
      <SectionRenderer sections={page.sections} pageBgColor={page.bgColor} />
    </>
  );
}
