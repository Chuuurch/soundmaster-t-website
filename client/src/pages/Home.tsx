import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Headphones,
  Instagram,
  MapPin,
  Music2,
  Play,
  Radio,
  Send,
  Disc3 as SoundIcon,
} from "lucide-react";

// Asset URLs (compressed webp variants, tied to project lifecycle)
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/soundmaster-hero-WEeF22b7DrnLH6CiPVCePx.webp";
const PORTRAIT_IMG = "/soundmaster-portrait.png";
const TEXTURE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/soundmaster-texture-c4TfZ8m4ETLng6yLRV2XBR.webp";
const RELEASE_EREBUS =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/release-erebus-kyM5RopX2s7hrW7ojAb3tm.webp";
const RELEASE_SOUTHSIDE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/release-southside-8WdBS6pT5ZhMtKbpuPKc8e.webp";
const RELEASE_CODERED =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/release-codered-ELKvS8LcNApXa93MTRevom.webp";

const NAV_LINKS = [
  { label: "Sound", href: "#sound" },
  { label: "Releases", href: "#releases" },
  { label: "Legacy", href: "#legacy" },
  { label: "Shows", href: "#shows" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_ITEMS = [
  "SINCE 1996",
  "GHETTO HOUSE",
  "B96 CHICAGO",
  "WGCI",
  "POWER 92",
  "ATLANTA",
  "SOUTHSIDE",
  "CHICAGO ORIGINATOR",
  "HOUSE / TECHNO",
  "STILL MOVING FLOORS",
];

const RELEASES = [
  {
    cover: RELEASE_EREBUS,
    title: "Erebus",
    type: "Single — 2026",
    label: "Crimson Frequency",
  },
  {
    cover: RELEASE_SOUTHSIDE,
    title: "Southside Voltage",
    type: "EP — 2025",
    label: "Crimson Frequency",
  },
  {
    cover: RELEASE_CODERED,
    title: "Code Red",
    type: "Single — 2025",
    label: "Crimson Frequency",
  },
];

const SHOWS = [
  { date: "06.14", city: "Atlanta, GA", venue: "District — Mainroom" },
  { date: "07.05", city: "Chicago, IL", venue: "Smartbar — Late" },
  { date: "08.22", city: "Brooklyn, NY", venue: "Basement" },
  { date: "09.13", city: "Berlin, DE", venue: "Tresor — Globus" },
];

// Lightweight intersection-observer hook so sections fade in on scroll
function useFadeUp<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function comingSoon() {
  toast("Locked in the booth.", {
    description: "This drops with the next update — stay tuned.",
  });
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Marquee />
      <Sound />
      <Releases />
      <Legacy />
      <Shows />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-50 transition-all duration-200 " +
        (scrolled
          ? "backdrop-blur-md bg-black/70 border-b border-white/5"
          : "bg-transparent")
      }
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="inline-block h-2 w-2 rounded-full bg-primary glow-red group-hover:scale-125 transition-transform" />
          <span className="font-display text-lg tracking-[0.18em] uppercase">
            SoundMaster <span className="text-primary">T</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          variant="default"
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-[0.18em] text-[10px] px-4"
          onClick={comingSoon}
        >
          Listen
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Animated rising smoke — sits BEHIND the laser beams for volumetric depth */}
      <div
        className="smoke-layer smoke-1"
        style={{ backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/smoke-plume-WaVcE2Ysjnam2BeeBLSUPJ.webp')" }}
      />
      <div
        className="smoke-layer smoke-2"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/smoke-plume-WaVcE2Ysjnam2BeeBLSUPJ.webp')",
          backgroundPosition: "30% bottom",
          backgroundSize: "80% auto",
        }}
      />
      <div
        className="smoke-layer smoke-3"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/smoke-plume-WaVcE2Ysjnam2BeeBLSUPJ.webp')",
          backgroundPosition: "75% bottom",
          backgroundSize: "70% auto",
        }}
      />

      {/* Volumetric red laser beams — sandwiched: back smoke (below) and front smoke (above) */}
      <div className="laser laser-left" style={{ zIndex: 2 }} />
      <div className="laser laser-right" style={{ zIndex: 2 }} />
      <div className="laser laser-mid" style={{ zIndex: 2 }} />
      <div className="laser-bloom" style={{ zIndex: 2 }} />

      {/* Front-of-laser smoke wisps — partially occlude the beams for true volumetric depth */}
      <div
        className="smoke-layer smoke-front-1"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/smoke-plume-WaVcE2Ysjnam2BeeBLSUPJ.webp')",
          backgroundPosition: "20% bottom",
          zIndex: 3,
        }}
      />
      <div
        className="smoke-layer smoke-front-2"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663221459846/bytFLjvuumtTzp4bwtQF6c/smoke-plume-WaVcE2Ysjnam2BeeBLSUPJ.webp')",
          backgroundPosition: "80% bottom",
          zIndex: 3,
        }}
      />

      {/* Grain + scanlines */}
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="absolute inset-0 scanline pointer-events-none opacity-50" />

      {/* Side meta strips */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
        <span className="rotate-180 [writing-mode:vertical-rl]">
          Est. Chicago — Atlanta
        </span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
        <span className="[writing-mode:vertical-rl]">
          House Music Pioneer | Chicago
        </span>
      </div>

      {/* Top hairline */}
      <div className="absolute top-16 inset-x-0 h-px bg-white/10" />

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-end pb-16 sm:pb-24">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 font-mono">
          <span className="h-px w-8 bg-primary" />
          Since 1996 · A New Chapter
        </div>
        <h1 className="font-display uppercase leading-[0.85] text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10.5vw] tracking-tight">
          <span className="block">Sound</span>
          <span className="block">
            master<span className="text-primary"> T</span>
          </span>
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-5 text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
            A pioneer of Chicago ghetto house since 1996 and creator of the legendary anthem "2 Much Booty (In The Pants)" — the sound that
            cracked open block parties, ruled B96, WGCI and Power 92, and
            shook Atlanta for decades. Today that legacy lives on, sharpened
            into the house and techno moving floors right now.
          </p>
          <div className="md:col-span-7 flex flex-wrap items-center gap-3 md:justify-end">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-[0.2em] text-xs px-6 h-12"
              onClick={comingSoon}
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Latest Release
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:border-primary hover:text-primary bg-transparent rounded-none uppercase tracking-[0.2em] text-xs px-6 h-12"
              onClick={() =>
                document
                  .getElementById("sound")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Enter the Sound
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom ticker line */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="container h-10 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50 font-mono">
          <span>N 41.8781° / W 87.6298°</span>
          <span className="hidden sm:inline">REC · ON AIR</span>
          <span>2026 — Crimson Frequency</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  // duplicate items so animation loops seamlessly
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="border-y border-white/10 bg-black overflow-hidden">
      <div className="marquee-track flex gap-12 py-4 whitespace-nowrap will-change-transform">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-2xl sm:text-3xl uppercase tracking-[0.15em] text-white/60"
          >
            {item}
            <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Sound() {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section id="sound" className="relative py-24 sm:py-32 bg-black">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div ref={ref} className="fade-up lg:col-span-5 relative">
          <div className="relative aspect-square w-full overflow-hidden border border-white/10">
            <img
              src={PORTRAIT_IMG}
              alt="SoundMaster T in red light"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.35em] text-white/60 font-mono">
              File · 001 / Profile
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 border border-primary hidden sm:block" />
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 lg:pl-8">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 font-mono">
            <span className="h-px w-8 bg-primary" />
            01 — The Sound
          </div>
          <h2 className="font-display uppercase text-5xl sm:text-6xl md:text-7xl leading-[0.9] mb-8">
            From The <span className="text-stroke">Block</span><br />
            To The Floor.
          </h2>
          <div className="space-y-5 text-white/70 max-w-xl leading-relaxed">
            <p>
              SoundMaster T is a name written into the foundation of Chicago
              ghetto house. Since 1996 he has been one of the originators —
              raw drum machines, chant-driven hooks, and a low-end built for
              car speakers, basements, and back-of-the-club rotations.
            </p>
            <p>
              His records found a permanent home on B96, WGCI and Power 92,
              and lit Atlanta up for years as the city adopted his sound as
              its own. The catalog moved units, the cuts moved bodies, and
              the influence quietly traveled into the DNA of the music
              dominating dancefloors today.
            </p>
            <p>
              Now he steps forward again — same instincts, evolved palette.
              The drums are still hard, the energy is still grown in Chicago,
              but the lens is contemporary: modern house and techno that
              honor the lineage without ever looking backward.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat label="Years In Game" value="30" />
            <Stat label="Est." value="1996" />
            <Stat label="Cities Played" value="40+" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-3xl sm:text-4xl text-primary">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
        {label}
      </div>
    </div>
  );
}

