// import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Car, 
  Home, 
  Utensils, 
  Camera, 
  Plane, 
  Calendar,
  Shield,
  Clock,
  CheckCircle} from 'lucide-react';
import { usePackages } from '../hooks/usePackages';

const ServicesPage = () => {
  const { packages, loading } = usePackages();
  const displayedPackages = packages.slice(0, 3);
  const services = [
    {
      icon: MapPin,
      title: "Tour Planning & Management",
      description: "Custom itineraries designed to showcase Vietnam's best destinations with local expertise.",
      features: ["Custom itinerary design", "Local guide coordination", "Route optimization", "Cultural immersion planning"],
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Users,
      title: "Group & Individual Tours",
      description: "Tailored experiences for groups of any size, from intimate couples to large corporate events.",
      features: ["Small group tours (2-8 people)", "Large group management", "Corporate incentives", "Family packages"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Car,
      title: "Transportation Services",
      description: "Comfortable and reliable transport solutions including luxury cars, buses, and motorbikes.",
      features: ["Luxury vehicle fleet", "Professional drivers", "Airport transfers", "Multi-city transport"],
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Home,
      title: "Accommodation Booking",
      description: "From luxury resorts to boutique hotels and homestays, we secure the perfect stays.",
      features: ["5-star luxury hotels", "Boutique accommodations", "Traditional homestays", "Eco-lodges"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Utensils,
      title: "Culinary Experiences",
      description: "Authentic Vietnamese food tours, cooking classes, and fine dining reservations.",
      features: ["Street food tours", "Cooking classes", "Wine & dine experiences", "Market visits"],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Camera,
      title: "Cultural Immersion",
      description: "Deep cultural experiences with local communities, traditional crafts, and festivals.",
      features: ["Village visits", "Traditional craft workshops", "Festival participation", "Local family meals"],
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Plane,
      title: "Flight Arrangements",
      description: "Domestic and international flight bookings with competitive rates and flexible options.",
      features: ["Domestic flights", "International connections", "Group bookings", "Flexible scheduling"],
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Corporate events, incentive trips, conferences, and special celebrations.",
      features: ["Corporate meetings", "Incentive programs", "Team building", "Special occasions"],
      color: "bg-pink-100 text-pink-600"
    }
  ];

const packageThumbnails: Record<string, string> = {
  "ha-noi-da-nang-phu-quoc-9d8n": "/hanoi-9D8N/halongbay.jpg",
  "da-nang-short-break-4d3n": "/hanoi-9D8N/danang.jpg",
  "phu-quoc-private-4d3n": "/hanoi-9D8N/thom-island.jpg",
  "ho-chi-minh-private-3d2n": "/hanoi-9D8N/temple.jpg",
};

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg"
            alt="Vietnam services"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Premium Services
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive destination management solutions for unforgettable Vietnamese experiences
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From planning to execution, we handle every aspect of your Vietnamese journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Popular Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready-made packages that showcase the best of Vietnam
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading packages…</div>
          ) : displayedPackages.length > 0 ? (
            <>
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
                            <Calendar className="w-3 h-3" />
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
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">No packages available</div>
          )}
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance throughout your journey</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Response</h3>
              <p className="text-gray-600">Fast response times and immediate confirmations</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
              <p className="text-gray-600">Deep local knowledge and cultural insights</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">Vetted partners and quality-controlled experiences</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ServicesPage;