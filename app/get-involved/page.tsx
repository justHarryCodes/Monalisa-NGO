"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Heart, Building2, Star, CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { registerVolunteer, registerMember } from "@/lib/firestore";
import AnimatedButton from "@/components/AnimatedButton";

type FormType = "volunteer" | "member" | "sponsor";

export default function GetInvolvedPage() {
  const [activeForm, setActiveForm] = useState<FormType>("volunteer");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", skills: "", availability: "", motivation: "",
    address: "", occupation: "", membershipType: "individual",
    companyName: "", sponsorType: "", budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (activeForm === "volunteer") {
        await registerVolunteer({
          userId: "",
          name: form.name,
          email: form.email,
          phone: form.phone,
          skills: form.skills.split(",").map((s) => s.trim()),
          availability: form.availability,
          motivation: form.motivation,
          status: "pending",
          createdAt: new Date(),
        });
      } else if (activeForm === "member") {
        await registerMember({
          userId: "",
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          occupation: form.occupation,
          membershipType: form.membershipType as "individual" | "corporate",
          status: "pending",
          createdAt: new Date(),
        });
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ways = [
    {
      id: "volunteer" as FormType,
      icon: Users,
      title: "Become a Volunteer",
      desc: "Give your time and skills to serve communities in need. Field work, administrative support, or digital contributions welcome.",
      color: "#2563EB",
      benefits: ["Participate in outreach events", "Build real-world skills", "Get volunteer certificates", "Receive event notifications"],
    },
    {
      id: "member" as FormType,
      icon: Heart,
      title: "Become a Member",
      desc: "Formally join the MLSI Foundation family as a registered member and be part of our governance and community.",
      color: "#DC2626",
      benefits: ["Official membership card", "Voting rights in meetings", "Member-only communications", "Priority event access"],
    },
    {
      id: "sponsor" as FormType,
      icon: Building2,
      title: "Become a Sponsor",
      desc: "Partner with us as a corporate or individual sponsor to fund our programs and amplify your social impact.",
      color: "#7C3AED",
      benefits: ["Brand visibility at events", "CSR reporting support", "Dedicated impact reports", "Tax-deductible recognition"],
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0134.jpg" alt="Get Involved" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#7C3AED]/60 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Get Involved
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Involvement{" "}
              <span className="text-yellow-400">Makes the Difference</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              Whether you volunteer your time, join as a member, or partner as a sponsor — every form of
              involvement moves us closer to a Nigeria where no child is left behind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WAY TO GET INVOLVED */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {ways.map((way) => (
              <motion.button
                key={way.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => { setActiveForm(way.id); setSuccess(false); }}
                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                  activeForm === way.id
                    ? "border-[#2563EB] bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${way.color}15` }}>
                  <way.icon className="w-6 h-6" style={{ color: way.color }} />
                </div>
                <h3 className="font-bold text-[#1F2937] text-lg mb-2">{way.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{way.desc}</p>
                <ul className="space-y-1.5">
                  {way.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: way.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>

          {/* FORM */}
          <div className="max-w-2xl mx-auto">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 bg-green-50 rounded-3xl border border-green-200"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Application Received!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in joining MLSI Foundation. Our team will review your application and
                  reach out within 2-3 business days.
                </p>
                <AnimatedButton onClick={() => { setSuccess(false); setForm({ ...form, name: "", email: "", phone: "" }); }} variant="primary" size="md">
                  Submit Another Application
                </AnimatedButton>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={activeForm}
                className="bg-[#F8FAFC] rounded-3xl p-8 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-[#1F2937] mb-1">
                  {activeForm === "volunteer" ? "Volunteer Registration" : activeForm === "member" ? "Membership Application" : "Sponsorship Inquiry"}
                </h3>
                <p className="text-gray-600 text-sm mb-6">Fill out the form below and we will be in touch soon.</p>

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
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+234..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                  </div>

                  {activeForm === "volunteer" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Skills & Expertise</label>
                        <input name="skills" value={form.skills} onChange={handleChange} placeholder="e.g., Teaching, Medical, Photography, IT (comma-separated)"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Availability</label>
                        <select name="availability" value={form.availability} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all">
                          <option value="">Select availability</option>
                          <option value="weekends">Weekends only</option>
                          <option value="weekdays">Weekdays only</option>
                          <option value="flexible">Flexible / As needed</option>
                          <option value="fulltime">Full-time volunteer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Why do you want to volunteer? *</label>
                        <textarea name="motivation" value={form.motivation} onChange={handleChange} required rows={4}
                          placeholder="Tell us about your passion for this cause..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all resize-none" />
                      </div>
                    </>
                  )}

                  {activeForm === "member" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Home Address</label>
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Your address in Abuja"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Occupation</label>
                        <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Your current occupation"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Membership Type</label>
                        <select name="membershipType" value={form.membershipType} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all">
                          <option value="individual">Individual Membership</option>
                          <option value="corporate">Corporate Membership</option>
                        </select>
                      </div>
                    </>
                  )}

                  {activeForm === "sponsor" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Organization / Company Name</label>
                        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company name (if applicable)"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Type of Sponsorship</label>
                        <select name="sponsorType" value={form.sponsorType} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all">
                          <option value="">Select sponsorship type</option>
                          <option value="program">Program Sponsorship</option>
                          <option value="event">Event Sponsorship</option>
                          <option value="annual">Annual Partnership</option>
                          <option value="inkind">In-Kind Donation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Estimated Contribution Budget</label>
                        <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g., ₦100,000 - ₦500,000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                    </>
                  )}

                  <AnimatedButton type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
                    {submitting ? "Submitting..." : activeForm === "sponsor" ? "Send Sponsorship Inquiry" : "Submit Application"}
                    <ArrowRight className="w-4 h-4" />
                  </AnimatedButton>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CTA */}
      <section id="sponsor" className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block bg-purple-100 text-[#7C3AED] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Corporate Partnerships
            </span>
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Partner With Purpose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Your company can make a significant social impact by partnering with MLSI Foundation.
              We offer customized partnership packages with visibility, reporting, and community recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+2347089931056" className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                <Phone className="w-4 h-4" />
                Call to Partner
              </a>
              <a href="mailto:mlsifoundation@gmail.com" className="inline-flex items-center gap-2 bg-white border-2 border-[#2563EB] text-[#2563EB] px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                <Mail className="w-4 h-4" />
                Email Partnership Proposal
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
