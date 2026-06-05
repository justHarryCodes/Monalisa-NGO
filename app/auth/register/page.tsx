"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AnimatedButton from "@/components/AnimatedButton";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "member",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { register, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name, form.role);
      setVerificationSent(true);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? "";
      setError(
        msg.includes("email-already-in-use")
          ? "An account with this email already exists."
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle(form.role);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? "";
      if (!msg.includes("popup-closed-by-user") && !msg.includes("cancelled-popup-request")) {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const passwordStrength =
    form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2
    : 3;

  const strengthLabel = ["", "Weak", "Fair", "Strong"][passwordStrength];
  const strengthColor = ["", "text-red-500", "text-yellow-500", "text-green-500"][passwordStrength];

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden lg:block flex-1 relative">
        <Image src="/IMG-20260215-WA0130.jpg" alt="Register" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/85 to-[#1F2937]/70" />
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="MLSI" fill className="object-contain" />
            </div>
            <div>
              <p className="font-bold">Mona Lisa Smile</p>
              <p className="text-purple-200 text-sm">Indigents Foundation</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Join Our Family of Changemakers
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed max-w-md">
            Create an account to volunteer, receive updates, attend events, and be part of our growing community of impact.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="MLSI" fill className="object-contain" />
            </div>
            <div>
              <p className="font-bold text-[#1F2937]">Mona Lisa Smile</p>
              <p className="text-[#7C3AED] text-xs">Indigents Foundation</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {verificationSent ? (
              /* ── Verification sent screen ── */
              <motion.div
                key="verify"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-1">
                  We sent a verification link to
                </p>
                <p className="font-semibold text-[#2563EB] mb-5 break-all">{form.email}</p>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-left mb-6 space-y-2.5 text-sm text-gray-700">
                  {[
                    "Open the email from MLSI Foundation",
                    "Click the \"Verify Email Address\" link",
                    "Come back and sign in to your dashboard",
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mb-5">
                  Didn&apos;t receive it? Check your spam folder or{" "}
                  <button
                    onClick={() => setVerificationSent(false)}
                    className="text-[#2563EB] underline"
                  >
                    go back
                  </button>{" "}
                  to re-enter your email.
                </p>

                <AnimatedButton href="/auth/login" variant="primary" size="lg" fullWidth>
                  Go to Sign In
                </AnimatedButton>
              </motion.div>
            ) : (
              /* ── Registration form ── */
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-3xl font-bold text-[#1F2937] mb-1">Create Account</h1>
                <p className="text-gray-600 mb-6">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-[#2563EB] font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>

                {error && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Google button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading || loading}
                  className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[#1F2937] font-semibold py-3 rounded-xl transition-all duration-200 mb-5 disabled:opacity-60"
                >
                  {googleLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <GoogleIcon />
                  )}
                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-sm">or register with email</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1.5">I want to join as *</label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                    >
                      <option value="member">Member — Join the MLSI community</option>
                      <option value="volunteer">Volunteer — Help at events and outreach</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex gap-1 flex-1">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                i <= passwordStrength
                                  ? passwordStrength === 1 ? "bg-red-400"
                                    : passwordStrength === 2 ? "bg-yellow-400"
                                    : "bg-green-400"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs font-medium ${strengthColor}`}>{strengthLabel}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      />
                      {form.confirmPassword && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                          {form.password === form.confirmPassword
                            ? <CheckCircle className="w-4 h-4 text-green-500" />
                            : <AlertCircle className="w-4 h-4 text-red-400" />
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <AnimatedButton type="submit" variant="primary" size="lg" fullWidth disabled={loading || googleLoading}>
                    {loading ? "Creating Account..." : "Create Account & Verify Email"}
                  </AnimatedButton>

                  <p className="text-xs text-center text-gray-500">
                    By registering, you agree to be part of MLSI Foundation. A verification email will be sent to you.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
