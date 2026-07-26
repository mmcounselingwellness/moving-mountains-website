import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const settings = getSiteSettings();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="flex items-center gap-x-6 bg-secondary px-6 py-2.5 sm:px-3.5">
        <p className="mx-auto text-sm/6 text-white">
          <a href={settings.bannerLink}>
            {settings.bannerText}&nbsp;<span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div>

      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center md:justify-between relative">
            <MobileMenu settings={settings} />
            <a href="/" className="flex items-center gap-2">
              <Image src={settings.logoHorizontal} alt="Moving Mountains Counseling & Wellness" width={200} height={72} className="h-18 hidden md:block w-auto" />
              <Image src={settings.logoVertical} alt="Moving Mountains Counseling & Wellness" width={160} height={120} className="h-30 md:hidden w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {(settings.mainNav ?? []).map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <a href={item.url} className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors">
                      {item.label}
                      <svg className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50 min-w-48">
                      <div className="bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-2">
                        {item.children.map((child) => (
                          <a key={child.label} href={child.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors">
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : item.label === "Contact us" ? (
                  <a key={item.label} href={item.url} className="text-primary font-semibold">
                    {item.label} <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : (
                  <a key={item.label} href={item.url} className="text-gray-700 hover:text-primary transition-colors">
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
