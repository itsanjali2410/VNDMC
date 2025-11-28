import { 
  MapPin, 
  Users, 
  Car, 
  Home, 
  Utensils, 
  Camera, 
  Plane, 
  Calendar

} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: MapPin,
      title: "Tour Planning",
      description: "Custom itineraries with local expertise"
    },
    {
      icon: Users,
      title: "Group Tours",
      description: "Tailored for any group size"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Luxury vehicles & reliable transfers"
    },
    {
      icon: Home,
      title: "Accommodation",
      description: "Hotels, resorts & homestays"
    },
    {
      icon: Utensils,
      title: "Culinary Tours",
      description: "Food tours & cooking classes"
    },
    {
      icon: Camera,
      title: "Cultural Experiences",
      description: "Local communities & traditions"
    },
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Domestic & international flights"
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Corporate & special occasions"
    }
  ];



  return (
    <section id="services" className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Our Premium Services
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Comprehensive travel solutions that exceed expectations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{service.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}

      </div>
    </section>
  );
};

export default Services;