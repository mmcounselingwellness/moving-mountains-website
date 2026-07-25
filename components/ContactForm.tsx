"use client";

import { useState } from "react";
import Script from "next/script";

const inputClass =
  "block w-full rounded-md bg-custom px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary";

export default function ContactForm() {
  const [bcbs, setBcbs] = useState<string>("");
  const [hearAboutUs, setHearAboutUs] = useState<string>("");

  return (
    <form
      id="contact-form"
      action="https://api.web3forms.com/submit"
      method="POST"
      className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
    >
      <input type="hidden" name="access_key" value="6b2a9fd2-331c-4580-ab4d-7dec7ab9f199" />
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
              First name <span className="text-primary">*</span>
            </label>
            <div className="mt-2.5">
              <input id="first-name" type="text" name="first-name" autoComplete="given-name" required className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
              Last name <span className="text-primary">*</span>
            </label>
            <div className="mt-2.5">
              <input id="last-name" type="text" name="last-name" autoComplete="family-name" required className={inputClass} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">Phone number</label>
            <div className="mt-2.5">
              <input id="phone-number" type="tel" name="phone-number" autoComplete="tel" className={inputClass} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Email <span className="text-primary">*</span>
            </label>
            <div className="mt-2.5">
              <input id="email" type="email" name="email" autoComplete="email" required className={inputClass} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <fieldset>
              <legend className="block text-sm/6 font-semibold text-gray-900">
                Do you have Blue Cross Blue Shield (BCBS)? <span className="text-primary">*</span>
              </legend>
              <div className="mt-3 flex gap-x-6">
                <label className="flex items-center gap-x-2 cursor-pointer">
                  <input type="radio" name="bcbs" value="yes" required checked={bcbs === "yes"} onChange={(e) => setBcbs(e.target.value)} className="h-4 w-4 border-gray-300 text-primary focus:ring-primary accent-primary" />
                  <span className="text-sm/6 text-gray-900">Yes</span>
                </label>
                <label className="flex items-center gap-x-2 cursor-pointer">
                  <input type="radio" name="bcbs" value="no" required checked={bcbs === "no"} onChange={(e) => setBcbs(e.target.value)} className="h-4 w-4 border-gray-300 text-primary focus:ring-primary accent-primary" />
                  <span className="text-sm/6 text-gray-900">No</span>
                </label>
              </div>
            </fieldset>

            {bcbs === "no" && (
              <div className="mt-6 rounded-xl bg-orange-50 border border-orange-100 p-5 space-y-3">
                <p className="text-sm/6 text-gray-700">
                  We&rsquo;re in-network with BCBS and also offer private pay rates. If you have a different insurance,
                  you may still be eligible for reimbursement depending on your plan.
                </p>
                <p className="text-sm/6 text-gray-700">
                  We partner with <strong>Thrizer</strong> to make that process easier — you can check your
                  out-of-network benefits in about a minute below.
                </p>
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
            )}
          </div>

          <div className="sm:col-span-2">
            <fieldset>
              <legend className="block text-sm/6 font-semibold text-gray-900">
                What type of sessions are you hoping for? <span className="text-primary">*</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {["In person", "Telehealth", "Open to either"].map((option) => (
                  <label key={option} className="flex items-center gap-x-2 cursor-pointer">
                    <input type="radio" name="session-type" value={option} required className="h-4 w-4 border-gray-300 text-primary focus:ring-primary accent-primary" />
                    <span className="text-sm/6 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="availability" className="block text-sm/6 font-semibold text-gray-900">
              What tends to work best for your schedule? <span className="text-primary">*</span>
            </label>
            <div className="mt-2.5">
              <textarea id="availability" name="availability" rows={3} required className={inputClass} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <fieldset>
              <legend className="block text-sm/6 font-semibold text-gray-900">
                How did you hear about us? <span className="text-primary">*</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {["Facebook", "Instagram", "Psychology Today", "Flyers in the community", "Word of mouth", "Referral from another provider", "Other"].map(
                  (option) => (
                    <label key={option} className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hear-about-us"
                        value={option}
                        required
                        checked={hearAboutUs === option}
                        onChange={(e) => setHearAboutUs(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary accent-primary"
                      />
                      <span className="text-sm/6 text-gray-900">{option}</span>
                    </label>
                  )
                )}
              </div>
            </fieldset>

            {hearAboutUs === "Referral from another provider" && (
              <div className="mt-4">
                <label htmlFor="referral-provider-name" className="block text-sm/6 font-semibold text-gray-900">Who referred you?</label>
                <div className="mt-2.5">
                  <input id="referral-provider-name" type="text" name="referral-provider-name" className={inputClass} />
                </div>
              </div>
            )}

            {hearAboutUs === "Other" && (
              <div className="mt-4">
                <label htmlFor="hear-about-us-other" className="block text-sm/6 font-semibold text-gray-900">Please specify</label>
                <div className="mt-2.5">
                  <input id="hear-about-us-other" type="text" name="hear-about-us-other" className={inputClass} />
                </div>
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
              Brief message <span className="text-primary">*</span>
            </label>
            <p className="mt-1 text-sm text-gray-500">Start wherever feels easiest.</p>
            <div className="mt-2.5">
              <textarea id="message" name="message" rows={4} required className={inputClass} />
            </div>
          </div>
        </div>

        <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="_autoresponse" value="Thank you for your submission" />
        <input type="hidden" name="redirect" value="https://mmcounselingwellness.com/thank-you-for-contacting-us" />

        <div className="mt-8 flex justify-end">
          <button type="submit" className="bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium focus:ring-4 focus:outline-heading rounded-lg text-center">
            Send message
          </button>
        </div>
      </div>
    </form>
  );
}
