import Image from "next/image";
import type { TextImageSection } from "@/lib/content";

function Cta({ label, link, primary }: { label: string; link: string; primary: boolean }) {
  return primary ? (
    <a
      href={link}
      className="bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium focus:ring-4 focus:outline-heading focus:ring-primary rounded-lg text-center"
    >
      {label}
    </a>
  ) : (
    <a href={link} className="text-sm/6 font-semibold text-heading">
      {label} <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

function Body({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph, i) => (
        <p key={i} className="mt-6 text-base/7 text-gray-600 first:mt-0">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default function TextImage({ section }: { section: TextImageSection }) {
  const { layout, eyebrow, headline, subline, body, image, imageAlt, images, cta1, cta2 } = section;

  const textCol = (
    <div>
      {eyebrow && <p className="text-base/7 font-semibold text-primary">{eyebrow}</p>}
      {headline && (
        <h2 className="mt-2 text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">
          {headline}
        </h2>
      )}
      {subline && <p className="mt-6 text-xl/8 text-balance text-gray-700">{subline}</p>}
      {body && <Body text={body} />}
      {(cta1 || cta2) && (
        <div className="mt-8 flex items-center gap-x-6">
          {cta1 && <Cta label={cta1.label} link={cta1.link} primary />}
          {cta2 && <Cta label={cta2.label} link={cta2.link} primary={false} />}
        </div>
      )}
    </div>
  );

  if (layout === "text-only") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 lg:px-8">{textCol}</div>
    );
  }

  if (layout === "gallery") {
    return (
      <div className="overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
            <div className="lg:pr-8">{textCol}</div>
            {images && images.length > 0 && (
              <div className="pt-10 lg:pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 ${
                        i % 2 === 1 ? "-mt-8" : ""
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={400}
                        height={400}
                        className="block size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const imageCol = image && (
    <div className="relative">
      <Image
        src={image}
        alt={imageAlt ?? ""}
        width={800}
        height={800}
        className="aspect-3/2 w-full rounded-xl object-cover"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-2 lg:gap-x-8">
        {layout === "image-left" ? (
          <>
            {imageCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {imageCol}
          </>
        )}
      </div>
    </div>
  );
}
