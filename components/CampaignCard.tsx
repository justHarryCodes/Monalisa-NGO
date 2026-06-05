"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Clock } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft?: number;
  category?: string;
  index?: number;
}

export default function CampaignCard({
  id,
  title,
  description,
  imageUrl,
  goalAmount,
  raisedAmount,
  daysLeft,
  category = "General",
  index = 0,
}: CampaignCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-[#DC2626] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
        {daysLeft !== undefined && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#1F2937] text-base mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{description}</p>

        <ProgressBar raised={raisedAmount} goal={goalAmount} className="mb-4" />

        <div className="flex gap-2">
          <Link
            href="/donate"
            className="flex-1 flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Heart className="w-4 h-4" />
            Donate Now
          </Link>
          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
