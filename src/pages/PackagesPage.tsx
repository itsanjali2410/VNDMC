import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Plane, Users } from "lucide-react";
import { usePackages } from "../hooks/usePackages";

const packageThumbnails: Record<string, string> = {
  "ha-noi-da-nang-phu-quoc-9d8n": "/hanoi-9D8N/halongbay.jpg",
  "da-nang-short-break-4d3n": "/hanoi-9D8N/danang.jpg",
  "da-nang-private-4d3n": "/hanoi-9D8N/goldenbridge.png",
  "ho-chi-minh-private-3d2n": "/hanoi-9D8N/temple.jpg",
  "phu-quoc-private-4d3n": "/hanoi-9D8N/thom-island.jpg",
};

const PackagesPage: React.FC = () => {
  const { packages, loading, error } = usePackages();

  return (
    <div className="pt-24 bg-gray-50">
      <section className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">Packages</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Handpicked Vietnam Journeys</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse our featured itineraries and open any package to explore detailed day plans,
            inclusions, hotels, and policy notes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
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
            <div className="grid gap-8 lg:grid-cols-2">
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
                    className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
                  >
                    <div className="relative h-48">
                      <img src={imageSrc} alt={pkg.packageName} className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                        {pkg.travelWindow}
                      </span>
                      {pkg.note && (
                        <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {pkg.note}
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-4 flex-1">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">{pkg.option}</p>
                        <h2 className="text-xl font-semibold text-gray-900">{pkg.packageName}</h2>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                          <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                          {duration} days
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          {groupLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                          <Plane className="w-3.5 h-3.5 text-emerald-600" />
                          {routing}
                        </span>
                      </div>
                     
                    </div>
                    <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex gap-2">
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="flex-1 text-center px-4 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm"
                      >
                        View itinerary
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 text-center px-4 py-3 rounded-full border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors text-sm"
                      >
                        Request quote
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-3xl font-bold">Need something tailor-made?</h2>
          <p className="text-lg text-gray-200">
            Share your wish list and we&apos;ll curate a bespoke Vietnam journey within 24 working hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition-colors"
            >
              Plan with Tripstars Ops
            </Link>
            <a
              href="https://wa.me/84935555135"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
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

