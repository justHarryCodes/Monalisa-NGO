"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart, GraduationCap, HandHeart, Building2, ArrowRight,
  Users, Star, ChevronRight, Shield
} from "lucide-react";
import ImpactCounter from "@/components/ImpactCounter";
import ProgramCard from "@/components/ProgramCard";
import CampaignCard from "@/components/CampaignCard";
import TestimonialCard from "@/components/TestimonialCard";
import DonationCTA from "@/components/DonationCTA";
import AnimatedButton from "@/components/AnimatedButton";

const programs = [
  {
    title: "Back-to-School Project",
    description: "We believe every child deserves an education. Our Back-to-School project provides indigent children with school bags, books, uniforms, and stationery — removing financial barriers so no child is left behind.",
    imageUrl: "/IMG-20260215-WA0100.jpg",
    icon: GraduationCap,
    beneficiaries: "200+ Children Supported",
  },
  {
    title: "Welfare & Relief Services",
    description: "When families face hunger, hardship, or emergencies, we are there. Our welfare program delivers food packages, clothing, and emergency relief to the most vulnerable families in our communities.",
    imageUrl: "/IMG-20260215-WA0110.jpg",
    icon: HandHeart,
    beneficiaries: "300+ Families Helped",
  },
  {
    title: "Community Care Services",
    description: "Through health outreach, community support programs, and social welfare initiatives, we build stronger, healthier communities where everyone has access to basic care and support systems.",
    imageUrl: "/IMG-20260215-WA0120.jpg",
    icon: Building2,
    beneficiaries: "50+ Communities Reached",
  },
];

const campaigns = [
  {
    id: "1",
    title: "Back to School Drive 2025",
    description: "Help us put 500 children back in school this academic year with books, bags, and uniforms.",
    imageUrl: "/IMG-20260215-WA0101.jpg",
    goalAmount: 5000000,
    raisedAmount: 2750000,
    daysLeft: 45,
    category: "Education",
  },
  {
    id: "2",
    title: "Feed a Family Initiative",
    description: "Join us in providing nutritious food packages to 200 indigent families this month.",
    imageUrl: "/IMG-20260215-WA0111.jpg",
    goalAmount: 2000000,
    raisedAmount: 1200000,
    daysLeft: 20,
    category: "Relief",
  },
  {
    id: "3",
    title: "Community Health Outreach",
    description: "Fund free medical checkups, medications, and health education for 1,000 community members.",
    imageUrl: "/IMG-20260215-WA0121.jpg",
    goalAmount: 3500000,
    raisedAmount: 980000,
    daysLeft: 60,
    category: "Community",
  },
];

const testimonials = [
  {
    name: "Amina Bello",
    role: "Parent of Beneficiary",
    message: "My daughter could not go to school because we couldn't afford supplies. Mona Lisa Smile Indigents Foundation provided everything she needed. Today she is back in class and thriving. I am forever grateful.",
    location: "Abuja, FCT",
  },
  {
    name: "Emmanuel Okafor",
    role: "Community Leader",
    message: "When flooding hit our community, MLSI Foundation was the first on ground with food and clothing. They don't just talk — they act. They have become a pillar in our community.",
    location: "Kuje, Abuja",
  },
  {
    name: "Grace Adeyemi",
    role: "Volunteer",
    message: "I joined as a volunteer two months ago and it has been the most fulfilling experience of my life. The team is passionate, organized, and genuinely cares about the people they serve.",
    location: "Abuja, FCT",
  },
];

const values = [
  { icon: Heart, label: "Compassion", desc: "We serve with genuine care and empathy", color: "#DC2626" },
  { icon: Shield, label: "Integrity", desc: "Transparent in all we do", color: "#2563EB" },
  { icon: GraduationCap, label: "Education", desc: "Knowledge as a path out of poverty", color: "#7C3AED" },
  { icon: Users, label: "Community", desc: "Stronger together", color: "#059669" },
];

