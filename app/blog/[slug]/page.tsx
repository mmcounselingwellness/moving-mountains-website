import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import Markdown from "@/components/Markdown";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Moving Mountains Counseling & Wellness`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.featured_image ? `https://mmcounselingwellness.com${post.featured_image}` : undefined,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": "https://mmcounselingwellness.com" },
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium" aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <p className="text-sm text-gray-500">
          {formatDate(post.date)} {post.author && <>&middot; {post.author}</>}
        </p>
        <h1 className="mt-2 text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">
          {post.title}
        </h1>

        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.image_alt}
            width={1200}
            height={675}
            className="mt-10 aspect-video w-full rounded-xl object-cover"
          />
        )}

        <div className="mt-10 space-y-6 text-base/7 text-gray-700">
          <Markdown text={post.body} />
        </div>

        {post.galleryImages && post.galleryImages.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4">
            {post.galleryImages.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="aspect-square w-full rounded-xl object-cover"
              />
            ))}
          </div>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
