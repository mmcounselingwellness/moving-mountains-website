import Image from "next/image";
import type { ReactNode } from "react";

const swatches = [
  { name: "Custom (Background)", token: "custom", hex: "#FFF9F0", className: "bg-custom", border: true },
  { name: "Heading (Teal)", token: "heading", hex: "#406B6A", className: "bg-heading" },
  { name: "Primary (Orange)", token: "primary", hex: "#D36139", className: "bg-primary" },
  { name: "Secondary (Light Orange)", token: "secondary", hex: "#DE9278", className: "bg-secondary" },
];

function Code({ children }: { children: string }) {
  return <code className="block text-xs bg-gray-100 px-2 py-1 rounded mt-3 break-all">{children}</code>;
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-600 mt-2">{children}</p>;
}

export default function StyleGuide() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="mb-12 border-t border-gray-200 pt-16">
          <h1 className="font-fraunces text-5xl font-bold text-heading mb-4">Style Guide</h1>
          <p className="text-lg text-gray-600">
            Design tokens and patterns actually in use in this codebase - not aspirational or ported from the old
            site. Source of truth is <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">app/globals.css</code> for
            tokens and the components linked in each section below for markup.
          </p>
        </div>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {swatches.map((s) => (
              <div key={s.token}>
                <div className={`${s.className} h-24 rounded-lg mb-3 ${s.border ? "border-2 border-gray-300" : ""}`} />
                <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.hex}</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">--color-{s.token}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Typography</h2>

          <div className="bg-gray-50 rounded-lg p-8 mb-6">
            <p className="font-fraunces text-2xl text-heading">Fraunces</p>
            <Code>font-fraunces - headings</Code>
            <p className="font-raleway text-2xl text-gray-900 mt-6">Raleway</p>
            <Code>font-raleway - body text (site default)</Code>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              CMS markdown heading levels (components/Markdown.tsx)
            </p>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-fraunces tracking-tight text-heading sm:text-5xl">H1 / H2 - Headline</h1>
                <Label>Markdown <code>#</code> or <code>##</code> both render as the section headline</Label>
                <Code>text-4xl font-fraunces tracking-tight text-heading sm:text-5xl</Code>
              </div>
              <div>
                <p className="text-base/7 font-semibold text-primary">H3 - Eyebrow</p>
                <Label>Markdown <code>###</code> renders as a small label above the headline, not a real heading</Label>
                <Code>text-base/7 font-semibold text-primary</Code>
              </div>
              <div>
                <p className="text-xl/8 text-balance text-gray-700">H4 - Subline</p>
                <Label>Markdown <code>####</code> renders as the larger intro sentence under the headline</Label>
                <Code>text-xl/8 text-balance text-gray-700</Code>
              </div>
              <div>
                <p className="text-base/7 text-gray-600">
                  Body paragraph text, the default for regular markdown paragraphs, with{" "}
                  <strong className="font-semibold text-gray-900">bold emphasis</strong> and a{" "}
                  <a href="#" className="font-semibold text-heading hover:text-primary">
                    text link
                  </a>
                  .
                </p>
                <Code>text-base/7 text-gray-600</Code>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Buttons &amp; Links</h2>
          <div className="bg-gray-50 rounded-lg p-8 space-y-8">
            <div>
              <span className="inline-block bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium rounded-lg text-center">
                Primary Button
              </span>
              <Label>
                Used for all CTAs - inserted into markdown content via the CTA Button editor component (see the
                text-only test above), and hardcoded for the contact form submit button.
              </Label>
              <Code>bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium rounded-lg</Code>
            </div>
            <div>
              <a href="#" className="text-primary font-semibold hover:text-secondary transition-colors">
                Text Link &rarr;
              </a>
              <Label>Used for inline navigation links (&ldquo;Learn more&rdquo;, &ldquo;See our job postings&rdquo;, etc.)</Label>
              <Code>text-primary font-semibold hover:text-secondary transition-colors</Code>
            </div>
            <p className="text-sm text-gray-500 italic">
              Note: the old site&rsquo;s style guide also showed an outlined &ldquo;Secondary Button&rdquo; variant.
              It isn&rsquo;t used anywhere in the current codebase, so it&rsquo;s omitted here rather than documented
              as if it were real.
            </p>
          </div>
        </section>

        {/* Lists */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Lists</h2>
          <div className="bg-gray-50 rounded-lg p-8 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-fraunces text-lg font-semibold text-heading mb-4">Checklist (feature_list)</h3>
              <ul className="space-y-3 text-gray-700">
                {["Item with checkmark icon", "Another item with checkmark"].map((t) => (
                  <li key={t} className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary">
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base/7 text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
              <Code>components/sections/FeatureList.tsx - style: &quot;checklist&quot;</Code>
            </div>
            <div>
              <h3 className="font-fraunces text-lg font-semibold text-heading mb-4">Plain markdown list</h3>
              <ul className="list-disc pl-6 space-y-1 text-base/7 text-gray-600">
                <li>Bullet from a markdown field</li>
                <li>
                  Another bullet with <strong className="font-semibold text-gray-900">bold</strong> inline
                </li>
              </ul>
              <Code>components/Markdown.tsx - ul/li overrides</Code>
            </div>
          </div>
        </section>

        {/* Cards / list rows */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Content Rows</h2>
          <p className="text-gray-600 mb-6">
            The current design doesn&rsquo;t use boxed, shadowed &ldquo;cards&rdquo; the way the old site&rsquo;s
            style guide did - team and blog listings both use a borderless image + text row instead.
          </p>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex flex-col gap-6 sm:flex-row">
              <Image
                src="/images/kate-heather-in-office.jpg"
                alt="Example row image"
                width={208}
                height={260}
                className="aspect-4/5 w-40 flex-none rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5"
              />
              <div className="max-w-xl flex-auto">
                <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">Row Title, Credentials</h3>
                <p className="text-base/7 text-gray-600">Subtitle line</p>
                <p className="mt-2 text-base/7 text-gray-600">Short supporting copy for this row.</p>
                <a href="#" className="mt-4 inline-flex text-sm/6 font-semibold text-heading hover:text-primary transition-colors">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <Code>app/our-team/page.tsx and app/blog/page.tsx use this same row pattern</Code>
          </div>
        </section>

        {/* Form elements */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Form Elements</h2>
          <div className="bg-gray-50 rounded-lg p-8 max-w-xl">
            <label htmlFor="sg-demo-input" className="block text-sm/6 font-semibold text-gray-900">
              Field label
            </label>
            <div className="mt-2.5">
              <input
                id="sg-demo-input"
                type="text"
                placeholder="Placeholder text"
                className="block w-full rounded-md bg-custom px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
              />
            </div>
            <Code>components/ContactForm.tsx inputClass</Code>
            <Label>
              Focus ring uses <code>outline-primary</code>, not the old site&rsquo;s leftover default indigo.
            </Label>
          </div>
        </section>

        {/* Images */}
        <section>
          <h2 className="font-fraunces text-3xl font-bold text-heading mb-6">Image Treatments</h2>
          <div className="bg-gray-50 rounded-lg p-8 space-y-8">
            <div>
              <h3 className="font-fraunces text-lg font-semibold text-heading mb-3">Rounded (text_image layout)</h3>
              <Image
                src="/images/outside-view-of-office.jpg"
                alt="Example rounded image"
                width={256}
                height={192}
                className="aspect-3/2 w-64 rounded-xl object-cover"
              />
              <Code>aspect-3/2 rounded-xl object-cover</Code>
            </div>
            <div>
              <h3 className="font-fraunces text-lg font-semibold text-heading mb-3">Avatar / row (team, blog)</h3>
              <Image
                src="/images/kate-heather-in-office.jpg"
                alt="Example avatar image"
                width={104}
                height={130}
                className="aspect-4/5 w-26 rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5"
              />
              <Code>aspect-4/5 rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5</Code>
            </div>
            <div>
              <h3 className="font-fraunces text-lg font-semibold text-heading mb-3">Full-bleed (full-image, overlay layouts)</h3>
              <Image
                src="/images/inside-office-wide.jpg"
                alt="Example full-bleed image"
                width={480}
                height={200}
                className="aspect-video w-full rounded-xl object-cover"
              />
              <Code>aspect-video w-full object-cover (rounded-xl in-flow, full-bleed for overlay layouts)</Code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
