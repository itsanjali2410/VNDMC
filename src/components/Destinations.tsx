import React from 'react';
import { MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Correct import

const Destinations = () => {
  const destinations = [
    {
      name: "Ha Long Bay",
      location: "Northern Vietnam",
      duration: "2-3 Days",
      rating: 4.9,
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeghttps://chatgpt.com/s/m_68cdc24f8adc819194a81bc36555119a",
      description: "Cruis through limestone karsts and emerald waters in this UNESCO World Heritage site."
    },
    {
      name: "Ho Chi Minh City",
      location: "Southern Vietnam", 
      duration: "3-4 Days",
      rating: 4.8,
      image: "https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg",
      description: "Experience the vibrant energy of Vietnam's largest city with its rich history and culture."
    },
    {
      name: "Hoi An Ancient Town",
      location: "Central Vietnam",
      duration: "2-3 Days", 
      rating: 4.9,
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg",
      description: "Wander through lantern-lit streets and well-preserved architecture from the 15th century."
    },
    {
      name: "Sapa Rice Terraces",
      location: "Northern Vietnam",
      duration: "2-4 Days",
      rating: 4.7,
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg",
      description: "Trek through stunning rice terraces and experience ethnic minority cultures."
    },
    {
      name: "Mekong Delta",
      location: "Southern Vietnam",
      duration: "1-2 Days",
      rating: 4.6,
      image: "https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg",
      description: "Navigate the waterways and floating markets of Vietnam's rice bowl region."
    },
    {
      name: "Phong Nha Caves",
      location: "Central Vietnam", 
      duration: "2-3 Days",
      rating: 4.8,
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
      description: "Explore spectacular cave systems in this UNESCO-listed national park."
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From bustling cities to serene countryside, discover Vietnam's most captivating destinations 
            with our expertly crafted travel packages.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
                  <Star className="w-4 h-4 text-amber-500 mr-1" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{destination.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{destination.duration}</span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link 
              to="/destinations" 
              className="text-emerald-600 hover:underline font-semibold"
            >
              More destinations here.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
