import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Plane,
  CheckCircle2,
  XCircle,
  Map,
  Shield,
  DollarSign,
  FileText,
  Plus,
  Minus,
  Utensils,
  BusFront,
  BadgeCheck,
  Download,
  Phone,
} from "lucide-react";
import { usePackages } from "../hooks/usePackages";
import type { TravelPackage } from "../types/packages";

const SPECIAL_PACKAGE_ID = "ha-noi-da-nang-phu-quoc-9d8n";

const NINE_DAY_MEDIA = {
  hero: "/hanoi-9D8N/halongbay.jpg",
  timeline: {
    "Day 1": "/hanoi-9D8N/temple.jpg",
    "Day 2": "/hanoi-9D8N/halongbay.jpg",
    "Day 3": "/hanoi-9D8N/danang.jpg",
    "Day 4": "/hanoi-9D8N/temple.jpg",
    "Day 5": "/hanoi-9D8N/goldenbridge.png",
    "Day 6": "/hanoi-9D8N/grandworld.jpg",
    "Day 7": "/hanoi-9D8N/safari.jpg",
    "Day 8": "/hanoi-9D8N/thom-island.jpg",
    "Day 9": "/hanoi-9D8N/cablecar.jpg",
    default: "/hanoi-9D8N/danang.jpg",
  },
  cityShots: {
    "Ha Noi": "/hanoi-9D8N/temple.jpg",
    "Ha Long Bay": "/hanoi-9D8N/halongbay.jpg",
    "Da Nang": "/hanoi-9D8N/danang.jpg",
    "Phu Quoc": "/hanoi-9D8N/grandworld.jpg",
  },
} as const;

