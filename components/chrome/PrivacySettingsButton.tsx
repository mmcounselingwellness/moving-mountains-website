"use client";

export default function PrivacySettingsButton() {
  return (
    <button
      type="button"
      onClick={() => document.dispatchEvent(new CustomEvent("mm-privacy-settings-click"))}
      className="text-white/90 hover:text-secondary transition-colors underline underline-offset-2"
    >
      Privacy Settings
    </button>
  );
}
