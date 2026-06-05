"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart, Shield, GraduationCap, Users, Leaf, Sparkles,
  CheckCircle, Calendar, MapPin, Target, Eye
} from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import SectionWithBackground from "@/components/SectionWithBackground";

const timeline = [
  { date: "March 10, 2024", title: "Foundation Established", desc: "Mona Lisa Smile Indigents Foundation officially registered and launched in Abuja, Nigeria." },
  { date: "April 2024", title: "First Back-to-School Drive", desc: "Our inaugural education outreach provided school supplies to 50 children in Kuje, Abuja." },
  { date: "June 2024", title: "Welfare Relief Program Launch", desc: "Launched our food and clothing distribution program reaching 100+ families across Abuja." },
  { date: "August 2024", title: "Community Care Initiative", desc: "Partnered with local health workers to conduct free medical outreach for 300 community members." },
  { date: "December 2024", title: "Year One Milestone", desc: "Touched over 300 lives in our first year — children, families, and communities across FCT." },
  { date: "March 2025", title: "First Anniversary Celebration", desc: "Celebrated our first year of impact with a community event, volunteer awards, and renewed commitment." },
  { date: "2025 – Present", title: "Growing Impact", desc: "Expanding our reach with more volunteers, campaigns, and partnerships across Nigeria." },
];

const values = [
  { icon: Heart, label: "Compassion", desc: "We serve every person with genuine care, empathy, and dignity — treating every beneficiary as we would our own family.", color: "#DC2626" },
  { icon: Shield, label: "Integrity", desc: "We are transparent in all operations, finances, and communications. Every naira donated is accounted for.", color: "#2563EB" },
  { icon: GraduationCap, label: "Education", desc: "We believe education is the most powerful tool to break the cycle of poverty for children and families.", color: "#7C3AED" },
  { icon: Sparkles, label: "Empowerment", desc: "We don't just give — we empower communities with skills, resources, and opportunities for lasting change.", color: "#F59E0B" },
  { icon: Users, label: "Community", desc: "We build strong community networks, recognizing that collective strength is greater than individual effort.", color: "#059669" },
  { icon: Leaf, label: "Sustainability", desc: "Our programs are designed for long-term impact, not temporary relief — creating lasting change.", color: "#0891B2" },
];

const team = [
  { name: "Founder / Director", role: "Foundation Leadership", image: "/IMG-20260215-WA0137.jpg" },
  { name: "Programs Coordinator", role: "Education & Relief", image: "/IMG-20260215-WA0138.jpg" },
  { name: "Community Liaison", role: "Outreach & Partnerships", image: "/IMG-20260215-WA0139.jpg" },
];

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0105.jpg" alt="About" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#2563EB]/70 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              About MLSI Foundation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Story of{" "}
              <span className="text-yellow-400">Hope</span> &amp; Impact
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              Born from a burning desire to see children thrive and communities flourish, the Mona Lisa Smile
              Indigents Foundation has been a beacon of hope in Abuja since March 2024.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-blue-100 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-5">
                The Story Behind the Foundation
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Every great movement begins with a moment of decision. For the Mona Lisa Smile Indigents Foundation,
                  that moment came from witnessing the heartbreaking reality of children in Abuja — bright, intelligent
                  young souls denied the opportunity to learn simply because of poverty.
                </p>
                <p>
                  Our founders saw families struggling to put food on the table while raising children who deserved
                  a chance at life. They saw communities underserved by the system, forgotten by those with resources.
                  That pain became purpose.
                </p>
                <p>
                  On March 10, 2024, the Mona Lisa Smile Indigents Foundation was officially established with a clear
                  mandate: to serve the most vulnerable with dignity, compassion, and effectiveness. We started small —
                  with just a handful of volunteers and big hearts — but our impact has grown steadily since.
                </p>
                <p>
                  Today, we run programs spanning education, welfare relief, and community health. Every school bag we
                  give is a future we&apos;re investing in. Every food package we distribute is a family&apos;s crisis
                  averted. Every community outreach is a step toward a more equitable Nigeria.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                  Founded March 10, 2024
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  Based in Abuja, Nigeria
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image src="/IMG-20260215-WA0115.jpg" alt="Story" fill className="object-cover" />
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/IMG-20260215-WA0123.jpg" alt="Impact" fill className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/IMG-20260215-WA0131.jpg" alt="Community" fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">Mission &amp; Vision</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To uplift indigent children and disadvantaged communities through accessible education support,
                welfare and relief services, and comprehensive community care programs that restore dignity
                and create lasting pathways out of poverty.
              </p>
              <ul className="space-y-2">
                {["Provide school supplies to indigent children", "Deliver food and clothing relief to families", "Conduct health and community outreach", "Build an empowered volunteer network"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-3xl p-8 shadow-lg text-white"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                A Nigeria where every child, regardless of economic background, has access to quality education,
                every family has their basic needs met, and every community thrives through collective support
                and sustainable development.
              </p>
              <ul className="space-y-2">
                {["Zero children out of school due to poverty", "Food security for all beneficiary families", "Healthy, empowered communities", "A model NGO inspiring others across Nigeria"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-blue-100">
                    <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-purple-100 text-[#7C3AED] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              The Principles That Guide Us
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${val.color}15` }}>
                  <val.icon className="w-6 h-6" style={{ color: val.color }} />
                </div>
                <h3 className="font-bold text-[#1F2937] text-lg mb-2">{val.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-blue-100 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              From Day One to Today
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex gap-6 items-start ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  <div className={`hidden sm:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    {i % 2 !== 0 && (
                      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                        <p className="text-[#2563EB] font-bold text-sm mb-1">{item.date}</p>
                        <h4 className="font-bold text-[#1F2937] mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    )}
                    {i % 2 === 0 && (
                      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                        <p className="text-[#2563EB] font-bold text-sm mb-1">{item.date}</p>
                        <h4 className="font-bold text-[#1F2937] mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 sm:hidden">
                    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                      <p className="text-[#2563EB] font-bold text-sm mb-1">{item.date}</p>
                      <h4 className="font-bold text-[#1F2937] mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER MESSAGE */}
      <SectionWithBackground image="/IMG-20260215-WA0140.jpg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Founder&apos;s Message
            </span>
            <div className="text-5xl font-bold text-white/30 mb-4">&ldquo;</div>
            <p className="text-xl text-blue-100 italic leading-relaxed mb-8 max-w-3xl mx-auto">
              We started this foundation not because we had everything, but because we could not stand by
              and do nothing. Every child we help, every family we feed, every community we serve —
              that is the reason we wake up every morning with renewed purpose. This is not just our work;
              it is our calling.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div>
                <p className="font-bold text-white text-lg">The Founder</p>
                <p className="text-blue-200 text-sm">Mona Lisa Smile Indigents Foundation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWithBackground>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              Be Part of Our Story
            </h2>
            <p className="text-gray-600 mb-8">
              Whether as a donor, volunteer, or partner — your involvement helps us write the next chapter
              of impact and transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/donate" variant="primary" size="lg">
                <Heart className="w-5 h-5" />
                Support Our Work
              </AnimatedButton>
              <AnimatedButton href="/get-involved" variant="secondary" size="lg">
                <Users className="w-5 h-5" />
                Get Involved
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
