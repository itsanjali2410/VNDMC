import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface Place {
  name: string;
  region: string;
  description: string;
  image: string;
  link: string;
}

const places: Place[] = [
  {
    name: "Hanoi",
    region: "Northern",
    description: "Capital city with rich history",
    image: "/hanoi-9D8N/temple.jpg",
    link: "/packages"
  },
  {
    name: "Ha Long Bay",
    region: "Northern",
    description: "UNESCO World Heritage site",
    image: "/hanoi-9D8N/halongbay.jpg",
    link: "/packages"
  },
  {
    name: "Da Nang",
    region: "Central",
    description: "Beaches and Golden Bridge",
    image: "/hanoi-9D8N/danang.jpg",
    link: "/packages"
  },
  {
    name: "Hoi An",
    region: "Central",
    description: "Ancient town with lanterns",
    image: "/hanoi-9D8N/goldenbridge.png",
    link: "/packages"
  },
  {
    name: "Ho Chi Minh City",
    region: "Southern",
    description: "Vibrant metropolis",
    image: "/hanoi-9D8N/chu-chi tunnel.jpg",
    link: "/packages"
  },
  {
    name: "Phu Quoc",
    region: "Southern",
    description: "Tropical island paradise",
    image: "/hanoi-9D8N/thom-island.jpg",
    link: "/packages"
  },
  {
    name: "Hue",
    region: "Central",
    description: "Imperial city and citadel",
    image: "/hanoi-9D8N/boat-ride.jpg",
    link: "/packages"
  },
  {
    name: "Sapa",
    region: "Northern",
    description: "Mountain terraces and ethnic culture",
    image: "/hanoi-9D8N/cablecar.jpg",
    link: "/packages"
  }
];

const VietnamPlaces: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Explore Vietnam
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover diverse regions and breathtaking destinations
          </p>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {places.map((place, index) => (
            <div
              key={place.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <span className="bg-emerald-600 text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {place.region}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">{place.name}</h3>
                  <p className="text-white/90 text-[10px] sm:text-xs">{place.description}</p>
                </div>
              </div>
              <Link
                to={place.link}
                className="absolute inset-0 z-10 flex items-end justify-end p-2 sm:p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-emerald-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-emerald-700 transition-colors">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-xs sm:text-sm"
          >
            View All Packages
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VietnamPlaces;

