"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents } from "@/lib/mockData";
import { X, Heart, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface MoodCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoodCheckModal: React.FC<MoodCheckModalProps> = ({ isOpen, onClose }) => {
  const { language, addNotification } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("GNG-2026-001");
  const [mood, setMood] = useState<"Happy" | "Okay" | "Need Support">("Happy");

  if (!isOpen) return null;

  const handleSubmitMood = () => {
    const student = mockStudents.find((s) => s.id === selectedStudentId);
    if (!student) return;

    addNotification(
      `${student.name} reported wellness state: ${mood === "Happy" ? "😊 Happy" : mood === "Okay" ? "😐 Okay" : "😔 Need Support"}.`,
      `${student.amharicName} አጠቃላይ ስሜቱን እና ጤንነቱን በስርዓቱ ላይ መዝግቧል፡ ${mood === "Happy" ? "ደስተኛ" : mood === "Okay" ? "ደህና" : "እገዛ ይፈልጋል"}።`
    );

    alert(
      language === "en"
        ? `Wellness status successfully updated for ${student.name}!`
        : `ለ ${student.amharicName} የተጠቃሚ ስሜት መግለጫ በተሳካ ሁኔታ ተመዝግቧል!`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-3xl glass-premium border border-emerald-500/20 p-6 space-y-5 shadow-2xl relative glow-green"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="text-sm font-black text-white">
              {language === "en" ? "Student Wellness check-in" : "የተማሪዎች ስሜት እና ጤንነት መቆጣጠሪያ"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">

          <div className="space-y-2">
            <label className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
              {language === "en" ? "Select Student" : "ተማሪ ይምረጡ"}
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl p-3 text-xs focus:outline-none font-bold text-zinc-200"
            >
              {mockStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {language === "en" ? s.name : s.amharicName} ({s.grade})
                </option>
              ))}
            </select>
          </div>

          {/* Emoji selector block */}
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
              {language === "en" ? "Select Mood Status" : "የስሜት ምርጫ"}
            </label>

            <div className="grid grid-cols-3 gap-3.5 text-center">
              {[
                { type: "Happy", emoji: "😊", label: "Happy", labelAmh: "ደስተኛ" },
                { type: "Okay", emoji: "😐", label: "Okay", labelAmh: "ደህና" },
                { type: "Need Support", emoji: "😔", label: "Need Support", labelAmh: "እገዛ እፈልጋለሁ" }
              ].map((m) => {
                const isSelected = mood === m.type;
                return (
                  <div
                    key={m.type}
                    onClick={() => setMood(m.type as "Happy" | "Okay" | "Need Support")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/40 scale-102 shadow-md"
                        : "bg-white/5 border-white/5 hover:border-zinc-850"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{m.emoji}</span>
                    <span className="font-bold text-zinc-200 block text-[10px]">
                      {language === "en" ? m.label : m.labelAmh}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-white/5 flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold"
          >
            {language === "en" ? "Cancel" : "አቋርጥ"}
          </button>
          <button
            onClick={handleSubmitMood}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{language === "en" ? "Commit Check-in" : "ምዝገባውን አጽድቅ"}</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
