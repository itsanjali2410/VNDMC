import React, { useState } from 'react';
import { MapPin, Clock, Star, Users, Camera, Mountain, Waves } from 'lucide-react';

const DestinationsPage = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  const destinations = [
    {
      name: "Ha Long Bay",
      region: "north",
      location: "Northern Vietnam",
      duration: "2-3 Days",
      rating: 4.9,
      price: "From $299",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Cruise through limestone karsts and emerald waters in this UNESCO World Heritage site.",
      highlights: ["Limestone caves", "Floating villages", "Sunset cruises", "Kayaking"],
      bestTime: "Oct - Apr",
      category: "nature"
    },
    {
      name: "Ho Chi Minh City",
      region: "south",
      location: "Southern Vietnam", 
      duration: "3-4 Days",
      rating: 4.8,
      price: "From $199",
      image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=800&q=80",
      description: "Experience the vibrant energy of Vietnam's largest city with its rich history and culture.",
      highlights: ["Cu Chi Tunnels", "War museums", "Street food", "Nightlife"],
      bestTime: "Dec - Apr",
      category: "city"
    },
    {
      name: "Hoi An Ancient Town",
      region: "central",
      location: "Central Vietnam",
      duration: "2-3 Days", 
      rating: 4.9,
      price: "From $249",
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg",
      description: "Wander through lantern-lit streets and well-preserved architecture from the 15th century.",
      highlights: ["Ancient architecture", "Lantern festival", "Tailor shops", "Japanese bridge"],
      bestTime: "Feb - Aug",
      category: "culture"
    },
    {
      name: "Sapa Rice Terraces",
      region: "north",
      location: "Northern Vietnam",
      duration: "2-4 Days",
      rating: 4.7,
      price: "From $349",
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg",
      description: "Trek through stunning rice terraces and experience ethnic minority cultures.",
      highlights: ["Rice terraces", "Hill tribes", "Trekking", "Mountain views"],
      bestTime: "Mar - May, Sep - Nov",
      category: "adventure"
    },
    {
      name: "Mekong Delta",
      region: "south",
      location: "Southern Vietnam",
      duration: "1-2 Days",
      rating: 4.6,
      price: "From $159",
      image: "https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg",
      description: "Navigate the waterways and floating markets of Vietnam's rice bowl region.",
      highlights: ["Floating markets", "River cruises", "Fruit orchards", "Local life"],
      bestTime: "Dec - Apr",
      category: "nature"
    },
    {
      name: "Phong Nha Caves",
      region: "central",
      location: "Central Vietnam", 
      duration: "2-3 Days",
      rating: 4.8,
      price: "From $279",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
      description: "Explore spectacular cave systems in this UNESCO-listed national park.",
      highlights: ["Paradise Cave", "Dark Cave", "Underground rivers", "Adventure tours"],
      bestTime: "Feb - Aug",
      category: "adventure"
    },
    {
      name: "Hanoi Old Quarter",
      region: "north",
      location: "Northern Vietnam",
      duration: "2-3 Days",
      rating: 4.7,
      price: "From $189",
      image: "https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg",
      description: "Discover Vietnam's capital with its blend of traditional and French colonial architecture.",
      highlights: ["Old Quarter", "Temple of Literature", "Water puppet show", "Street food"],
      bestTime: "Oct - Dec, Mar - Apr",
      category: "culture"
    },
    {
      name: "Phu Quoc Island",
      region: "south",
      location: "Southern Vietnam",
      duration: "3-5 Days",
      rating: 4.6,
      price: "From $399",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
      description: "Relax on pristine beaches and enjoy fresh seafood on Vietnam's largest island.",
      highlights: ["White sand beaches", "Snorkeling", "Night markets", "Cable car"],
      bestTime: "Nov - Mar",
      category: "beach"
    },
    {
      name: "Da Nang & Ba Na Hills",
      region: "central",
      location: "Central Vietnam",
      duration: "2-3 Days",
      rating: 4.5,
      price: "From $229",
      image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg",
      description: "Modern city with beautiful beaches and the famous Golden Bridge attraction.",
      highlights: ["Golden Bridge", "Dragon Bridge", "My Khe Beach", "Marble Mountains"],
      bestTime: "Feb - Aug",
      category: "city"
    }
  ];

  const regions = [
    { id: 'all', name: 'All Regions', icon: MapPin },
    { id: 'north', name: 'Northern Vietnam', icon: Mountain },
    { id: 'central', name: 'Central Vietnam', icon: Camera },
    { id: 'south', name: 'Southern Vietnam', icon: Waves }
  ];

  const filteredDestinations = activeRegion === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.region === activeRegion);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-900 to-teal-700">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg"
            alt="Vietnam destinations"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Vietnam
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            From bustling cities to serene countryside, explore Vietnam's most captivating destinations
          </p>
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeRegion === region.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <region.icon className="w-5 h-5 mr-2" />
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
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
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{destination.duration}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">Best: {destination.bestTime}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, highlightIndex) => (
                        <span
                          key={highlightIndex}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Travel Tips for Vietnam</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential information to make your Vietnamese adventure smooth and memorable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Time to Visit</h3>
              <p className="text-gray-600">October to April offers the most pleasant weather across the country.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visa Requirements</h3>
              <p className="text-gray-600">Most visitors need a visa. We can assist with visa arrangements.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Getting Around</h3>
              <p className="text-gray-600">Domestic flights, trains, and buses connect major destinations efficiently.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Etiquette</h3>
              <p className="text-gray-600">Respect local customs, dress modestly at temples, and remove shoes when entering homes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore Vietnam?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Let us create a personalized itinerary that includes your dream destinations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
              Plan My Trip
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Contact Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;