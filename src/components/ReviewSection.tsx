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
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          What Our Clients Say
        </h2>

        {/* Infinite scroll row */}
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 40, // slower = smoother
            repeat: Infinity,
          }}
        >
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[350px] flex-shrink-0 bg-white shadow-md rounded-xl p-5 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSection;
