"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type ReactNode } from "react";

interface SectionWithBackgroundProps {
  image: string;
  children: ReactNode;
  overlayClass?: string;
  className?: string;
  minHeight?: string;
}

export default function SectionWithBackground({
  image,
  children,
  overlayClass = "bg-gradient-to-r from-[#1F2937]/90 to-[#2563EB]/80",
  className = "",
  minHeight = "py-24",
}: SectionWithBackgroundProps) {
  return (
    <section className={`relative overflow-hidden ${minHeight} ${className}`}>
      <div className="absolute inset-0">
        <Image src={image} alt="Background" fill className="object-cover" priority={false} />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
