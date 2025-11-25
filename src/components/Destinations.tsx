import React from "react";
import { CalendarDays, Users, Plane, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { usePackages } from "../hooks/usePackages";

const Destinations = () => {
  const { packages, loading, error } = usePackages();
  const pkg = packages[0];

  if (loading || !pkg) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          {loading ? "Loading featured package…" : error || "No package available right now."}
        </div>
      </section>
    );
  }
  const groupSizeLabel =
    pkg.paxGroups.length > 0 ? pkg.paxGroups.join(" • ") : "Custom group sizes available";
  const validityLabel = pkg.policy?.validity ?? "Available year-round";
  const routingLabel =
    pkg.summaryItinerary && pkg.summaryItinerary.length > 0
      ? pkg.summaryItinerary
          .map(item => item.split(":")[1]?.split("–")[0]?.trim() ?? "")
          .filter(Boolean)
          .slice(0, 3)
          .join(" • ") || "Vietnam"
      : "Vietnam";

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-3">
            Signature Package
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pkg.packageName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {pkg.option} · Travel Window: {pkg.travelWindow}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
                <p className="text-gray-800 font-semibold">{validityLabel}</p>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-emerald-600" />
                <p className="text-gray-800 font-semibold">
                  Group Sizes: {groupSizeLabel}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Plane className="w-5 h-5 text-emerald-600" />
                <p className="text-gray-800 font-semibold">
                  Routing: {routingLabel}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-2">
                  Snapshot Itinerary
                </p>
                <ul className="space-y-2 text-gray-700">
                  {pkg.summaryItinerary?.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-emerald-500 font-semibold">{idx + 1}.</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
            <div className="bg-emerald-600 text-white px-6 py-4 flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-emerald-200">Price Per Person</p>
                <p className="text-lg font-semibold">{pkg.note}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">Package</th>
                  {pkg.paxGroups.map(group => (
                      <th key={group} className="p-4">{group}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pkg.pricing.map((row, idx) => (
                    <tr key={row.tier} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 font-semibold text-gray-900">{row.tier}</td>
                      {row.prices.map((price, pIdx) => (
                        <td key={pIdx} className="p-4 text-gray-700">{price}</td>
                      ))}
                    </tr>
                  ))}
                {pkg.airportTransfer.length > 0 && (
                  <tr className="bg-emerald-50">
                    <td className="p-4 font-semibold text-gray-900">Airport Transfer</td>
                    {pkg.airportTransfer.map((value, idx) => (
                      <td key={idx} className="p-4 text-gray-700">{value}</td>
                    ))}
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to={`/packages/${pkg.id}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-colors"
          >
            View Full Package Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
