import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import JsonLd from "./JsonLd";
import PrivacySettingsButton from "./PrivacySettingsButton";

export default function Footer() {
  const settings = getSiteSettings();
  const { footerCta, address, email } = settings;
  const year = new Date().getFullYear();

  return (
    <>
      <div className="relative isolate bg-white">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 sm:pb-24">
          <div className="absolute inset-y-0 left-0 -z-10 w-full bg-orange-50" />
          <div className="mx-auto max-w-xl">
            <h2 className="text-4xl font-fraunces font-semibold tracking-tight text-heading sm:text-5xl">
              {footerCta.heading}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">{footerCta.body}</p>
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
            <div className="mt-10">
              <a
                href={footerCta.ctaLink}
                className="bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium rounded-lg inline-block"
              >
                {footerCta.ctaLabel} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-heading text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Image src={settings.logoWhite} alt="Moving Mountains Counseling & Wellness logo" width={200} height={60} className="h-15 w-auto" />
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center md:justify-end">
              {(settings.footerNav ?? []).map((item) => (
                <a key={item.label} href={item.url} className="hover:text-secondary transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/90">
              &copy; {year} Moving Mountains Counseling &amp; Wellness. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <a href="/privacy" className="text-white/90 hover:text-secondary transition-colors underline underline-offset-2">
                Privacy Policy
              </a>
              <PrivacySettingsButton />
            </div>
          </div>
        </div>
      </footer>

      <JsonLd settings={settings} />
    </>
  );
}
