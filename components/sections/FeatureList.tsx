import Image from "next/image";
import type { FeatureListSection } from "@/lib/content";

export default function FeatureList({ section, bgColor }: { section: FeatureListSection; bgColor?: string }) {
  const { eyebrow, heading, intro, style, cta, bgImage, bgImageAlt } = section;
  const items = section.items ?? [];

  return (
    <div
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {bgImage && (
        <Image
          src={bgImage}
          alt={bgImageAlt ?? ""}
          fill
          className="absolute inset-0 -z-10 size-full object-cover opacity-15"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {bgImage && (
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="aspect-1266/975 w-316.5 bg-linear-to-tr from-primary to-secondary opacity-15"
            />
          </div>
        )}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          {eyebrow && <h2 className="text-base/8 font-fraunces font-semibold text-primary">{eyebrow}</h2>}
          {heading && (
            <p className="mt-2 text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">
              {heading}
            </p>
          )}
          {intro && <p className="mt-6 text-lg/8 text-gray-700">{intro}</p>}
        </div>

        {style === "grid" && (
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-gray-900 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-y-3 border-l border-gray-900/15 pl-6">
                {item.description && <dt className="text-sm/6">{item.description}</dt>}
                <dd className="order-first text-3xl font-fraunces text-heading tracking-tight">{item.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {style === "checklist" && (
          <ul className="mx-auto mt-12 max-w-2xl space-y-4 lg:mx-0 lg:max-w-none">
            {items.map((item, i) => (
              <li key={i} className="flex gap-x-3">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-primary">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base/7 text-gray-700">
                  {item.description ? (
                    <>
                      <strong>{item.label}</strong> &ndash; {item.description}
                    </>
                  ) : (
                    item.label
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}

        {style === "plain-list" && (
          <ul className="mx-auto mt-12 max-w-2xl list-disc space-y-2 pl-5 text-base/7 text-gray-700 lg:mx-0 lg:max-w-none">
            {items.map((item, i) => (
              <li key={i}>
                {item.description ? (
                  <>
                    <strong>{item.label}</strong> &ndash; {item.description}
                  </>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <div className="mt-10">
            <a href={cta.link} target={cta.link.startsWith("http") ? "_blank" : undefined} rel={cta.link.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm/6 font-semibold text-primary hover:text-secondary">
              {cta.label} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
