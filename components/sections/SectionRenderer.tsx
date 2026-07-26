import type { Section } from "@/lib/content";
import TextImage from "./TextImage";
import FeatureList from "./FeatureList";
import FaqItems from "./FaqItems";

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {(sections ?? []).map((section, i) => {
        switch (section.type) {
          case "text_image":
            return <TextImage key={i} section={section} />;
          case "feature_list":
            return <FeatureList key={i} section={section} />;
          case "faq_items":
            return <FaqItems key={i} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
