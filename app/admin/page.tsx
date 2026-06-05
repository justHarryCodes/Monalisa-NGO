"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, Calendar, DollarSign, Heart, Plus, CheckCircle,
  AlertCircle, Trash2, Edit, Eye, BarChart3, ArrowUp, Bell
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import NotificationPanel from "@/components/NotificationPanel";
import {
  getEvents, createEvent, getDonations, getVolunteers
} from "@/lib/firestore";
import type { Event, Donation, Volunteer } from "@/types";

type AdminTab = "overview" | "events" | "donations" | "volunteers";

export default function AdminDashboard() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [events, setEvents] = useState<Event[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [newEvent, setNewEvent] = useState({
    title: "", description: "", date: "", location: "", imageUrl: "",
  });
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventSuccess, setEventSuccess] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login");
      else if (userProfile?.role !== "admin") router.push("/dashboard");
    }
  }, [user, userProfile, loading, router]);

  useEffect(() => {
    if (!user || userProfile?.role !== "admin") return;
    const load = async () => {
      const [evts, dons, vols] = await Promise.all([
        getEvents(), getDonations(), getVolunteers(),
      ]);
      setEvents(evts);
      setDonations(dons);
      setVolunteers(vols);
      setDataLoading(false);
    };
    load();
  }, [user, userProfile]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setCreatingEvent(true);
    try {
      await createEvent({
        title: newEvent.title,
        description: newEvent.description,
        date: new Date(newEvent.date),
        location: newEvent.location,
        imageUrl: newEvent.imageUrl || "/IMG-20260215-WA0100.jpg",
        createdBy: user.uid,
        attendees: [],
        status: "upcoming",
        createdAt: new Date(),
      });
      setEventSuccess(true);
      setNewEvent({ title: "", description: "", date: "", location: "", imageUrl: "" });
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);
    } catch (err) {
      console.error(err);
      alert("Failed to create event. Please try again.");
    } finally {
      setCreatingEvent(false);
    }
  };

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "events", label: "Events", icon: Calendar },
    { id: "donations", label: "Donations", icon: DollarSign },
    { id: "volunteers", label: "Volunteers", icon: Users },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">MLSI Foundation — Administrative Control Center</p>
          </div>
          <div className="flex items-center gap-3">
            {user?.uid && <NotificationPanel userId={user.uid} />}
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Donations", value: `₦${totalDonations.toLocaleString()}`, icon: DollarSign, color: "#059669", trend: "+12%" },
                { label: "Volunteers", value: volunteers.length, icon: Users, color: "#2563EB", trend: "+5" },
                { label: "Events Created", value: events.length, icon: Calendar, color: "#7C3AED", trend: "This month" },
                { label: "Donations Logged", value: donations.length, icon: Heart, color: "#DC2626", trend: "+8 this week" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />{stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* RECENT DONATIONS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#1F2937] mb-4">Recent Donations</h3>
              {donations.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">No donations logged yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["Donor", "Amount", "Bank", "Campaign", "Status", "Date"].map((h) => (
                          <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {donations.slice(0, 8).map((d) => (
                        <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-3 font-medium text-[#1F2937]">{d.donorName}</td>
                          <td className="py-3 px-3 text-green-600 font-bold">₦{d.amount?.toLocaleString()}</td>
                          <td className="py-3 px-3 capitalize">{d.bank}</td>
                          <td className="py-3 px-3 text-gray-600 max-w-[150px] truncate">{d.campaignName || "General"}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {d.verified ? "Verified" : "Pending"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-500 text-xs">
                            {d.createdAt instanceof Date ? d.createdAt.toLocaleDateString() : new Date((d.createdAt as unknown as { seconds: number })?.seconds * 1000).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* CREATE EVENT */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F2937]">Create New Event</h3>
                  <p className="text-xs text-gray-500">All volunteers will be notified automatically</p>
                </div>
              </div>

              {eventSuccess && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Event created and volunteers notified!
                </div>
              )}

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Event Title *</label>
                  <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required
                    placeholder="e.g., Back-to-School Outreach — Kuje"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Description *</label>
                  <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required rows={3}
                    placeholder="Describe the event..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Date & Time *</label>
                    <input type="datetime-local" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Location *</label>
                    <input value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required
                      placeholder="Venue, Abuja"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Event Image URL (optional)</label>
                  <input value={newEvent.imageUrl} onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
                    placeholder="Leave blank to use default image"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm" />
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
                  <Bell className="w-3.5 h-3.5" />
                  Creating this event will automatically notify all volunteers
                </div>
                <button type="submit" disabled={creatingEvent}
                  className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50">
                  {creatingEvent ? "Creating & Notifying..." : "Create Event & Notify Volunteers"}
                </button>
              </form>
            </div>

            {/* EVENTS LIST */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#1F2937] mb-5">All Events ({events.length})</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {events.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8 text-center">No events yet. Create your first event!</p>
                ) : events.map((event) => {
                  const date = event.date instanceof Date ? event.date : new Date((event.date as unknown as { seconds: number }).seconds * 1000);
                  return (
                    <div key={event.id} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                      <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                        <span className="text-[10px]">{date.toLocaleDateString("en", { month: "short" })}</span>
                        <span className="text-sm font-bold leading-none">{date.getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1F2937] line-clamp-1">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                        <p className="text-xs text-blue-600">{event.attendees?.length || 0} attending</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        event.status === "upcoming" ? "bg-green-100 text-green-700" :
                        event.status === "ongoing" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{event.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* DONATIONS TAB */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#1F2937]">All Donations ({donations.length})</h3>
              <div className="text-sm font-bold text-green-600">Total: ₦{totalDonations.toLocaleString()}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                    {["Donor Name", "Email", "Amount", "Bank", "Campaign", "Reference", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {donations.length === 0 ? (
                    <tr><td colSpan={8} className="py-10 text-center text-gray-500">No donations recorded yet.</td></tr>
                  ) : donations.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-3 font-medium">{d.donorName}</td>
                      <td className="py-3 px-3 text-gray-600 text-xs">{d.donorEmail}</td>
                      <td className="py-3 px-3 font-bold text-green-600">₦{d.amount?.toLocaleString()}</td>
                      <td className="py-3 px-3 capitalize">{d.bank}</td>
                      <td className="py-3 px-3 text-gray-600 max-w-[120px] truncate">{d.campaignName || "General"}</td>
                      <td className="py-3 px-3 text-gray-500 text-xs font-mono">{d.reference}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {d.verified ? "✓ Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500 text-xs whitespace-nowrap">
                        {d.createdAt instanceof Date ? d.createdAt.toLocaleDateString() : new Date((d.createdAt as unknown as { seconds: number })?.seconds * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VOLUNTEERS TAB */}
        {activeTab === "volunteers" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#1F2937] mb-5">Volunteer Applications ({volunteers.length})</h3>
            <div className="space-y-3">
              {volunteers.length === 0 ? (
                <p className="text-gray-500 text-sm py-8 text-center">No volunteer applications yet.</p>
              ) : volunteers.map((v) => (
                <div key={v.id} className="flex items-start justify-between p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {v.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937] text-sm">{v.name}</p>
                      <p className="text-xs text-gray-500">{v.email} • {v.phone}</p>
                      <p className="text-xs text-blue-600 mt-0.5">{v.availability} • {v.skills?.join(", ")}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize flex-shrink-0 ${
                    v.status === "approved" ? "bg-green-100 text-green-700" :
                    v.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{v.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
