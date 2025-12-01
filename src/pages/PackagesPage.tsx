// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Plane, Users } from "lucide-react";
import { usePackages } from "../hooks/usePackages";

const packageThumbnails: Record<string, string> = {
  "ha-noi-da-nang-phu-quoc-9d8n": "/hanoi-9D8N/halongbay.jpg",
  "da-nang-short-break-4d3n": "/hanoi-9D8N/danang.jpg",
  "da-nang-private-4d3n": "/hanoi-9D8N/goldenbridge.png",
  "ho-chi-minh-private-3d2n": "/hanoi-9D8N/temple.jpg",
  "phu-quoc-private-4d3n": "/hanoi-9D8N/thom-island.jpg",
  "phu-quoc-4-night-standard-package": "/hanoi-9D8N/thom-island.jpg",
  "vietnam-standard-package-6n7d-with-daycruise": "/hanoi-9D8N/halongbay.jpg",
  "vietnam-7n8d-standard-package": "/hanoi-9D8N/halongbay.jpg",
};

const PackagesPage: React.FC = () => {
  const { packages, loading, error } = usePackages();

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 bg-gray-50 min-h-screen">
      <section className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-3 sm:space-y-4 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-emerald-500">Packages</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 px-2">Handpicked Vietnam Journeys</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto px-2 sm:px-4">
            Browse our featured itineraries and open any package to explore detailed day plans,
            inclusions, hotels, and policy notes.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            {loading && (
              <div className="py-12 text-center text-gray-500">Loading packages…</div>
            )}
            {error && !loading && (
              <div className="py-12 text-center text-red-500">{error}</div>
            )}
            {!loading && !error && packages.length === 0 && (
              <div className="py-12 text-center text-gray-500">No packages available right now.</div>
            )}
            {!loading && !error && packages.length > 0 && (
              <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {packages.map(pkg => {
                    const duration =
                      pkg.summaryItinerary?.length ?? pkg.detailedItinerary.length;
                    const groupLabel =
                      pkg.paxGroups.length > 0 ? pkg.paxGroups.join(" • ") : "Custom group sizes";
                    const routing =
                      pkg.summaryItinerary
                        ?.map(item => item.split(":")[1]?.split("–")[0]?.trim() ?? "")
                        .filter(Boolean)
                        .slice(0, 3)
                        .join(" • ") || "Vietnam";
                    const imageSrc = packageThumbnails[pkg.id] ?? "/hanoi-9D8N/halongbay.jpg";

                    return (
                      <div
                        key={pkg.id}
                        className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                      >
                        <div className="relative h-40 sm:h-48 md:h-52">
                          <img src={imageSrc} alt={pkg.packageName} className="w-full h-full object-cover" />
                          {pkg.note && (
                            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-emerald-600 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                              {pkg.note}
                            </span>
                          )}
                        </div>
                        <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex-1">
                          <div className="space-y-1">
                            <p className="text-[10px] sm:text-xs uppercase text-emerald-500">{pkg.option}</p>
                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight">{pkg.packageName}</h2>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 font-medium whitespace-nowrap">
                              <CalendarDays className="w-3 h-3 flex-shrink-0" />
                              <span>{duration} days</span>
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 font-medium">
                              <Users className="w-3 h-3 flex-shrink-0" />
                              <span className="line-clamp-1 max-w-[120px] sm:max-w-none">{groupLabel}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 font-medium">
                              <Plane className="w-3 h-3 flex-shrink-0" />
                              <span className="line-clamp-1 max-w-[100px] sm:max-w-none">{routing}</span>
                            </span>
                          </div>
                          {pkg.summaryItinerary && pkg.summaryItinerary.length > 0 && (
                            <div>
                              <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-emerald-500 mb-2">
                                Highlights
                              </p>
                              <ul className="space-y-1 text-gray-700 text-xs sm:text-sm">
                                {pkg.summaryItinerary.slice(0, 3).map((item, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="text-emerald-500 font-semibold flex-shrink-0">•</span>
                                    <p className="line-clamp-2">{item.split(":")[1]?.trim() || item}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl sm:rounded-b-3xl">
                          <Link
                            to={`/packages/${encodeURIComponent(pkg.id)}`}
                            className="w-full text-center block px-4 py-2.5 sm:py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-xs sm:text-sm"
                          >
                            View Itinerary →
                          </Link>
                        </div>
                      </div>
                    );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Need something tailor-made?</h2>
          <p className="text-base sm:text-lg text-gray-200">
            Share your wish list and we&apos;ll curate a bespoke Vietnam journey within 24 working hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-emerald-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Plan with Tripstars Ops
            </Link>
            <a
              href="https://wa.me/84935555135"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-colors text-sm sm:text-base"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;

