import type { Section } from "@/lib/content";
import TextImage from "./TextImage";
import FeatureList from "./FeatureList";
import FaqItems from "./FaqItems";

export default function SectionRenderer({
  sections,
  pageBgColor,
}: {
  sections: Section[];
  pageBgColor?: string;
}) {
  return (
    <>
      {(sections ?? []).map((section, i) => {
        const bgColor = section.bgColor ?? pageBgColor;
        switch (section.type) {
          case "text_image":
            return <TextImage key={i} section={section} bgColor={bgColor} />;
          case "feature_list":
            return <FeatureList key={i} section={section} bgColor={bgColor} />;
          case "faq_items":
            return <FaqItems key={i} section={section} bgColor={bgColor} />;
          default:
            return null;
        }
      })}
    </>
  );
}
