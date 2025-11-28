import React from "react";
import { motion } from "framer-motion";

interface Review {
  name: string;
  date: string;
  content: string;
}

const reviews: Review[] = [
  {
    name: "Nandita Mishra",
    date: "26/12/2024",
    content: `I booked the Vietnam Private Tour (family of 3) for 9 Nights 10 Days with VNDMC Vietnam Destination Management. Exceptional service by Ms. Linh (Lynn). Hassle-free, proactive, with English-speaking guides, and top-notch private vehicles. Highly recommended!`,
  },
  {
    name: "Nihar",
    date: "06/11/2024",
    content: `My recent trip to Vietnam with VNDMC Vietnam Destination Management was unforgettable! The team was professional, friendly, and ensured we enjoyed the beauty of Vietnam. Highly recommended!`,
  },
  {
    name: "Le Hang",
    date: "04/09/2024",
    content: `Exceptional experience from start to finish! Helpful staff, professional tour guides, and comfortable accommodations. Highly recommend VNDMC Vietnam Destination Management!`,
  },
  {
    name: "Shah",
    date: "23/08/2024",
    content: `Exceeded all my expectations! Well-planned itinerary, knowledgeable guide, and top-notch accommodations. A seamless and enjoyable experience.`,
  },
  {
    name: "Nguyen Minh Quan",
    date: "18/08/2024",
    content: `Unforgettable vacation with VNDMC Vietnam Destination Management. Perfectly planned itinerary, luxury accommodations, and amazing service. Truly seamless journey!`,
  },
];

const ReviewSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Trusted by travelers worldwide for exceptional Vietnam experiences
          </p>
        </div>

        {/* Grid layout for better UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white shadow-md hover:shadow-lg rounded-xl p-5 sm:p-6 border border-gray-200 transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{review.name}</h3>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {review.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
