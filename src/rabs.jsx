import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  HardHat,
  Home,
  Layers,
  MapPin,
  Menu,
  Plus,
  Ruler,
  Shield,
  Star,
  Wallpaper,
  X,
  Zap,
} from "lucide-react";

/**
 * =====================================================================
 *  BRAND / CONTENT CONSTANTS
 * =====================================================================
 */
const BRAND = {
  legalName: "Residential As-Built Services",
  tagline: "Precision as-builts of your home, delivered in days.",
  yearsExperience: "15+",
  projectsDelivered: "400+",
  coverage: "Nationwide",
  turnaround: "3–5 business days",
  logoUrl: "/images/Rabs-logo.png",
};

/**
 * Logo — renders the brand logo from BRAND.logoUrl.
 * Native dimensions (991×623) preserve aspect ratio in flex containers.
 */
function Logo({ className = "h-14 w-auto" }) {
  return (
    <img
      src={BRAND.logoUrl}
      alt={`${BRAND.legalName} logo`}
      width={991}
      height={623}
      className={`${className} object-contain`}
    />
  );
}

/**
 * =====================================================================
 *  FORM CONSTANTS
 * =====================================================================
 *  Pricing is calculated internally by the RABS team based on area,
 *  location, and selected deliverables. The site itself does not
 *  compute or display a dollar amount.
 */
const EXACT_SQFT_KEY = "I know the exact sq ft";

/**
 * =====================================================================
 *  GOOGLE MAPS LOADER (optional — gracefully degrades if no key)
 * =====================================================================
 */
function getGoogleMapsApiKey() {
  if (typeof window === "undefined") return null;
  const key = window.__RABS_GMAPS_KEY__;
  if (!key || key.includes("%VITE_") || key === "undefined") return null;
  return key;
}

function useGoogleMaps(shouldLoad = false) {
  const apiKey = getGoogleMapsApiKey();
  const [loaded, setLoaded] = useState(
    typeof window !== "undefined" && !!window.google?.maps?.places
  );

  useEffect(() => {
    if (!apiKey || loaded || !shouldLoad) return;
    const existing = document.querySelector("script[data-google-maps]");
    if (existing) {
      existing.addEventListener("load", () => setLoaded(true));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-google-maps", "true");
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, [apiKey, loaded, shouldLoad]);

  return { loaded, enabled: !!apiKey };
}

function AddressAutocomplete({ value, onChange, required, className, placeholder }) {
  const inputRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { loaded, enabled } = useGoogleMaps(shouldLoad);

  useEffect(() => {
    if (!loaded || !inputRef.current || !window.google?.maps?.places) return;
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address"],
    });
    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) onChange(place.formatted_address);
    });
    return () => {
      if (listener && window.google?.maps?.event) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [loaded, onChange]);

  return (
    <input
      ref={inputRef}
      required={required}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setShouldLoad(true)}
      className={className}
      placeholder={placeholder || (enabled ? "Start typing your home address…" : "123 Main St, City, State")}
      autoComplete="off"
    />
  );
}

/**
 * =====================================================================
 *  VISUAL HELPERS
 * =====================================================================
 */
function BlueprintGrid({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="bp-small" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        </pattern>
        <pattern id="bp-large" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="url(#bp-small)" />
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-large)" />
    </svg>
  );
}

function HouseSilhouette({ className = "", style }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      viewBox="0 0 200 180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M 20 90 L 100 25 L 180 90 L 180 160 L 20 160 Z" />
      <path d="M 80 160 L 80 115 L 120 115 L 120 160" />
      <rect x="35" y="105" width="25" height="25" />
      <rect x="140" y="105" width="25" height="25" />
    </svg>
  );
}

function DimensionLine({ label, className = "" }) {
  return (
    <div className={`flex items-center gap-2 font-mono txt-10 uppercase trk-02 text-blue-600/70 ${className}`}>
      <span className="h-px w-8 bg-blue-600/40" />
      <span>{label}</span>
      <span className="h-px w-8 bg-blue-600/40" />
    </div>
  );
}

/**
 * =====================================================================
 *  NAVIGATION
 * =====================================================================
 */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#pain", label: "Why it matters" },
    { href: "#deliverables", label: "Deliverables" },
    { href: "#process", label: "Process" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-10">
        <a href="#top" className="flex shrink-0 items-center">
          <Logo className="h-14 w-auto" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-600"
          >
            Request Quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate-700">
                {l.label}
              </a>
            ))}
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
            >
              Request Quote <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * =====================================================================
 *  STICKY FLOATING CTA — appears on scroll, hides near form
 * =====================================================================
 */
