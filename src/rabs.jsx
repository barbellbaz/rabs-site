import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Layers,
  MapPin,
  Menu,
  Ruler,
  ScanLine,
  Shield,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";

/**
 * =====================================================================
 *  BRAND / CONTENT CONSTANTS
 *  TODO: Replace placeholder values with final copy + assets.
 * =====================================================================
 */
const BRAND = {
  name: "RABS", // short display name used in nav/footer
  legalName: "Residential As-Built Services",
  tagline: "Precision as-builts, delivered in days.",
  email: "hello@placeholder.com",
  phone: "(555) 000-0000",
  yearsExperience: "15+",
  projectsDelivered: "1,200+",
  coverage: "Nationwide",
  turnaround: "3–5 business days",
};

// Placeholder image paths — drop real assets into /public/images/
const PLACEHOLDER_IMG = {
  heroScan: "/images/placeholder-hero-scan.png",
  sample1: "/images/placeholder-sample-1.png",
  sample2: "/images/placeholder-sample-2.png",
  sample3: "/images/placeholder-sample-3.png",
  sample4: "/images/placeholder-sample-4.png",
  sample5: "/images/placeholder-sample-5.png",
  sample6: "/images/placeholder-sample-6.png",
  logo: "/images/logo.svg",
};

/**
 * =====================================================================
 *  BLUEPRINT GRID BACKGROUND (SVG, inline — no dependencies)
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
        <pattern
          id="bp-small"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
        </pattern>
        <pattern
          id="bp-large"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <rect width="120" height="120" fill="url(#bp-small)" />
          <path
            d="M 120 0 L 0 0 0 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-large)" />
    </svg>
  );
}

/**
 * Dimension-line decorative element — a subtle nod to technical drawings.
 */
