import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  name: string;
  date: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Nandita Mishra",
    date: "26/12/2024",
    content: "I booked the Vietnam Private Tour (family of 3) for 9 Nights 10 Days with VNDMC Vietnam Destination Management. Exceptional service by Ms. Linh (Lynn). Hassle-free, proactive, with English-speaking guides, and top-notch private vehicles. Highly recommended!",
    rating: 5
  },
  {
    name: "Nihar",
    date: "06/11/2024",
    content: "My recent trip to Vietnam with VNDMC Vietnam Destination Management was unforgettable! The team was professional, friendly, and ensured we enjoyed the beauty of Vietnam. Highly recommended!",
    rating: 5
  },
  {
    name: "Le Hang",
    date: "04/09/2024",
    content: "Exceptional experience from start to finish! Helpful staff, professional tour guides, and comfortable accommodations. Highly recommend VNDMC Vietnam Destination Management!",
    rating: 5
  },
  {
    name: "Shah",
    date: "23/08/2024",
    content: "Exceeded all my expectations! Well-planned itinerary, knowledgeable guide, and top-notch accommodations. A seamless and enjoyable experience.",
    rating: 5
  },
  {
    name: "Nguyen Minh Quan",
    date: "18/08/2024",
    content: "Unforgettable vacation with VNDMC Vietnam Destination Management. Perfectly planned itinerary, luxury accommodations, and amazing service. Truly seamless journey!",
    rating: 5
  }
];

const ReviewSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const cardWidth = scrollContainerRef.current.offsetWidth;
    const scrollPosition = index * cardWidth;
    
    gsap.to(scrollContainerRef.current, {
      scrollLeft: scrollPosition,
      duration: 0.6,
      ease: "power2.out"
    });
    
    setCurrentIndex(index);
  };

  const nextReview = () => {
    const nextIndex = (currentIndex + 1) % reviews.length;
    scrollToIndex(nextIndex);
  };

  const prevReview = () => {
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    
    const handleScroll = () => {
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Trusted by travelers worldwide for exceptional Vietnam experiences
          </p>
        </div>

        {/* Scrolling testimonials carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevReview}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all hover:scale-110"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={nextReview}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all hover:scale-110"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrolling container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 sm:gap-6 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] snap-start"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden h-full">
                  {/* Star rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" 
                      />
                    ))}
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                      {review.rating}.0
                    </span>
                  </div>
                  
                  {/* Review content */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-5 sm:mb-6">
                    "{review.content}"
                  </p>
                  
                  {/* Reviewer info */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                      {review.name}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-emerald-600 w-8 h-2' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;
