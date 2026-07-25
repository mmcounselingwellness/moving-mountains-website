"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const STORAGE_KEY = "mm-analytics-consent";
const GA_TRACKING_ID = "G-PY8ER15JZK";
const BANNER_DISPLAY_DELAY = 1000;

type Consent = "accepted" | "declined" | null;

function getStoredConsent(): Consent {
  try {
    return localStorage.getItem(STORAGE_KEY) as Consent;
  } catch {
    return null;
  }
}

function saveConsent(value: "accepted" | "declined") {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
}

function disableGa() {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_TRACKING_ID}`] = true;
  ["_ga", "_gat", "_gid"].forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

export default function ConsentBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);
  const [hasChoice, setHasChoice] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    setHasChoice(!!stored);

    if (!stored) {
      const timer = setTimeout(() => setVisible(true), BANNER_DISPLAY_DELAY);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!consent) disableGa();
  }, [consent]);

  // Auto-accept on hard exit (tab close / external navigation) if banner is showing.
  useEffect(() => {
    function handleBeforeUnload() {
      if (!getStoredConsent() && visible) {
        saveConsent("accepted");
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [visible]);

  // Auto-accept on internal navigation too, matching the old full-page-
  // reload site where every link click fired beforeunload. Client-side
  // route changes don't trigger beforeunload, so this covers that gap.
  const mountedPathname = useRef(pathname);
  useEffect(() => {
    if (pathname === mountedPathname.current) return;
    if (!getStoredConsent() && visible) {
      saveConsent("accepted");
      setConsent("accepted");
      setVisible(false);
      setHasChoice(true);
    }
  }, [pathname, visible]);

  function handleAccept() {
    saveConsent("accepted");
    setConsent("accepted");
    setHasChoice(true);
    setVisible(false);
  }

  function handleDecline() {
    saveConsent("declined");
    setConsent("declined");
    setHasChoice(true);
    setVisible(false);
    disableGa();
  }

  useEffect(() => {
    function handlePrivacySettingsClick() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setConsent(null);
      setHasChoice(false);
      setVisible(true);
    }
    document.addEventListener("mm-privacy-settings-click", handlePrivacySettingsClick);
    return () => document.removeEventListener("mm-privacy-settings-click", handlePrivacySettingsClick);
  }, []);

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');`}
          </Script>
        </>
      )}

      {visible && !hasChoice && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="mx-auto max-w-7xl px-6 py-4 sm:py-5 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p id="cookie-consent-title" className="text-sm font-semibold text-heading">Privacy &amp; Analytics</p>
                <p id="cookie-consent-description" className="mt-1 text-sm text-gray-600">
                  We use analytics to improve your experience on our site. You can choose to accept or decline
                  analytics tracking. Your choice will be saved for future visits.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={handleDecline}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-2 focus:outline-offset-2 focus:outline-heading transition-colors"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-primary transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
