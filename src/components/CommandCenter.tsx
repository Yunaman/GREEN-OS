"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents, mockTeachers, mockActivities } from "@/lib/mockData";
import {
  ShieldCheck,
  Cpu,
  Activity,
  Server,
  TrendingUp,
  Heart,
  RefreshCw,
  Sparkles,
  Signal,
  Map,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CommandCenter: React.FC = () => {
  const { language } = useApp();
  const [pulseScale, setPulseScale] = useState(1);
  const [activeFeeds, setActiveFeeds] = useState(mockActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time stream incoming
      setPulseScale((prev) => (prev === 1 ? 1.05 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">

      {/* Principal Command Center Banner */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-zinc-950 to-emerald-900 border border-emerald-500/20 shadow-2xl glow-green">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1.5">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-fit">
              <Signal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              {language === "en" ? "GLOBAL SYSTEM STATUS: SECURE" : "የስርዓት ሁኔታ፡ ሰላማዊ"}
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              {t("Principal Command Center", language)}
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl">
              {language === "en" ? "Real-time telemetry of cloud resources, student mood analytics, and active network streams." : "የደመና ሃብቶች፣ የተማሪዎች ስሜት መግለጫዎች እና የንቁ መረብ ግንኙነቶች ቀጥተኛ መቆጣጠሪያ ማዕከል።"}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 p-3.5 rounded-2xl">
            <Cpu className="w-6 h-6 text-emerald-400 animate-spin-slow" />
            <div className="text-xs">
              <span className="text-zinc-500 block text-[9px]">ENGINE LATENCY</span>
              <span className="font-bold text-emerald-400">0.02ms (Optimal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: System Stats, Heatmaps, and Stream Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left 7 Columns: System Stats & Wellness Heatmap */}
        <div className="lg:col-span-7 space-y-6">

          {/* Animated Metrics widgets */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-1">
              <span className="text-[9px] text-zinc-500 block uppercase">SERVER COMPILATION</span>
              <p className="text-lg font-extrabold text-white">NextJS v15 (Turbopack)</p>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Fast Refresh Enabled
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-1">
              <span className="text-[9px] text-zinc-500 block uppercase">CAMPUS COUPLING</span>
              <p className="text-lg font-extrabold text-white">2 Synchronized Sites</p>
              <span className="text-[10px] text-zinc-400">Addis Ababa & Arbaminch</span>
            </div>
          </div>

          {/* Interactive Mood Analytics / Wellness Heatmap */}
          <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  {language === "en" ? "Student Mood & Wellness Analytics" : "የተማሪዎች ስሜት እና ጤንነት መግለጫ"}
                </h3>
                <p className="text-[9px] text-zinc-500">Telemetry generated via interactive mood selectors</p>
              </div>

              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                WEEKLY REPORT
              </span>
            </div>

            {/* Wellness distribution visual graph simulation */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-zinc-300">😊 Happy (ደስተኛ)</span>
                  <span className="text-emerald-400 font-bold">88.5% (Optimal)</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88.5%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-zinc-300">😐 Okay (ደህና)</span>
                  <span className="text-amber-400 font-bold">9.5%</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: "9.5%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-zinc-300">😔 Need Support (እገዛ የሚፈልግ)</span>
                  <span className="text-rose-400 font-bold">2.0%</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "2%" }} />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 leading-relaxed pt-2">
              {language === "en"
                ? "Wellness index aggregates are at peak positive values this month. Counselors notified of the 2.0% support query flags."
                : "የተማሪዎች አጠቃላይ ደህንነት በዚህ ወር በከፍተኛ ደረጃ ላይ ይገኛል። እገዛ ለሚፈልጉት 2% ተማሪዎች አማካሪዎች መልዕክት ደርሷቸዋል።"}
            </p>
          </div>

        </div>

        {/* Right 5 Columns: Live Telemetry Streams (Activity Feeds) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl glass border border-white/10 shadow-xl space-y-4 max-h-[460px] overflow-y-auto">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center justify-between">
              <span>{language === "en" ? "Network Logs Stream" : "የመረብ እንቅስቃሴዎች መዝገብ"}</span>
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            </h4>

            <div className="space-y-3">
              {activeFeeds.map((feed) => (
                <div key={feed.id} className="p-3 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                      {feed.type}
                    </span>
                    <span className="text-zinc-500">{feed.time}</span>
                  </div>
                  <p className="text-zinc-300 font-medium">
                    {language === "en" ? feed.description : feed.descriptionAmharic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