export default function HomePage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/IMG-20260215-WA0104.jpg"
            alt="MLSI Foundation Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/90 via-[#2563EB]/75 to-[#1F2937]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              Founded March 10, 2024 &bull; Abuja, Nigeria
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Changing Lives,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                One Child
              </span>{" "}
              at a Time
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
            >
              The Mona Lisa Smile Indigents Foundation is dedicated to empowering indigent children and
              disadvantaged communities through education, welfare relief, and community care programs
              across Abuja and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <AnimatedButton href="/donate" variant="red" size="lg">
                <Heart className="w-5 h-5" />
                Donate Now
              </AnimatedButton>
              <AnimatedButton href="/get-involved" variant="outline" size="lg">
                <Users className="w-5 h-5" />
                Become a Volunteer
              </AnimatedButton>
              <AnimatedButton href="/campaigns" variant="ghost" size="lg">
                View Campaigns
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-xs sm:max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: "500+", label: "Lives Touched" },
                { value: "200+", label: "Children Helped" },
                { value: "100%", label: "Transparent" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-blue-200 text-xs sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block flex-shrink-0"
          >
            <div className="relative w-80 h-96">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image src="/IMG-20260215-WA0108.jpg" alt="Children" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <Image src="/IMG-20260215-WA0118.jpg" alt="Community" fill className="object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <Image src="/IMG-20260215-WA0128.jpg" alt="Support" fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
          <span className="text-xs">Scroll to discover</span>
        </motion.div>
      </section>

      {/* MISSION STRIP */}
      <section className="bg-[#2563EB] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <p className="font-semibold text-lg">Empowering Communities Since March 2024</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-blue-100 text-center">
              <span>✓ Education Support</span>
              <span>✓ Welfare Relief</span>
              <span>✓ Community Care</span>
              <span>✓ 100% Transparent</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT COUNTERS */}
      <ImpactCounter />

      {/* MISSION & VISION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-blue-100 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-5 leading-tight">
                A Foundation Built on{" "}
                <span className="text-[#2563EB]">Compassion & Purpose</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-base">
                Founded on March 10, 2024, in Abuja, Nigeria, the Mona Lisa Smile Indigents Foundation
                was born out of a deep passion to address the growing crisis of child poverty, lack of
                education, and social welfare neglect in Nigeria.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-base">
                We believe that no child should miss school because of poverty, no family should go to
                bed hungry, and no community should be left without care. Our work is sustained by
                volunteers, donors, and partners who share our vision of a just and empowered Nigeria.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {values.map((val) => (
                  <div key={val.label} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${val.color}15` }}>
                      <val.icon className="w-5 h-5" style={{ color: val.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1F2937]">{val.label}</p>
                      <p className="text-xs text-gray-500">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <AnimatedButton href="/about" variant="primary" size="md">
                Our Full Story <ArrowRight className="w-4 h-4" />
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/IMG-20260215-WA0113.jpg" alt="Our Mission" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/40 to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1F2937] mb-1">Our Mission</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      To uplift indigent children and disadvantaged communities through education,
                      welfare support, and sustainable community development.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-purple-100 text-[#7C3AED] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              Three Pillars of Change
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our programs are designed to address the most pressing needs of indigent communities —
              from keeping children in school to ensuring families have food on the table.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <ProgramCard key={prog.title} {...prog} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <AnimatedButton href="/programs" variant="primary" size="md">
              Explore All Programs <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS SECTION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-red-100 text-[#DC2626] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Active Campaigns
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              Help Us Hit Our Goals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each campaign represents a real opportunity to transform lives. Your donation — no matter
              the size — moves us closer to our goal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((camp, i) => (
              <CampaignCard key={camp.id} {...camp} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <AnimatedButton href="/campaigns" variant="primary" size="md">
              View All Campaigns <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* DONATION CTA */}
      <DonationCTA
        image="/IMG-20260215-WA0116.jpg"
        title="Your Generosity Transforms Lives"
        subtitle="100% of every naira donated goes directly to our humanitarian programs. Bank transfer donations are simple, safe, and completely transparent."
      />

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              Real Stories, Real Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0130.jpg" alt="Volunteer" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#7C3AED]/90 to-[#1F2937]/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl ml-auto text-white text-right">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/20">
                Get Involved
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Join Our Team of{" "}
                <span className="text-yellow-400">Compassionate</span> Volunteers
              </h2>
              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                Whether you have 2 hours or 20, your time and skills can change a child&apos;s life.
                Join our growing community of volunteers making real impact every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <AnimatedButton href="/get-involved" variant="outline" size="lg">
                  <Users className="w-5 h-5" />
                  Become a Volunteer
                </AnimatedButton>
                <AnimatedButton href="/get-involved#sponsor" variant="ghost" size="lg">
                  Become a Sponsor
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-blue-100 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4">
              See Our Work in Action
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {[
              "/IMG-20260215-WA0102.jpg",
              "/IMG-20260215-WA0106.jpg",
              "/IMG-20260215-WA0112.jpg",
              "/IMG-20260215-WA0119.jpg",
              "/IMG-20260215-WA0122.jpg",
              "/IMG-20260215-WA0125.jpg",
              "/IMG-20260215-WA0133.jpg",
              "/IMG-20260215-WA0140.jpg",
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image src={src} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <AnimatedButton href="/gallery" variant="primary" size="md">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>
      </section>
    </main>
  );
}
