"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.details || data.error || "Login failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-[#1D7018]/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-[#1D7018]/10 rounded-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <Image
              src="/logo.png"
              alt="Asrofi Lab Logo"
              width={80}
              height={80}
              className="drop-shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Asrofi Lab CMS</h1>
          <p className="text-gray-500 mt-2">Sign in to manage your content</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#1D7018]/30 rounded-xl p-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-400 mb-2 text-sm">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3
                             text-white placeholder-gray-500
                             focus:border-[#39FF14] focus:outline-none transition-colors"
                    placeholder="admin@asrofi.lab"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-400 mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3
                             text-white placeholder-gray-500
                             focus:border-[#39FF14] focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3
                       bg-[#1D7018] text-white rounded-lg font-medium
                       hover:bg-[#2E8B57] transition-colors disabled:opacity-50
                       border border-[#39FF14]/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-500 hover:text-[#39FF14] transition-colors text-sm"
          >
            ← Back to website
          </a>
        </div>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
          <p className="text-gray-500 text-sm text-center">
            <span className="text-gray-400">Demo credentials:</span>
            <br />
            Email: <code className="text-[#39FF14]">admin@asrofi.lab</code>
            <br />
            Password: <code className="text-[#39FF14]">admin123</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
