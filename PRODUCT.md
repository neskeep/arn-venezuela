# ARN Venezuela

## Register
brand

## Product Purpose
Institutional website for a Venezuelan community movement built on a biological analogy: just as DNA contains life's blueprint but RNA (ARN in Spanish) activates it, this organization activates purpose in people. Not a sales platform, not an events page. A movement identity piece.

## Users
- **Primary**: Venezuelan adults (25-55) exploring community belonging, spiritual growth, and civic transformation. Non-technical, mobile-first.
- **Secondary**: Potential organizational allies (NGOs, churches, businesses) evaluating partnership.
- **Tertiary**: Existing members checking event history and staying connected.

## Brand Personality
Hopeful but grounded. Authoritative without being cold. Spiritual without being churchy. The tone is a leader who speaks with conviction and warmth, not a salesperson.

Anti-references: tech-startup aesthetic (no blobs, glassmorphism, gradient text, SaaS templates). No generic NGO template feel. No corporate annual report.

## Visual Direction
Editorial and bold. The design should feel like a well-art-directed magazine spread, not a website template. High contrast, intentional typography, photographic weight.

- **Color strategy**: Committed. Deep navy (#051a3b) dominates as identity, electric blue (#1565d8) carries action. Dark-mode native.
- **Typography**: Agency Regular (display, uppercase, commanding) + Montserrat (body, clean, readable). Scale contrast is key.
- **Photography**: Community in natural interaction. Warm, authentic, never stock-feeling. Grayscale treatment with selective color on hover.
- **Layout**: Full-width sections, generous vertical rhythm, asymmetric grids where appropriate. Single-page scroll.

## Key Pages
- **Home (single-page)**: Hero > Nosotros (with biological analogy) > Junta Directiva > Impacto > Eventos > Aliados > Membresia
- **Admin panel**: Separate, not public-facing

## Success Metrics
- Membership registrations (free)
- Time on page (engagement with content)
- Scroll depth through all sections
- Ally inquiries

## Constraints
- Nuxt 4 + Tailwind CSS 4 (CSS-first, no config file)
- SQLite backend (better-sqlite3)
- GSAP for scroll animations
- Mobile-first: 390px baseline
- UI in Spanish, code in English
- No unnecessary dependencies
