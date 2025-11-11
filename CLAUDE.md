# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static marketing website for Moving Mountains Counseling & Wellness, a therapy practice in Princeton, MA. The site is built with vanilla HTML, Tailwind CSS v4, and uses @tailwindplus/elements for interactive components like dialogs/modals.

## Build Commands

**Build CSS (one-time):**
```bash
npm run build
```

**Watch mode (recommended during development):**
```bash
npm run watch
```

The build process compiles `src/input.css` to `dist/output.css` using Tailwind CSS CLI v4.

**Important**: The project uses Tailwind CSS v4 syntax. Configuration is done in `src/input.css` using `@theme` and `@source` directives, NOT in `tailwind.config.js`. The `tailwind.config.js` file exists but is not used by the v4 CLI.

## Project Structure

- **HTML Pages**: Main pages at root level
  - `index.html` - Homepage with hero, about section, and contact form
  - `services.html` - Services and therapeutic approach page
  - `work-with-us.html` - Therapist recruitment/careers page
  - `about-us.html` - About the practice page
  - `our-team.html` - Team listing page with dynamic member loading
  - `kate-bio.html` - Kate Allain's bio page
  - `heather-bio.html` - Heather Carcia's bio page
  - `privacy.html` - Website privacy policy
  - `thank-you-for-contacting-us.html` - Contact form thank you page (placeholder)

- **Components** (`components/` directory):
  - `header.html` - Shared navigation header with mobile menu
  - `footer.html` - Shared footer with navigation, privacy links, and copyright
  - `cookie-consent.html` - Analytics consent banner

- **JavaScript** (`js/` directory):
  - `components.js` - Loads header, footer, cookie consent, and team members
  - `cookie-consent.js` - Manages analytics consent UI and user preferences
  - `analytics-manager.js` - Controls Google Analytics based on user consent

- **Styles**:
  - `src/input.css` - Tailwind source file with directives
  - `dist/output.css` - Compiled CSS (built from src/input.css)
  - `tailwind.config.js` - Tailwind configuration with custom colors and fonts

- **Data**:
  - `data/team-members.json` - Team member data for dynamic loading

- **Assets**: All images stored in `src/` directory (logos, photos, icons)

## Design System

**Custom Colors** (defined in tailwind.config.js):
- `custom`: #FFF9F0 (cream/beige background)
- `heading`: #406B6A (teal for headings)
- `primary`: #D36139 (orange for CTA buttons)
- `secondary`: #DE9278 (lighter orange for hovers/accents)

**Typography**:
- Body: Raleway (sans-serif) - applied via `font-raleway` class
- Headings: Fraunces (serif) - applied via `font-fraunces` class
- Both fonts loaded from Google Fonts

**Key UI Patterns**:
- Shared navigation header across all pages with mobile menu (using @tailwindplus/elements dialog component)
- Shared footer with site links
- Site-wide banner promoting "Now welcoming new clients"
- Contact forms use FormSubmit.co for form handling (info@mmcounselingwellness.com)

## Interactive Components

The site uses **@tailwindplus/elements** (loaded via CDN) for interactive components:
- Mobile menu is implemented as a `<dialog>` with `<el-dialog>` and `<el-dialog-panel>` wrapper elements
- Buttons trigger dialogs using `command="show-modal"` and `commandfor="mobile-menu"` attributes
- Close buttons use `command="close"` attribute

## Analytics & Privacy

**Analytics Opt-Out System:**
- Google Analytics (ID: G-PY8ER15JZK) is used for website analytics
- **Consent-first approach**: Analytics is disabled by default until user consents
- **Auto-accept behavior**: If user sees banner but navigates away without clicking, consent is automatically granted (implicit consent through continued browsing)
- **User control**: "Privacy Settings" button in footer allows users to change preference anytime

**Implementation:**
- `js/analytics-manager.js` - Controls GA loading based on consent
- `js/cookie-consent.js` - Manages consent banner and user preferences
- `components/cookie-consent.html` - Banner UI component
- User preference stored in localStorage key: `mm-analytics-consent` (values: 'accepted', 'declined', or null)

**Privacy Policy:**
- Basic website privacy policy at `privacy.html`
- Covers only website data collection (analytics, contact forms)
- Does NOT make legal claims about clinical services (which are HIPAA-protected separately)
- Linked in footer alongside Privacy Settings

## Development Notes

- **Tailwind CSS v4**: Uses the new v4 configuration system with `@import "tailwindcss"`, `@source`, and `@theme` directives in `src/input.css`
  - Custom colors and fonts are defined in the `@theme` block in `src/input.css`
  - The `@source "./*.html"` directive tells Tailwind to scan all HTML files in the root directory
  - The Tailwind browser CDN (`@tailwindcss/browser@4`) is loaded as a fallback/development aid
- The site uses semantic HTML with accessibility features (ARIA labels, sr-only classes)
- Forms include honeypot fields for spam prevention (`_honey` field with display:none)
- Site has `<meta name="robots" content="index">` - indexed by search engines
- Git is initialized (`.git` directory present)
- @tailwindplus/elements is loaded via CDN only (not imported in CSS)
- Components are loaded dynamically via `components.js` on page load

**Adding Analytics to New Pages:**
When creating new HTML pages, include these scripts in the `<head>`:
```html
<!-- Analytics Manager - Load BEFORE Google Analytics -->
<script src="js/analytics-manager.js"></script>

<!-- Component Loader -->
<script src="js/components.js"></script>

<!-- Cookie Consent Manager -->
<script src="js/cookie-consent.js"></script>
```

And before closing `</body>`:
```html
<!-- Cookie Consent Component -->
<div id="cookie-consent-component"></div>
<!-- End Cookie Consent Component -->
```

## Content Architecture

**Homepage (`index.html`)**:
- Hero section with call-to-action
- "Why clients trust us" section with 4 key value propositions
- About section with practice philosophy and image gallery
- Contact form and office details

**Services Page (`services.html`)**:
- Therapeutic approach overview
- List of services: Anxiety/Depression, Burnout/Stress, Grief/Loss, Trauma/Healing
- "How We Help" section with 7 key areas of focus
- Full-width office photo
- Contact form

**Work With Us Page (`work-with-us.html`)**:
- Recruitment pitch for therapists
- Benefits list (compensation, flexibility, PTO, 401k, etc.)
- Link to Indeed job postings
- Contact form

**About Us Page (`about-us.html`)**:
- Practice philosophy and mission
- Office location and service areas
- Practice photos

**Our Team Page (`our-team.html`)**:
- Team member listing (dynamically loaded from `data/team-members.json`)
- Links to individual therapist bio pages

**Bio Pages (`kate-bio.html`, `heather-bio.html`)**:
- Individual therapist profiles
- Specializations and education
- Contact/scheduling CTAs

**Privacy Page (`privacy.html`)**:
- Website privacy policy covering analytics and contact forms
- Third-party service disclosures (Google Analytics, FormSubmit.co)
- User rights and opt-out information
- Disclaimer separating website privacy from HIPAA-protected clinical services
