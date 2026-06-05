"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Images, Video, Heart } from "lucide-react";
import GalleryGrid from "@/components/GalleryGrid";
import AnimatedButton from "@/components/AnimatedButton";

export default function GalleryPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0141.jpg" alt="Gallery" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#2563EB]/60 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Work,{" "}
              <span className="text-yellow-400">Captured in Moments</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              These photographs document the real stories of children, families, and communities
              transformed by your generosity. Every image is a testimony of what love in action looks like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="bg-[#2563EB] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-white text-center">
            {[
              { icon: Images, value: "50+", label: "Photos" },
              { icon: Video, value: "10+", label: "Videos" },
              { icon: Heart, value: "20+", label: "Events Documented" },
              { icon: Images, value: "4", label: "Categories" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <item.icon className="w-6 h-6 text-blue-200 mb-1" />
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-blue-200 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-[#1F2937] mb-1">Photo Gallery</h2>
            <p className="text-gray-600">Filter by category to explore specific areas of our work</p>
          </motion.div>
          <GalleryGrid />
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-blue-100 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Videos
            </span>
            <h2 className="text-3xl font-bold text-[#1F2937] mb-2">Video Stories</h2>
            <p className="text-gray-600">Watch the stories behind our work come to life</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Back-to-School 2024 Highlights", thumb: "/IMG-20260215-WA0102.jpg", duration: "3:42" },
              { title: "Welfare Distribution — Kuje Community", thumb: "/IMG-20260215-WA0112.jpg", duration: "5:18" },
              { title: "Community Health Day — Lugbe", thumb: "/IMG-20260215-WA0122.jpg", duration: "4:05" },
            ].map((vid, i) => (
              <motion.div
                key={vid.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer"
              >
                <div className="relative h-48">
                  <Image src={vid.thumb} alt={vid.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-[#2563EB] ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {vid.duration}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-semibold text-[#1F2937] text-sm">{vid.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            More videos available on our{" "}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
              Facebook Page
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F8FAFC] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-3">
              Want to See More? Be Part of the Story.
            </h2>
            <p className="text-gray-600 mb-6">
              Volunteer at our next event and experience the impact firsthand. Your presence matters as much as your donation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/get-involved" variant="primary" size="md">
                Volunteer at Our Events
              </AnimatedButton>
              <AnimatedButton href="/donate" variant="red" size="md">
                <Heart className="w-4 h-4" />
                Support Our Work
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
