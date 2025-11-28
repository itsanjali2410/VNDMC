
import { Users, Award, Globe, Heart } from 'lucide-react';
import VietnamMap from './VietnamMap';
const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "99%", label: "Satisfaction Rate", icon: Heart }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                About  Vietnam
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                A premier destination management company crafting exceptional travel experiences for over 15 years. 
                Your trusted local partner showcasing the authentic beauty and rich culture of Vietnam.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Our passionate travel experts combine deep local knowledge with international standards to deliver 
                personalized, sustainable, and unforgettable journeys.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-lg mt-1 flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Authentic Experiences</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Connect with real Vietnam through local communities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-lg mt-1 flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Personalized Service</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Tailored itineraries for your interests and style.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-lg mt-1 flex-shrink-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Sustainable Tourism</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Responsible travel benefiting local communities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <VietnamMap />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg z-10">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">4.9★</div>
              <div className="text-xs sm:text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg">
              <div className="bg-emerald-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;