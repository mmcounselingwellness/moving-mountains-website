"use client";

import { useState } from "react";
import Image from "next/image";
import type { NavItem, Navigation, SiteSettings } from "@/lib/content";

export default function MobileMenu({ settings, nav }: { settings: SiteSettings; nav: Navigation }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute left-0 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open main menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-1">
                <button type="button" onClick={() => setOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                  <span className="sr-only">Close menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Moving Mountains Counseling &amp; Wellness</span>
                <Image src={settings.logoTall} alt="" width={80} height={32} className="h-8 w-auto" />
              </a>
            </div>
            <div className="mt-6 space-y-2">
              {(nav.mainNav ?? []).map((item: NavItem) => (
                <div key={item.label}>
                  <a href={item.url} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child) => (
                        <a key={child.label} href={child.url} className="block rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
