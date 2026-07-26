import type { Metadata } from "next";
import Image from "next/image";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog | Moving Mountains Counseling & Wellness",
  description: "News, updates, and reflections from Moving Mountains Counseling & Wellness in Princeton, MA.",
  alternates: { canonical: "/blog" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">Blog</h1>
        <p className="mt-6 text-lg/8 text-gray-600">News, updates, and reflections from our practice.</p>

        {posts.length === 0 ? (
          <p className="mt-12 text-base/7 text-gray-500">No posts yet — check back soon.</p>
        ) : (
          <div className="mt-12 space-y-16">
            {posts.map((post) => (
              <article key={post.slug} className="flex flex-col gap-8 sm:flex-row">
                {post.featured_image && (
                  <div className="sm:w-64 flex-none">
                    <Image
                      src={post.featured_image}
                      alt={post.image_alt}
                      width={400}
                      height={300}
                      className="aspect-4/3 w-full rounded-xl object-cover"
                    />
                  </div>
                )}
                <div className="flex-auto">
                  <p className="text-sm text-gray-500">
                    {formatDate(post.date)} {post.author && <>&middot; {post.author}</>}
                  </p>
                  <h2 className="mt-2 text-2xl font-fraunces tracking-tight text-heading">
                    <a href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  {post.excerpt && <p className="mt-3 text-base/7 text-gray-600">{post.excerpt}</p>}
                  <a href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm/6 font-semibold text-heading hover:text-primary transition-colors">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
