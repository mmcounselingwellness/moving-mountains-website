import Script from "next/script";

export default function ThrizerWidget() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8">
      <div className="my-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <Script
          src="https://eligibility.thrizer.com/embed.js"
          data-src="https://eligibility.thrizer.com/facility/thrizernjozr?type=iframe"
          data-title="Check Your Insurance Benefits"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}