const NineDaySignaturePage: React.FC<{ pkg: TravelPackage }> = ({ pkg }) => {
  const leadPrice = pkg.pricing[1]?.prices?.[0] ?? pkg.pricing[0]?.prices?.[0] ?? "On request";

  const summaryBadges = [
    {
      icon: CalendarDays,
      label: "Duration",
      value: "9 Days / 8 Nights",
    },
    {
      icon: Utensils,
      label: "Meals",
      value: "8 Breakfasts · 1 Lunch · 1 Dinner · 1 Brunch",
    },
    {
      icon: BusFront,
      label: "Transport",
      value: "Private + Shuttle Transfers",
    },
    {
      icon: BadgeCheck,
      label: "Included",
      value: "Vietnam E-Visa Assistance",
    },
  ];

  const specPills = [
    { icon: "🌙", label: "8 Nights" },
    { icon: "✈️", label: "Private & Group Mix" },
    { icon: "📅", label: "Daily Departure" },
  ];

  const validityNote = (pkg.policy.validity ?? pkg.travelWindow).trim();
  const validityCopy = /valid/i.test(validityNote)
    ? validityNote.replace(/\.\s*$/, "")
    : `Rates valid until ${validityNote}`;

  const assistancePerks = [
    "English-speaking Vietnam specialist support",
    "Average response time under 2 business hours",
    "WhatsApp & email concierge throughout the trip",
  ];

  const [openDay, setOpenDay] = useState<string | null>(pkg.detailedItinerary[0]?.day ?? null);
  useEffect(() => {
    setOpenDay(pkg.detailedItinerary[0]?.day ?? null);
  }, [pkg.detailedItinerary]);

  const toggleDay = (day: string) => {
    setOpenDay(prev => (prev === day ? null : day));
  };

  return (
    <div className="pt-28 pb-16 bg-gray-50 text-gray-900 font-['Inter',_sans-serif]">
      <section className="px-4 mt-2">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,2fr)_360px]">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col gap-0">
            <img src={NINE_DAY_MEDIA.hero} alt={pkg.packageName} className="h-72 w-full object-cover" />
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-emerald-500">
                  {pkg.agent ?? "Tripstars Signature Journey"}
                </p>
                <h1 className="text-3xl font-semibold mt-2">{pkg.packageName}</h1>
                <p className="text-sm text-gray-500">
                  {pkg.travelWindow} • {pkg.option}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {specPills.map(pill => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1"
                  >
                    <span>{pill.icon}</span>
                    {pill.label}
                  </span>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl border border-gray-100 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">Tour includes</h3>
                  <ul className="text-xs text-gray-600 space-y-2">
                    {pkg.includes.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-gray-100 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">Why travel with us</h3>
                  <ul className="text-xs text-gray-600 space-y-2">
                    {(pkg.policy.notes ?? []).slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!pkg.policy.notes || pkg.policy.notes.length === 0) && (
                      <li className="flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>Dedicated Vietnam travel concierge throughout.</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white border border-emerald-200 p-6 shadow-lg flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-emerald-500">Starting from</p>
                <p className="text-3xl font-bold mt-2 text-gray-900">{leadPrice}</p>
                <p className="text-sm text-gray-600">
                  Per person · twin sharing · {pkg.paxGroups[0] ?? "custom size"}
                </p>
                <p className="text-xs text-gray-500 mt-3">{validityCopy}</p>
              </div>
              <Link
                to="/contact"
                className="w-full text-center bg-emerald-600 text-white font-semibold rounded-full py-3 hover:bg-emerald-500 transition-colors"
              >
                Submit your query
              </Link>
            </div>

            <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-50 text-emerald-600 p-3">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Need Assistance?</p>
                  <p className="font-semibold text-gray-900">+84 935 555 135</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                {assistancePerks.map(perk => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <p>{perk}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-sm space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">Trip highlights</p>
              <div className="space-y-3 text-sm text-gray-700">
                {summaryBadges.map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-gray-400">{item.label}</p>
                      <p className="font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 mt-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow border border-gray-100 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">Itinerary</p>
              <h2 className="text-2xl font-semibold text-gray-900">Day-wise breakdown</h2>
            </div>
            <p className="text-sm text-gray-500">
              Toggle each day to see the flow, meals, and transfer style.
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {pkg.detailedItinerary.map(day => {
              const isOpen = openDay === day.day;
              return (
                <div key={day.day}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 py-4 text-left"
                    onClick={() => toggleDay(day.day)}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">{day.day}</p>
                      <p className="text-base font-semibold text-gray-900 mt-1">{day.title}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pb-4 text-sm text-gray-700 space-y-2">
                      {day.details.map((detail, idx) => (
                        <p key={idx} className="flex gap-2">
                          <span className="text-emerald-500">•</span>
                          <span>{detail}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-4 mt-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow border border-gray-100 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Tour includes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {pkg.includes.slice(0, 6).map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl shadow border border-gray-100 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Why travel with us</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {(pkg.policy.notes ?? []).slice(0, 5).map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {(!pkg.policy.notes || pkg.policy.notes.length === 0) && (
                <>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Dedicated Vietnam travel concierge before and during your trip.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Curated experiences vetted by Tripstars operations.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
      <section className="px-4 mt-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-6">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">What&apos;s included</h3>
            <ul className="space-y-2 text-sm text-emerald-900">
              {pkg.includes.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-amber-50 border border-amber-100 p-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">What&apos;s excluded</h3>
            <ul className="space-y-2 text-sm text-amber-900">
              {pkg.excludes.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const getLeadPrice = (pkg: TravelPackage): string | null => {
  for (const tier of pkg.pricing) {
    const price = tier.prices.find(value => value && value.trim().length > 0);
    if (price) {
      return price;
    }
  }
  return null;
};

const PackagePriceCard: React.FC<{ pkg: TravelPackage; leadPrice: string | null }> = ({
  pkg,
  leadPrice,
}) => {
  const paxLabel = pkg.paxGroups[0] ?? "Custom quote";
  const airportHighlight = pkg.airportTransfer[0] ?? "Airport transfers arranged on request";
  const summaryHighlight =
    pkg.summaryItinerary && pkg.summaryItinerary.length > 0
      ? pkg.summaryItinerary[0]
      : pkg.option;
  const validityCopy = pkg.policy.validity ?? `Travel window: ${pkg.travelWindow}`;

  return (
    <aside className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 lg:p-7 flex flex-col gap-6 text-gray-900 lg:sticky lg:top-28 self-start">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-emerald-500">From {paxLabel}</p>
        <p className="text-4xl font-semibold mt-2">{leadPrice ?? "On request"}</p>
        {leadPrice && <p className="text-sm text-gray-500 mt-1">per person · twin sharing</p>}
        <p className="text-sm text-gray-600 mt-3">{validityCopy}</p>
      </div>

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex gap-3">
          <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Travel Window</p>
            <p>{pkg.travelWindow}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Plane className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Airport Transfer</p>
            <p>{airportHighlight}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Map className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Trip Snapshot</p>
            <p>{summaryHighlight}</p>
          </div>
        </div>
        {pkg.policy.deposit && pkg.policy.deposit.length > 0 && (
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Deposit Terms</p>
              <p>{pkg.policy.deposit[0]}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Link
          to="/contact"
          className="bg-emerald-600 text-white text-center px-4 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-500 transition-colors"
        >
          Reserve This Trip
        </Link>
        <a
          href={`mailto:sales@vndmc.com?subject=${encodeURIComponent(pkg.packageName)}%20Inquiry`}
          className="text-center border border-emerald-600 text-emerald-700 px-4 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
        >
          Email Trip Planner
        </a>
        <a
          href="https://wa.me/84935555135"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center border border-gray-200 text-gray-800 px-4 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
        >
          Chat on WhatsApp
        </a>
      </div>

      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 flex items-start gap-3 text-sm text-emerald-900">
        <Download className="w-4 h-4 mt-1" />
        <div>
          <p className="font-semibold">Need the PDF?</p>
          <p>Request the full day-by-day document straight to your inbox.</p>
        </div>
      </div>
    </aside>
  );
};

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { packages, loading, error } = usePackages();

  const pkg = useMemo(
    () => packages.find(item => item.id === packageId) ?? null,
    [packages, packageId]
  );

  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!pkg) return;
    const initial: Record<string, boolean> = {};
    pkg.detailedItinerary.forEach((day, index) => {
      initial[day.day] = index === 0;
    });
    setExpandedDays(initial);
  }, [pkg]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading package details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-center space-y-4">
        <p className="text-xl font-semibold text-red-500">{error}</p>
        <button
          type="button"
          onClick={() => navigate("/packages")}
          className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
        >
          Back to Packages
        </button>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-gray-900">Package not found</p>
          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const groupSizeLabel =
    pkg.paxGroups.length > 0 ? pkg.paxGroups.join(" • ") : "Custom group sizes on request";

  const routingLabel =
    pkg.summaryItinerary && pkg.summaryItinerary.length > 0
      ? pkg.summaryItinerary
          .map(item => item.split(":")[1]?.split("–")[0]?.trim() ?? "")
          .filter(Boolean)
          .slice(0, 3)
          .join(" • ") || "Vietnam"
      : "Vietnam";

  const hasPricing = pkg.pricing.length > 0 && pkg.paxGroups.length > 0;

  const toggleDay = (dayKey: string) => {
    setExpandedDays(prev => ({ ...prev, [dayKey]: !prev[dayKey] }));
  };

  const allExpanded = pkg.detailedItinerary.every(day => expandedDays[day.day]);

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    pkg.detailedItinerary.forEach(day => {
      next[day.day] = !allExpanded;
    });
    setExpandedDays(next);
  };

  const leadPrice = getLeadPrice(pkg);

  if (pkg.id === SPECIAL_PACKAGE_ID) {
    return <NineDaySignaturePage pkg={pkg} />;
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 flex flex-col gap-8">
          <div>
            {pkg.agent && (
              <p className="uppercase tracking-[0.5em] text-emerald-200 text-xs mb-4">
                Agent: {pkg.agent}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {pkg.packageName}
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mt-4">
              {pkg.option} · Travel Window: {pkg.travelWindow}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <CalendarDays className="w-5 h-5" />,
                label: "Validity",
                value: pkg.policy.validity ?? pkg.travelWindow,
              },
              {
                icon: <Users className="w-5 h-5" />,
                label: "Group Sizes",
                value: groupSizeLabel,
              },
              {
                icon: <Plane className="w-5 h-5" />,
                label: "Routing",
                value: routingLabel,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <div className="text-white">{item.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-200">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
            >
              Browse Packages
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-emerald-700 px-6 py-3 font-semibold shadow-lg hover:bg-emerald-50 transition-colors"
            >
              Request This Package
            </Link>
            <a
              href={`mailto:sales@vndmc.com?subject=${encodeURIComponent(pkg.packageName)}%20Inquiry`}
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
            >
              Email Trip Expert
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-12">
            {hasPricing ? (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">
                      Transparent Pricing
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                      {pkg.option} · {pkg.note}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">
                    Rates are per person on twin sharing. Flights are excluded.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl shadow border border-gray-100">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-emerald-600 text-white">
                        <th className="p-4">Package</th>
                        {pkg.paxGroups.map(group => (
                          <th key={group} className="p-4 font-semibold">
                            {group}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.pricing.map((row, idx) => (
                        <tr key={row.tier} className={idx % 2 === 0 ? "bg-white" : "bg-emerald-50/30"}>
                          <td className="p-4 font-semibold text-gray-900">{row.tier}</td>
                          {row.prices.map((price, priceIdx) => (
                            <td key={priceIdx} className="p-4 text-gray-700">
                              {price}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {pkg.airportTransfer.length > 0 && (
                        <tr className="bg-emerald-50">
                          <td className="p-4 font-semibold text-gray-900">Airport Transfer</td>
                          {pkg.airportTransfer.map((value, idx) => (
                            <td key={idx} className="p-4 text-gray-700">
                              {value}
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center space-y-4">
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">Pricing</p>
                <h2 className="text-3xl font-bold text-gray-900">Custom quotation available</h2>
                <p className="text-gray-600">
                  {pkg.note ??
                    "Share your preferred travel dates and group size for a bespoke quotation within 24 working hours."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-emerald-700 transition-colors"
                  >
                    Request a Quote
                  </Link>
                  <a
                    href="https://wa.me/84935555135"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-2">Itinerary</p>
                  <h2 className="text-3xl font-bold text-gray-900">Day-wise breakdown</h2>
                </div>
                <button
                  type="button"
                  onClick={handleExpandAll}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-500"
                >
                  {allExpanded ? "Collapse all days" : "Expand all days"}
                </button>
              </div>

              <div className="space-y-6">
                {pkg.detailedItinerary.map((day, idx) => {
                  const expanded = expandedDays[day.day];
                  const isLast = idx === pkg.detailedItinerary.length - 1;
                  return (
                    <div key={day.day} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-4 h-4 rounded-full border-2 ${
                            expanded ? "border-emerald-600 bg-emerald-600" : "border-gray-400 bg-white"
                          }`}
                        />
                        {!isLast && <span className="w-px flex-1 bg-gray-300" />}
                      </div>
                      <div className="flex-1 pb-6 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
                              {day.day}
                              {day.dateLabel && (
                                <span className="text-gray-500 font-normal ml-2">{day.dateLabel}</span>
                              )}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">{day.title}</h3>
                          </div>
                          <button
                            type="button"
                            aria-label={`Toggle ${day.day}`}
                            onClick={() => toggleDay(day.day)}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                          >
                            {expanded ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                        </div>
                        <div
                          className={`transition-all duration-300 ${
                            expanded ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                          } overflow-hidden`}
                        >
                          <ul className="text-gray-700 text-sm space-y-2 list-disc pl-5">
                            {day.details.map((detail, detailIdx) => (
                              <li key={detailIdx}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-2">
                  What&apos;s included
                </p>
                <h2 className="text-3xl font-bold text-gray-900">Inclusions & Exclusions</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-semibold text-gray-900">Include</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6 text-red-500" />
                    <h3 className="text-2xl font-semibold text-gray-900">Exclude</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.excludes.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-red-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-3">Stay Options</p>
                <h2 className="text-3xl font-bold text-gray-900">Handpicked Hotels & Cabins</h2>
              </div>
              <div className="grid gap-6">
                {pkg.hotelPackages.map(tier => (
                  <div key={tier.tier} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-emerald-600 text-white px-6 py-3 text-lg font-semibold">
                      {tier.tier}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-4">City</th>
                            <th className="p-4">Accommodation</th>
                            <th className="p-4">Room Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tier.hotels.map((hotel, idx) => (
                            <tr
                              key={`${tier.tier}-${hotel.city}`}
                              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                              <td className="p-4 font-medium text-gray-900">{hotel.city}</td>
                              <td className="p-4 text-gray-700">{hotel.property}</td>
                              <td className="p-4 text-gray-700">{hotel.room}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-3">
                  Important Notes
                </p>
                <h2 className="text-3xl font-bold text-gray-900">Policy & Payments</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Map className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">General Notes</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.policy.notes?.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Children Policy</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.policy.childrenPolicy?.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <CalendarDays className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Validity & Deposit</h3>
                  </div>
                  {pkg.policy.validity && <p className="text-gray-700 mb-4">{pkg.policy.validity}</p>}
                  <ul className="space-y-3 text-gray-700">
                    {pkg.policy.deposit?.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Cancellation</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.policy.cancellation?.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Terms & Conditions</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.policy.terms?.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {pkg.policy.paymentMethods?.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-emerald-500 mt-1">•</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-emerald-600 p-10 text-center text-white space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.5em] text-emerald-200">Next Step</p>
                <h2 className="text-4xl font-bold">Ready to explore Vietnam?</h2>
              </div>
              <p className="text-lg text-emerald-100">
                Share your preferred travel dates and we&apos;ll confirm availability within 24 working hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-emerald-50 transition-colors"
                >
                  Talk to a Planner
                </Link>
                <a
                  href="https://wa.me/84935555135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <PackagePriceCard pkg={pkg} leadPrice={leadPrice} />
        </div>
      </section>
    </div>
  );
};

export default PackageDetailPage;

