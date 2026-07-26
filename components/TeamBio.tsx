import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import Markdown from "@/components/Markdown";

export default function TeamBio({ member }: { member: TeamMember }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mmcounselingwellness.com/" },
      { "@type": "ListItem", position: 2, name: "Our Team", item: "https://mmcounselingwellness.com/our-team" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${member.name}, ${member.credentials}`,
        item: `https://mmcounselingwellness.com/${member.slug}`,
      },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.subtitle,
    image: `https://mmcounselingwellness.com${member.photo}`,
    worksFor: { "@id": "https://mmcounselingwellness.com" },
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li><a href="/our-team" className="hover:text-primary transition-colors">Our Team</a></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium" aria-current="page">{member.name}</li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <p className="text-base/7 font-semibold text-primary">{member.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">
            {member.name}, {member.credentials}
          </h1>
          <p className="mt-2 text-xl/8 text-gray-600">{member.subtitle}</p>
          {member.statusLine && <p className="mt-4 text-base/7 font-semibold text-secondary">{member.statusLine}</p>}
        </div>

        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          <div className="lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="aspect-4/5 overflow-hidden rounded-2xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <Image src={member.photo} alt={member.photoAlt} width={600} height={750} className="block size-full object-cover" />
            </div>
          </div>
          <div className="lg:pr-8">
            <div className="space-y-6 text-base/7 text-gray-700">
              <Markdown text={member.body} />
            </div>

            {member.listItems && member.listItems.length > 0 && (
              <div className="mt-12">
                {member.listSectionHeading && (
                  <h2 className="text-2xl font-fraunces tracking-tight text-heading">{member.listSectionHeading}</h2>
                )}
                <ul className="mt-6 space-y-3 text-base/7 text-gray-700">
                  {member.listItems.map((li, i) => (
                    <li key={i} className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" />
                      </svg>
                      <span><Markdown text={li.item} inline /></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10">
              <a href="/contact-us" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {member.ctaLabel}
              </a>
            </div>
          </div>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </div>
  );
}
