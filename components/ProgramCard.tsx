"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  beneficiaries: string;
  href?: string;
  index?: number;
}

export default function ProgramCard({
  title,
  description,
  imageUrl,
  icon: Icon,
  beneficiaries,
  href = "/programs",
  index = 0,
}: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-[#1F2937] mb-2 group-hover:text-[#2563EB] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full">
            {beneficiaries}
          </span>
          <Link
            href={href}
            className="flex items-center gap-1 text-[#2563EB] text-sm font-semibold hover:gap-2 transition-all"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
