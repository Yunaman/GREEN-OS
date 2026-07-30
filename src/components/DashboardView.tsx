"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import {
  t,
  mockStudents,
  mockTeachers,
  mockActivities,
  mockAnnouncements,
  upcomingEvents,
  greenPointRules
} from "@/lib/mockData";
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
  Target
} from "lucide-react";
import { motion } from "framer-motion";
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
  const { language, addNotification } = useApp();
  const [activeAnnouncement, setActiveAnnouncement] = useState<string | null>(null);

  // Quick action: Trigger birthday
  const handleBirthdayAction = () => {
    // Choose a random student
    const luckyStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
    onTriggerBirthday(luckyStudent.name);
  };

  const handleSimulateCheckin = () => {
    addNotification("Attendance Roll Call simulated successfully!", "የዕለቱ ተማሪዎች ተሳትፎ በተሳካ ሁኔታ ተመዝግቧል!");
    // Trigger confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10b981", "#34d399", "#f59e0b"]
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner with dynamic date */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-950 to-green-950 p-6 md:p-8 border border-emerald-500/20 shadow-xl glow-green"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-green-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              ✨ {language === "en" ? "Principal Panel Active" : "የልዩ አስተዳደር ገጽ ገባሪ"}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3 tracking-tight">
              {language === "en" ? "Good day, Director!" : "መልካም ቀን፣ ክቡር ርዕሰ መምህር!"}
            </h2>
            <p className="text-zinc-300 text-xs md:text-sm mt-1 max-w-xl">
              {language === "en"
                ? "Welcome back to GREEN OS. Green New Generation School is thriving. Here is your automated morning brief."
                : "እንኳን ወደ ግሪን ኦኤስ በደህና መጡ። ግሪን ኒው ጀነሬሽን ትምህርት ቤት በጥሩ ሁኔታ ላይ ይገኛል። የዛሬው ጠዋት አጭር መግለጫ ይህንን ይመስላል።"}
            </p>
          </div>

          {/* Quick Date Widget */}
          <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-2xl p-4 self-start md:self-auto backdrop-blur-sm">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                {language === "en" ? "Academic Year" : "የትምህርት ዘመን"}
              </p>
              <h4 className="text-sm font-bold text-white">
                {language === "en" ? "2018 - 2019 E.C." : "2018 - 2019 ዓ.ም"}
              </h4>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid Layout: Stats (Left) & Weather + Calendar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Animated Statistics Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Stat 1: Total Students */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-medium">{t("Total Students", language)}</span>
              <h3 className="text-3xl font-extrabold tracking-tight">1,500+</h3>
              <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12% {language === "en" ? "this semester" : "በዚህ ሴሚስተር"}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Stat 2: Active Teachers */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-medium">{t("Active Teachers", language)}</span>
              <h3 className="text-3xl font-extrabold tracking-tight">100+</h3>
              <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% {language === "en" ? "Certified" : "የተረጋገጡ"}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <GraduationCap className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Stat 3: Today's Attendance */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-medium">{t("Today's Attendance", language)}</span>
              <h3 className="text-3xl font-extrabold tracking-tight">96.8%</h3>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> {language === "en" ? "Optimal engagement" : "ከፍተኛ ተሳትፎ"}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Stat 4: Outstanding Fees */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl group-hover:bg-red-500/10 transition-colors" />
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-medium">{t("Outstanding Fees", language)}</span>
              <h3 className="text-3xl font-extrabold text-rose-500 tracking-tight">14,900 ETB</h3>
              <p className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> -42% {language === "en" ? "due bills" : "ከተከፈለው በታች"}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-500">
              <Coins className="w-6 h-6" />
            </div>
          </motion.div>

        </div>

        {/* Column 3: Weather Widget + Simple Calendar Widget */}
        <div className="space-y-4">

          {/* Elegant Weather Widget */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-600/5 border border-emerald-500/20 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{t("Weather", language)}</span>
              <h4 className="text-sm font-bold">{t("Addis Ababa, Ethiopia", language)}</h4>
              <p className="text-xs text-zinc-400">{t("Sunny", language)}, 22°C</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="text-emerald-500"
            >
              <CloudSun className="w-12 h-12" />
            </motion.div>
          </div>

          {/* Academic Calendar Widget */}
          <div className="p-5 rounded-3xl glass border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                {t("Academic Calendar", language)}
              </h4>
              <span className="text-[9px] text-emerald-500 font-bold">2018 E.C.</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                <span className="font-semibold text-zinc-200">Megabit 15</span>
                <span className="text-zinc-400">{language === "en" ? "Midterm Exams" : "የአጋማሽ ፈተናዎች"}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                <span className="font-semibold text-zinc-200">Miazia 20</span>
                <span className="text-zinc-400">{language === "en" ? "Science Exhibition" : "የሳይንስ አውደ-ርዕይ"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid Layout: Quick Actions & Live Activities & School Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions (Stripe-like utility links) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="px-1">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{t("Quick Actions", language)}</h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={handleSimulateCheckin}
              className="w-full text-left p-4 rounded-2xl bg-emerald-500 text-white font-semibold flex items-center justify-between group shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <h4 className="text-xs font-bold">{t("Register Attendance", language)}</h4>
                  <p className="text-[9px] text-emerald-100 font-normal">{language === "en" ? "Simulate daily roll call" : "የዕለቱን ተሳትፎ መዝግብ"}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenGreenPointsModal}
              className="w-full text-left p-4 rounded-2xl glass border border-white/10 hover:border-emerald-500/40 text-zinc-200 font-semibold flex items-center justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-emerald-500" />
                <div>
                  <h4 className="text-xs font-bold">{language === "en" ? "Reward Green Points" : "ግሪን ነጥቦችን ሸልም"}</h4>
                  <p className="text-[9px] text-zinc-500 font-normal">{language === "en" ? "Award badges to students" : "ለተማሪዎች ልዩ ሽልማት ስጥ"}</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-emerald-500 group-hover:scale-125 transition-transform" />
            </button>

            <button
              onClick={onOpenMoodCheckModal}
              className="w-full text-left p-4 rounded-2xl glass border border-white/10 hover:border-emerald-500/40 text-zinc-200 font-semibold flex items-center justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-emerald-500" />
                <div>
                  <h4 className="text-xs font-bold">{t("Mood Check", language)}</h4>
                  <p className="text-[9px] text-zinc-500 font-normal">{language === "en" ? "Review wellness analytics" : "የተማሪዎችን ስሜት እና ጤንነት መርምር"}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-500 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleBirthdayAction}
              className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold flex items-center justify-between group shadow-md hover:brightness-110 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-zinc-900" />
                <div>
                  <h4 className="text-xs font-bold">{t("Birthday Celebration", language)}</h4>
                  <p className="text-[9px] text-yellow-950/80 font-semibold">{language === "en" ? "Trigger virtual greeting card" : "የልደት ካርድ በኮንፈቲ ላክ"}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-900 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* School Announcements */}
        <div className="lg:col-span-1 space-y-4">
          <div className="px-1 flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{t("Announcements", language)}</h3>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
              <BellRing className="w-3 h-3 animate-bounce" /> {mockAnnouncements.length}
            </span>
          </div>

          <div className="space-y-3">
            {mockAnnouncements.map((ann) => (
              <div
                key={ann.id}
                onClick={() => setActiveAnnouncement(activeAnnouncement === ann.id ? null : ann.id)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  ann.important
                    ? "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/60"
                    : "bg-white/5 border-white/10 hover:border-zinc-500/30"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                    {ann.date}
                  </span>
                  {ann.important && (
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-500/25 text-red-400 font-bold uppercase tracking-wider">
                      {language === "en" ? "Urgent" : "አስቸኳይ"}
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-zinc-200 mt-2">
                  {language === "en" ? ann.title : ann.titleAmharic}
                </h4>
                <p className={`text-[11px] text-zinc-400 mt-1.5 transition-all leading-relaxed ${
                  activeAnnouncement === ann.id ? "line-clamp-none text-zinc-300" : "line-clamp-2"
                }`}>
                  {language === "en" ? ann.excerpt : ann.excerptAmharic}
                </p>
                <div className="mt-2 text-[10px] text-emerald-500 font-semibold flex items-center justify-end gap-0.5">
                  <span>{activeAnnouncement === ann.id ? "Read Less" : "Read More"}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities (System Log) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="px-1">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{t("Recent Activities", language)}</h3>
          </div>

          <div className="rounded-3xl glass border border-white/10 p-5 space-y-4">
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {mockActivities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0 animate-ping" />
                  <div className="space-y-1">
                    <p className="text-zinc-300 font-medium leading-relaxed">
                      {language === "en" ? act.description : act.descriptionAmharic}
                    </p>
                    <span className="text-[10px] text-zinc-500 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