function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let formTop = Infinity;
    const recalcFormTop = () => {
      const formEl = document.getElementById("quote");
      formTop = formEl ? formEl.getBoundingClientRect().top + window.scrollY : Infinity;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const pastHero = scrollY > 600;
        const nearForm = scrollY + window.innerHeight * 0.6 > formTop;
        setVisible(pastHero && !nearForm);
        ticking = false;
      });
    };

    recalcFormTop();
    window.addEventListener("resize", recalcFormTop, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", recalcFormTop);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 transition-all duration-300 md:bottom-6 md:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href="#quote"
        className="group flex items-center gap-2.5 rounded-full bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-900/30 ring-1 ring-blue-500 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-900/40 md:px-6 md:py-4 md:text-base"
      >
        <Zap size={18} className="animate-pulse" />
        <span>Get your quote in 60 sec</span>
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

/**
 * =====================================================================
 *  HERO
 * =====================================================================
 */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 text-blue-500/20">
        <BlueprintGrid className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-fade-center" />

      <HouseSilhouette className="pointer-events-none absolute h-24 w-24 text-blue-300/30 hidden lg:block" style={{ left: '5%', top: '18%' }} />
      <HouseSilhouette className="pointer-events-none absolute h-20 w-20 text-blue-300/30 hidden lg:block" style={{ right: '6%', bottom: '15%' }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="order-1 lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Home size={14} />
              Residential specialists · Nationwide
            </div>

            <h1 className="font-serif text-5xl lead-105 tracking-tight text-slate-900 lg:text-7xl">
              Your home. Measured precisely.{" "}
              <span className="text-blue-600">Delivered quickly.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              <span className="font-medium text-slate-900">Fast, accurate, economical, and dependable</span> as-built drawings for residential renovations.
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">
              So you can renovate, permit, and design with confidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600"
              >
                Get your quote in 60 sec
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pain"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900"
              >
                See why it matters
              </a>
            </div>
          </div>

          <div className="order-2 relative lg:col-span-5">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500">your_project.dwg</span>
                </div>

                <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50" style={{ aspectRatio: '4 / 3' }}>
                  <div className="pointer-events-none absolute inset-0 text-blue-500/40">
                    <BlueprintGrid className="h-full w-full" />
                  </div>

                  <img
                    src="/images/example1.gif"
                    alt="Sample RABS deliverables: floor plans, elevations, ceiling plans, site plans, and Revit model"
                    className="absolute inset-0 h-full w-full object-contain p-6"
                  />

                  <svg
                    viewBox="0 0 400 300"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full p-6"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="30" y1="0" x2="370" y2="0" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" className="origin-top scan-sweep" />
                  </svg>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3 text-xs">
                  <span className="font-mono uppercase tracking-wider text-slate-500">Captured · drafted · delivered</span>
                  <span className="inline-flex items-center gap-1 font-medium text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Ready
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 -bottom-9 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl md:block">
                <div className="text-xs uppercase tracking-wider text-slate-500">Avg. delivery</div>
                <div className="font-serif text-2xl text-slate-900">4.2 days</div>
              </div>
            </div>
          </div>

          <div className="order-3 lg:col-span-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Check size={16} className="text-blue-600" /> {BRAND.turnaround} turnaround
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={16} className="text-blue-600" /> Homeowners, contractors, architects, designers &amp; developers
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-sweep {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(300px); opacity: 0; }
        }
        .scan-sweep {
          animation: scan-sweep 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

/**
 * =====================================================================
 *  STATS STRIP
 * =====================================================================
 */
function Stats() {
  const items = [
    { icon: Clock, label: "Turnaround", value: BRAND.turnaround },
    { icon: MapPin, label: "Coverage", value: BRAND.coverage },
    { icon: Layers, label: "Projects delivered", value: BRAND.projectsDelivered },
    { icon: Shield, label: "Industry experience", value: `${BRAND.yearsExperience} years` },
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid divide-slate-200 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-4 border-b border-slate-200 px-0 py-8 sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-mono txt-11 uppercase tracking-widest text-slate-500">{item.label}</div>
                  <div className="font-serif text-2xl text-slate-900">{item.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  APPROACH — positioning statement. Sits just before PainPoints.
 * =====================================================================
 */
function Approach() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <DimensionLine label="How we work" className="justify-center" />
        <p className="mt-8 font-serif text-2xl leading-relaxed text-slate-800 lg:text-3xl lg:leading-snug">
          We do one thing really well: measure existing homes precisely and draw them up.
          Floor plans, elevations, ceiling plans, Revit models &mdash; every surface captured with a
          laser scanner, every drawing true to what's actually there. Design against them. Bid against
          them. Permit with them. Hand them to anyone who needs to know the house.
        </p>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  PAIN POINTS
 * =====================================================================
 */
function PainPoints() {
  const stakeholders = [
    {
      icon: Home,
      audience: "Homeowners",
      pain: "Cost overruns from surprise measurements.",
      statBig: "78%",
      statCaption: "of home renovations go over budget.",
      body: "Inaccurate plans mean change orders, rework, and costs you didn't plan for. Laser-accurate as-builts upfront eliminate the guesswork — and the surprise invoices.",
      source: "RenoFi industry analysis via Nasdaq, 2024",
      sourceUrl: "https://realmhome.com/blog/avoiding-the-renovation-budget-trap-a-data-backed-guide",
    },
    {
      icon: HardHat,
      audience: "Contractors",
      pain: "Bad info burns margin on every job.",
      statBig: "22%",
      statCaption: "of rework is caused by inaccurate or inaccessible information.",
      body: "Every wrong measurement you inherit costs you labor, materials, and schedule. Start with laser-accurate plans and bid, order, and build off reality — not a tape measure.",
      source: "FMI × Autodesk Construction Data Report, 2021",
      sourceUrl: "https://www.msuite.com/bad-construction-data-costs-industry-1-8-trillion-worldwide/",
    },
    {
      icon: Ruler,
      audience: "Architects & Designers",
      pain: "Field measuring burns your design hours.",
      statBig: "75%",
      statCaption: "of construction projects miss their original deadline.",
      body: "Weeks spent measuring existing conditions is design time you don't get back. Hand us the address — we deliver clean, accurate plans and elevations ready to design against.",
      source: "McKinsey Global Institute, construction productivity study",
      sourceUrl: "https://www.propelleraero.com/blog/10-construction-project-cost-overrun-statistics-you-need-to-hear/",
    },
  ];

  return (
    <section id="pain" className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <DimensionLine label="02 · Why it matters" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            The real cost of inaccurate plans.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every stakeholder in a residential project pays a price when the existing-conditions data is wrong.
            The numbers are worse than most people think.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {stakeholders.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono txt-11 uppercase tracking-widest text-slate-500">
                    {s.audience}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl leading-snug text-slate-900">{s.pain}</h3>

                <div className="mt-6 flex items-baseline gap-3 border-y border-slate-100 py-5">
                  <span className="font-serif text-6xl font-light tracking-tight text-blue-600">{s.statBig}</span>
                  <span className="text-sm leading-snug text-slate-700">{s.statCaption}</span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-600">{s.body}</p>

                <p className="mt-5 border-t border-slate-100 pt-4 font-mono txt-10 uppercase tracking-wider text-slate-400">
                  Source:{" "}
                  <a
                    href={s.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-300 underline-offset-2 transition-colors hover:text-blue-600 hover:decoration-blue-400"
                  >
                    {s.source}
                  </a>
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  CTA BANNER
 * =====================================================================
 */
function CTABanner({ headline, sub, ctaLabel = "Request a quote" }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-12 text-white lg:py-16">
      <div className="pointer-events-none absolute inset-0 text-blue-400/10">
        <BlueprintGrid className="h-full w-full" />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-10">
        <div>
          <h3 className="font-serif text-2xl leading-tight tracking-tight lg:text-3xl">{headline}</h3>
          {sub && <p className="mt-2 text-slate-300">{sub}</p>}
        </div>
        <a
          href="#quote"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500"
        >
          {ctaLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  DELIVERABLES CAROUSEL — auto-advancing showcase of the 4 core drawings.
 *  Respects prefers-reduced-motion.
 * =====================================================================
 */
function DeliverablesCarousel({ items }) {
  const [active, setActive] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);

  // Only start ticking once the carousel is actually scrolled into view.
  // rootMargin expands the intersection box so we don't flicker on/off
  // when the user stops scrolling right near the threshold.
  useEffect(() => {
    if (!rootRef.current || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        // Don't flip back to false — once visible, keep ticking.
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (manuallyPaused || !visible) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % items.length);
    }, 3000);
    return () => clearInterval(id);
  }, [manuallyPaused, visible, items.length]);

  const go = (delta) => {
    setManuallyPaused(true);
    setActive((a) => (a + delta + items.length) % items.length);
  };

  return (
    <div
      ref={rootRef}
      className="relative mt-16"
    >
      <div className="relative -mx-4 overflow-hidden rounded-xl border-2 border-slate-300 bg-white shadow-lg sm:mx-0 sm:rounded-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Image panel */}
          <div className="relative h-72 overflow-hidden border-b border-slate-200 bg-slate-50 lg:h-[460px] lg:border-b-0 lg:border-r">
            <div className="pointer-events-none absolute inset-0 text-blue-500/20">
              <BlueprintGrid className="h-full w-full" />
            </div>
            {items.map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt={`${item.name} sample`}
                className={`absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Scan-sweep line — remounts on each slide change via key={active} so the animation restarts */}
            {!manuallyPaused && visible && (
              <div
                key={active}
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-blue-500/70 carousel-scan-sweep"
              />
            )}
          </div>

          {/* Text panel */}
          <div className="relative flex flex-col p-8 lg:p-10">
            {items.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`transition-opacity duration-500 ${
                    i === active
                      ? "opacity-100"
                      : "pointer-events-none absolute inset-0 p-8 opacity-0 lg:p-10"
                  }`}
                  aria-hidden={i !== active}
                >
                  {item.highlight && (
                    <div className="mb-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1 txt-10 font-semibold uppercase tracking-widest text-white">
                      Most requested
                    </div>
                  )}
                  <h3 className="font-serif text-2xl leading-tight text-slate-900 lg:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {item.pitch}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#quote"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                  >
                    Request pricing
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Prev/Next arrows — absolute on desktop at card midline, tucked on mobile */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous deliverable"
        className="absolute left-2 top-36 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:border-blue-400 hover:bg-white hover:text-blue-600 lg:left-3 lg:top-1/2"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next deliverable"
        className="absolute right-2 top-36 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:border-blue-400 hover:bg-white hover:text-blue-600 lg:right-3 lg:top-1/2"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot navigation */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => { setManuallyPaused(true); setActive(i); }}
            aria-label={`Show ${item.name}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes carousel-scan-sweep {
          0%   { transform: translateY(0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(460px); opacity: 0; }
        }
        .carousel-scan-sweep {
          animation: carousel-scan-sweep 3s linear 1;
        }
      `}</style>
    </div>
  );
}

/**
 * =====================================================================
 *  DELIVERABLES
 * =====================================================================
 */
/**
 * =====================================================================
 *  IMAGE LIGHTBOX — click an image in the Also-available grid to enlarge it.
 *  Closes on Escape, backdrop click, or the X button.
 * =====================================================================
 */
function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    if (!src) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Enlarged image"}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
    >
      <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" />
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-800 shadow-lg transition-colors hover:bg-white hover:text-slate-900"
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt || ""}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full max-w-full rounded-lg object-contain shadow-2xl"
      />
    </div>
  );
}

function Deliverables() {
  const [lightboxImg, setLightboxImg] = useState(null);

  const primary = [
    {
      icon: Ruler,
      name: "Floor Plans",
      pitch: "Dimensioned plans of every level, ready for renovation, insurance, or sale.",
      formats: ["PDF", "DWG"],
      image: "/images/02-deliverables-floor plans.png",
      bullets: [
        "Fully dimensioned floor plans",
        "Walls, doors, windows, and fixtures",
        "Every level of your home",
      ],
      highlight: true,
    },
    {
      icon: Wallpaper,
      name: "Interior Elevations",
      pitch: "Flat views of every interior wall — a clean foundation for design and renovation planning.",
      formats: ["PDF", "DWG"],
      image: "/images/02-deliverables-interior-elvations.png",
      bullets: [
        "Every wall, every room, drawn flat",
        "Door and window openings in elevation",
        "Ideal for interior designers",
      ],
    },
    {
      icon: Home,
      name: "Exterior Elevations",
      pitch: "All four exterior faces — essential for permit applications and facade work.",
      formats: ["PDF", "DWG"],
      image: "/images/02-deliverables-exterior-elvations.png",
      bullets: [
        "North, south, east, west elevations",
        "Permit-ready documentation",
        "Ideal for facade renovations",
      ],
    },
    {
      icon: Layers,
      name: "Reflected Ceiling Plans",
      pitch: "Top-down ceiling plans showing fixtures, beams, and heights.",
      formats: ["PDF", "DWG"],
      image: "/images/02-deliverables-reflected-ceiling-plans.png",
      bullets: [
        "Lighting and fixture locations",
        "Ceiling heights throughout",
      ],
    },
  ];

  const advanced = [
    {
      img: "/images/02-alsoavailable-roofplans.png",
      name: "Roof Plans*",
      pitch: "Top-down roof plans with pitches, ridges, valleys, skylights, and chimneys.",
    },
    {
      img: "/images/02-alsoavailable-Site-LandscapePlans.png",
      name: "Site & Landscape Plans",
      pitch: "Top-down site plans with property, landscape, and outdoor features — for redesigns, additions, and pools.",
    },
    {
      img: "/images/02-alsoavailable-revitcali.png",
      name: "Revit Models",
      pitch: "LOD 200–300 parametric BIM model ready to design against.",
    },
    {
      img: "/images/02-alsoavailable-3dvirtualvisit.png",
      name: "Virtual Visits",
      pitch: "A shared, on-demand view of the home — for planning, coordinating teams, and documenting existing conditions.",
    },
  ];

  return (
    <>
    <section id="deliverables" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="01 · Deliverables" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            One visit. Every drawing you need.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Pick the drawings you need — we'll quote what fits.
          </p>
        </div>

        {/* Carousel — cycles through the 4 core deliverables */}
        <DeliverablesCarousel items={primary} />

        {/* Advanced offerings — the 3 extras */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="font-mono txt-11 uppercase tracking-widest text-slate-500">
            Also available
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {advanced.map((item, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 transition-all hover:border-slate-300 hover:bg-white hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setLightboxImg({ src: item.img, alt: item.name })}
                aria-label={`View enlarged ${item.name}`}
                className="block aspect-[4/3] w-full overflow-hidden bg-white cursor-zoom-in"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </button>
              <div className="p-6">
                <h3 className="font-serif text-lg text-slate-900">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.pitch}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono txt-10 uppercase tracking-wider text-slate-400">
          *Roof plan availability varies by property — ask us about yours.
        </p>
      </div>
    </section>
    <ImageLightbox
      src={lightboxImg?.src}
      alt={lightboxImg?.alt}
      onClose={() => setLightboxImg(null)}
    />
    </>
  );
}

/**
 * =====================================================================
 *  PROCESS
 * =====================================================================
 */
function Process() {
  const steps = [
    {
      n: "01",
      title: "Request & get pricing",
      body: "Tell us the address, square footage, and what you need. Within minutes you'll get an initial estimate by email; our team follows up with your confirmed quote within one business day. Total effort on your end: 60 seconds.",
    },
    {
      n: "02",
      title: "On-site scan",
      body: "A technician captures every surface of your home with laser precision. Most homes wrap in a single day or less.",
    },
    {
      n: "03",
      title: "Drawings delivered",
      body: "Your drawings — floor plans, elevations, ceiling plans, Revit, and everything else in your package — land in your inbox within 3–5 business days, ready for your architect, designer, contractor, or records.",
    },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <DimensionLine label="03 · Process" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
              Easy as <span className="text-blue-600">1, 2, 3.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From first click to delivered drawings, every step is designed to keep you moving — not stuck in back-and-forth.
            </p>
            <a
              href="#quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Start step one <ArrowRight size={16} />
            </a>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative space-y-2">
              {steps.map((s, i) => (
                <li key={i} className="group relative rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:bg-blue-50/30 lg:p-8">
                  <div className="flex items-start gap-6">
                    <div className="font-mono text-3xl font-light text-blue-600/60 lg:text-4xl">{s.n}</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-slate-900 lg:text-2xl">{s.title}</h3>
                      <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  SAMPLES
 * =====================================================================
 */
function Samples() {
  const samples = [
    {
      title: "Modern hillside residence · Los Angeles",
      tag: "Floor plans + elevations + landscape + Revit",
      image: "/images/02-alsoavailable-revitcali.png",
    },
    { title: "Single-family ranch · Floor plan", tag: "Floor Plan" },
    { title: "Brownstone triplex · Elevations", tag: "Elevations" },
    { title: "Mid-century split · Ceiling plan", tag: "Ceiling Plan" },
    { title: "Victorian row · Floor plan", tag: "Floor Plan" },
    { title: "New-build condo · Elevations", tag: "Elevations" },
  ];

  return (
    <section id="samples" className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <DimensionLine label="04 · Samples" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">Recent homes.</h2>
          </div>
          <p className="max-w-md text-slate-600">
            A handful of scans from across the country. Every home is different — no template, no shortcuts.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((s, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white">
              {s.image ? (
                <div className="overflow-hidden bg-slate-100" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative bg-gradient-to-br from-blue-100 via-slate-50 to-blue-50" style={{ aspectRatio: '4 / 3' }}>
                  <div className="pointer-events-none absolute inset-0 text-blue-500/30">
                    <BlueprintGrid className="h-full w-full" />
                  </div>
                  <HouseSilhouette className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-blue-400/40" />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-md bg-white/80 px-3 py-1 font-mono txt-10 uppercase tracking-widest text-slate-500 backdrop-blur-sm">
                      Placeholder · swap in real scan
                    </span>
                  </div>
                </div>
              )}
              <figcaption className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                <span className="text-sm font-medium text-slate-900">{s.title}</span>
                <span className="shrink-0 rounded-md border border-slate-200 px-2 py-0.5 font-mono txt-10 uppercase tracking-wider text-slate-500">
                  {s.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  TESTIMONIALS
 * =====================================================================
 */
function Testimonials() {
  const quotes = [
    {
      quote: "Turnaround was faster than our architect promised a redline. The plans were clean and matched the house.",
      name: "Placeholder Name",
      role: "General Contractor, Brooklyn",
    },
    {
      quote: "We had a mid-century remodel on a tight schedule. Their point cloud saved us two weeks of field measurements — and caught a skew wall no one had noticed.",
      name: "Placeholder Name",
      role: "Architect, Los Angeles",
    },
    {
      quote: "We bought a 1920s home with zero documentation. A week later we had a full set of as-builts. Painless, professional, and reasonably priced.",
      name: "Placeholder Name",
      role: "Homeowner, Chicago",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="05 · Reviews" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Trusted by homeowners, contractors, and architects.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure key={i} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex gap-1 text-blue-600">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-slate-900">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-200 pt-5">
                <div className="text-sm font-medium text-slate-900">{q.name}</div>
                <div className="text-xs text-slate-500">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600"
          >
            Join them — request a quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  SUBMIT CONFIRMATION MODAL — pops on successful quote submit
 * =====================================================================
 */
function SubmitConfirmationModal({ open, name, email, onClose }) {
  const firstName = name ? name.split(" ")[0] : "";

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Lock body scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="modal-pop relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        {/* Blueprint-grid header with floating check */}
        <div className="relative h-24 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="pointer-events-none absolute inset-0 text-white/10">
            <BlueprintGrid className="h-full w-full" />
          </div>
          <div className="absolute left-1/2 top-full grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg">
            <Check size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-8 pt-12 text-center lg:px-10">
          <h3
            id="submit-modal-title"
            className="font-serif text-2xl tracking-tight text-slate-900 lg:text-3xl"
          >
            {firstName ? (
              <>
                Thanks, <span className="italic text-blue-600">{firstName}</span>!
              </>
            ) : (
              <>Thanks!</>
            )}
          </h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            A confirmation email is on its way to{" "}
            <span className="font-medium text-slate-900">{email}</span>. Our team will follow up within one
            business day with your quote and to schedule your scan.
          </p>
          <button
            onClick={onClose}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Got it
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-pop-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-pop { animation: modal-pop-in 0.22s ease-out both; }
      `}</style>
    </div>
  );
}

/**
 * =====================================================================
 *  QUOTE FORM
 * =====================================================================
 */
function QuoteForm() {
  const [status, setStatus] = useState("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", sqft: "", sqftExact: "",
    propertyType: "", timeline: "", purpose: "", notes: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const sqftDisplay = form.sqft === EXACT_SQFT_KEY && form.sqftExact
        ? `${parseInt(form.sqftExact, 10).toLocaleString()} sq ft (exact)`
        : form.sqft;
      const payload = {
        _subject: `New RABS quote request — ${form.name || "unnamed"}`,
        _template: "table",
        _captcha: "false",
        "Full name": form.name,
        Email: form.email,
        Phone: form.phone,
        "Home address": form.address,
        "Square footage": sqftDisplay,
        "Property type": form.propertyType,
        Timeline: form.timeline || "(not specified)",
        Purpose: form.purpose || "(not specified)",
        "Additional notes": form.notes || "(none)",
      };

      const res = await fetch("https://formsubmit.co/ajax/info@residentialasbuiltservices.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("send failed");
      const json = await res.json();
      if (json.success === "false" || json.success === false) throw new Error("send failed");
      setStatus("sent");
      setModalOpen(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <>
        <section id="quote" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 text-blue-500/10">
          <BlueprintGrid className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-fade-top" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-900/20">
              <Check size={32} strokeWidth={2.5} />
            </div>
            <DimensionLine label="Request received" className="mt-8 justify-center" />
            <h1 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-6xl">
              Thanks
              {form.name ? <>, <span className="italic text-blue-600">{form.name.split(" ")[0]}</span></> : null}.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              We've received your request and emailed a confirmation to{" "}
              <span className="font-medium text-slate-900">{form.email}</span>. Our team will review the details
              and follow up within one business day with your quote.
            </p>
          </div>

          {/* Summary of what they submitted */}
          <div className="relative mt-12 overflow-hidden rounded-2xl border-2 border-blue-600 bg-white shadow-2xl shadow-blue-900/10">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 lg:px-10">
              <span className="font-mono txt-11 uppercase tracking-widest text-slate-500">
                Summary of your request
              </span>
            </div>

            <div className="px-6 py-8 lg:px-10 lg:py-10">
              <div className="font-mono txt-10 uppercase tracking-widest text-slate-500">Your home</div>
              <div className="mt-1 font-serif text-xl text-slate-900">{form.address}</div>

              <div className="mt-8 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
                <div>
                  <div className="font-mono txt-10 uppercase tracking-widest text-slate-500">Size</div>
                  <div className="mt-1 text-slate-900">
                    {form.sqft === EXACT_SQFT_KEY && form.sqftExact
                      ? `${parseInt(form.sqftExact, 10).toLocaleString()} sq ft`
                      : form.sqft || "—"}
                  </div>
                </div>
                <div>
                  <div className="font-mono txt-10 uppercase tracking-widest text-slate-500">Property type</div>
                  <div className="mt-1 text-slate-900">{form.propertyType || "—"}</div>
                </div>
                <div>
                  <div className="font-mono txt-10 uppercase tracking-widest text-slate-500">Timeline</div>
                  <div className="mt-1 text-slate-900">{form.timeline || "—"}</div>
                </div>
                <div>
                  <div className="font-mono txt-10 uppercase tracking-widest text-slate-500">Purpose</div>
                  <div className="mt-1 text-slate-900">{form.purpose || "—"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Confirmation", b: "Check your inbox — we've received your request." },
              { n: "02", t: "Matched quote", b: "Our team follows up within 1 business day with your quote." },
              { n: "03", t: "On-site scan", b: "A discreet, friendly technician wraps your home in a single day or less." },
              { n: "04", t: "Drawings delivered", b: `In your inbox within ${BRAND.turnaround}.` },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="font-mono text-2xl font-light text-blue-600/60">{s.n}</div>
                <div className="mt-2 font-serif text-lg text-slate-900">{s.t}</div>
                <p className="mt-1 text-sm text-slate-600">{s.b}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-slate-500">
            Didn't get the confirmation email? Check your spam folder, or reach out and we'll help.
          </p>
        </div>
      </section>
      <SubmitConfirmationModal
        open={modalOpen}
        name={form.name}
        email={form.email}
        onClose={() => setModalOpen(false)}
      />
      </>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all";

  return (
    <section id="quote" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 text-blue-500/10">
        <BlueprintGrid className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="07 · Request quote" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Fast quote. Fair price. Easy call.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Takes 60 seconds. Initial estimate in minutes, confirmed quote within one business day &mdash; no call required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 lg:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" required>
              <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Jane Doe" />
            </Field>
            <Field label="Email" required>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@email.com" />
            </Field>
            <Field label="Phone" required>
              <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="(555) 000-0000" />
            </Field>
            <Field label="Home address" required>
              <AddressAutocomplete required value={form.address} onChange={(v) => update("address", v)} className={inputCls} />
            </Field>
            <Field label="Approx. square footage" required>
              <Select
                required
                value={form.sqft}
                onChange={(v) => {
                  update("sqft", v);
                  if (v !== EXACT_SQFT_KEY) update("sqftExact", "");
                }}
                options={[
                  "0 – 1,500 sq ft",
                  "1,500 – 3,000 sq ft",
                  "3,000 – 6,000 sq ft",
                  "6,000 – 10,000 sq ft",
                  "10,000+ sq ft",
                  EXACT_SQFT_KEY,
                ]}
              />
              {form.sqft === EXACT_SQFT_KEY && (
                <input
                  required
                  type="number"
                  min="100"
                  max="100000"
                  value={form.sqftExact}
                  onChange={(e) => update("sqftExact", e.target.value)}
                  className={`${inputCls} mt-2`}
                  placeholder="Enter exact sq ft (e.g. 2,400)"
                  autoFocus
                />
              )}
            </Field>
            <Field label="Property type" required>
              <Select required value={form.propertyType} onChange={(v) => update("propertyType", v)} options={["Single-family home", "Condo", "Townhouse", "Multi-family", "Other"]} />
            </Field>

            <Field label="Timeline (optional)">
              <Select value={form.timeline} onChange={(v) => update("timeline", v)} options={["ASAP", "1–2 weeks", "Within a month", "Flexible"]} />
            </Field>
            <Field label="Purpose (optional)">
              <Select value={form.purpose} onChange={(v) => update("purpose", v)} options={["Renovation / remodel", "Permit / zoning", "Historical / records", "Other"]} />
            </Field>

            <Field label="Anything else?" className="md:col-span-2">
              <textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} className={inputCls} placeholder="Access notes, gate codes, pets, preferred arrival window, etc." />
            </Field>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-sm text-xs text-slate-500">
              We'll only use your info to match packages and schedule your scan. No spam, ever.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send request"}
              {status !== "sending" && <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}
            </button>
          </div>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-600">
              Something went wrong. Please check your connection and try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono txt-11 uppercase tracking-widest text-slate-500">
        {label}
        {required && <span className="ml-1 text-blue-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options, required }) {
  return (
    <div className="relative">
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

/**
 * =====================================================================
 *  FAQ
 * =====================================================================
 */
function FAQ() {
  const faqs = [
    {
      category: "Pricing & billing",
      items: [
        { q: "How is my quote calculated?", a: "Your quote is calculated based on three factors: the area of your home, your location, and which deliverables you select. When you submit the form you'll receive an initial estimate by email within minutes; our team follows up with your confirmed quote within one business day, fine-tuned to your specific scope. Final pricing is confirmed after the on-site scan." },
        { q: "Are there any hidden fees?", a: "No — the quoted price covers the scan, the drawings, and delivery. No travel fees and no file-format upcharges." },
        { q: "When and how do I pay?", a: "Fifty percent is due to book your scan date, fifty percent on delivery of your drawings. We accept credit cards, ACH, and bank transfer." },
        { q: "What if I need revisions?", a: "Minor revisions to your drawings are included free. Larger scope changes are quoted separately before any extra work begins." },
      ],
    },
    {
      category: "Scan day",
      items: [
        { q: "How long does the scan take?", a: "Most homes wrap in a single day or less. Our technicians are discreet, friendly, and swift." },
        { q: "Do I need to be home?", a: "Not necessarily — but someone over 18 has to be on-site to let the technician in and lock up after. That can be you, a family member, your contractor, or anyone you trust with access. You're welcome to stick around or carry on with your day; the technician works independently." },
        { q: "Does every room need to be accessible?", a: "Yes — every space we don't see won't appear in the drawings. That includes closets, basements, garages, and any locked rooms. Attics and crawlspaces can be scanned but typically add to the quote — let us know in advance if you need them included. If a space is genuinely off-limits (a renter's unit, a sealed crawlspace), we'll either work around it or note the exclusion on the deliverable." },
        { q: "What should I do to prepare?", a: "Very little. Don't worry about cleaning or tidying — the scanner works around clutter, though anything fully covering a wall or floor should be moved a few feet so we can capture what's underneath. Beyond that: secure pets somewhere out of the way, and turn on the lights in any darker spaces. That's it." },
      ],
    },
    {
      category: "Accuracy & deliverables",
      items: [
        { q: "How accurate are your scans?", a: "Our laser scans are highly accurate — more than precise enough for renovation, insurance, and permitting work. We use professional-grade equipment calibrated for architectural documentation." },
        { q: "What file formats do I get?", a: "Every drawing is delivered as both PDF (for viewing and printing) and DWG (for AutoCAD, Revit, and other CAD software)." },
        { q: "What deliverables can you produce?", a: "Floor plans, exterior elevations, interior elevations, reflected ceiling plans, roof plans, Revit models, and virtual 3D walk-throughs. You pick what you need — see the 'What's included' section below for details on each." },
        { q: "How fast is delivery?", a: "3–5 business days from the scan date. Rush delivery (48–72 hours) is available for an added fee." },
      ],
    },
    {
      category: "What's included in each deliverable",
      items: [
        { q: "Floor Plans — what's included?", a: "Dimensioned plans of every level showing walls, doors, windows, and permanent fixtures. Half walls, railings, and steps are included by default." },
        { q: "Exterior Elevations — what's included?", a: "All four exterior faces of your home, drawn flat and to scale. Essential for permit submittals, facade renovations, and any curb-appeal work. Shows door and window locations and roof geometry. Precise window dimensions and sill heights available as add-ons." },
        { q: "Interior Elevations — what's included?", a: "Flat views of every interior wall, drawn to scale, showing door and window openings in elevation. A clean foundation for interior design and renovation planning. Note: fine details like cabinetry, millwork, and fixtures are measured on-site as needed — they aren't part of the standard deliverable." },
        { q: "Reflected Ceiling Plans — what's included?", a: "Top-down ceiling plans with lighting and fixture locations and ceiling heights throughout." },
        { q: "Roof Plans — what's included?", a: "Top-down view of the roof with pitches, ridges, valleys, chimneys, skylights, and any rooftop equipment. Note: availability varies by property — access, roof pitch, height, and drone-flight permissions can all affect what we can capture. Ask us about your specific property when you request a quote." },
        { q: "Site & Landscape Plans — what's included?", a: "Top-down plans of your property showing the building footprint, landscape features, hardscape, driveways, pools, and outbuildings. Useful for landscape redesigns, additions, new developments, pool planning, and general site upkeep." },
        { q: "Revit Models — what's included?", a: "LOD 200–300 parametric BIM model with walls, floors, ceilings, and openings. MEP placeholders available on request." },
        { q: "Virtual Visits — what's included?", a: "An interactive 3D walk-through of the home your clients or buyers can explore online, plus a dollhouse view and measurement tool." },
        { q: "What counts as an optional add-on?", a: "Elements like bathroom fixtures, landscape plans, parking surfaces, sidewalks, and precise window sill heights or dimensions. Mention these when our scheduler calls — they may adjust the final quote slightly." },
      ],
    },
  ];

  const audienceFaqs = [
    {
      audience: "For contractors",
      blurb: "Commissioning scans on client properties, files, and bids.",
      items: [
        {
          q: "Can I commission a scan on a client's property?",
          a: "Yes — this is one of our most common arrangements. You book the scan, we coordinate access directly with the homeowner or your site team, and you receive the deliverables. Invoicing can go to you, your client, or split on request. Note how you'd like it set up in the quote form notes and we'll confirm during scheduling.",
        },
        {
          q: "How are DWG files delivered, and can I reuse them across bids?",
          a: "DWG files are emailed directly to you (and any additional recipient you specify) alongside the PDFs. You're free to reuse them for bidding, change orders, and ongoing work on the property they were commissioned for. Reselling or redistributing drawings to unrelated third parties isn't included.",
        },
      ],
    },
    {
      audience: "For architects & designers",
      blurb: "Revit models, CAD standards, and ongoing relationships.",
      items: [
        {
          q: "What's the Revit LOD, and how is the model set up?",
          a: "Our standard Revit deliverable is LOD 200–300 — walls, floors, ceilings, openings, and structural elements modeled parametrically. Project origin can be set to true north, project north, or a coordinate you specify. Send your template and we'll deliver in it; otherwise we use our standard template with generic families.",
        },
        {
          q: "Can you match our drawing conventions and CAD standards?",
          a: "Yes. Send your layer naming, line weights, title blocks, and dimension styles with your request and we'll produce deliverables that match. For firms we work with repeatedly we keep your template on file so every set comes back formatted the way your office expects.",
        },
        {
          q: "Do you work with repeat clients on volume arrangements?",
          a: "Yes — we work with design firms on ongoing retainers and volume pricing tiers. If you expect three or more scans a year, mention it in the quote form and we'll propose terms. Dedicated project coordinators and faster turnaround windows are available on repeat arrangements.",
        },
      ],
    },
  ];

  return (
    <section id="faq" className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <DimensionLine label="06 · FAQ" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Answers to the questions that come up most &mdash; by topic below, with audience-specific
            sections for contractors, architects, and designers further down. Don't see yours?{" "}
            <a href="#quote" className="text-blue-600 underline hover:text-blue-700">
              Drop it in the quote form
            </a>{" "}
            and we'll answer when we reach out.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {faqs.map((cat, i) => (
            <div key={i}>
              <h3 className="border-b border-slate-200 pb-3 font-mono txt-11 uppercase tracking-widest text-slate-500">
                {cat.category}
              </h3>
              <div className="divide-y divide-slate-200">
                {cat.items.map((item, j) => (
                  <details key={j} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-slate-900 transition-colors hover:text-blue-600">
                      <span>{item.q}</span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition-all group-open:rotate-45 group-open:border-blue-600 group-open:bg-blue-50 group-open:text-blue-600">
                        <Plus size={14} />
                      </span>
                    </summary>
                    <p className="mt-3 pr-10 leading-relaxed text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Audience-specific FAQ sections: each section collapses/expands as a whole.
            Clicking the header reveals every Q&A inside, fully expanded. */}
        <div className="mt-20">
          <h3 className="border-b border-slate-200 pb-3 font-mono txt-11 uppercase tracking-widest text-slate-500">
            By audience
          </h3>
          <div className="mt-6 space-y-4">
            {audienceFaqs.map((aud, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-blue-300"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 transition-colors hover:text-blue-600 lg:px-8">
                  <div>
                    <div className="font-serif text-xl text-slate-900 lg:text-2xl">{aud.audience}</div>
                    <div className="mt-1 text-sm text-slate-500">{aud.blurb}</div>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition-all group-open:rotate-45 group-open:border-blue-600 group-open:bg-blue-50 group-open:text-blue-600">
                    <Plus size={16} />
                  </span>
                </summary>
                <div className="divide-y divide-slate-100 border-t border-slate-100 px-6 lg:px-8">
                  {aud.items.map((item, j) => (
                    <div key={j} className="py-5">
                      <h4 className="font-serif text-lg leading-snug text-slate-900">{item.q}</h4>
                      <p className="mt-2 leading-relaxed text-slate-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-serif text-xl text-slate-900">Still have a question?</h3>
            <p className="mt-1 text-sm text-slate-600">
              Request a quote and add your question in the notes field — we'll answer within one business day.
            </p>
          </div>
          <a
            href="#quote"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Request a quote
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  SERVICE AREAS
 * =====================================================================
 */
const SERVICE_AREAS = [
  ["Arizona", ["Chandler", "Gilbert", "Glendale", "Mesa", "Phoenix", "Scottsdale", "Tucson"]],
  ["California", ["Anaheim", "Bakersfield", "Chula Vista", "Fresno", "Irvine", "Long Beach", "Los Angeles", "Oakland", "Riverside", "Sacramento", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Stockton"]],
  ["Colorado", ["Aurora", "Colorado Springs", "Denver"]],
  ["District of Columbia", ["Washington"]],
  ["Florida", ["Hialeah", "Jacksonville", "Miami", "Orlando", "St. Petersburg", "Tampa"]],
  ["Georgia", ["Atlanta"]],
  ["Hawaii", ["Honolulu"]],
  ["Idaho", ["Boise"]],
  ["Illinois", ["Chicago"]],
  ["Indiana", ["Fort Wayne", "Indianapolis"]],
  ["Kansas", ["Wichita"]],
  ["Kentucky", ["Lexington", "Louisville"]],
  ["Louisiana", ["New Orleans"]],
  ["Maryland", ["Baltimore"]],
  ["Massachusetts", ["Boston"]],
  ["Michigan", ["Detroit"]],
  ["Minnesota", ["Minneapolis", "St. Paul"]],
  ["Missouri", ["Kansas City", "St. Louis"]],
  ["Nebraska", ["Lincoln", "Omaha"]],
  ["Nevada", ["Henderson", "Las Vegas", "North Las Vegas", "Reno"]],
  ["New Jersey", ["Jersey City", "Newark"]],
  ["New Mexico", ["Albuquerque"]],
  ["New York", ["Buffalo", "New York"]],
  ["North Carolina", ["Charlotte", "Durham", "Greensboro", "Raleigh", "Winston-Salem"]],
  ["Ohio", ["Cincinnati", "Cleveland", "Columbus", "Toledo"]],
  ["Oklahoma", ["Oklahoma City", "Tulsa"]],
  ["Oregon", ["Portland"]],
  ["Pennsylvania", ["Philadelphia", "Pittsburgh"]],
  ["Tennessee", ["Memphis", "Nashville"]],
  ["Texas", ["Arlington", "Austin", "Corpus Christi", "Dallas", "El Paso", "Fort Worth", "Frisco", "Garland", "Houston", "Irving", "Laredo", "Lubbock", "McKinney", "Plano", "San Antonio"]],
  ["Virginia", ["Chesapeake", "Norfolk", "Richmond", "Virginia Beach"]],
  ["Washington", ["Seattle", "Spokane", "Tacoma"]],
  ["Wisconsin", ["Madison", "Milwaukee"]],
];

function ServiceAreas() {
  const allCities = SERVICE_AREAS.flatMap(([state, cities]) =>
    cities.map((city) => ({ city, state }))
  );
  const mid = Math.ceil(allCities.length / 2);
  const row1 = allCities.slice(0, mid);
  const row2 = allCities.slice(mid);

  const Pill = ({ city, state }) => (
    <a
      href="#quote"
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
      title={`As-built drawings in ${city}, ${state}`}
    >
      <MapPin size={13} className="shrink-0 text-blue-600" />
      <span className="sr-only">As-builts in </span>
      <span className="whitespace-nowrap font-medium">{city}</span>
      <span className="whitespace-nowrap font-mono txt-10 uppercase tracking-widest text-slate-400">
        {state}
      </span>
    </a>
  );

  return (
    <section
      id="service-areas"
      className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <DimensionLine label="Service areas" className="justify-center" />
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-slate-900 lg:text-4xl">
            As-built drawings in every major U.S. city.
          </h2>
          <p className="mt-4 text-slate-600">
            We scan homes in every major metro area across the country. If you don't see your city,{" "}
            <a href="#quote" className="text-blue-600 underline hover:text-blue-700">
              request a quote anyway
            </a>{" "}
            — we likely serve you.
          </p>
        </div>
      </div>

      <div
        className="relative mt-14 space-y-3"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left flex w-max gap-3">
            {row1.map((c, i) => (<Pill key={`r1a-${i}`} {...c} />))}
            {row1.map((c, i) => (<Pill key={`r1b-${i}`} {...c} />))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-track marquee-right flex w-max gap-3">
            {row2.map((c, i) => (<Pill key={`r2a-${i}`} {...c} />))}
            {row2.map((c, i) => (<Pill key={`r2b-${i}`} {...c} />))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-3xl px-6 text-center text-xs text-slate-500 lg:px-10">
        Residential As-Built Services delivers laser-scanned floor plans, exterior elevations, and reflected
        ceiling plans to homeowners, contractors, architects, and designers across the United States. Whether
        you're in New York, Los Angeles, Chicago, Houston, Phoenix, or any major metro — we deliver precise
        as-built drawings in 3–5 business days, at a flat, transparent per-square-foot rate.
      </p>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track {
          animation-duration: 125s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .marquee-left  { animation-name: marquee-left; }
        .marquee-right { animation-name: marquee-right; }
        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; transform: translateX(0) !important; }
        }
      `}</style>
    </section>
  );
}

/**
 * =====================================================================
 *  FOOTER
 * =====================================================================
 */
function SocialIcon({ label, href, path }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white transition-colors hover:bg-blue-600"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

function Footer() {
  const offices = [
    { city: "New York Metro", address: "1300 Ave at Port Imperial, Suite 609, Weehawken Township, NJ 07086" },
    { city: "Los Angeles", address: "9907 White Oak Ave #225, Northridge, CA 91325" },
  ];

  const SOCIALS = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/dcms-network",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@dcmsnetworkmedia",
      path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Logo className="h-14 w-auto" />
            <div>
              <div className="font-serif text-lg text-slate-900">{BRAND.legalName}</div>
              <div className="font-mono txt-10 uppercase tracking-widest text-slate-500">{BRAND.tagline}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Request a quote
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-slate-100 pt-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="font-mono txt-11 uppercase tracking-widest text-red-600">Offices</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {offices.map((o) => (
                <li key={o.city}>
                  <span className="font-medium text-slate-900">{o.city}:</span> {o.address}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono txt-11 uppercase tracking-widest text-slate-500">Follow</div>
            <div className="mt-4 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <SocialIcon key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.legalName}. All rights reserved. A member of DCMS Network.</span>
          <span className="font-mono uppercase tracking-widest">Licensed · Insured · Nationwide</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * =====================================================================
 *  APP
 * =====================================================================
 */
export default function Rabs() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <style>{`
        .txt-10 { font-size: 10px; line-height: 1.3; }
        .txt-11 { font-size: 11px; line-height: 1.35; }
        .lead-105 { line-height: 1.05; }
        .trk-02 { letter-spacing: 0.2em; }
        .bg-fade-center {
          background-image: radial-gradient(ellipse at center, transparent 0%, #ffffff 85%);
        }
        .bg-fade-top {
          background-image: radial-gradient(ellipse at top, transparent 0%, #ffffff 75%);
        }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>
      <Nav />
      <StickyCTA />
      <main>
        <Hero />
        <Stats />
        <Deliverables />
        <Approach />
        <PainPoints />
        <CTABanner
          headline="Every day on bad plans costs you."
          sub="Change orders, delays, and surprise invoices all start with bad measurements. Laser-accurate plans, delivered in 3–5 business days."
          ctaLabel="Get your quote"
        />
        <Process />
        <Samples />
        <CTABanner
          headline="Your home deserves precise plans."
          sub="Tailored pricing. Fast delivery. Real people who do this all day."
          ctaLabel="Start your request"
        />
        <Testimonials />
        <FAQ />
        <QuoteForm />
        <ServiceAreas />
      </main>
      <Footer />
    </div>
  );
}
