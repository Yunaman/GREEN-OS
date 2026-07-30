"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents, greenPointRules } from "@/lib/mockData";
import {
  Target,
  X,
  Award,
  CheckCircle,
  Sparkles,
  Trees,
  BookOpen,
  Flame,
  UserCheck
} from "lucide-react";
import { motion } from "framer-motion";

interface GreenPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GreenPointsModal: React.FC<GreenPointsModalProps> = ({ isOpen, onClose }) => {
  const { language, addNotification } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("GNG-2026-001");
  const [selectedRuleId, setSelectedRuleId] = useState<string>("gpr-2");

  if (!isOpen) return null;

  const handleAwardPoints = () => {
    const student = mockStudents.find((s) => s.id === selectedStudentId);
    const rule = greenPointRules.find((r) => r.id === selectedRuleId);

    if (!student || !rule) return;

    // Update notification
    addNotification(
      `Awarded +${rule.points} Green Points to ${student.name} for ${rule.action}.`,
      `ለ ${student.amharicName} ስለ "${rule.actionAmharic}" +${rule.points} ግሪን ነጥብ ተሸልሟል።`
    );

    // Trigger feedback success alert
    alert(
      language === "en"
        ? `Success! ${student.name} is now rewarded with +${rule.points} Green Points.`
        : `ተሳክቷል! ለ ${student.amharicName} +${rule.points} ግሪን ነጥቦች ተጨምረዋል።`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-3xl glass-premium border border-emerald-500/20 p-6 space-y-5 shadow-2xl relative glow-green"
      >

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Trees className="w-5 h-5 text-emerald-400 animate-bounce" />
            <h3 className="text-sm md:text-base font-black text-white">
              {language === "en" ? "Award Eco-Green Points" : "ግሪን ነጥቦችን መሸለሚያ"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Container */}
        <div className="space-y-4 text-xs">

          {/* Select Student */}
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
              {language === "en" ? "Target Student" : "ተማሪ ይምረጡ"}
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

          {/* Select Rule */}
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
              {language === "en" ? "Select Ecological Action Category" : "ሽልማት የሚያሰጥ ተግባር"}
            </label>
            <div className="space-y-2">
              {greenPointRules.map((rule) => {
                const isSelected = selectedRuleId === rule.id;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedRuleId(rule.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/40"
                        : "bg-white/5 border-white/5 hover:border-zinc-850"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-zinc-200">
                        {language === "en" ? rule.action : rule.actionAmharic}
                      </p>
                      <span className="text-[9px] uppercase text-emerald-400 font-semibold tracking-wider">
                        {rule.category}
                      </span>
                    </div>

                    <span className="text-xs font-black text-emerald-400 whitespace-nowrap pl-2">
                      +{rule.points} GP
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
            onClick={handleAwardPoints}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300"
          >
            <Award className="w-4 h-4" />
            <span>{language === "en" ? "Award Reward Points" : "ሽልማቱን አጽድቅ"}</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
