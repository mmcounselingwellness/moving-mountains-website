import Image from "next/image";
import { getSiteSettings, getNavigation } from "@/lib/content";
import JsonLd from "./JsonLd";
import PrivacySettingsButton from "./PrivacySettingsButton";

export default function Footer() {
  const settings = getSiteSettings();
  const nav = getNavigation();
  const { footerCta, address, email } = settings;
  const year = new Date().getFullYear();

  return (
    <>
      <div className="relative isolate bg-white">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 sm:pb-24">
          <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-orange-50">
            <svg
              aria-hidden="true"
              className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-orange-200"
            >
              <defs>
                <pattern id="footer-contact-grid" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M130 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth="0" className="fill-white" />
              <rect width="100%" height="100%" fill="url(#footer-contact-grid)" strokeWidth="0" />
            </svg>
          </div>
          <div className="mx-auto max-w-xl">
            <h2 className="text-4xl font-fraunces font-semibold tracking-tight text-heading sm:text-5xl">
              {footerCta.heading}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">{footerCta.body}</p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  >
                    <path
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </dt>
                <dd>
                  {address.street}, <br />
                  {address.city}, {address.state} {address.zip}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  >
                    <path
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </dt>
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
              {(nav.footerNav ?? []).map((item) => (
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
