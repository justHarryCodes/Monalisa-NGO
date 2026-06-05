"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart, Copy, CheckCircle, Shield, Users, ArrowRight,
  AlertCircle, CreditCard, Building, MessageCircle
} from "lucide-react";
import { submitDonation } from "@/lib/firestore";
import AnimatedButton from "@/components/AnimatedButton";

const bankAccounts = [
  {
    bank: "Moniepoint",
    accountName: "MONA Lisa Smile Indigents Foundation",
    accountNumber: "8034839987",
    color: "#DC2626",
    bgColor: "#FEF2F2",
  },
  {
    bank: "FCMB",
    accountName: "MONA Lisa Smile Indigents Foundation",
    accountNumber: "2008073579",
    color: "#2563EB",
    bgColor: "#EFF6FF",
  },
];

const campaigns = [
  "General Donation",
  "Back to School Drive 2025",
  "Feed a Family Initiative",
  "Community Health Outreach",
  "Children's Christmas Welfare",
  "Empowerment Skills Workshop",
  "Clean Water for Communities",
];

const suggestedAmounts = [5000, 10000, 20000, 50000, 100000];

export default function DonatePage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    bank: "moniepoint" as "moniepoint" | "fcmb",
    campaignName: "General Donation",
    message: "",
    reference: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseFloat(customAmount) || 0;
    if (!amount) { alert("Please enter or select a donation amount."); return; }
    setSubmitting(true);
    try {
      await submitDonation({
        ...form,
        amount,
        reference: form.reference || `MLSI-${Date.now()}`,
        createdAt: new Date(),
        verified: false,
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/IMG-20260215-WA0116.jpg" alt="Donate" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/90 via-[#DC2626]/60 to-[#1F2937]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart className="w-8 h-8 fill-white text-white" />
            </div>
            <span className="inline-block bg-white/15 border border-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Make a Donation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Be the Change You{" "}
              <span className="text-yellow-400">Wish to See</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              Every naira you donate goes directly to our programs — no hidden fees, no overhead deductions.
              100% of your generosity reaches the children and families who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-[#2563EB] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-center">
            {[
              { icon: Shield, text: "100% Transparent" },
              { icon: Heart, text: "Direct Impact" },
              { icon: CheckCircle, text: "Verified NGO" },
              { icon: Users, text: "500+ Lives Touched" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2">
                <Icon className="w-4 h-4 text-blue-200" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN DONATE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* LEFT: Bank Details */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-[#1F2937] mb-2">How to Donate</h2>
                <p className="text-gray-600 mb-6">
                  We accept donations via bank transfer only. Use the account details below to make your transfer,
                  then fill out the confirmation form on the right.
                </p>

                {/* STEPS */}
                <div className="space-y-4 mb-8">
                  {[
                    { step: "1", text: "Select your preferred bank below and copy the account number." },
                    { step: "2", text: "Open your banking app or visit the bank and make your transfer." },
                    { step: "3", text: "Fill out the donation confirmation form to the right." },
                    { step: "4", text: "We will verify and acknowledge your donation within 24 hours." },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                      <div className="w-8 h-8 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                {/* BANK CARDS */}
                <h3 className="font-bold text-[#1F2937] mb-4">Bank Account Details</h3>
                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <motion.div
                      key={account.bank}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="rounded-2xl border-2 overflow-hidden"
                      style={{ borderColor: `${account.color}30` }}
                    >
                      <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: account.bgColor }}>
                        <Building className="w-5 h-5" style={{ color: account.color }} />
                        <span className="font-bold" style={{ color: account.color }}>{account.bank} Bank</span>
                      </div>
                      <div className="p-5 bg-white">
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-0.5">Account Name</p>
                          <p className="font-semibold text-[#1F2937] text-sm">{account.accountName}</p>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: account.bgColor }}>
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">Account Number</p>
                            <p className="font-black text-xl tracking-widest" style={{ color: account.color }}>
                              {account.accountNumber}
                            </p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all"
                            style={{
                              backgroundColor: copiedAccount === account.bank ? "#059669" : account.color,
                              color: "white",
                            }}
                          >
                            {copiedAccount === account.bank ? (
                              <><CheckCircle className="w-4 h-4" /> Copied!</>
                            ) : (
                              <><Copy className="w-4 h-4" /> Copy</>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp Alternative */}
                <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1F2937] mb-1">Need Help?</p>
                      <p className="text-sm text-gray-600 mb-3">
                        If you encounter any issues or need assistance with your donation, chat with us directly on WhatsApp.
                      </p>
                      <a
                        href="https://wa.me/2347089931056?text=I want to make a donation to MLSI Foundation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Us: +2347089931056
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Confirmation Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-[#1F2937] mb-2">I Have Made a Donation</h2>
                <p className="text-gray-600 text-sm mb-6">
                  After making your bank transfer, please fill out this form so we can acknowledge and track your generous gift.
                </p>

                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-3">Thank You So Much!</h3>
                    <p className="text-gray-600 mb-2">
                      Your donation has been recorded. We will verify and send you a personal acknowledgment within 24 hours.
                    </p>
                    <p className="text-[#2563EB] font-medium text-sm mb-6">
                      You are making a real difference in children&apos;s lives. God bless you!
                    </p>
                    <AnimatedButton onClick={() => setSuccess(false)} variant="primary" size="md">
                      Submit Another Donation
                    </AnimatedButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* AMOUNT SELECTION */}
                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-2">Donation Amount (NGN) *</label>
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {suggestedAmounts.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                            className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                              selectedAmount === amt
                                ? "bg-[#2563EB] text-white border-[#2563EB]"
                                : "bg-white text-[#1F2937] border-gray-200 hover:border-[#2563EB]"
                            }`}
                          >
                            ₦{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        placeholder="Or enter custom amount"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Your Name *</label>
                        <input name="donorName" value={form.donorName} onChange={handleChange} required placeholder="Full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1F2937] mb-1">Email Address</label>
                        <input name="donorEmail" type="email" value={form.donorEmail} onChange={handleChange} placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-1">Bank Used *</label>
                      <select name="bank" value={form.bank} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all">
                        <option value="moniepoint">Moniepoint — 8034839987</option>
                        <option value="fcmb">FCMB — 2008073579</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-1">Campaign / Purpose</label>
                      <select name="campaignName" value={form.campaignName} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all">
                        {campaigns.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-1">Transaction Reference (optional)</label>
                      <input name="reference" value={form.reference} onChange={handleChange} placeholder="e.g., MLSI-20250701"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1F2937] mb-1">Message (optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                        placeholder="A personal message or prayer..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all resize-none" />
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                      <AlertCircle className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600">
                        By submitting this form, you confirm that you have made a bank transfer to the MLSI Foundation account.
                        Our team will verify your donation and send you an acknowledgement.
                      </p>
                    </div>

                    <AnimatedButton type="submit" variant="red" size="lg" fullWidth disabled={submitting}>
                      <Heart className="w-4 h-4" />
                      {submitting ? "Submitting..." : "Confirm My Donation"}
                    </AnimatedButton>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-8">What Your Donation Does</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { amount: "₦1,000", impact: "Provides 2 children with notebooks and pens for a term" },
              { amount: "₦5,000", impact: "Feeds a family of 4 for one week with essential food items" },
              { amount: "₦10,000", impact: "Provides a school bag, uniform, and supplies for one child" },
              { amount: "₦50,000", impact: "Sponsors a full health outreach for an entire community" },
            ].map((item) => (
              <div key={item.amount} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                <p className="text-2xl font-black text-[#2563EB] mb-2">{item.amount}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
