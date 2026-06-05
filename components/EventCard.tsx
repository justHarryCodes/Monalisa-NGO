"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  onRSVP?: (eventId: string) => void;
  userId?: string;
  index?: number;
}

export default function EventCard({ event, onRSVP, userId, index = 0 }: EventCardProps) {
  const eventDate = event.date instanceof Date ? event.date : new Date((event.date as unknown as { seconds: number }).seconds * 1000);
  const isAttending = userId ? event.attendees?.includes(userId) : false;
  const isPast = eventDate < new Date();

  const statusColors: Record<string, string> = {
    upcoming: "bg-green-100 text-green-700",
    ongoing: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={event.imageUrl || "/IMG-20260215-WA0100.jpg"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[event.status]}`}>
            {event.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-[#1F2937] text-base mb-3 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            {eventDate.toLocaleDateString("en-NG", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            {eventDate.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4 text-[#2563EB]" />
            {event.attendees?.length || 0} attending
          </div>
        </div>

        {onRSVP && !isPast && (
          <button
            onClick={() => onRSVP(event.id)}
            disabled={isAttending}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isAttending
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-[#2563EB] hover:bg-blue-700 text-white"
            }`}
          >
            {isAttending ? "✓ RSVP'd" : "RSVP for This Event"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
