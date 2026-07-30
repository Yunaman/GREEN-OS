"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockTeachers } from "@/lib/mockData";
import {
  GraduationCap,
  MapPin,
  Sparkles,
  Phone,
  Star,
  Award,
  BookOpen,
  Heart,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export const TeachersView: React.FC = () => {
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTeachers = mockTeachers.filter((t) => {
    return selectedCategory === "All" || t.category === selectedCategory;
  });

  return (
    <div className="space-y-6">

      {/* Category selector */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-zinc-900/40 p-4 rounded-3xl border border-white/10">
        <div>
          <h3 className="text-sm font-bold text-zinc-100">{language === "en" ? "Faculty Directory" : "የመምህራን ማውጫ"}</h3>
          <p className="text-[10px] text-zinc-500">{language === "en" ? "Highly certified staff from Addis Ababa & Arbaminch" : "ከአዲስ አበባ እና አርባምንጭ የተውጣጡ ከፍተኛ ማዕረግ ያላቸው መምህራን"}</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "Pre School", "KG", "Primary", "High School"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-white shadow-md glow-green"
                  : "bg-white/5 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat === "All" ? (language === "en" ? "All Faculty" : "ሁሉም መምህራን") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers interactive cards deck (No ugly tables) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="rounded-3xl glass-premium border border-emerald-500/10 hover:border-emerald-500/30 p-5 shadow-lg relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />

            {/* Profile Row */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors shadow-md"
                />
                <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center font-bold text-[9px] shadow border border-white">
                  ★
                </span>
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-zinc-100">
                    {language === "en" ? teacher.name : teacher.amharicName}
                  </h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold tracking-wide">
                  {language === "en" ? teacher.role : teacher.amharicRole}
                </p>
                <p className="text-[10px] text-zinc-400">{teacher.id}</p>
              </div>
            </div>

            {/* Teacher info specs */}
            <div className="mt-5 space-y-3 pt-4 border-t border-white/5 text-xs text-zinc-300">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  {language === "en" ? "Subject Focus" : "የማስተማር ትኩረት"}
                </span>
                <span className="font-semibold text-zinc-200 text-right max-w-[150px] truncate">
                  {teacher.subject}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {language === "en" ? "Location / Campus" : "ካምፓስ"}
                </span>
                <span className="font-semibold text-zinc-300">
                  {teacher.campus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-yellow-500" />
                  {language === "en" ? "Experience" : "የማስተማር ልምድ"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] text-emerald-400 font-bold">
                  {teacher.experience}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  {language === "en" ? "Student Rating" : "የተማሪዎች ምዘና"}
                </span>
                <span className="font-bold text-yellow-400 flex items-center gap-1">
                  {teacher.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>

            {/* Micro Quick contact action */}
            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {teacher.phone}
              </span>
              <button
                className="text-[10px] text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1 group/btn"
                onClick={() => alert(`Initiating secure direct session chat with ${teacher.name}...`)}
              >
                <span>{language === "en" ? "Secure Chat" : "ደህንነቱ የተጠበቀ ግንኙነት"}</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
