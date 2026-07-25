import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Moving Mountains Counseling & Wellness",
  description: "Learn how Moving Mountains Counseling & Wellness handles website data, analytics, and your privacy when you visit our site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-base/7 font-semibold text-primary">Website Privacy</p>
          <h1 className="mt-2 text-4xl font-fraunces tracking-tight text-pretty text-heading sm:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-lg/8 text-gray-700">
            Last updated: <time dateTime="2025-11">November 2025</time>
          </p>

          <div className="mt-12 space-y-10 text-base/7 text-gray-700">
            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Introduction</h2>
              <p>
                This privacy policy describes how our website collects and uses information when you visit
                mmcounselingwellness.com. This policy applies only to our website and does not cover clinical
                services, which are subject to separate HIPAA privacy protections.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Information We Collect</h2>
              <p className="mb-4">When you visit our website, we may collect the following types of information:</p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Analytics Data</h3>
              <p className="mb-3">We use Google Analytics to understand how visitors use our website. This service collects:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pages you visit and how long you stay</li>
                <li>How you arrived at our site (search engine, direct link, etc.)</li>
                <li>General location information (city/region level)</li>
                <li>Device type and browser information</li>
                <li>Anonymous identifiers stored in cookies</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Contact Form Information</h3>
              <p className="mb-3">When you submit a contact form, we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name</li>
                <li>Email address</li>
                <li>Phone number (if provided)</li>
                <li>Your message</li>
              </ul>
              <p className="mt-3">This information is sent to us via Web3Forms and is used only to respond to your inquiry.</p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">How We Use This Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Analytics data:</strong> To understand which pages are most helpful and improve our website experience</li>
                <li><strong>Contact form data:</strong> To respond to your questions and schedule consultations</li>
              </ul>
              <p className="mt-4">We do not sell, rent, or share your information with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Cookies &amp; Tracking</h2>
              <p className="mb-4">
                Our website uses cookies for analytics purposes. When you first visit our site, you&rsquo;ll see a
                notice about analytics tracking.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Your Choices</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Accept:</strong> By clicking &ldquo;Accept&rdquo; or continuing to browse, you consent to analytics tracking</li>
                <li><strong>Decline:</strong> Click &ldquo;Decline&rdquo; to opt out. We will not track your visit</li>
                <li><strong>Change Your Mind:</strong> Click &ldquo;Privacy Settings&rdquo; in the footer at any time to update your preference</li>
              </ul>

              <p className="mt-4">If you decline or disable analytics, our website will still work normally.</p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Third-Party Services</h2>
              <p className="mb-4">Our website uses the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Google Analytics:</strong> Website analytics service (
                  <a href="https://policies.google.com/privacy" className="text-primary hover:text-secondary underline" target="_blank" rel="noopener noreferrer">
                    Google Privacy Policy
                  </a>
                  )
                </li>
                <li>
                  <strong>Web3Forms:</strong> Contact form processing service (
                  <a href="https://web3forms.com/privacy" className="text-primary hover:text-secondary underline" target="_blank" rel="noopener noreferrer">
                    Web3Forms Privacy Policy
                  </a>
                  )
                </li>
                <li>
                  <strong>Google Fonts:</strong> Typography service (
                  <a href="https://policies.google.com/privacy" className="text-primary hover:text-secondary underline" target="_blank" rel="noopener noreferrer">
                    Google Privacy Policy
                  </a>
                  )
                </li>
              </ul>
              <p className="mt-4">These services have their own privacy policies and may collect data subject to their terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Data Security</h2>
              <p>
                Our website uses HTTPS encryption to protect data transmitted between your browser and our servers.
                However, no method of internet transmission is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Opt out of analytics tracking (click &ldquo;Privacy Settings&rdquo; in the footer)</li>
                <li>Request information about data we&rsquo;ve collected via contact forms</li>
                <li>Request deletion of contact form submissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-fraunces tracking-tight text-heading mb-4">Questions?</h2>
              <p>If you have questions about this privacy policy or how we handle your website data, please contact us:</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@mmcounselingwellness.com" className="text-primary hover:text-secondary underline">
                    info@mmcounselingwellness.com
                  </a>
                </li>
                <li><strong>Address:</strong> 213 Mountain Rd, Princeton, MA 01541</li>
              </ul>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 italic">
                This privacy policy covers website data collection only. Clinical services are protected under
                separate HIPAA privacy regulations. For questions about clinical privacy practices, please contact
                our office directly.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
