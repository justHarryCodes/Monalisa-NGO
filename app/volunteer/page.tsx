"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, CheckCircle, Bell, Heart, ArrowRight, AlertTriangle, RefreshCw, X, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getEvents, rsvpEvent } from "@/lib/firestore";
import NotificationPanel from "@/components/NotificationPanel";
import AnimatedButton from "@/components/AnimatedButton";
import type { Event } from "@/types";

export default function VolunteerDashboard() {
  const { user, userProfile, loading, resendVerificationEmail, refreshUser } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login");
      else if (userProfile && userProfile.role !== "volunteer" && userProfile.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [user, userProfile, loading, router]);

  useEffect(() => {
    if (!user) return;
    getEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setEventsLoading(false));
  }, [user]);

  const handleResendVerification = async () => {
    setResending(true);
    try {
      await resendVerificationEmail();
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch {
      // silently ignore rate-limit errors
    } finally {
      setResending(false);
    }
  };

  const handleRefreshVerification = async () => {
    setRefreshing(true);
    await refreshUser();
    setRefreshing(false);
  };

  const handleRSVP = async (eventId: string) => {
    if (!user) return;
    await rsvpEvent(eventId, user.uid);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, attendees: [...(e.attendees || []), user.uid] } : e
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const myEvents = events.filter((e) => e.attendees?.includes(user?.uid || ""));
  const completedEvents = events.filter((e) => e.status === "completed" && e.attendees?.includes(user?.uid || ""));

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">
              Volunteer Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome, {userProfile?.displayName || user?.email?.split("@")[0]} • MLSI Foundation Volunteer
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user?.uid && <NotificationPanel userId={user.uid} />}
          </div>
        </div>

        {/* EMAIL VERIFICATION BANNER */}
        {user && !user.emailVerified && !bannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-amber-800 text-sm mb-1">
                  Please verify your email address
                </p>
                <p className="text-amber-700 text-sm leading-relaxed mb-3">
                  A verification link was sent to{" "}
                  <span className="font-medium">{user.email}</span>. Verifying your email
                  ensures you receive all volunteer event notifications and communications.
                </p>

                {resendSuccess && (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs mb-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Verification email resent! Check your inbox and spam folder.
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {resending ? "Sending..." : "Resend Verification Email"}
                  </button>
                  <button
                    onClick={handleRefreshVerification}
                    disabled={refreshing}
                    className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 text-xs font-medium px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                    {refreshing ? "Checking..." : "I've verified — Refresh"}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setBannerDismissed(true)}
                className="text-amber-500 hover:text-amber-700 p-1 rounded-lg hover:bg-amber-100 transition-colors flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Events RSVP'd", value: myEvents.length, icon: Calendar, color: "#2563EB" },
            { label: "Events Completed", value: completedEvents.length, icon: CheckCircle, color: "#059669" },
            { label: "Upcoming Events", value: upcomingEvents.length, icon: Bell, color: "#7C3AED" },
            { label: "Volunteer Status", value: "Active", icon: Heart, color: "#DC2626" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-gray-500 text-xs">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-[#1F2937] capitalize">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* UPCOMING EVENTS */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#1F2937] text-lg">Upcoming Events</h2>
                <span className="text-xs text-gray-500">{upcomingEvents.length} events</span>
              </div>

              {eventsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="text-center py-10">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No upcoming events. Check back soon!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event, i) => {
                    const date = event.date instanceof Date ? event.date : new Date((event.date as unknown as { seconds: number }).seconds * 1000);
                    const isAttending = event.attendees?.includes(user?.uid || "");
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-gray-100 rounded-xl p-4 hover:border-[#2563EB]/30 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                            <span className="text-[10px] font-medium">{date.toLocaleDateString("en", { month: "short" })}</span>
                            <span className="text-lg font-bold leading-none">{date.getDate()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-[#1F2937] text-sm line-clamp-1 mb-1">{event.title}</h4>
                            <p className="text-gray-600 text-xs line-clamp-2 mb-2">{event.description}</p>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {date.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {event.attendees?.length || 0} attending
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => !isAttending && handleRSVP(event.id)}
                            disabled={isAttending}
                            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                              isAttending
                                ? "bg-green-100 text-green-700 cursor-default"
                                : "bg-[#2563EB] text-white hover:bg-blue-700"
                            }`}
                          >
                            {isAttending ? "✓ RSVP'd" : "RSVP"}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PARTICIPATION HISTORY */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-[#1F2937] text-lg mb-4">Participation History</h2>
              {completedEvents.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  No completed events yet. RSVP for upcoming events to build your volunteer record!
                </p>
              ) : (
                <div className="space-y-3">
                  {completedEvents.map((event) => {
                    const date = event.date instanceof Date ? event.date : new Date((event.date as unknown as { seconds: number }).seconds * 1000);
                    return (
                      <div key={event.id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#1F2937]">{event.title}</p>
                          <p className="text-xs text-gray-500">{date.toLocaleDateString()} • {event.location}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Completed</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">
            {/* Profile */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {(userProfile?.displayName || user?.email || "V")[0].toUpperCase()}
              </div>
              <h3 className="font-bold text-[#1F2937]">{userProfile?.displayName || "Volunteer"}</h3>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <div className="mt-3">
                <span className="inline-block bg-blue-100 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">
                  MLSI Volunteer
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-[#2563EB]">{myEvents.length}</p>
                  <p className="text-xs text-gray-500">Events Joined</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{completedEvents.length}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </div>

            {/* Notification Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-[#2563EB]" />
                <h4 className="font-semibold text-[#1F2937] text-sm">Event Notifications</h4>
              </div>
              <p className="text-gray-600 text-xs mb-3">
                You automatically receive notifications whenever the admin creates a new event.
                Check your notification bell above!
              </p>
              <p className="text-[#2563EB] text-xs font-medium">Notifications are real-time via Firestore</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h4 className="font-bold text-[#1F2937] mb-3 text-sm">Quick Actions</h4>
              <div className="space-y-2">
                {[
                  { label: "View All Events", href: "/events" },
                  { label: "Donate to a Cause", href: "/donate" },
                  { label: "Our Programs", href: "/programs" },
                  { label: "Contact Support", href: "/contact" },
                ].map((a) => (
                  <a key={a.href} href={a.href} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] transition-colors group">
                    <span className="text-sm text-[#1F2937]">{a.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
