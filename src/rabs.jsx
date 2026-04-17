import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  DollarSign,
  HardHat,
  Home,
  Layers,
  MapPin,
  Menu,
  Ruler,
  ScanLine,
  Shield,
  Sparkles,
  Star,
  TrendingDown,
  X,
  Zap,
} from "lucide-react";

/**
 * =====================================================================
 *  BRAND / CONTENT CONSTANTS
 * =====================================================================
 */
const BRAND = {
  name: "RABS",
  legalName: "Residential As-Built Services",
  tagline: "Precision as-builts of your home, delivered in days.",
  email: "hello@placeholder.com",
  phone: "(555) 000-0000",
  yearsExperience: "15+",
  projectsDelivered: "1,200+",
  coverage: "Nationwide",
  turnaround: "3–5 business days",
  priceAdvantage: "40–60% less than hiring an architect",
};

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

function HouseSilhouette({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
    <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600/70 ${className}`}>
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#pain", label: "Why it matters" },
    { href: "#deliverables", label: "Deliverables" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Reviews" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white">
            <ScanLine size={18} strokeWidth={2.25} />
          </div>
          <span className="font-serif text-xl tracking-tight text-slate-900">{BRAND.name}</span>
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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const formEl = document.getElementById("quote");
      const formTop = formEl ? formEl.getBoundingClientRect().top + window.scrollY : Infinity;
      const pastHero = scrollY > 600;
      const nearForm = scrollY + window.innerHeight * 0.6 > formTop;
      setVisible(pastHero && !nearForm);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
        <span>Get your quote in 90 sec</span>
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

/**
 * =====================================================================
 *  HERO — residential-first positioning with pricing anchor
 * =====================================================================
 */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 text-blue-500/20">
        <BlueprintGrid className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,white_85%)]" />

      <HouseSilhouette className="pointer-events-none absolute left-[5%] top-[18%] h-24 w-24 text-blue-300/30 hidden lg:block" />
      <HouseSilhouette className="pointer-events-none absolute right-[6%] bottom-[15%] h-20 w-20 text-blue-300/30 hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Home size={14} />
              Residential specialists · Nationwide
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-slate-900 lg:text-7xl">
              Your home.{" "}
              <span className="italic text-blue-600">Measured precisely.</span>{" "}
              Delivered in days.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Laser-scanned as-built drawings for residential renovations, insurance claims, and home sales.{" "}
              <span className="font-medium text-slate-900">Typically {BRAND.priceAdvantage}.</span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600"
              >
                Get your quote in 90 sec
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pain"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900"
              >
                See why it matters
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> {BRAND.turnaround} turnaround
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Licensed & insured
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Homeowners, contractors & architects
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative">
              <DimensionLine label="24' 6&quot;" className="absolute -top-6 left-8 z-20" />
              <DimensionLine label="32' 0&quot;" className="absolute -bottom-6 right-8 z-20" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500">your_home.dwg</span>
                </div>

                <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-50 via-white to-blue-50">
                  <div className="pointer-events-none absolute inset-0 text-blue-500/40">
                    <BlueprintGrid className="h-full w-full" />
                  </div>

                  <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full p-8" fill="none" stroke="currentColor" strokeWidth="2">
                    <g className="text-slate-800">
                      <rect x="40" y="60" width="320" height="380" strokeWidth="3" />
                      <line x1="40" y1="220" x2="220" y2="220" />
                      <line x1="220" y1="60" x2="220" y2="300" />
                      <line x1="220" y1="300" x2="360" y2="300" />
                      <line x1="140" y1="300" x2="140" y2="440" />
                      <path d="M 170 220 A 30 30 0 0 1 200 250" strokeWidth="1.5" />
                      <path d="M 220 260 A 30 30 0 0 0 250 290" strokeWidth="1.5" />
                      <text x="120" y="140" fontSize="10" fill="currentColor" stroke="none">KITCHEN</text>
                      <text x="285" y="180" fontSize="10" fill="currentColor" stroke="none">LIVING</text>
                      <text x="110" y="330" fontSize="10" fill="currentColor" stroke="none">BEDROOM</text>
                      <text x="275" y="380" fontSize="10" fill="currentColor" stroke="none">BATH</text>
                    </g>

                    <g stroke="#2563eb" strokeWidth="1">
                      <line x1="40" y1="30" x2="220" y2="30" />
                      <line x1="40" y1="25" x2="40" y2="35" />
                      <line x1="220" y1="25" x2="220" y2="35" />
                      <text x="130" y="22" fontSize="11" textAnchor="middle" fill="#2563eb" stroke="none">18' 0"</text>
                    </g>
                    <g stroke="#2563eb" strokeWidth="1">
                      <line x1="380" y1="60" x2="380" y2="440" />
                      <line x1="375" y1="60" x2="385" y2="60" />
                      <line x1="375" y1="440" x2="385" y2="440" />
                      <text x="390" y="253" fontSize="11" fill="#2563eb" stroke="none">38' 0"</text>
                    </g>

                    <line x1="40" y1="60" x2="360" y2="60" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" className="origin-top scan-sweep" />
                  </svg>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3 text-xs">
                  <span className="font-mono uppercase tracking-wider text-slate-500">Scan complete · 0.5 mm accuracy</span>
                  <span className="inline-flex items-center gap-1 font-medium text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Ready
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 -bottom-4 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl md:block">
                <div className="text-xs uppercase tracking-wider text-slate-500">Avg. delivery</div>
                <div className="font-serif text-2xl text-slate-900">4.2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-sweep {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(380px); opacity: 0; }
        }
        .scan-sweep {
          animation: scan-sweep 4s ease-in-out infinite;
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
    { icon: Layers, label: "Homes scanned", value: BRAND.projectsDelivered },
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
                  <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{item.label}</div>
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
 *  PAIN POINTS — 3 stakeholder cards with REAL cited stats
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
      body: "Inaccurate plans mean change orders, rework, and costs you didn't plan for. Millimeter-accurate as-builts upfront eliminate the guesswork — and the surprise invoices.",
      source: "RenoFi industry analysis via Nasdaq, 2024",
    },
    {
      icon: HardHat,
      audience: "Contractors",
      pain: "Bad info burns margin on every job.",
      statBig: "22%",
      statCaption: "of rework is caused by inaccurate or inaccessible information.",
      body: "Every wrong measurement you inherit costs you labor, materials, and schedule. Start with laser-accurate plans and bid, order, and build off reality — not a tape measure.",
      source: "FMI × Autodesk Construction Data Report, 2021",
    },
    {
      icon: Ruler,
      audience: "Architects & Designers",
      pain: "Field measuring burns your design hours.",
      statBig: "75%",
      statCaption: "of construction projects miss their original deadline.",
      body: "Weeks spent measuring existing conditions is design time you don't get back. Hand us the address — we deliver point clouds or Revit models ready to design against.",
      source: "McKinsey Global Institute, construction productivity study",
    },
  ];

  return (
    <section id="pain" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <DimensionLine label="01 · Why it matters" className="justify-center" />
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
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    {s.audience}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl leading-snug text-slate-900">{s.pain}</h3>

                <div className="mt-6 flex items-baseline gap-3 border-y border-slate-100 py-5">
                  <span className="font-serif text-6xl font-light tracking-tight text-blue-600">{s.statBig}</span>
                  <span className="text-sm leading-snug text-slate-700">{s.statCaption}</span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-600">{s.body}</p>

                <p className="mt-5 border-t border-slate-100 pt-4 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Source: {s.source}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600"
          >
            Skip the surprises — get precise plans in days
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  CTA BANNER — mid-page conversion moment
 * =====================================================================
 */
function CTABanner({ headline, sub, ctaLabel = "Request a quote" }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-12 text-white lg:py-16">
      <div className="pointer-events-none absolute inset-0 text-blue-400/10">
        <BlueprintGrid className="h-full w-full" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-10">
        <div>
          <h3 className="font-serif text-2xl leading-tight tracking-tight lg:text-3xl">{headline}</h3>
          {sub && <p className="mt-2 max-w-2xl text-slate-300">{sub}</p>}
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
 *  DELIVERABLES
 * =====================================================================
 */
function Deliverables() {
  const tiers = [
    {
      icon: Ruler,
      name: "2D Floor Plans",
      pitch: "Dimensioned plans ready for renovation, insurance, or sale.",
      formats: ["PDF", "DWG"],
      bullets: ["Fully dimensioned floor plans", "Walls, doors, windows, and fixtures", "Elevations & sections on request"],
    },
    {
      icon: Layers,
      name: "3D Revit / BIM",
      pitch: "Parametric models your architect or contractor can build on.",
      formats: ["RVT", "IFC"],
      bullets: ["LOD 200–300 Revit model", "Walls, floors, ceilings, openings", "MEP placeholders on request"],
      highlight: true,
    },
    {
      icon: ScanLine,
      name: "Point Cloud",
      pitch: "Raw scan data for custom design or engineering workflows.",
      formats: ["RCP", "E57", "LAS"],
      bullets: ["Registered & cleaned point cloud", "Industry-standard formats", "Ready for Revit, AutoCAD, or Rhino"],
    },
  ];

  return (
    <section id="deliverables" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="02 · Deliverables" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            One scan. Every format your project needs.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tell us what you're building toward — we match a package to your project. Every tier comes from the same
            millimeter-accurate scan of your home.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div
                key={i}
                className={`group relative flex flex-col rounded-2xl border p-8 transition-all ${
                  tier.highlight
                    ? "border-blue-600 bg-slate-900 text-white shadow-xl shadow-blue-900/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-8 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                    Most requested
                  </div>
                )}
                <div className={`grid h-12 w-12 place-items-center rounded-lg ${tier.highlight ? "bg-blue-500/20 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{tier.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${tier.highlight ? "text-slate-300" : "text-slate-600"}`}>{tier.pitch}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {tier.formats.map((f) => (
                    <span key={f} className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tier.highlight ? "border-slate-700 text-slate-300" : "border-slate-200 text-slate-500"}`}>
                      {f}
                    </span>
                  ))}
                </div>

                <ul className={`mt-6 space-y-3 text-sm ${tier.highlight ? "text-slate-200" : "text-slate-700"}`}>
                  {tier.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5">
                      <Check size={16} className={`mt-0.5 shrink-0 ${tier.highlight ? "text-blue-300" : "text-blue-600"}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#quote"
                  className={`mt-8 inline-flex items-center gap-2 border-t pt-5 text-sm font-medium transition-colors ${
                    tier.highlight ? "border-slate-800 text-blue-300 hover:text-blue-200" : "border-slate-100 text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Request matched pricing
                  <ArrowUpRight size={14} />
                </a>
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
 *  PROCESS
 * =====================================================================
 */
function Process() {
  const steps = [
    { n: "01", title: "Request a quote", body: "Tell us the address, square footage, and what you need. Takes under 90 seconds." },
    { n: "02", title: "Packages matched to you", body: "Within minutes, we email a short list of packages sized to your home and timeline." },
    { n: "03", title: "On-site laser scan", body: "A technician arrives and captures every surface with millimeter accuracy. Most homes take under 3 hours." },
    { n: "04", title: "Deliverables in 3–5 days", body: "You receive drawings, models, or point clouds — ready for your architect, contractor, or records." },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <DimensionLine label="03 · Process" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
              Four steps. No friction.
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
 *  PRICING ANCHOR — architect comparison with citations
 * =====================================================================
 */
function PricingAnchor() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <DimensionLine label="04 · Pricing" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
              Architect-quality plans.{" "}
              <span className="italic text-blue-600">Fraction of the price.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hiring an architect just to document your existing home can run{" "}
              <span className="font-medium text-slate-900">10–20% of total construction cost</span> — before they even start designing.
              We scan and deliver the same as-built documentation for a flat fee, matched to your home.
            </p>
            <a
              href="#quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600"
            >
              Get your matched price
              <ArrowRight size={16} />
            </a>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              Architect fee sources: HomeGuide 2026; HomeAdvisor 2025.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
                <div className="flex items-center gap-2 text-slate-500">
                  <DollarSign size={18} />
                  <span className="font-mono text-[11px] uppercase tracking-widest">Architect route</span>
                </div>
                <div className="mt-6">
                  <div className="font-serif text-4xl text-slate-900 line-through decoration-red-400/70 decoration-2 lg:text-5xl">
                    10–20%
                  </div>
                  <div className="mt-2 text-sm text-slate-600">of total construction cost</div>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <X size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>Weeks of field measurement</span>
                  </li>
                  <li className="flex gap-2">
                    <X size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>Billed hourly at $100–$250/hr</span>
                  </li>
                  <li className="flex gap-2">
                    <X size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>Renovation fees +2–5% extra</span>
                  </li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-900/20 lg:p-8">
                <div className="pointer-events-none absolute inset-0 text-white/10">
                  <BlueprintGrid className="h-full w-full" />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={18} />
                    <span className="font-mono text-[11px] uppercase tracking-widest">RABS route</span>
                  </div>
                  <div className="mt-6">
                    <div className="font-serif text-4xl lg:text-5xl">40–60%</div>
                    <div className="mt-2 text-sm text-blue-100">less than an architect</div>
                  </div>
                  <ul className="mt-8 space-y-3 text-sm text-blue-50">
                    <li className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-blue-200" />
                      <span>Scanned in under 3 hours</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-blue-200" />
                      <span>Flat price matched to your home</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-blue-200" />
                      <span>Delivered in 3–5 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs italic text-slate-500">
              Architect fees for residential renovations typically range from 10–20% of construction cost (HomeGuide, 2026).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  WHY US
 * =====================================================================
 */
function WhyUs() {
  const reasons = [
    { icon: Zap, title: "Delivered in days", body: `Drawings in your inbox within ${BRAND.turnaround} — not weeks. Every scan is prioritized.` },
    { icon: DollarSign, title: "Priced to your home", body: "No hourly meters or architect-firm markups. Flat pricing matched to your square footage and scope." },
    { icon: Sparkles, title: "Built by specialists", body: `${BRAND.yearsExperience} years of residential scanning. ${BRAND.projectsDelivered} homes measured, drawn, and delivered.` },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 text-blue-400/10">
        <BlueprintGrid className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="05 · Why us" className="justify-center text-blue-400/80" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight lg:text-5xl">
            Fast, fair, and <span className="italic text-blue-400">obsessively accurate.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <Icon size={24} className="text-blue-400" />
                <h3 className="mt-5 font-serif text-2xl">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{r.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500"
          >
            Request a quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
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
    { title: "Single-family ranch · 2D", tag: "2D Floor Plan" },
    { title: "Brownstone triplex · 3D", tag: "Revit Model" },
    { title: "Mid-century split · Point cloud", tag: "Point Cloud" },
    { title: "Victorian row · 2D", tag: "2D Floor Plan" },
    { title: "New-build condo · 3D", tag: "Revit Model" },
    { title: "Craftsman bungalow · 2D", tag: "2D Floor Plan" },
  ];

  return (
    <section id="samples" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <DimensionLine label="06 · Samples" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">Recent homes.</h2>
          </div>
          <p className="max-w-md text-slate-600">
            A handful of scans from across the country. Every home is different — no template, no shortcuts.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((s, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 via-slate-50 to-blue-50">
                <div className="pointer-events-none absolute inset-0 text-blue-500/30">
                  <BlueprintGrid className="h-full w-full" />
                </div>
                <HouseSilhouette className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-blue-400/40" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-md bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 backdrop-blur-sm">
                    Placeholder · swap in real scan
                  </span>
                </div>
              </div>
              <figcaption className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                <span className="text-sm font-medium text-slate-900">{s.title}</span>
                <span className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
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
      quote: "Turnaround was faster than our architect promised a redline. The plans were clean and accurate to the quarter inch.",
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
    <section id="testimonials" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="07 · Reviews" className="justify-center" />
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
 *  QUOTE FORM
 * =====================================================================
 */
function QuoteForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", sqft: "",
    propertyType: "", deliverables: [], timeline: "", purpose: "", notes: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleDeliverable = (val) => {
    setForm((f) => ({
      ...f,
      deliverables: f.deliverables.includes(val) ? f.deliverables.filter((d) => d !== val) : [...f.deliverables, val],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section id="quote" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-white">
            <Check size={28} />
          </div>
          <h2 className="mt-6 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">Request received.</h2>
          <p className="mt-4 text-lg text-slate-600">
            We'll match a short list of packages to your home and email them to{" "}
            <span className="font-medium">{form.email}</span> within minutes.
          </p>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all";

  return (
    <section id="quote" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 text-blue-500/10">
        <BlueprintGrid className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="08 · Request quote" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Get your matched packages.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Takes 90 seconds. We'll email pricing and package options within minutes — no call required.
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
              <input required type="text" value={form.address} onChange={(e) => update("address", e.target.value)} className={inputCls} placeholder="123 Main St, City, State" />
            </Field>
            <Field label="Approx. square footage" required>
              <input required type="number" min="100" value={form.sqft} onChange={(e) => update("sqft", e.target.value)} className={inputCls} placeholder="2,400" />
            </Field>
            <Field label="Property type" required>
              <Select required value={form.propertyType} onChange={(v) => update("propertyType", v)} options={["Single-family home", "Condo", "Townhouse", "Multi-family", "Other"]} />
            </Field>

            <Field label="Desired deliverable" className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {["2D Floor Plans", "3D Revit / BIM", "Point Cloud", "Not sure yet"].map((d) => {
                  const active = form.deliverables.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDeliverable(d)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Timeline" required>
              <Select required value={form.timeline} onChange={(v) => update("timeline", v)} options={["ASAP", "1–2 weeks", "Within a month", "Flexible"]} />
            </Field>
            <Field label="Purpose" required>
              <Select required value={form.purpose} onChange={(v) => update("purpose", v)} options={["Renovation / remodel", "Insurance", "Sale / listing", "Permit / zoning", "Historical / records", "Other"]} />
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
              Something went wrong. Please try again, or email{" "}
              <a href={`mailto:${BRAND.email}`} className="underline">{BRAND.email}</a>.
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
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-slate-500">
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
 *  FOOTER
 * =====================================================================
 */
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white">
              <ScanLine size={18} strokeWidth={2.25} />
            </div>
            <div>
              <div className="font-serif text-lg text-slate-900">{BRAND.legalName}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{BRAND.tagline}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
            <a href={`mailto:${BRAND.email}`} className="hover:text-slate-900">{BRAND.email}</a>
            <a href={`tel:${BRAND.phone}`} className="hover:text-slate-900">{BRAND.phone}</a>
            <a href="#quote" className="hover:text-slate-900">Request quote</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.</span>
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
      <Nav />
      <StickyCTA />
      <main>
        <Hero />
        <Stats />
        <PainPoints />
        <CTABanner
          headline="Stop paying for guesswork."
          sub="Get laser-accurate plans of your home — in 3–5 business days, for 40–60% less than hiring an architect."
          ctaLabel="Get your quote"
        />
        <Deliverables />
        <Process />
        <PricingAnchor />
        <WhyUs />
        <Samples />
        <CTABanner
          headline="Your home deserves precise plans."
          sub="Flat pricing. Fast delivery. Real people who do this all day."
          ctaLabel="Start your request"
        />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
