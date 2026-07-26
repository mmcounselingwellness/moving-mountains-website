import type { SiteSettings } from "@/lib/content";

export default function JsonLd({ settings }: { settings: SiteSettings }) {
  const { address, geo, email, hours, areaServed, serviceCatalog } = settings;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Moving Mountains Counseling & Wellness",
    image: "https://mmcounselingwellness.com/images/logo-horizontal.jpg",
    "@id": "https://mmcounselingwellness.com",
    url: "https://mmcounselingwellness.com",
    email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetNote ? `${address.street} (${address.streetNote})` : address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    openingHoursSpecification: (hours ?? []).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: (areaServed ?? []).map((a) => ({ "@type": "City", name: a.name, addressRegion: "MA" })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Therapy Services",
      itemListElement: (serviceCatalog ?? []).map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "MedicalTherapy", name: s.name },
      })),
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
