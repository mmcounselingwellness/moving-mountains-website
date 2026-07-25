import type { FaqItemsSection } from "@/lib/content";
import Markdown from "@/components/Markdown";

export default function FaqItems({ section }: { section: FaqItemsSection }) {
  const { heading, items } = section;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      {heading && (
        <h2 className="text-4xl font-fraunces tracking-tight text-heading sm:text-5xl">{heading}</h2>
      )}
      <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
        {items.map((item, i) => (
          <div key={i} className={i > 0 ? "pt-8" : ""}>
            <dt className="text-lg font-fraunces font-semibold text-heading">{item.question}</dt>
            <dd className="mt-3 text-base/7 text-gray-700">
              <Markdown text={item.answer} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
