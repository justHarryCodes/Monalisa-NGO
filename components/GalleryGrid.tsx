"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, Filter } from "lucide-react";

const categories = ["All", "Education", "Relief", "Community", "Events"];

const galleryImages = [
  { src: "/IMG-20260215-WA0100.jpg", caption: "Back-to-School Outreach", category: "Education" },
  { src: "/IMG-20260215-WA0101.jpg", caption: "Food Distribution Program", category: "Relief" },
  { src: "/IMG-20260215-WA0102.jpg", caption: "Community Health Day", category: "Community" },
  { src: "/IMG-20260215-WA0103.jpg", caption: "Charity Event 2024", category: "Events" },
  { src: "/IMG-20260215-WA0104.jpg", caption: "School Supplies Donation", category: "Education" },
  { src: "/IMG-20260215-WA0105.jpg", caption: "Welfare Support", category: "Relief" },
  { src: "/IMG-20260215-WA0106.jpg", caption: "Community Meeting", category: "Community" },
  { src: "/IMG-20260215-WA0107.jpg", caption: "Annual Foundation Day", category: "Events" },
  { src: "/IMG-20260215-WA0108.jpg", caption: "Children Education Drive", category: "Education" },
  { src: "/IMG-20260215-WA0109.jpg", caption: "Clothing Distribution", category: "Relief" },
  { src: "/IMG-20260215-WA0110.jpg", caption: "Community Support", category: "Community" },
  { src: "/IMG-20260215-WA0111.jpg", caption: "Volunteer Day", category: "Events" },
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-[#2563EB] text-white shadow-md"
                : "bg-white text-[#1F2937] border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
            }`}
          >
            {cat === "All" && <Filter className="w-3.5 h-3.5" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-200"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <p className="text-white text-center mt-3 text-sm">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
