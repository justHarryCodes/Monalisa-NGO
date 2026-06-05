"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Phone, Mail, MapPin, MessageCircle,
  Send, Clock, CheckCircle, ExternalLink
} from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";

const phones = [
  { number: "+2347089931056", label: "Primary" },
  { number: "+2348158037716", label: "Secondary" },
  { number: "+2349137874677", label: "Tertiary" },
  { number: "+2348157037716", label: "Alternative" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);
    setSubmitting(false);
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0142.jpg" alt="Contact" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#2563EB]/60 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
              We&apos;d Love to Hear{" "}
              <span className="text-yellow-400">From You</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Whether you want to donate, volunteer, partner with us, or just ask questions — we are always available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* LEFT: Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Contact Information</h2>

              {/* Location */}
              <div className="flex items-start gap-4 mb-6 p-5 bg-[#F8FAFC] rounded-2xl">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937] mb-1">Our Location</p>
                  <p className="text-gray-600 text-sm">Abuja, Federal Capital Territory, Nigeria</p>
                </div>
              </div>

              {/* Phones */}
              <div className="mb-6 p-5 bg-[#F8FAFC] rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-semibold text-[#1F2937]">Phone Numbers</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {phones.map((p) => (
                    <a
                      key={p.number}
                      href={`tel:${p.number}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-green-300 transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">{p.label}</p>
                        <p className="text-sm font-medium text-[#1F2937] group-hover:text-green-600 transition-colors">{p.number}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 mb-6 p-5 bg-[#F8FAFC] rounded-2xl">
                <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937] mb-1">Email Address</p>
                  <a href="mailto:mlsifoundation@gmail.com" className="text-[#2563EB] text-sm hover:underline">
                    mlsifoundation@gmail.com
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-4 mb-8 p-5 bg-[#F8FAFC] rounded-2xl">
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937] mb-2">Office Hours</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                    <p>Saturday: 10:00 AM – 2:00 PM</p>
                    <p>Sunday: Closed (Emergency calls accepted)</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <h3 className="font-bold text-[#1F2937] mb-4">Find Us on Social Media</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href="https://facebook.com/MonaLisaSmileIndigentsFoundation" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">f</div>
                  <div>
                    <p className="text-xs text-gray-500">Facebook</p>
                    <p className="text-sm font-medium text-[#1F2937]">MLSI Foundation</p>
                  </div>
                </a>
                <a href="https://instagram.com/MLSIFoundation" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-pink-50 border border-pink-100 rounded-xl hover:bg-pink-100 transition-colors">
                  <div className="w-5 h-5 bg-pink-600 rounded text-white flex items-center justify-center text-[10px] font-bold">IG</div>
                  <div>
                    <p className="text-xs text-gray-500">Instagram</p>
                    <p className="text-sm font-medium text-[#1F2937]">@MLSIFoundation</p>
                  </div>
                </a>
                <a href="https://t.me/MLSIFoundation" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-100 rounded-xl hover:bg-sky-100 transition-colors">
                  <Send className="w-5 h-5 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-500">Telegram</p>
                    <p className="text-sm font-medium text-[#1F2937]">MLSIFoundation</p>
                  </div>
                </a>
                <a href="https://wa.me/2347089931056" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p className="text-sm font-medium text-[#1F2937]">+2347089931056</p>
                  </div>
                </a>
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/2347089931056?text=Hello, I want to learn more about MLSI Foundation" target="_blank" rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition-colors shadow-lg">
                <MessageCircle className="w-5 h-5" />
                Chat with Us on WhatsApp
              </a>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Send Us a Message</h2>

              {success ? (
                <div className="text-center py-16 px-8 bg-green-50 rounded-3xl border border-green-200">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out! We&apos;ll get back to you within 24 hours.
                  </p>
                  <AnimatedButton onClick={() => setSuccess(false)} variant="primary" size="md">
                    Send Another Message
                  </AnimatedButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-1">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-1">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+234..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all">
                      <option value="">Select a subject</option>
                      <option value="donation">Donation Inquiry</option>
                      <option value="volunteer">Volunteer Inquiry</option>
                      <option value="partnership">Partnership / Sponsorship</option>
                      <option value="media">Media / Press</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                      placeholder="Tell us how we can help you or how you want to support us..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all resize-none" />
                  </div>

                  <AnimatedButton type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
                    {submitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </AnimatedButton>

                  <p className="text-center text-xs text-gray-500">
                    We respond to all messages within 24 hours. For urgent matters, please call or WhatsApp us directly.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
