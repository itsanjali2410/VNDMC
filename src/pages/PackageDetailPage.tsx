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
  Phone,
  Bed,
  Clock,
  MapPin,
  Building2,
  ChevronDown,
  HelpCircle,
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
    <div className="pt-28 pb-16 bg-gray-50 text-gray-900">
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
                  {pkg.option}
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

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { packages, loading, error } = usePackages();

  // Decode packageId from URL and match with package.id
  const decodedPackageId = packageId ? decodeURIComponent(packageId) : null;
  const pkg = useMemo(
    () => packages.find(item => item.id === decodedPackageId || item.id === packageId) ?? null,
    [packages, packageId, decodedPackageId]
  );

  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [expandedTerms, setExpandedTerms] = useState<Record<string, boolean>>({});
  const [selectedHotelTier, setSelectedHotelTier] = useState<string>("");

  useEffect(() => {
    if (!pkg) return;
    const initial: Record<string, boolean> = {};
    pkg.detailedItinerary.forEach((day) => {
      initial[day.day] = false;
    });
    setExpandedDays(initial);
    
    // Set default hotel tier to first available
    if (pkg.hotelPackages && pkg.hotelPackages.length > 0) {
      setSelectedHotelTier(pkg.hotelPackages[0].tier);
    }
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

  const leadPrice = getLeadPrice(pkg) ?? "On request";
  const nights = pkg.detailedItinerary.length - 1;
  const days = nights + 1;

  const toggleDay = (dayKey: string) => {
    setExpandedDays(prev => ({ ...prev, [dayKey]: !prev[dayKey] }));
  };

  const toggleTerms = (termKey: string) => {
    setExpandedTerms(prev => ({ ...prev, [termKey]: !prev[termKey] }));
  };

  // Get hero image - try to use package-specific image or default
  const heroImage = pkg.summaryItinerary?.[0]?.includes("Ha Noi") 
    ? "/hanoi-9D8N/halongbay.jpg" 
    : pkg.summaryItinerary?.[0]?.includes("Da Nang")
    ? "/hanoi-9D8N/danang.jpg"
    : "/hanoi-9D8N/halongbay.jpg";

  // Extract location names for display
  const locationText = pkg.summaryItinerary && pkg.summaryItinerary.length > 0
    ? pkg.summaryItinerary
        .map(item => item.split(":")[1]?.split("–")[0]?.trim() ?? "")
        .filter(Boolean)
        .slice(0, 2)
        .join(" • ")
    : "Vietnam";

  if (pkg.id === SPECIAL_PACKAGE_ID) {
    return <NineDaySignaturePage pkg={pkg} />;
  }

  return (
    <div className="pt-28 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Title */}
        <div className="mb-2 pt-2">
          <h1 className="text-2xl font-bold text-emerald-600 uppercase tracking-wide break-words">
            {pkg.packageName.toUpperCase()}
          </h1>
        </div>

        {/* Hero Section with Image and Booking Panel */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-3 mb-3">
          {/* Hero Image */}
          <div className="relative">
            <img
              src={heroImage}
              alt={pkg.packageName}
              className="w-full h-[400px] object-cover"
            />
            {/* Overlay Text */}
            <div className="absolute top-8 left-8">
              <div className="text-5xl md:text-6xl font-bold text-emerald-500 uppercase tracking-wider break-words max-w-[70%]">
                {locationText.split(" • ")[0] || "VIETNAM"}
              </div>
            </div>
            {/* Price Banner */}
            <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-4 py-2 font-semibold">
              STARTING FROM - {leadPrice}
            </div>
          </div>

          {/* Booking Panel */}
          <div className="space-y-3">
            {/* Price Card */}
            <div className="bg-black text-white p-4">
              <div className="mb-3">
                <p className="text-sm uppercase mb-1">STARTING FROM</p>
                <p className="text-3xl font-bold">{leadPrice}</p>
              </div>
              <p className="text-sm mb-4">{nights} NIGHTS/{days} DAY</p>
              <Link
                to="/contact"
                className="block w-full bg-emerald-500 text-white text-center py-2 font-bold uppercase tracking-wide hover:bg-emerald-600 transition-colors"
              >
                SUBMIT YOUR QUERY
              </Link>
            </div>

            {/* Assistance Panel */}
            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">NEED ASSISTANCE?</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <p>+84 0325765379</p>
                <p>+84 0325765379</p>
                <p>sales@vndmc.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Package Overview */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">PACKAGE OVERVIEW</h2>
          <p className="text-gray-700 mb-2">{pkg.option}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <Clock className="w-4 h-4" />
              <span>{nights} NIGHTS, {days} DAYS</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <Bed className="w-4 h-4" />
              <span>{locationText.toUpperCase()}</span>
            </div>
            <Link to="#itinerary" className="text-emerald-600 font-semibold hover:underline uppercase">
              VIEW ITINERARY
            </Link>
          </div>
        </div>

        {/* Day-wise Itinerary */}
        <div className="mb-4" id="itinerary">
          <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">DAY-WISE ITINERARY</h2>
          <div className="space-y-0">
            {pkg.detailedItinerary.map((day) => {
              const isOpen = expandedDays[day.day];
              return (
                <div key={day.day} className="bg-white border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => toggleDay(day.day)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{day.day.toUpperCase()}: {day.title}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 text-sm text-gray-700 space-y-1">
                      {day.details.map((detail, detailIdx) => (
                        <p key={detailIdx} className="flex gap-2">
                          <span className="text-emerald-600">•</span>
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

        {/* Tour Includes & Why Travel with Us */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">TOUR INCLUDES</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <Plane className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">FLIGHTS</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">SIGHTSEEING/TRANSPORT</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <Bed className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">HOTEL</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <Utensils className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">BREAKFAST</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">WHY TRAVEL WITH US</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {(pkg.policy.notes ?? [
                "Breakfast included in tour price",
                "English Speaking certified drivers",
                "Daily curated itineraries for a stress-free experience",
                "Seamless airport transfers for hassle-free travel"
              ]).slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4">
            <h2 className="text-xl font-bold text-emerald-900 uppercase mb-2">INCLUSIONS</h2>
            <ul className="space-y-1 text-sm text-emerald-900">
              {pkg.includes.slice(0, 6).map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4">
            <h2 className="text-xl font-bold text-amber-900 uppercase mb-2">EXCLUSIONS</h2>
            <ul className="space-y-1 text-sm text-amber-900">
              {pkg.excludes.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing Table */}
        {pkg.pricing.length > 0 && pkg.paxGroups.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">PRICING</h2>
            <div className="bg-white border border-gray-200 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="p-3 font-semibold">PACKAGE</th>
                    {pkg.paxGroups.map(group => (
                      <th key={group} className="p-3 font-semibold">
                        {group.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pkg.pricing.map((row, idx) => (
                    <tr key={row.tier} className={idx % 2 === 0 ? "bg-white" : "bg-emerald-50/30"}>
                      <td className="p-3 font-semibold text-gray-900">{row.tier.toUpperCase()}</td>
                      {row.prices.map((price, priceIdx) => (
                        <td key={priceIdx} className="p-3 text-gray-700">
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {pkg.airportTransfer.length > 0 && (
                    <tr className="bg-emerald-50">
                      <td className="p-3 font-semibold text-gray-900">AIRPORT TRANSFER</td>
                      {pkg.airportTransfer.map((value, idx) => (
                        <td key={idx} className="p-3 text-gray-700">
                          {value}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hotel Packages */}
        {pkg.hotelPackages.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">HOTEL PACKAGES</h2>
            
            {/* Hotel Tier Toggle Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {pkg.hotelPackages.map(tier => {
                const isSelected = selectedHotelTier === tier.tier;
                return (
                  <button
                    key={tier.tier}
                    type="button"
                    onClick={() => setSelectedHotelTier(tier.tier)}
                    className={`px-4 py-2 font-semibold uppercase transition-colors ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {tier.tier.replace("Package", "").trim()}
                  </button>
                );
              })}
            </div>

            {/* Display Selected Hotel Tier */}
            {selectedHotelTier && (
              <div className="bg-white border border-gray-200 overflow-hidden">
                <div className="bg-emerald-600 text-white px-4 py-2 text-lg font-semibold">
                  {selectedHotelTier.toUpperCase()}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 font-semibold">CITY</th>
                        <th className="p-3 font-semibold">ACCOMMODATION</th>
                        <th className="p-3 font-semibold">ROOM TYPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.hotelPackages
                        .find(tier => tier.tier === selectedHotelTier)
                        ?.hotels.map((hotel, idx) => (
                          <tr
                            key={`${selectedHotelTier}-${hotel.city}`}
                            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <td className="p-3 font-medium text-gray-900">{hotel.city.toUpperCase()}</td>
                            <td className="p-3 text-gray-700">{hotel.property}</td>
                            <td className="p-3 text-gray-700">{hotel.room}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Terms & Conditions - Consolidated */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">TERMS & CONDITIONS</h2>
          <div className="bg-white border border-gray-200">
            <button
              type="button"
              onClick={() => toggleTerms("all")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 uppercase">VIEW TERMS & CONDITIONS</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform ${expandedTerms.all ? "rotate-180" : ""}`}
              />
            </button>
            {expandedTerms.all && (
              <div className="px-4 pb-4 space-y-4 text-sm text-gray-700">
                {/* General Notes */}
                {pkg.policy.notes && pkg.policy.notes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase mb-2 flex items-center gap-2">
                      <Map className="w-4 h-4 text-emerald-600" />
                      GENERAL NOTES
                    </h3>
                    <ul className="space-y-1">
                      {pkg.policy.notes.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Children Policy */}
                {pkg.policy.childrenPolicy && pkg.policy.childrenPolicy.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      CHILDREN POLICY
                    </h3>
                    <ul className="space-y-1">
                      {pkg.policy.childrenPolicy.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Validity & Deposit */}
                {(pkg.policy.validity || (pkg.policy.deposit && pkg.policy.deposit.length > 0)) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase mb-2 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-emerald-600" />
                      VALIDITY & DEPOSIT
                    </h3>
                    {pkg.policy.validity && (
                      <p className="mb-2">{pkg.policy.validity}</p>
                    )}
                    {pkg.policy.deposit && pkg.policy.deposit.length > 0 && (
                      <ul className="space-y-1">
                        {pkg.policy.deposit.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-emerald-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Cancellation */}
                {pkg.policy.cancellation && pkg.policy.cancellation.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      CANCELLATION POLICY
                    </h3>
                    <ul className="space-y-1">
                      {pkg.policy.cancellation.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Terms */}
                {pkg.policy.terms && pkg.policy.terms.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      TERMS
                    </h3>
                    <ul className="space-y-1">
                      {pkg.policy.terms.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Payment Methods */}
                {pkg.policy.paymentMethods && pkg.policy.paymentMethods.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      PAYMENT METHODS
                    </h3>
                    <ul className="space-y-1">
                      {pkg.policy.paymentMethods.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;

