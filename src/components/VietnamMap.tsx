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
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gradient-to-br from-emerald-50 to-blue-50">
      <svg
        ref={mapRef}
        viewBox="0 0 100 120"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
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
          fill="rgba(16, 185, 129, 0.15)"
          stroke="#10b981"
          strokeWidth="0.6"
          className="vietnam-outline"
        />
        
        {/* Additional detail lines */}
        <path
          d="M 50 48 Q 52 55 50 62"
          fill="none"
          stroke="#10b981"
          strokeWidth="0.3"
          opacity="0.5"
          className="detail-line"
        />
        <path
          d="M 45 92 Q 42 88 40 85"
          fill="none"
          stroke="#10b981"
          strokeWidth="0.3"
          opacity="0.5"
          className="detail-line"
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
              r="3"
              fill={destination.color}
              opacity="0.6"
            />
            
            {/* Pin icon */}
            <g className="pin-icon" transform="translate(0, -4)">
              <circle
                cx="0"
                cy="0"
                r="2.5"
                fill={destination.color}
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="0"
                cy="0"
                r="1"
                fill="white"
              />
            </g>

            {/* Destination label */}
            {hoveredDestination === destination.name && (
              <g className="label" transform="translate(0, -8)">
                <rect
                  x="-15"
                  y="-4"
                  width="30"
                  height="8"
                  rx="4"
                  fill="white"
                  opacity="0.95"
                  stroke={destination.color}
                  strokeWidth="0.3"
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fontSize="3"
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
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64 bg-white rounded-xl shadow-xl p-4 border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selectedDestination.name}</h3>
              <p className="text-sm text-gray-600">{selectedDestination.description}</p>
            </div>
            <button
              onClick={() => setSelectedDestination(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          <Link
            to="/packages"
            className="block w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold mt-3"
          >
            View Packages
          </Link>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-gray-900">Destinations</span>
        </div>
        <p className="text-[10px] text-gray-600">Click markers to explore</p>
      </div>
    </div>
  );
};

export default VietnamMap;
