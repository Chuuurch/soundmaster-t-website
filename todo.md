# SoundMaster T Rebrand — TODO

## Design System
- [x] Dark theme (black background) with crimson red accent in `client/src/index.css`
- [x] Add Google Fonts: Anton (display) + Inter (body) in `client/index.html`
- [x] Configure default theme to dark in `App.tsx`

## Landing Page Sections (Home.tsx)
- [x] Sticky top nav with logo wordmark and section links (Sound, Releases, Story, Shows, Contact)
- [x] Cinematic hero with full-bleed image, oversized SOUNDMASTER T wordmark, tagline, CTAs
- [x] Marquee strip of city names / radio stations (B96, WGCI, Power 92, Atlanta)
- [x] "Sound" / About section — short manifesto-style copy with portrait image
- [x] "Releases" grid — 3 minimal release covers with track titles
- [x] "Legacy" timeline / stats section (radio play, Atlanta history)
- [x] "Tour" / shows placeholder section with toast "coming soon"
- [x] Newsletter signup (placeholder, toast on submit)
- [x] Footer with social links (toast placeholders) and copyright

## Polish
- [x] Subtle scroll animations / fade-ins
- [x] Mobile responsive layout
- [x] Verify all images load, no broken refs
- [x] Run `pnpm test` and add light smoke test
- [x] Save checkpoint

## Hero Atmosphere v2
- [x] Add animated rising smoke layer over the hero
- [x] Add animated red laser beams that visually pass through the smoke (volumetric feel)

## Story Rewrite — Ghetto House Pioneer
- [x] Rewrite hero tagline to position SoundMaster T as a 1996 ghetto house pioneer evolved into modern house/techno
- [x] Rewrite Sound/about manifesto to reflect the legacy + evolution arc
- [x] Rewrite Legacy timeline rows to start at 1996 and trace the journey through today
- [x] Update marquee items to include "Ghetto House", "Since 1996"
- [x] Update tests to assert the new positioning (1996, ghetto house, evolution)