function Releases() {
  return (
    <section id="releases" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Atmospheric texture */}
      <div className="absolute inset-0 opacity-25">
        <img
          src={TEXTURE_IMG}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      <div className="relative container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 font-mono">
              <span className="h-px w-8 bg-primary" />
              02 — Releases
            </div>
            <h2 className="font-display uppercase text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
              Recent <br className="sm:hidden" />
              <span className="text-primary">Transmissions</span>
            </h2>
          </div>
          <button
            onClick={comingSoon}
            className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-primary inline-flex items-center gap-2 transition-colors"
          >
            Full Discography <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {RELEASES.map((r, i) => (
            <ReleaseCard key={r.title} release={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReleaseCard({
  release,
  index,
}: {
  release: (typeof RELEASES)[number];
  index: number;
}) {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="fade-up group relative"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-square overflow-hidden border border-white/10 bg-black">
        <img
          src={release.cover}
          alt={release.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={comingSoon}
          className="absolute bottom-4 right-4 h-12 w-12 border border-white/30 hover:border-primary hover:bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
          aria-label={`Play ${release.title}`}
        >
          <Play className="h-4 w-4 fill-current" />
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display uppercase text-2xl tracking-tight">
            {release.title}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
            {release.type} · {release.label}
          </p>
        </div>
        <span className="text-xs text-white/30 font-mono">
          0{index + 1}
        </span>
      </div>
    </div>
  );
}

function Legacy() {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section id="legacy" className="relative py-24 sm:py-32 bg-black">
      <div className="container">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 font-mono">
          <span className="h-px w-8 bg-primary" />
          03 — Legacy
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <h2 className="lg:col-span-5 font-display uppercase text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
            Three Decades. <br />
            <span className="text-stroke">One</span> Originator.
          </h2>
          <div ref={ref} className="fade-up lg:col-span-7 space-y-10">
            <LegacyRow
              icon={<Music2 className="h-4 w-4" />}
              year="1996"
              title="Ghetto House Pioneer"
              copy="One of the original architects of Chicago ghetto house — raw, percussive, chant-driven dance music born in the basements, block parties and DJ booths of the city. The blueprint a whole generation built on top of."
            />
            <LegacyRow
              icon={<Radio className="h-4 w-4" />}
              year="Late ’90s — 2000s"
              title="Chicago Airwaves"
              copy="Spun in heavy rotation on the dials that built the city: B96, WGCI and Power 92. Heard between rush-hour traffic and 3AM headphones across the Midwest — records that crossed over without ever losing the streets."
            />
            <LegacyRow
              icon={<MapPin className="h-4 w-4" />}
              year="2000s — Today"
              title="Atlanta Adopted Him"
              copy="A long love affair with the South. Atlanta took the catalog into its clubs, strip rooms, record stores and street tapes — and never let go. Two decades later, the city still moves to his cuts."
            />
            <LegacyRow
              icon={<Headphones className="h-4 w-4" />}
              year="Now"
              title="Evolved Into House &amp; Techno"
              copy="The same hard drums, the same Chicago instincts — now driving modern house and techno records built for the global floors of right now. The lineage is intact. The sound has grown up."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LegacyRow({
  icon,
  year,
  title,
  copy,
}: {
  icon: React.ReactNode;
  year: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
      <div className="col-span-3 sm:col-span-2 flex items-center gap-3 text-primary">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono">
          {year}
        </span>
      </div>
      <div className="col-span-9 sm:col-span-10">
        <h3 className="font-display uppercase text-2xl mb-2">{title}</h3>
        <p className="text-white/60 leading-relaxed max-w-xl">{copy}</p>
      </div>
    </div>
  );
}

function Shows() {
  return (
    <section
      id="shows"
      className="relative py-24 sm:py-32 border-y border-white/10"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 font-mono">
              <span className="h-px w-8 bg-primary" />
              04 — Live
            </div>
            <h2 className="font-display uppercase text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
              On The <br />
              <span className="text-primary">Floor</span>
            </h2>
          </div>
          <p className="text-white/50 text-sm max-w-sm">
            Routing is being finalized. The list below is a preview of the
            next chapter — full dates and ticket links land soon.
          </p>
        </div>
        <div className="border-t border-white/10">
          {SHOWS.map(s => (
            <ShowRow key={s.date + s.city} {...s} />
          ))}
        </div>
        <div className="mt-10">
          <Button
            variant="outline"
            onClick={comingSoon}
            className="border-white/20 hover:border-primary hover:text-primary bg-transparent rounded-none uppercase tracking-[0.2em] text-xs px-6 h-12"
          >
            Get on the Guestlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ShowRow({
  date,
  city,
  venue,
}: {
  date: string;
  city: string;
  venue: string;
}) {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="fade-up group grid grid-cols-12 gap-4 items-center py-6 border-b border-white/10 hover:bg-primary/5 transition-colors px-2 -mx-2"
    >
      <div className="col-span-2 font-mono text-sm text-primary">{date}</div>
      <div className="col-span-5 font-display uppercase text-xl sm:text-2xl">
        {city}
      </div>
      <div className="col-span-3 text-white/60 text-sm hidden sm:block">
        {venue}
      </div>
      <div className="col-span-5 sm:col-span-2 flex justify-end">
        <button
          onClick={comingSoon}
          className="text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-primary inline-flex items-center gap-1 transition-colors"
        >
          RSVP <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function Contact() {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast("Enter a valid email to tune in.");
      return;
    }
    toast("You're on the frequency.", {
      description: "We'll only ping you when something heavy drops.",
    });
    setEmail("");
  };
  return (
    <section id="contact" className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={TEXTURE_IMG}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      </div>
      <div className="relative container max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary mb-6 font-mono">
          <span className="h-px w-8 bg-primary" />
          05 — Signal
          <span className="h-px w-8 bg-primary" />
        </div>
        <h2 className="font-display uppercase text-5xl sm:text-7xl leading-[0.9] mb-8">
          Tune <span className="text-primary">In.</span>
        </h2>
        <p className="text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
          New releases, secret sets, after-hours invites. Low frequency,
          high signal — drop your email below.
        </p>
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@frequency.com"
            className="flex-1 h-12 px-4 bg-black/60 border border-white/15 focus:border-primary outline-none text-sm placeholder:text-white/30 rounded-none transition-colors"
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase tracking-[0.2em] text-xs px-6 h-12"
          >
            <Send className="mr-2 h-3 w-3" />
            Subscribe
          </Button>
        </form>
        <div className="mt-12 flex items-center justify-center gap-6 text-white/40">
          <SocialLink icon={<Instagram className="h-4 w-4" />} label="IG" />
          <SocialLink icon={<Music2 className="h-4 w-4" />} label="Spotify" />
          <SocialLink icon={<SoundIcon className="h-4 w-4" />} label="Soundcloud" />
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={comingSoon}
      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] hover:text-primary transition-colors font-mono"
    >
      {icon} {label}
    </button>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display uppercase text-sm tracking-[0.25em]">
          SoundMaster <span className="text-primary">T</span>
          <span className="ml-3 text-white/40 text-[10px] tracking-[0.3em]">
            © {new Date().getFullYear()} CRIMSON FREQUENCY
          </span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono text-center sm:text-right">
          <div>
            Booking ·{" "}
            <button
              onClick={comingSoon}
              className="hover:text-primary transition-colors"
            >
              bookings@soundmastert.com
            </button>
          </div>
          <div className="mt-3 text-[9px] tracking-[0.2em] text-white/30">
            Designed & Managed by <a href="https://pmediadata.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Platinum Media Marketing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
