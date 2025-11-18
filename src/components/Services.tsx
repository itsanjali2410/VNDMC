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
  Clock
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: MapPin,
      title: "Tour Planning & Management",
      description: "Custom itineraries designed to showcase Vietnam's best destinations with local expertise.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Users,
      title: "Group & Individual Tours",
      description: "Tailored experiences for groups of any size, from intimate couples to large corporate events.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Car,
      title: "Transportation Services",
      description: "Comfortable and reliable transport solutions including luxury cars, buses, and motorbikes.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Home,
      title: "Accommodation Booking",
      description: "From luxury resorts to boutique hotels and homestays, we secure the perfect stays.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Utensils,
      title: "Culinary Experiences",
      description: "Authentic Vietnamese food tours, cooking classes, and fine dining reservations.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Camera,
      title: "Cultural Immersion",
      description: "Deep cultural experiences with local communities, traditional crafts, and festivals.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Plane,
      title: "Flight Arrangements",
      description: "Domestic and international flight bookings with competitive rates and flexible options.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Corporate events, incentive trips, conferences, and special celebrations.",
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your journey"
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description: "Quick response time and immediate booking confirmations"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As Vietnam's leading destination management company, we provide comprehensive travel solutions 
            that exceed expectations and create lasting memories.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;