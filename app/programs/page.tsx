"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, HandHeart, Building2, CheckCircle, ArrowRight, Heart, Users } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import SectionWithBackground from "@/components/SectionWithBackground";

const programs = [
  {
    id: "back-to-school",
    title: "Back-to-School Project",
    subtitle: "Unlocking Futures Through Education",
    icon: GraduationCap,
    color: "#2563EB",
    bgColor: "#EFF6FF",
    description: "Every child has a right to education, yet thousands of children across Abuja are denied this right simply because their families cannot afford school supplies. The Mona Lisa Smile Back-to-School Project bridges this gap by providing indigent children with everything they need to succeed in school.",
    story: "We met 8-year-old Fatima at a community outreach. Her parents, daily laborers, could not afford the ₦15,000 needed for her school registration and supplies. With support from our donors, Fatima started school that September — she came in wearing a smile that lit up the entire room. That is the MLSI difference.",
    impact: ["School bags, textbooks, and writing materials", "School uniforms and shoes", "Registration support for affected families", "Teacher sensitization on indigent students", "Quarterly check-ins on enrolled students"],
    images: ["/IMG-20260215-WA0100.jpg", "/IMG-20260215-WA0103.jpg", "/IMG-20260215-WA0106.jpg"],
    beneficiaries: "200+ Children",
    stat: "200+",
    statLabel: "Children Enrolled",
  },
  {
    id: "welfare",
    title: "Welfare & Relief Services",
    subtitle: "Meeting Urgent Needs with Compassion",
    icon: HandHeart,
    color: "#DC2626",
    bgColor: "#FEF2F2",
    description: "Poverty does not wait for the right time. When families face hunger, loss, displacement, or crisis, immediate relief can mean the difference between survival and tragedy. Our Welfare & Relief Services program delivers urgent support to families in their darkest moments.",
    story: "The Ahmed family lost everything in a fire outbreak in Kuje. They arrived at our office with nothing but the clothes on their backs. Within 48 hours, our team had mobilized food packs, clothing, and emergency funds to help them rebuild. That is what we do — we show up when it matters most.",
    impact: ["Monthly food packages to 50+ families", "Clothing and household items distribution", "Emergency financial support for crisis situations", "Ramadan and festive season welfare drives", "Collaboration with community leaders for needs assessment"],
    images: ["/IMG-20260215-WA0110.jpg", "/IMG-20260215-WA0113.jpg", "/IMG-20260215-WA0116.jpg"],
    beneficiaries: "300+ Families",
    stat: "300+",
    statLabel: "Families Supported",
  },
  {
    id: "community",
    title: "Community Care Services",
    subtitle: "Building Healthier, Stronger Communities",
    icon: Building2,
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    description: "Strong communities are built on access to health, social welfare, and community support systems. Our Community Care Services program brings healthcare, social support, and community development directly to the doorsteps of underserved communities in and around Abuja.",
    story: "At our Lugbe Community Health Day, we screened 450 residents for malaria, blood pressure, and diabetes — many receiving a diagnosis and medication for the first time. One elderly woman, Mama Ngozi, had been suffering from undiagnosed hypertension for years. Our team got her on treatment. She calls us every week now.",
    impact: ["Free health screenings and medications", "Mental health awareness sessions", "Community sanitation campaigns", "Social welfare referrals to government agencies", "Community leadership capacity building"],
    images: ["/IMG-20260215-WA0120.jpg", "/IMG-20260215-WA0123.jpg", "/IMG-20260215-WA0126.jpg"],
    beneficiaries: "50+ Communities",
    stat: "1,000+",
    statLabel: "Residents Reached",
  },
];

export default function ProgramsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0109.jpg" alt="Programs" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#7C3AED]/70 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Our Programs
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Three Pillars of{" "}
              <span className="text-yellow-400">Transformative</span> Change
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              Our programs target the root causes of poverty and marginalization — education gaps, welfare deficits,
              and community underservice. Every program is designed for maximum impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS */}
      {programs.map((program, idx) => (
        <section
          key={program.id}
          id={program.id}
          className={`py-20 ${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={idx % 2 !== 0 ? "lg:order-2" : ""}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${program.color}15` }}>
                    <program.icon className="w-6 h-6" style={{ color: program.color }} />
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: program.bgColor, color: program.color }}>
                    Program {idx + 1} of 3
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-2">{program.title}</h2>
                <p className="font-semibold mb-4" style={{ color: program.color }}>{program.subtitle}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{program.description}</p>

                {/* Story */}
                <div className="bg-[#F8FAFC] border-l-4 rounded-r-xl p-5 mb-6" style={{ borderColor: program.color }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: program.color }}>Real Story</p>
                  <p className="text-gray-700 text-sm italic leading-relaxed">&ldquo;{program.story}&rdquo;</p>
                </div>

                {/* Impact Points */}
                <ul className="space-y-2.5 mb-6">
                  {program.impact.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: program.color }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <AnimatedButton href="/donate" variant="primary" size="md">
                    <Heart className="w-4 h-4" />
                    Support This Program
                  </AnimatedButton>
                  <AnimatedButton href="/get-involved" variant="secondary" size="md">
                    <Users className="w-4 h-4" />
                    Volunteer Here
                  </AnimatedButton>
                </div>
              </motion.div>

              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`${idx % 2 !== 0 ? "lg:order-1" : ""} space-y-4`}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image src={program.images[0]} alt={program.title} fill className="object-cover" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-2xl font-bold" style={{ color: program.color }}>{program.stat}</p>
                    <p className="text-xs text-gray-600">{program.statLabel}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                    <Image src={program.images[1]} alt={program.title} fill className="object-cover" />
                  </div>
                  <div className="relative h-36 rounded-xl overflow-hidden shadow-md">
                    <Image src={program.images[2]} alt={program.title} fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Banner */}
      <SectionWithBackground
        image="/IMG-20260215-WA0141.jpg"
        overlayClass="bg-gradient-to-r from-[#2563EB]/90 to-[#7C3AED]/85"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-white text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Every Program Needs Your Support</h2>
          <p className="text-blue-100 text-lg mb-8">
            From school bags to food parcels to health checkups — your donation funds real programs with real impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton href="/donate" variant="outline" size="lg">
              <Heart className="w-5 h-5" />
              Donate to Programs
            </AnimatedButton>
            <AnimatedButton href="/campaigns" variant="ghost" size="lg">
              View Active Campaigns <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>
      </SectionWithBackground>
    </main>
  );
}
