import type { Metadata } from "next";
import { getPage, getSiteSettings } from "@/lib/content";
import Markdown from "@/components/Markdown";
import ContactForm from "@/components/ContactForm";

const page = getPage("contact-us")!;
const intro = page.sections[0];
const introContent = "content" in intro ? intro.content : undefined;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  robots: page.index ? "index" : "noindex",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  const { address, email } = getSiteSettings();

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-orange-50 ring-1 ring-orange-50/10 lg:w-1/2" />
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            {introContent && <Markdown text={introContent} />}
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="sr-only">Address</dt>
                <dd>
                  {address.street}, <br />
                  {address.city}, {address.state} {address.zip}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={`mailto:${email}`} className="hover:text-gray-900">
                    {email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
