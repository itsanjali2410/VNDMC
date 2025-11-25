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
} from "lucide-react";
import { usePackages } from "../hooks/usePackages";

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

  return (
    <div className="pt-24 bg-gray-50">
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

      {/* Pricing */}
      {hasPricing ? (
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">
                  Transparent Pricing
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {pkg.option} · {pkg.note}
                </h2>
              </div>
              <p className="text-gray-600">
                Rates are per person, based on double/twin sharing. Flights are excluded.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 bg-white">
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
        </section>
      ) : (
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
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
        </section>
      )}

      {/* Itinerary */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
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
      </section>

      {/* Includes / Excludes */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
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
      </section>

      {/* Hotels */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
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
                        <tr key={`${tier.tier}-${hotel.city}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
      </section>

      {/* Policies */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
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
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-700 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-emerald-200">Next Step</p>
          <h2 className="text-4xl font-bold text-white mt-4 mb-4">Ready to explore Vietnam?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Share your preferred travel dates and we&apos;ll confirm availability within 24 working
            hours.
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
      </section>
    </div>
  );
};

export default PackageDetailPage;

