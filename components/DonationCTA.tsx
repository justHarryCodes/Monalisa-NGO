"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Shield, Users } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

interface DonationCTAProps {
  image?: string;
  title?: string;
  subtitle?: string;
}

export default function DonationCTA({
  image = "/IMG-20260215-WA0100.jpg",
  title = "Your Donation Changes Lives",
  subtitle = "Every naira you give goes directly to supporting indigent children and families in need. Join thousands who are making a difference.",
}: DonationCTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="Donation" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/90 to-[#1F2937]/85" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">{title}</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <AnimatedButton href="/donate" variant="outline" size="lg">
                <Heart className="w-5 h-5" />
                Donate Now
              </AnimatedButton>
              <AnimatedButton href="/campaigns" variant="ghost" size="lg">
                View Campaigns
              </AnimatedButton>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                100% Goes to Humanitarian Work
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-yellow-400" />
                500+ Lives Touched
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-red-400" />
                Trusted Since 2024
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
