import { MetadataRoute } from "next";
import { getPages, getTeamMembers, getBlogPosts } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://mmcounselingwellness.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/our-team", "/privacy", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
  }));

  const pageRoutes = getPages()
    .filter((p) => p.index)
    .map((p) => ({ url: p.slug === "home" ? BASE_URL : `${BASE_URL}/${p.slug}` }));

  const teamRoutes = getTeamMembers().map((m) => ({ url: `${BASE_URL}/${m.slug}` }));

  const blogRoutes = getBlogPosts().map((post) => ({ url: `${BASE_URL}/blog/${post.slug}` }));

  return [...pageRoutes, ...staticRoutes, ...teamRoutes, ...blogRoutes];
}
