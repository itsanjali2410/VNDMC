import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Plane, Users } from "lucide-react";
import { usePackages } from "../hooks/usePackages";

const packageThumbnails: Record<string, string> = {
  "ha-noi-da-nang-phu-quoc-9d8n": "/hanoi-9D8N/halongbay.jpg",
  "da-nang-short-break-4d3n": "/hanoi-9D8N/danang.jpg",
  "phu-quoc-private-4d3n": "/hanoi-9D8N/thom-island.jpg",
  "ho-chi-minh-private-3d2n": "/hanoi-9D8N/temple.jpg",
};

const PackageCards = () => {
  const { packages, loading, error } = usePackages();
  const displayedPackages = packages.slice(0, 3); // Show first 3 packages

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          Loading packages…
        </div>
      </section>
    );
  }

  if (error || displayedPackages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 mb-3">
            Featured Packages
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Handpicked Vietnam Journeys
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated selection of unforgettable travel experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayedPackages.map((pkg) => {
            const duration =
              pkg.summaryItinerary?.length ?? pkg.detailedItinerary.length;
            const groupLabel =
              pkg.paxGroups.length > 0 ? pkg.paxGroups.join(" • ") : "Custom group sizes";
            const routing =
              pkg.summaryItinerary
                ?.map((item) => item.split(":")[1]?.split("–")[0]?.trim() ?? "")
                .filter(Boolean)
                .slice(0, 1)
                .join(" • ") || "Vietnam";
            const imageSrc = packageThumbnails[pkg.id] ?? "/hanoi-9D8N/halongbay.jpg";

            return (
              <div
                key={pkg.id}
                className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={imageSrc}
                    alt={pkg.packageName}
                    className="w-full h-full object-cover"
                  />
                  {pkg.note && (
                    <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {pkg.note}
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-4 flex-1">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">
                      {pkg.option}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900">{pkg.packageName}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 font-medium">
                      <CalendarDays className="w-3 h-3" />
                      {duration} days
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 font-medium">
                      <Users className="w-3 h-3" />
                      {groupLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 font-medium">
                      <Plane className="w-3 h-3" />
                      {routing}
                    </span>
                  </div>
                  {pkg.summaryItinerary && pkg.summaryItinerary.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-emerald-500 mb-2">
                        Highlights
                      </p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        {pkg.summaryItinerary.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-emerald-500 font-semibold">•</span>
                            <p className="line-clamp-1">{item.split(":")[1]?.trim() || item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="w-full text-center block px-4 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm"
                  >
                    View Itinerary →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors"
          >
            See All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackageCards;

