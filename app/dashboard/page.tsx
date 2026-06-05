"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  User, Calendar, Bell, Heart, Settings, LogOut, ArrowRight,
  CheckCircle, Clock, MapPin
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import NotificationPanel from "@/components/NotificationPanel";
import AnimatedButton from "@/components/AnimatedButton";
import { getEvents } from "@/lib/firestore";
import type { Event } from "@/types";

export default function DashboardPage() {
  const { user, userProfile, logout, loading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    getEvents().then(setEvents).catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 3);
  const myEvents = events.filter((e) => e.attendees?.includes(user.uid));

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">
              Welcome back, {userProfile?.displayName || user.email?.split("@")[0]} 👋
            </h1>
            <p className="text-gray-600 mt-1 capitalize">
              {userProfile?.role || "Member"} Dashboard • MLSI Foundation
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user?.uid && <NotificationPanel userId={user.uid} />}
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Events RSVP'd", value: myEvents.length, icon: Calendar, color: "#2563EB" },
            { label: "My Role", value: userProfile?.role || "member", icon: User, color: "#7C3AED" },
            { label: "Status", value: "Active", icon: CheckCircle, color: "#059669" },
            { label: "Member Since", value: new Date(userProfile?.createdAt as Date || Date.now()).getFullYear().toString(), icon: Heart, color: "#DC2626" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-gray-500 text-xs font-medium">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-[#1F2937] capitalize">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* UPCOMING EVENTS */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#1F2937] text-lg">Upcoming Events</h2>
                <AnimatedButton href="/events" variant="primary" size="sm">
                  View All <ArrowRight className="w-3 h-3" />
                </AnimatedButton>
              </div>
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-10">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No upcoming events. Check back soon!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const date = event.date instanceof Date ? event.date : new Date((event.date as unknown as { seconds: number }).seconds * 1000);
                    return (
                      <div key={event.id} className="flex gap-4 items-start p-4 bg-[#F8FAFC] rounded-xl">
                        <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                          <span className="text-xs font-medium">{date.toLocaleDateString("en", { month: "short" })}</span>
                          <span className="text-lg font-bold leading-none">{date.getDate()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#1F2937] text-sm line-clamp-1">{event.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {date.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${event.attendees?.includes(user.uid) ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                          {event.attendees?.includes(user.uid) ? "RSVP'd" : "Open"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MY RSVP'D EVENTS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
              <h2 className="font-bold text-[#1F2937] text-lg mb-5">My Event History</h2>
              {myEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">You haven&apos;t RSVP&apos;d for any events yet.</p>
                  <AnimatedButton href="/events" variant="primary" size="sm" className="mt-3">
                    Browse Events
                  </AnimatedButton>
                </div>
              ) : (
                <div className="space-y-3">
                  {myEvents.map((event) => {
                    const date = event.date instanceof Date ? event.date : new Date((event.date as unknown as { seconds: number }).seconds * 1000);
                    return (
                      <div key={event.id} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1F2937]">{event.title}</p>
                          <p className="text-xs text-gray-500">{date.toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                          event.status === "completed" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"
                        }`}>{event.status}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-5">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {(userProfile?.displayName || user.email || "U")[0].toUpperCase()}
              </div>
              <h3 className="font-bold text-[#1F2937] text-lg">{userProfile?.displayName || "User"}</h3>
              <p className="text-gray-500 text-sm mb-1">{user.email}</p>
              <span className="inline-block bg-blue-100 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {userProfile?.role || "Member"}
              </span>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Member Status</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#1F2937] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Donate to a Campaign", href: "/donate", color: "#DC2626" },
                  { label: "Browse Events", href: "/events", color: "#2563EB" },
                  { label: "View Programs", href: "/programs", color: "#7C3AED" },
                  { label: "Contact Us", href: "/contact", color: "#059669" },
                ].map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <span className="text-sm font-medium text-[#1F2937]">{action.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Volunteer Upgrade CTA */}
            {userProfile?.role === "member" && (
              <div className="bg-gradient-to-br from-[#7C3AED] to-[#2563EB] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Become a Volunteer</h3>
                <p className="text-purple-100 text-sm mb-4">
                  Take your involvement to the next level. Volunteer and make real impact at our events.
                </p>
                <AnimatedButton href="/get-involved" variant="outline" size="sm">
                  Apply to Volunteer
                </AnimatedButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
