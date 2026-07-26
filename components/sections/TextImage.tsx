import Image from "next/image";
import type { TextImageSection } from "@/lib/content";
import Markdown from "@/components/Markdown";

export default function TextImage({ section }: { section: TextImageSection }) {
  const { content } = section;
  const variant = section.layout?.[0] ?? { type: "text-only" as const };
  const layout = variant.type;
  const image = "image" in variant ? variant.image : undefined;
  const imageAlt = "imageAlt" in variant ? variant.imageAlt : undefined;
  const images = "images" in variant ? variant.images : undefined;

  const textCol = content && (
    <div>
      <Markdown text={content} />
    </div>
  );

  if (layout === "overlay-left" || layout === "overlay-right") {
    return (
      <div className="relative isolate flex min-h-[28rem] items-center overflow-hidden sm:min-h-[36rem]">
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
      <div className="mx-auto max-w-2xl px-6 py-16 lg:px-8">{textCol}</div>
    );
  }

  if (layout === "full-image") {
    return (
      <div className="bg-white px-6 py-8 lg:px-8">
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
