import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getPages } from "@/lib/content";
import SectionRenderer from "@/components/sections/SectionRenderer";

// Slugs with a dedicated app/<slug>/page.tsx route (custom logic beyond
// generic sections) are excluded here so they aren't double-generated.
const RESERVED_SLUGS = ["home", "faq"];

export function generateStaticParams() {
  return getPages()
    .filter((p) => !RESERVED_SLUGS.includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    robots: page.index ? "index" : "noindex",
    alternates: { canonical: `/${slug}` },
  };
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