function DimensionLine({ label, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600/70 ${className}`}
    >
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
    { href: "#deliverables", label: "Deliverables" },
    { href: "#process", label: "Process" },
    { href: "#samples", label: "Samples" },
    { href: "#testimonials", label: "Reviews" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white">
            <ScanLine size={18} strokeWidth={2.25} />
          </div>
          <span className="font-serif text-xl tracking-tight text-slate-900">
            {BRAND.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-600"
          >
            Request Quote
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-700"
              >
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
 *  HERO
 * =====================================================================
 */
function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Blueprint grid background */}
      <div className="pointer-events-none absolute inset-0 text-blue-500/20">
        <BlueprintGrid className="h-full w-full" />
      </div>
      {/* Radial fade so grid fades at edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,white_85%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Now serving urban clusters nationwide
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-slate-900 lg:text-7xl">
              Precision as-builts.{" "}
              <span className="italic text-blue-600">Delivered in days.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Professional laser-scanned as-built drawings for homeowners,
              contractors, and architects. Accurate, fast, and priced to the
              project — not the profession.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-blue-600"
              >
                Request a Quote
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> {BRAND.turnaround}{" "}
                turnaround
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Licensed &
                insured
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-blue-600" /> Residential
                specialists
              </span>
            </div>
          </div>

          {/* Hero visual — placeholder scan card */}
          <div className="relative lg:col-span-5">
            <div className="relative">
              {/* Decorative dimension marks */}
              <DimensionLine
                label="24' 6&quot;"
                className="absolute -top-6 left-8 z-20"
              />
              <DimensionLine
                label="32' 0&quot;"
                className="absolute -bottom-6 right-8 z-20"
              />

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
                    scan_output.dwg
                  </span>
                </div>

                {/* Card body — placeholder for floor plan image */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-50 via-white to-blue-50">
                  <div className="pointer-events-none absolute inset-0 text-blue-500/40">
                    <BlueprintGrid className="h-full w-full" />
                  </div>

                  {/* Simulated floor plan — pure SVG */}
                  <svg
                    viewBox="0 0 400 500"
                    className="absolute inset-0 h-full w-full p-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <g className="text-slate-800">
                      {/* Outer wall */}
                      <rect
                        x="40"
                        y="60"
                        width="320"
                        height="380"
                        strokeWidth="3"
                      />
                      {/* Interior walls */}
                      <line x1="40" y1="220" x2="220" y2="220" />
                      <line x1="220" y1="60" x2="220" y2="300" />
                      <line x1="220" y1="300" x2="360" y2="300" />
                      <line x1="140" y1="300" x2="140" y2="440" />
                      {/* Doors (arcs) */}
                      <path
                        d="M 170 220 A 30 30 0 0 1 200 250"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 220 260 A 30 30 0 0 0 250 290"
                        strokeWidth="1.5"
                      />
                    </g>

                    {/* Dimension annotations */}
                    <g
                      className="font-mono text-blue-600"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <line x1="40" y1="30" x2="220" y2="30" />
                      <line x1="40" y1="25" x2="40" y2="35" />
                      <line x1="220" y1="25" x2="220" y2="35" />
                      <text
                        x="130"
                        y="22"
                        fontSize="11"
                        textAnchor="middle"
                        fill="currentColor"
                        stroke="none"
                      >
                        18' 0"
                      </text>
                    </g>
                    <g
                      className="font-mono text-blue-600"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <line x1="380" y1="60" x2="380" y2="440" />
                      <line x1="375" y1="60" x2="385" y2="60" />
                      <line x1="375" y1="440" x2="385" y2="440" />
                      <text
                        x="390"
                        y="253"
                        fontSize="11"
                        fill="currentColor"
                        stroke="none"
                      >
                        38' 0"
                      </text>
                    </g>

                    {/* Animated scan sweep */}
                    <line
                      x1="40"
                      y1="60"
                      x2="360"
                      y2="60"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="origin-top scan-sweep"
                    />
                  </svg>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3 text-xs">
                  <span className="font-mono uppercase tracking-wider text-slate-500">
                    Scan complete · 0.5 mm accuracy
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Ready
                  </span>
                </div>
              </div>

              {/* Floating stat chip */}
              <div className="absolute -right-4 -bottom-4 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl md:block">
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Avg. delivery
                </div>
                <div className="font-serif text-2xl text-slate-900">
                  4.2 days
                </div>
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
    {
      icon: Clock,
      label: "Turnaround",
      value: BRAND.turnaround,
    },
    {
      icon: MapPin,
      label: "Coverage",
      value: BRAND.coverage,
    },
    {
      icon: Layers,
      label: "Projects delivered",
      value: BRAND.projectsDelivered,
    },
    {
      icon: Shield,
      label: "Industry experience",
      value: `${BRAND.yearsExperience} years`,
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid divide-slate-200 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-slate-200 px-0 py-8 sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:pr-0"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    {item.label}
                  </div>
                  <div className="font-serif text-2xl text-slate-900">
                    {item.value}
                  </div>
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
 *  WHAT WE DELIVER (tiered packages, prices matched after quote)
 * =====================================================================
 */
function Deliverables() {
  const tiers = [
    {
      icon: Ruler,
      name: "2D Floor Plans",
      pitch: "Dimensioned plans ready for renovation & permit work.",
      formats: ["PDF", "DWG"],
      bullets: [
        "Fully dimensioned floor plans",
        "Wall, door, and window callouts",
        "Optional elevations & sections",
      ],
    },
    {
      icon: Layers,
      name: "3D Models",
      pitch: "Parametric Revit/BIM models your team can build on.",
      formats: ["RVT", "IFC"],
      bullets: [
        "LOD 200–300 Revit model",
        "Walls, floors, ceilings, openings",
        "MEP placeholders on request",
      ],
      highlight: true,
    },
    {
      icon: ScanLine,
      name: "Point Cloud",
      pitch: "Raw, registered scan data for custom workflows.",
      formats: ["RCP", "E57", "LAS"],
      bullets: [
        "Registered & cleaned point cloud",
        "Industry-standard formats",
        "Ideal for architects & engineers",
      ],
    },
  ];

  return (
    <section id="deliverables" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="01 · Deliverables" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            One scan. Every format you need.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tell us what you're building toward — we match a package and price
            to your project. Every tier starts from the same millimeter-accurate
            scan.
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
                <div
                  className={`grid h-12 w-12 place-items-center rounded-lg ${
                    tier.highlight
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{tier.name}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    tier.highlight ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {tier.pitch}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {tier.formats.map((f) => (
                    <span
                      key={f}
                      className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        tier.highlight
                          ? "border-slate-700 text-slate-300"
                          : "border-slate-200 text-slate-500"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <ul
                  className={`mt-6 space-y-3 text-sm ${
                    tier.highlight ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {tier.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          tier.highlight ? "text-blue-300" : "text-blue-600"
                        }`}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-8 border-t pt-5 text-xs ${
                    tier.highlight
                      ? "border-slate-800 text-slate-400"
                      : "border-slate-100 text-slate-500"
                  }`}
                >
                  <span className="font-mono uppercase tracking-wider">
                    Pricing matched to your project
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Request a matched quote
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * =====================================================================
 *  HOW IT WORKS
 * =====================================================================
 */
function Process() {
  const steps = [
    {
      n: "01",
      title: "Request a quote",
      body: "Tell us the address, square footage, and what you need. Takes under 90 seconds.",
    },
    {
      n: "02",
      title: "Packages matched to you",
      body: "Within minutes, we email a short list of packages sized to your project and timeline.",
    },
    {
      n: "03",
      title: "On-site laser scan",
      body: "A technician arrives and captures every surface with millimeter accuracy. Most homes take under 3 hours.",
    },
    {
      n: "04",
      title: "Deliverables in 3–5 days",
      body: "You receive drawings, models, or point clouds — ready for your architect, contractor, or records.",
    },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <DimensionLine label="02 · Process" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
              Four steps. No friction.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From first click to delivered drawings, the whole process is
              designed to keep you moving — not stuck in back-and-forth.
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
                <li
                  key={i}
                  className="group relative rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:bg-blue-50/30 lg:p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="font-mono text-3xl font-light text-blue-600/60 lg:text-4xl">
                      {s.n}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-slate-900 lg:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-slate-600">
                        {s.body}
                      </p>
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
 *  WHY US — differentiators
 * =====================================================================
 */
function WhyUs() {
  const reasons = [
    {
      icon: Zap,
      title: "Speed guaranteed",
      body: `Drawings in your inbox within ${BRAND.turnaround}. Miss the window and the next project is on us.`,
    },
    {
      icon: Sparkles,
      title: "Priced to the project",
      body: "No inflated architect-firm markups. Straight pricing matched to your square footage and scope.",
    },
    {
      icon: Shield,
      title: "Built by specialists",
      body: `${BRAND.yearsExperience} years of residential scanning. ${BRAND.projectsDelivered} homes measured, drawn, and delivered.`,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 text-blue-400/10">
        <BlueprintGrid className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine
            label="03 · Why us"
            className="justify-center text-blue-400/80"
          />
          <h2 className="mt-4 font-serif text-4xl tracking-tight lg:text-5xl">
            Fast, fair, and{" "}
            <span className="italic text-blue-400">obsessively accurate.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <Icon size={24} className="text-blue-400" />
                <h3 className="mt-5 font-serif text-2xl">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{r.body}</p>
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
 *  SAMPLE GALLERY (placeholders)
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
            <DimensionLine label="04 · Samples" />
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
              Recent work.
            </h2>
          </div>
          <p className="max-w-md text-slate-600">
            A handful of scans from across the country. Every home is different
            — no template, no shortcuts.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((s, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              {/* Placeholder image container */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 via-slate-50 to-blue-50">
                <div className="pointer-events-none absolute inset-0 text-blue-500/30">
                  <BlueprintGrid className="h-full w-full" />
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="rounded-md bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 backdrop-blur-sm">
                    Placeholder · swap in real scan
                  </span>
                </div>
              </div>
              <figcaption className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                <span className="text-sm font-medium text-slate-900">
                  {s.title}
                </span>
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
      quote:
        "Turnaround was faster than our architect promised a redline. The plans were clean and dimensionally accurate to the quarter inch.",
      name: "Placeholder Name",
      role: "General Contractor, Brooklyn",
    },
    {
      quote:
        "We had a mid-century remodel on a tight schedule. Their point cloud saved us two weeks of field measurements — and caught a skew wall no one had noticed.",
      name: "Placeholder Name",
      role: "Architect, Los Angeles",
    },
    {
      quote:
        "We bought a 1920s home with zero documentation. A week later we had a full set of as-builts. Painless, professional, and reasonably priced.",
      name: "Placeholder Name",
      role: "Homeowner, Chicago",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="05 · Reviews" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Trusted by homeowners, contractors, and architects.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8"
            >
              <div className="flex gap-1 text-blue-600">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-slate-900">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-200 pt-5">
                <div className="text-sm font-medium text-slate-900">
                  {q.name}
                </div>
                <div className="text-xs text-slate-500">{q.role}</div>
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
 *  QUOTE FORM (primary CTA)
 *  NOTE: wire `handleSubmit` to your email/back-end of choice.
 *  Suggested quick options: Formspree, Web3Forms, EmailJS, Resend.
 * =====================================================================
 */
function QuoteForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    sqft: "",
    propertyType: "",
    deliverables: [],
    timeline: "",
    purpose: "",
    notes: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleDeliverable = (val) => {
    setForm((f) => ({
      ...f,
      deliverables: f.deliverables.includes(val)
        ? f.deliverables.filter((d) => d !== val)
        : [...f.deliverables, val],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // TODO: replace with real endpoint (Formspree, Web3Forms, your API, etc.)
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section
        id="quote"
        className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-white">
            <Check size={28} />
          </div>
          <h2 className="mt-6 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Request received.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We'll match a short list of packages to your project and email them
            to <span className="font-medium">{form.email}</span> within minutes.
          </p>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all";

  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 text-blue-500/10">
        <BlueprintGrid className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <DimensionLine label="06 · Request quote" className="justify-center" />
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-900 lg:text-5xl">
            Get your matched packages.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Takes 90 seconds. We'll email pricing and package options within
            minutes — no call required.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 lg:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" required>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputCls}
                placeholder="Jane Doe"
              />
            </Field>

            <Field label="Email" required>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputCls}
                placeholder="you@email.com"
              />
            </Field>

            <Field label="Phone" required>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputCls}
                placeholder="(555) 000-0000"
              />
            </Field>

            <Field label="Property address" required>
              <input
                required
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputCls}
                placeholder="123 Main St, City, State"
              />
            </Field>

            <Field label="Approx. square footage" required>
              <input
                required
                type="number"
                min="100"
                value={form.sqft}
                onChange={(e) => update("sqft", e.target.value)}
                className={inputCls}
                placeholder="2,400"
              />
            </Field>

            <Field label="Property type" required>
              <Select
                required
                value={form.propertyType}
                onChange={(v) => update("propertyType", v)}
                options={[
                  "Single-family home",
                  "Condo",
                  "Townhouse",
                  "Multi-family",
                  "Other",
                ]}
              />
            </Field>

            <Field label="Desired deliverable" className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {[
                  "2D Floor Plans",
                  "3D Revit / BIM",
                  "Point Cloud",
                  "Not sure yet",
                ].map((d) => {
                  const active = form.deliverables.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDeliverable(d)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Timeline" required>
              <Select
                required
                value={form.timeline}
                onChange={(v) => update("timeline", v)}
                options={["ASAP", "1–2 weeks", "Within a month", "Flexible"]}
              />
            </Field>

            <Field label="Purpose" required>
              <Select
                required
                value={form.purpose}
                onChange={(v) => update("purpose", v)}
                options={[
                  "Renovation / remodel",
                  "Insurance",
                  "Sale / listing",
                  "Permit / zoning",
                  "Historical / records",
                  "Other",
                ]}
              />
            </Field>

            <Field label="Anything else?" className="md:col-span-2">
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={inputCls}
                placeholder="Access notes, gate codes, pets, preferred arrival window, etc."
              />
            </Field>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-sm text-xs text-slate-500">
              We'll only use your info to match packages and schedule your scan.
              No spam, ever.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-blue-600 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send request"}
              {status !== "sending" && (
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-600">
              Something went wrong. Please try again, or email{" "}
              <a href={`mailto:${BRAND.email}`} className="underline">
                {BRAND.email}
              </a>
              .
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
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
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
              <div className="font-serif text-lg text-slate-900">
                {BRAND.legalName}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                {BRAND.tagline}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
            <a href={`mailto:${BRAND.email}`} className="hover:text-slate-900">
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phone}`} className="hover:text-slate-900">
              {BRAND.phone}
            </a>
            <a href="#quote" className="hover:text-slate-900">
              Request quote
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
          <span className="font-mono uppercase tracking-widest">
            Licensed · Insured · Nationwide
          </span>
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
      <main>
        <Hero />
        <Stats />
        <Deliverables />
        <Process />
        <WhyUs />
        <Samples />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
