"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  message: string;
  location: string;
  index?: number;
}

export default function TestimonialCard({ name, role, message, location, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col"
    >
      <Quote className="w-8 h-8 text-[#2563EB] mb-4 flex-shrink-0" />
      <p className="text-gray-700 italic leading-relaxed flex-1 mb-5">"{message}"</p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-[#1F2937] text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{role} &bull; {location}</p>
        </div>
      </div>
    </motion.div>
  );
}
