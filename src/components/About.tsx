
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "99%", label: "Satisfaction Rate", icon: Heart }
  ];

  return (
    <section id="about" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About  Vietnam
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                As a premier destination management company,  Vietnam has been crafting 
                exceptional travel experiences for over 15 years. We are your trusted local partner, 
                dedicated to showcasing the authentic beauty and rich culture of Vietnam.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our team of passionate travel experts combines deep local knowledge with international 
                standards to deliver personalized, sustainable, and unforgettable journeys. From the 
                bustling streets of Ho Chi Minh City to the serene waters of Ha Long Bay, we ensure 
                every moment of your Vietnamese adventure is extraordinary.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-600 p-2 rounded-lg mt-1">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Authentic Experiences</h4>
                  <p className="text-gray-600">We connect you with the real Vietnam through local communities and traditions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-2 rounded-lg mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Personalized Service</h4>
                  <p className="text-gray-600">Every itinerary is tailored to your interests, preferences, and travel style.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg mt-1">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sustainable Tourism</h4>
                  <p className="text-gray-600">We promote responsible travel that benefits local communities and environment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/Gemini_Generated_Image_5iqe785iqe785iqe.png"
              alt="Vietnam landscape"
              className="w-full h-100 shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-emerald-600">4.9★</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;