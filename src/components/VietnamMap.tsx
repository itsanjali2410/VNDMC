import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface Destination {
  name: string;
  x: number; // SVG coordinates
  y: number;
  description: string;
  color: string;
}

const destinations: Destination[] = [
  {
    name: "Hanoi",
    x: 45,
    y: 25,
    description: "Capital city",
    color: "#10b981"
  },
  {
    name: "Da Nang",
    x: 48,
    y: 60,
    description: "Beaches & Golden Bridge",
    color: "#059669"
  },
  {
    name: "Hoi An",
    x: 49,
    y: 65,
    description: "Ancient town",
    color: "#047857"
  },
  {
    name: "Ho Chi Minh",
    x: 50,
    y: 90,
    description: "Vibrant city",
    color: "#065f46"
  },
  {
    name: "Ha Long Bay",
    x: 52,
    y: 20,
    description: "Natural wonder",
    color: "#064e3b"
  },
  {
    name: "Phu Quoc",
    x: 35,
    y: 95,
    description: "Island paradise",
    color: "#022c22"
  }
];

const VietnamMap: React.FC = () => {
  const mapRef = useRef<SVGSVGElement>(null);
  const markersRef = useRef<(SVGGElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const ctx = gsap.context(() => {
      // Animate Vietnam outline path
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out"
        });

        // Animate fill
        gsap.fromTo(
          pathRef.current,
          { fillOpacity: 0 },
          { fillOpacity: 0.15, duration: 1.5, delay: 1.5, ease: "power2.out" }
        );
      }

      // Animate detail lines
      const detailLines = mapRef.current?.querySelectorAll('.detail-line');
      detailLines?.forEach((line, index) => {
        const lineElement = line as SVGPathElement;
        const lineLength = lineElement.getTotalLength();
        gsap.set(lineElement, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
          opacity: 0
        });
        gsap.to(lineElement, {
          strokeDashoffset: 0,
          opacity: 0.5,
          duration: 1,
          delay: 2 + index * 0.2,
          ease: "power2.out"
        });
      });

      // Animate markers with stagger
      markersRef.current.forEach((marker, index) => {
        if (!marker) return;

        const pulse = marker.querySelector('.pulse-ring');
        const pin = marker.querySelector('.pin-icon');

        // Initial state
        gsap.set(marker, { scale: 0, opacity: 0 });
        gsap.set(pulse, { scale: 0, opacity: 0.8 });

        // Entrance animation
        gsap.to(marker, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 1.5 + index * 0.15,
          ease: "back.out(1.7)"
        });

        // Continuous pulse animation
        gsap.to(pulse, {
          scale: 2.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          delay: 2 + index * 0.15,
          ease: "power2.out"
        });

        // Pin bounce animation
        gsap.to(pin, {
          y: -8,
          duration: 0.3,
          delay: 2.2 + index * 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      });
    }, mapRef);

    return () => ctx.revert();
  }, []);

  const handleMarkerClick = (destination: Destination) => {
    setSelectedDestination(destination);
    
    // Animate marker on click
    const markerIndex = destinations.findIndex(d => d.name === destination.name);
    const marker = markersRef.current[markerIndex];
    if (marker) {
      gsap.to(marker, {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleMarkerHover = (destinationName: string, isEntering: boolean) => {
    setHoveredDestination(isEntering ? destinationName : null);
    
    const markerIndex = destinations.findIndex(d => d.name === destinationName);
    const marker = markersRef.current[markerIndex];
    if (marker) {
      gsap.to(marker, {
        scale: isEntering ? 1.2 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50">
      <svg
        ref={mapRef}
        viewBox="0 0 100 120"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background pattern */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="120" fill="url(#grid)" />
        
        {/* Vietnam outline - Stylized S-shape */}
        <path
          ref={pathRef}
          d="M 42 8 
             Q 48 6 52 10
             L 55 15
             Q 58 20 56 25
             L 54 35
             Q 52 42 50 48
             L 48 58
             Q 46 65 48 72
             L 50 82
             Q 48 88 45 92
             L 42 96
             Q 38 100 35 98
             L 32 95
             Q 28 90 30 85
             L 32 75
             Q 30 68 32 62
             L 34 52
             Q 36 45 38 38
             L 40 28
             Q 38 22 40 18
             L 42 12
             Q 40 8 42 8 Z"
          fill="rgba(16, 185, 129, 0.2)"
          stroke="#10b981"
          strokeWidth="0.8"
          className="vietnam-outline"
        />

        {/* Destinations markers */}
        {destinations.map((destination, index) => (
          <g
            key={destination.name}
            ref={(el) => (markersRef.current[index] = el)}
            className="marker-group cursor-pointer"
            onClick={() => handleMarkerClick(destination)}
            onMouseEnter={() => handleMarkerHover(destination.name, true)}
            onMouseLeave={() => handleMarkerHover(destination.name, false)}
            transform={`translate(${destination.x}, ${destination.y})`}
          >
            {/* Pulsing ring */}
            <circle
              className="pulse-ring"
              cx="0"
              cy="0"
              r="4"
              fill={destination.color}
              opacity="0.4"
            />
            
            {/* Pin icon with better design */}
            <g className="pin-icon" transform="translate(0, -5)">
              <circle
                cx="0"
                cy="0"
                r="3.5"
                fill={destination.color}
                stroke="white"
                strokeWidth="0.8"
                className="drop-shadow-lg"
              />
              <circle
                cx="0"
                cy="0"
                r="1.5"
                fill="white"
              />
              <circle
                cx="0"
                cy="0"
                r="0.8"
                fill={destination.color}
              />
            </g>

            {/* Destination label */}
            {hoveredDestination === destination.name && (
              <g className="label" transform="translate(0, -12)">
                <rect
                  x="-18"
                  y="-5"
                  width="36"
                  height="10"
                  rx="5"
                  fill="white"
                  opacity="0.98"
                  stroke={destination.color}
                  strokeWidth="0.5"
                  className="shadow-lg"
                />
                <text
                  x="0"
                  y="2.5"
                  textAnchor="middle"
                  fontSize="3.5"
                  fill={destination.color}
                  fontWeight="bold"
                  className="font-semibold"
                >
                  {destination.name}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Connection lines (animated) */}
        {destinations.map((dest, index) => {
          if (index === 0) return null;
          const prevDest = destinations[index - 1];
          return (
            <line
              key={`line-${index}`}
              x1={prevDest.x}
              y1={prevDest.y}
              x2={dest.x}
              y2={dest.y}
              stroke="#10b981"
              strokeWidth="0.3"
              strokeDasharray="1,1"
              opacity="0.3"
              className="connection-line"
            />
          );
        })}
      </svg>

      {/* Destination info card */}
      {selectedDestination && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:w-64 bg-white rounded-xl shadow-xl p-3 sm:p-4 border border-gray-200 animate-in fade-in slide-in-from-bottom-4 z-20">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900">{selectedDestination.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{selectedDestination.description}</p>
            </div>
            <button
              onClick={() => setSelectedDestination(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-lg sm:text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <Link
            to="/packages"
            className="block w-full text-center px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm font-semibold mt-2 sm:mt-3"
          >
            View Packages
          </Link>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          <span className="text-[10px] sm:text-xs font-semibold text-gray-900">Destinations</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-gray-600">Click to explore</p>
      </div>
    </div>
  );
};

export default VietnamMap;
