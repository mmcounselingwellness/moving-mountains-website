import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type CtaLink = { label: string; link: string };
export type GalleryImage = { src: string; alt: string };
export type FeatureItem = { label: string; description?: string };
export type FaqItem = { question: string; answer: string };

export type TextImageSection = {
  type: "text_image";
  layout: "text-only" | "image-left" | "image-right" | "gallery" | "full-image";
  eyebrow?: string;
  headline?: string;
  subline?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  images?: GalleryImage[];
  cta1?: CtaLink;
  cta2?: CtaLink;
};

export type FeatureListSection = {
  type: "feature_list";
  eyebrow?: string;
  heading?: string;
  intro?: string;
  style: "grid" | "checklist" | "plain-list";
  items: FeatureItem[];
  cta?: CtaLink;
};

export type FaqItemsSection = {
  type: "faq_items";
  heading?: string;
  items: FaqItem[];
};

export type Section = TextImageSection | FeatureListSection | FaqItemsSection;

export type Page = {
  slug: string;
  title: string;
  description: string;
  index: boolean;
  sections: Section[];
};

export type NavChild = { label: string; url: string };
export type NavItem = { label: string; url: string; children?: NavChild[] };

export type SiteSettings = {
  bannerText: string;
  bannerLink: string;
  logoHorizontal: string;
  logoVertical: string;
  logoWhite: string;
  logoTall: string;
  mainNav: NavItem[];
  footerNav: NavItem[];
  footerCta: { heading: string; body: string; ctaLabel: string; ctaLink: string };
  address: { street: string; streetNote?: string; city: string; state: string; zip: string };
  geo: { lat: number; lng: number };
  email: string;
  phone?: string;
  hours: { days: string; opens: string; closes: string }[];
  areaServed: { name: string }[];
  serviceCatalog: { name: string }[];
};

export type TeamMember = {
  slug: string;
  name: string;
  credentials: string;
  order: number;
  status: "accepting" | "waitlist" | "not_accepting";
  statusLine?: string;
  photo: string;
  photoAlt: string;
  eyebrow: string;
  subtitle: string;
  cardBio: string;
  listSectionHeading?: string;
  listItems: { item: string }[];
  ctaLabel: string;
  body: string;
};

export function getSiteSettings(): SiteSettings {
  const raw = fs.readFileSync(path.join(contentDir, "settings/site.json"), "utf8");
  return JSON.parse(raw);
}

export function getPages(): Page[] {
  const dir = path.join(contentDir, "pages");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      return { slug: file.replace(/\.json$/, ""), ...JSON.parse(raw) } as Page;
    });
}

export function getPage(slug: string): Page | undefined {
  return getPages().find((p) => p.slug === slug);
}

export function getTeamMembers(): TeamMember[] {
  const dir = path.join(contentDir, "team");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), ...data, body: content.trim() } as TeamMember;
    })
    .sort((a, b) => a.order - b.order);
}

export function getTeamMember(slug: string): TeamMember | undefined {
  return getTeamMembers().find((m) => m.slug === slug);
}
