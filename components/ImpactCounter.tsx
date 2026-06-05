"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface CounterCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  delay?: number;
}

function CounterCard({ icon: Icon, value, label, suffix = "", prefix = "", color, delay = 0 }: CounterCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div
        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
      <div className="text-4xl font-bold mb-1" style={{ color }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-600 font-medium text-sm">{label}</p>
    </motion.div>
  );
}

import { Users, GraduationCap, HandHeart, Building2 } from "lucide-react";

const stats = [
  { icon: Users, value: 500, label: "Beneficiaries Reached", suffix: "+", color: "#2563EB", delay: 0 },
  { icon: GraduationCap, value: 200, label: "Children Back in School", suffix: "+", color: "#7C3AED", delay: 150 },
  { icon: HandHeart, value: 1000, label: "Families Supported", suffix: "+", color: "#DC2626", delay: 300 },
  { icon: Building2, value: 50, label: "Community Projects", suffix: "+", color: "#059669", delay: 450 },
];

export default function ImpactCounter() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-blue-100 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
            Changing Lives, One Step at a Time
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Since our founding in March 2024, we have touched hundreds of lives across Abuja and beyond.
            Every number represents a real person whose life has been transformed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <CounterCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
