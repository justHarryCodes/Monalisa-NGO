"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Users, Clock, Bell, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getEvents, rsvpEvent } from "@/lib/firestore";
import EventCard from "@/components/EventCard";
import AnimatedButton from "@/components/AnimatedButton";
import type { Event } from "@/types";

const demoEvents: Event[] = [
  {
    id: "1",
    title: "Back-to-School Outreach — Kuje Community",
    description: "Join us as we distribute school supplies to 150 indigent children in Kuje. Volunteers needed for packaging and distribution.",
    date: new Date("2025-08-15T09:00:00"),
    location: "Kuje Community Hall, Abuja",
    imageUrl: "/IMG-20260215-WA0100.jpg",
    createdBy: "admin",
    attendees: [],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Monthly Food Distribution — Bwari",
    description: "Monthly welfare distribution to 100 registered indigent families in Bwari Area Council. Volunteers welcome.",
    date: new Date("2025-07-26T10:00:00"),
    location: "MLSI Field Office, Bwari, Abuja",
    imageUrl: "/IMG-20260215-WA0110.jpg",
    createdBy: "admin",
    attendees: ["user1", "user2"],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Community Health Day — Lugbe",
    description: "Free medical screenings, blood pressure checks, malaria tests, and medications for Lugbe community residents.",
    date: new Date("2025-08-02T08:30:00"),
    location: "Lugbe Community Center, Abuja",
    imageUrl: "/IMG-20260215-WA0120.jpg",
    createdBy: "admin",
    attendees: ["user3"],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Volunteer Orientation & Training",
    description: "New volunteer onboarding session covering our programs, code of conduct, and field procedures. Mandatory for new volunteers.",
    date: new Date("2025-07-20T14:00:00"),
    location: "MLSI Foundation Office, Abuja",
    imageUrl: "/IMG-20260215-WA0130.jpg",
    createdBy: "admin",
    attendees: [],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Annual Founders Day Celebration",
    description: "Join us to celebrate one year of impact! A day of testimonies, awards, community fellowship, and renewed commitment.",
    date: new Date("2025-03-10T11:00:00"),
    location: "Transcorp Hilton Area, Abuja",
    imageUrl: "/IMG-20260215-WA0140.jpg",
    createdBy: "admin",
    attendees: ["user1", "user2", "user3", "user4", "user5"],
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Ramadan Welfare Drive",
    description: "Special Ramadan food and gift distribution for 200 Muslim families. Help us show love across faiths.",
    date: new Date("2025-03-25T16:00:00"),
    location: "Central Mosque Area, Abuja",
    imageUrl: "/IMG-20260215-WA0115.jpg",
    createdBy: "admin",
    attendees: ["user1", "user2", "user3"],
    status: "completed",
    createdAt: new Date(),
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(demoEvents);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const { user, userProfile } = useAuth();

  useEffect(() => {
    getEvents()
      .then((e) => { if (e.length > 0) setEvents(e); })
      .catch(() => {});
  }, []);

  const handleRSVP = async (eventId: string) => {
    if (!user) { window.location.href = "/auth/login"; return; }
    await rsvpEvent(eventId, user.uid);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, attendees: [...(e.attendees || []), user.uid] } : e
      )
    );
  };

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);

  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0135.jpg" alt="Events" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#059669]/60 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Events & Activities
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join Us in Making{" "}
              <span className="text-yellow-400">Change Happen</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              From community outreach to volunteer training — every event is an opportunity to serve,
              connect, and create real impact. RSVP today and be part of the change.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NOTIFICATION BANNER */}
      {!user && (
        <div className="bg-blue-600 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <p className="text-sm font-medium">Sign in to RSVP for events and receive notifications when new events are created.</p>
            </div>
            <AnimatedButton href="/auth/login" variant="outline" size="sm">Sign In / Register</AnimatedButton>
          </div>
        </div>
      )}

      {/* FILTER TABS */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {(["all", "upcoming", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
                  filter === f
                    ? "bg-[#2563EB] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f === "all" ? "All Events" : f === "upcoming" ? "Upcoming" : "Past Events"}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-500">{filtered.length} events</span>
          </div>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No events found in this category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRSVP={handleRSVP}
                  userId={user?.uid}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* VOLUNTEER BANNER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0133.jpg" alt="Volunteer" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/90 to-[#2563EB]/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want to Lead or Plan an Event?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              If you are a volunteer or sponsor who wants to organize or fund a community event,
              reach out to us. We make it happen together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/contact" variant="outline" size="lg">
                Contact Us to Plan an Event
              </AnimatedButton>
              <AnimatedButton href="/get-involved" variant="ghost" size="lg">
                Become a Volunteer <ArrowRight className="w-4 h-4" />
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
