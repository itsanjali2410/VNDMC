import React from 'react';
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
  CheckCircle,
  Star
} from 'lucide-react';

const ServicesPage = () => {
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

  const packages = [
    {
      name: "Essential Vietnam",
      duration: "7 Days",
      price: "From $899",
      image: "https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg",
      highlights: ["Ho Chi Minh City", "Mekong Delta", "Hoi An", "Hanoi", "Ha Long Bay"]
    },
    {
      name: "Vietnam Discovery",
      duration: "14 Days",
      price: "From $1,599",
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg",
      highlights: ["Complete North to South", "Cultural immersion", "Adventure activities", "Luxury accommodations"]
    },
    {
      name: "Luxury Vietnam",
      duration: "10 Days",
      price: "From $2,499",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
      highlights: ["5-star hotels", "Private transfers", "Exclusive experiences", "Personal guide"]
    }
  ];

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
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
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

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    <span className="text-emerald-600 font-semibold">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{pkg.duration}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-amber-500 mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance throughout your journey</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Response</h3>
              <p className="text-gray-600">Fast response times and immediate confirmations</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
              <p className="text-gray-600">Deep local knowledge and cultural insights</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
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