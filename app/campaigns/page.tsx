"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Share2, Target, Clock, Users, CheckCircle } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import AnimatedButton from "@/components/AnimatedButton";
import ProgressBar from "@/components/ProgressBar";

const campaigns = [
  {
    id: "1",
    title: "Back to School Drive 2025",
    description: "Help us put 500 children back in school this academic year with books, bags, and uniforms. Every child deserves access to education regardless of their financial background.",
    imageUrl: "/IMG-20260215-WA0101.jpg",
    goalAmount: 5000000,
    raisedAmount: 2750000,
    daysLeft: 45,
    category: "Education",
    story: "Over 2,000 children in Abuja are currently out of school due to poverty. Our Back to School Drive aims to change this by providing essential school supplies to 500 of the most vulnerable children.",
    needs: ["500 school bags", "500 sets of textbooks", "500 school uniforms", "Writing materials and stationery"],
  },
  {
    id: "2",
    title: "Feed a Family Initiative",
    description: "Join us in providing nutritious food packages to 200 indigent families this month. Hunger should never define a family's story.",
    imageUrl: "/IMG-20260215-WA0111.jpg",
    goalAmount: 2000000,
    raisedAmount: 1200000,
    daysLeft: 20,
    category: "Relief",
    story: "Rising food prices have pushed more families into food insecurity in Abuja. Our Feed a Family Initiative delivers monthly food packages containing rice, beans, oil, and other essentials.",
    needs: ["200 family food packs", "Cooking oil and condiments", "Protein sources (eggs, beans)", "Transport and logistics"],
  },
  {
    id: "3",
    title: "Community Health Outreach",
    description: "Fund free medical checkups, medications, and health education for 1,000 community members in underserved areas of Abuja.",
    imageUrl: "/IMG-20260215-WA0121.jpg",
    goalAmount: 3500000,
    raisedAmount: 980000,
    daysLeft: 60,
    category: "Community",
    story: "Many communities in Abuja lack access to basic healthcare. Our health outreach brings doctors, nurses, and medications directly to communities — screening for malaria, hypertension, diabetes, and more.",
    needs: ["Medical consumables and equipment", "Medications and drugs", "Doctor and nurse fees", "Community mobilization"],
  },
  {
    id: "4",
    title: "Children's Christmas Welfare",
    description: "Give 300 indigent children a Christmas they'll never forget. Clothing, food, toys, and a day of celebration — because every child deserves joy.",
    imageUrl: "/IMG-20260215-WA0131.jpg",
    goalAmount: 1500000,
    raisedAmount: 300000,
    daysLeft: 90,
    category: "Relief",
    story: "Last Christmas, we saw children arrive at our event in torn clothes, hungry — but smiling. We want to give 300 children gifts, meals, and a celebration that tells them they are loved and valued.",
    needs: ["300 clothing sets", "Food and refreshments", "Toys and gifts", "Event logistics and venue"],
  },
  {
    id: "5",
    title: "Empowerment Skills Workshop",
    description: "Train 100 young women in marketable skills — tailoring, baking, and digital skills — to create sustainable livelihoods and economic independence.",
    imageUrl: "/IMG-20260215-WA0136.jpg",
    goalAmount: 2500000,
    raisedAmount: 500000,
    daysLeft: 75,
    category: "Education",
    story: "Economic empowerment is the most lasting form of welfare. This program will train and equip 100 women with skills and starter kits to start their own businesses and break the cycle of poverty.",
    needs: ["Training facilitators", "Equipment and materials", "Venue and logistics", "Starter business kits"],
  },
  {
    id: "6",
    title: "Clean Water for Communities",
    description: "Help us install water boreholes in three underserved communities where residents currently travel miles for clean water.",
    imageUrl: "/IMG-20260215-WA0143.jpg",
    goalAmount: 4000000,
    raisedAmount: 800000,
    daysLeft: 120,
    category: "Community",
    story: "Clean water access remains a crisis in many Abuja communities. This project will fund the drilling and installation of boreholes, bringing safe water directly to hundreds of families.",
    needs: ["Borehole drilling equipment", "Installation materials", "Community mobilization", "Maintenance fund"],
  },
];

export default function CampaignsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0117.jpg" alt="Campaigns" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/85 via-[#DC2626]/60 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Active Campaigns
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Be the Reason{" "}
              <span className="text-yellow-400">Someone Smiles</span> Today
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              Each campaign tells a story of real need and real impact. Choose a cause close to your heart
              and make your donation count. Together, we can exceed every goal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-yellow-400" />
                {campaigns.length} Active Campaigns
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                100% Goes to Programs
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Verified & Transparent
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW DONATIONS WORK */}
      <section className="py-12 bg-[#2563EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-white text-center">
            {[
              { step: "01", title: "Choose a Campaign", desc: "Pick the cause that resonates with you most" },
              { step: "02", title: "Transfer Your Donation", desc: "Send directly to our verified bank accounts" },
              { step: "03", title: "Confirm & Track", desc: "Submit your confirmation and we'll keep you updated" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-2">
                <div className="text-5xl font-black text-white/20">{item.step}</div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CAMPAIGN */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-red-100 text-[#DC2626] text-sm font-bold px-3 py-1 rounded-full">Featured</span>
            <h2 className="text-2xl font-bold text-[#1F2937]">Most Urgent Campaign</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center bg-[#F8FAFC] rounded-3xl overflow-hidden">
            <div className="relative h-72 lg:h-full min-h-[300px]">
              <Image src={campaigns[0].imageUrl} alt={campaigns[0].title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8FAFC]/20" />
            </div>
            <div className="p-8">
              <span className="inline-block bg-blue-100 text-[#2563EB] text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                {campaigns[0].category}
              </span>
              <h3 className="text-2xl font-bold text-[#1F2937] mb-3">{campaigns[0].title}</h3>
              <p className="text-gray-600 mb-4">{campaigns[0].story}</p>
              <ul className="space-y-2 mb-5">
                {campaigns[0].needs.map((n) => (
                  <li key={n} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {n}
                  </li>
                ))}
              </ul>
              <ProgressBar raised={campaigns[0].raisedAmount} goal={campaigns[0].goalAmount} className="mb-5" />
              <div className="flex gap-3">
                <AnimatedButton href="/donate" variant="primary">
                  <Heart className="w-4 h-4" />
                  Donate to This Campaign
                </AnimatedButton>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL CAMPAIGNS GRID */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-[#1F2937] mb-2">All Active Campaigns</h2>
            <p className="text-gray-600">Support any campaign or donate generally — every contribution matters.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp, i) => (
              <CampaignCard key={camp.id} {...camp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl font-bold text-[#1F2937] mb-6">Why Donate to MLSI Foundation?</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, label: "100% Transparent", desc: "Full financial accountability for every donation received" },
              { icon: Heart, label: "Direct Impact", desc: "Your funds go directly to programs, not admin overheads" },
              { icon: Users, label: "Community Verified", desc: "Our work is publicly visible and community-verified" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 p-5">
                <item.icon className="w-8 h-8 text-[#2563EB]" />
                <h4 className="font-bold text-[#1F2937]">{item.label}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
