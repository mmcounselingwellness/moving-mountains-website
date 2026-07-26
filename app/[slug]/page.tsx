import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getPages, getTeamMember, getTeamMembers } from "@/lib/content";
import SectionRenderer from "@/components/sections/SectionRenderer";
import TeamBio from "@/components/TeamBio";

// Slugs with a dedicated app/<slug>/page.tsx route (custom logic beyond
// generic sections) are excluded here so they aren't double-generated.
const RESERVED_SLUGS = ["home", "faq", "contact-us", "layout-test"];

export function generateStaticParams() {
  const pageSlugs = getPages()
    .filter((p) => !RESERVED_SLUGS.includes(p.slug))
    .map((p) => p.slug);
  const teamSlugs = getTeamMembers().map((m) => m.slug);
  return [...new Set([...pageSlugs, ...teamSlugs])].map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const member = getTeamMember(slug);
  if (member) {
    return {
      title: `${member.name}, ${member.credentials} | Therapist in Princeton MA`,
      description: `Meet ${member.name}, ${member.credentials} - ${member.subtitle}. ${member.cardBio}`,
      alternates: { canonical: `/${slug}` },
    };
  }

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

  const member = getTeamMember(slug);
  if (member) return <TeamBio member={member} />;

  const page = getPage(slug);
  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
