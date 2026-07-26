import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type CtaLink = { label: string; link: string };
export type GalleryImage = { src: string; alt: string };
export type FeatureItem = { label: string; description?: string };
export type FaqItem = { question: string; answer: string };

export type LayoutVariant =
  | { type: "text-only" }
  | { type: "image-left"; image: string; imageAlt?: string }
  | { type: "image-right"; image: string; imageAlt?: string }
  | { type: "gallery"; images: GalleryImage[] }
  | { type: "full-image"; image: string; imageAlt?: string }
  | { type: "overlay-left"; image: string; imageAlt?: string }
  | { type: "overlay-right"; image: string; imageAlt?: string }
  | { type: "hero-image-right"; image: string; imageAlt?: string }
  | { type: "hero-image-left"; image: string; imageAlt?: string };

export type TextImageSection = {
  type: "text_image";
  content?: string;
  layout: LayoutVariant[];
};

export type FeatureListSection = {
  type: "feature_list";
  eyebrow?: string;
  heading?: string;
  intro?: string;
  style: "grid" | "checklist" | "plain-list";
  items: FeatureItem[];
  cta?: CtaLink;
  bgImage?: string;
  bgImageAlt?: string;
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
  footerCta: { heading: string; body: string; ctaLabel: string; ctaLink: string };
  address: { street: string; streetNote?: string; city: string; state: string; zip: string };
  geo: { lat: number; lng: number };
  email: string;
  phone?: string;
  hours: { days: string; opens: string; closes: string }[];
  areaServed: { name: string }[];
  serviceCatalog: { name: string }[];
};

export type Navigation = {
  mainNav: NavItem[];
  footerNav: NavItem[];
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

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  featured_image: string;
  image_alt: string;
  excerpt: string;
  draft: boolean;
  galleryImages?: GalleryImage[];
  body: string;
};

export function getSiteSettings(): SiteSettings {
  const raw = fs.readFileSync(path.join(contentDir, "settings/site.json"), "utf8");
  return JSON.parse(raw);
}

export function getNavigation(): Navigation {
  const raw = fs.readFileSync(path.join(contentDir, "settings/navigation.json"), "utf8");
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

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), ...data, body: content.trim() } as BlogPost;
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const dir = path.join(contentDir, "blog");
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const post = { slug, ...data, body: content.trim() } as BlogPost;
  return post.draft ? undefined : post;
}
