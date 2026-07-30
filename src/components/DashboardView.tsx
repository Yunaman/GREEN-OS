"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, upcomingEvents, greenPointRules } from "@/lib/mockData";
import {
  CloudSun,
  Calendar,
  TrendingUp,
  Users,
  GraduationCap,
  Coins,
  BellRing,
  Sparkles,
  CheckCircle,
  Plus,
  Gift,
  TrendingDown,
  ChevronRight,
  Target,
  ArrowUpRight,
  Info,
  BadgeCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface DashboardViewProps {
  onTriggerBirthday: (name: string) => void;
  onOpenGreenPointsModal: () => void;
  onOpenMoodCheckModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onTriggerBirthday,
  onOpenGreenPointsModal,
  onOpenMoodCheckModal
}) => {
  const { language, addNotification, announcements, students } = useApp();
  const [activeAnnouncement, setActiveAnnouncement] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>("evt-1");

  const totalOutstandingFees = students.reduce((acc, curr) => acc + curr.outstandingFees, 0);

  const handleSimulateCheckin = () => {
    addNotification("Attendance Roll Call simulated successfully!", "የዕለቱ ተማሪዎች ተሳትፎ በተሳካ ሁኔታ ተመዝግቧል!");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#10b981", "#fbbf24"]
    });
  };

  const handleBirthdayAction = () => {
    const luckyStudent = students[Math.floor(Math.random() * students.length)];
    onTriggerBirthday(luckyStudent.name);
  };

  const activeEvent = upcomingEvents.find(e => e.id === selectedEventId) || upcomingEvents[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* 1. Handbook-style Hero Section - Apple/Stripe aesthetic */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-900/80 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-wider uppercase">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>{language === "en" ? "SECURE ENCRYPTED NODE" : "ደህንነቱ የተጠበቀ ክፍለ ጊዜ"}</span>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-zinc-100 tracking-tight">
            {language === "en" ? "Green New Generation School" : "ግሪን ኒው ጀነሬሽን ትምህርት ቤት"}
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed">
            {language === "en"
              ? "Your centralized executive operational environment. Orchestrate academic schedules, reward student achievements, and audit financial workflows with complete analytical precision."
              : "የእርስዎ ማዕከላዊ አስፈፃሚ የሥራ ቦታ። የአካዳሚክ መርሃ ግብሮችን ያደራጁ፣ የተማሪዎችን ውጤት ይሸልሙ፣ እና የፋይናንስ የስራ ሂደቶችን በጥልቀት ይቆጣጠሩ።"}
          </p>
        </div>

        {/* Small Weather widget inside Hero */}
        <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 self-start md:self-auto min-w-[200px]">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{t("Weather", language)}</p>
            <h4 className="text-xs font-bold text-zinc-100">{t("Addis Ababa, Ethiopia", language)}</h4>
            <p className="text-[10px] text-zinc-400">22°C • Sunny</p>
          </div>
        </div>
      </div>

      {/* 2. Premium Grid: Stats Column (Left) & Expandable Calendar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Statistics & Quick Actions List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Stat: Total Students */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900/80 flex flex-col justify-between h-28 relative overflow-hidden group">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{t("Total Students", language)}</span>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-zinc-100">1,500+</h3>
                <p className="text-[9px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% {language === "en" ? "growth rate" : "እድገት"}
                </p>
              </div>
            </div>

            {/* Stat: Certified Faculty */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900/80 flex flex-col justify-between h-28 relative overflow-hidden group">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{t("Active Teachers", language)}</span>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-zinc-100">100+</h3>
                <p className="text-[9px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> 100% {language === "en" ? "Certified" : "የተረጋገጡ"}
                </p>
              </div>
            </div>

            {/* Stat: Outstanding Fees in ETB */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900/80 flex flex-col justify-between h-28 relative overflow-hidden group">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{t("Outstanding Fees", language)}</span>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-rose-500">{totalOutstandingFees.toLocaleString()} ETB</h3>
                <p className="text-[9px] text-zinc-500 mt-1 flex items-center gap-1">
                  {language === "en" ? "Aggregated pending dues" : "አጠቃላይ የሚጠበቅ ክፍያ"}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Action Strip - Content-First & Sleek */}
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-zinc-400">{language === "en" ? "Operational Quicklinks" : "ፈጣን ድርጊቶች"}</span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleSimulateCheckin}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/10 hover:bg-emerald-400 transition-all cursor-pointer"
              >
                {t("Register Attendance", language)}
              </button>
              <button
                onClick={onOpenGreenPointsModal}
                className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold text-xs hover:bg-zinc-900 transition-all cursor-pointer"
              >
                {language === "en" ? "Reward Green Points" : "ግሪን ነጥቦችን ሸልም"}
              </button>
              <button
                onClick={onOpenMoodCheckModal}
                className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold text-xs hover:bg-zinc-900 transition-all cursor-pointer"
              >
                {t("Mood Check", language)}
              </button>
              <button
                onClick={handleBirthdayAction}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black text-xs hover:opacity-90 transition-all cursor-pointer"
              >
                🎉 {t("Birthday Celebration", language)}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic & Interactive Academic Calendar (Right Side) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-zinc-950 border border-zinc-900/80 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {t("Upcoming Events", language)}
            </h4>
          </div>

          <div className="space-y-2">
            {upcomingEvents.map((evt) => {
              const isSelected = evt.id === selectedEventId;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/40"
                      : "bg-zinc-900/40 border-transparent hover:border-zinc-850"
                  }`}
                >
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-zinc-200">{evt.date}</span>
                    <span className="text-[10px] text-zinc-500">{evt.time}</span>
                  </div>
                  <h5 className="text-xs font-extrabold text-zinc-300 mt-1">
                    {language === "en" ? evt.title : evt.titleAmharic}
                  </h5>
                </div>
              );
            })}
          </div>

          {/* Interactive Event Details Card */}
          <AnimatePresence mode="wait">
            {selectedEventId && (
              <motion.div
                key={selectedEventId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-900 text-[11px] space-y-1"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Info className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "Location / Coordinates" : "ቦታ / አቅጣጫ"}</span>
                </div>
                <p className="text-zinc-300 font-medium">{activeEvent.location}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 3. Announcements Segment - Expandable with custom Accordion animations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t("Announcements", language)}</h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold">
            {announcements.length} {language === "en" ? "Active Bulletins" : "ንቁ መግለጫዎች"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.map((ann) => {
            const isExpanded = activeAnnouncement === ann.id;
            return (
              <div
                key={ann.id}
                onClick={() => setActiveAnnouncement(isExpanded ? null : ann.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  ann.important
                    ? "bg-emerald-950/20 border-emerald-900/40 hover:border-emerald-500/40"
                    : "bg-zinc-950 border-zinc-900 hover:border-zinc-800"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                    {ann.date}
                  </span>
                  {ann.important && (
                    <span className="text-[9px] font-black text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10">
                      {language === "en" ? "URGENT" : "አስቸኳይ"}
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-zinc-100 mt-2.5">
                  {language === "en" ? ann.title : ann.titleAmharic}
                </h4>

                <p className={`text-xs text-zinc-400 mt-1.5 leading-relaxed transition-all ${
                  isExpanded ? "line-clamp-none text-zinc-300" : "line-clamp-2"
                }`}>
                  {language === "en" ? ann.excerpt : ann.excerptAmharic}
                </p>

                <div className="mt-3.5 flex justify-end">
                  <span className="text-[9px] text-emerald-400 font-extrabold flex items-center gap-0.5 hover:underline">
                    {isExpanded ? (language === "en" ? "Collapse Bulletin" : "ዝጋ") : (language === "en" ? "Expand Bulletin" : "በዝርዝር አንብብ")}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
