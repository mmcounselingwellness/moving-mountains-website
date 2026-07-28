import Image from "next/image";
import type { TextImageSection } from "@/lib/content";
import Markdown from "@/components/Markdown";

export default function TextImage({ section, bgColor }: { section: TextImageSection; bgColor?: string }) {
  const { content } = section;
  const variant = section.layout?.[0] ?? { type: "text-only" as const };
  const layout = variant.type;
  const image = "image" in variant ? variant.image : undefined;
  const imageAlt = "imageAlt" in variant ? variant.imageAlt : undefined;
  const images = "images" in variant ? variant.images : undefined;
  const bgStyle = bgColor ? { backgroundColor: bgColor } : undefined;

  const textCol = content && (
    <div>
      <Markdown text={content} />
    </div>
  );

  if (layout === "hero-image-right" || layout === "hero-image-left") {
    const imageFirst = layout === "hero-image-left";
    const heroTextCol = content && (
      <div>
        <Markdown text={content} headingSize="hero" />
      </div>
    );
    const heroImageCol = (
      <div
        className={`relative lg:col-span-5 xl:absolute xl:inset-0 ${
          imageFirst ? "lg:-ml-8 xl:right-1/2 xl:ml-0" : "lg:-mr-8 xl:left-1/2 xl:mr-0"
        }`}
      >
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? ""}
            width={1000}
            height={667}
            className="hidden aspect-3/2 w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_15%,black)] [mask-repeat:no-repeat] [mask-size:100%_100%] md:block lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        )}
      </div>
    );
    return (
      <div className="relative pt-2" style={bgStyle}>
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          {imageFirst && heroImageCol}
          <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-35 lg:pb-48 xl:col-span-6">
            <div className="mx-auto max-w-lg lg:mx-0">{heroTextCol}</div>
          </div>
          {!imageFirst && heroImageCol}
        </div>
      </div>
    );
  }

  if (layout === "overlay-left" || layout === "overlay-right") {
    return (
      <div className="relative isolate flex min-h-[28rem] items-center overflow-hidden sm:min-h-[36rem]" style={bgStyle}>
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            className="absolute inset-0 -z-20 size-full object-cover"
          />
        )}
        <div
          className={`absolute inset-0 -z-10 ${
            layout === "overlay-left"
              ? "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
              : "bg-gradient-to-l from-black/70 via-black/40 to-transparent"
          }`}
        />
        <div className={`relative mx-auto w-full max-w-7xl px-6 lg:px-8 ${layout === "overlay-right" ? "flex justify-end" : ""}`}>
          <div className="max-w-lg">{content && <Markdown text={content} theme="dark" />}</div>
        </div>
      </div>
    );
  }

  if (layout === "text-only") {
    return (
      <div style={bgStyle}>
        <div className="mx-auto max-w-2xl px-6 py-16 lg:px-8">{textCol}</div>
      </div>
    );
  }

  if (layout === "full-image") {
    return (
      <div className="bg-white px-6 py-8 lg:px-8" style={bgStyle}>
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? ""}
            width={1200}
            height={675}
            className="aspect-video w-full rounded-xl bg-gray-50 object-cover"
          />
        )}
      </div>
    );
  }

  if (layout === "gallery") {
    return (
      <div className="overflow-hidden py-16 sm:py-24" style={bgStyle}>
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
    <div style={bgStyle}>
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
    </div>
  );
}
