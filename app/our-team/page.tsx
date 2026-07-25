import type { Metadata } from "next";
import Image from "next/image";
import { getTeamMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Meet Our Therapists | Licensed LICSWs Serving Worcester & Holden MA",
  description: "Meet our licensed therapists (LICSWs) in Princeton MA near Worcester & Holden. Expert counseling for anxiety, depression, grief, trauma. Accepting new clients.",
  alternates: { canonical: "/our-team" },
};

export default function OurTeamPage() {
  const members = getTeamMembers();

  return (
    <div className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">Meet our team</h2>
        <p className="mt-6 text-lg/8 text-gray-600">
          We&rsquo;re a team of therapists who believe in real conversations, genuine connection, and practical tools
          for change. Meet the clinicians who will walk alongside you on your path toward healing and growth.
        </p>
        <ul className="mt-12 divide-y divide-gray-200">
          {members.map((member) => (
            <li key={member.slug} className="flex flex-col gap-10 py-12 first:pt-0 last:pb-0 sm:flex-row">
              <Image
                src={member.photo}
                alt={member.name}
                width={208}
                height={260}
                className="aspect-4/5 w-52 flex-none rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5"
              />
              <div className="max-w-xl flex-auto">
                <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                  {member.name}, {member.credentials}
                </h3>
                <p className="text-base/7 text-gray-600">{member.subtitle}</p>
                <p className="mt-6 text-base/7 text-gray-600">{member.cardBio}</p>
                <a href={`/${member.slug}`} className="mt-4 inline-flex text-sm/6 font-semibold text-heading hover:text-primary transition-colors">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
