"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents } from "@/lib/mockData";
import {
  HeartHandshake,
  UserCheck,
  DollarSign,
  Send,
  MessageSquare,
  BellRing,
  Clock,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ParentsView: React.FC = () => {
  const { language, addNotification } = useApp();
  const [activeParentIndex, setActiveParentIndex] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>("");

  // Select unique parent groupings
  const uniqueParentsList = mockStudents.map((student) => ({
    parentName: student.parentName,
    parentAmharicName: student.parentAmharicName,
    parentPhone: student.parentPhone,
    studentName: student.name,
    studentAmharicName: student.amharicName,
    studentGrade: student.grade,
    outstandingFees: student.outstandingFees,
    gpa: student.gpa,
    avatar: student.avatar
  }));

  const activeParent = uniqueParentsList[activeParentIndex] || uniqueParentsList[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    addNotification(
      `Secure SMS sent to ${activeParent.parentName}: "${messageText}"`,
      `ለ ${activeParent.parentAmharicName} አጭር የጽሁፍ መልዕክት ተልኳል፡ "${messageText}"`
    );

    setMessageText("");
    alert(language === "en" ? "Message dispatched via Green SMS Gateway!" : "መልዕክትዎ በግሪን ኤስኤምኤስ ጌትዌይ በኩል ተልኳል!");
  };

  return (
    <div className="space-y-6">

      {/* Overview Intro Banner */}
      <div className="p-5 rounded-3xl bg-zinc-900/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-500" />
            {language === "en" ? "Family & Parent Connection Portal" : "የወላጅ እና ቤተሰብ ግንኙነት ማዕከል"}
          </h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">
            {language === "en" ? "Direct encrypted communications, ETB billing queries, and child telemetry updates." : "ቀጥተኛ ግንኙነቶች፣ የብር የክፍያ መጠይቆች እና የልጆች የእለት ተእለት እድገት መረጃዎች።"}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-xs font-bold text-emerald-400">
            {language === "en" ? "Encrypted SMS Gateway Active" : "ደህንነቱ የተጠበቀ ኤስኤምኤስ ገባሪ"}
          </span>
        </div>
      </div>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Parent selection list */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">
            {language === "en" ? "Registered Family Guardians" : "የተመዘገቡ ወላጆች / አሳዳጊዎች"}
          </h4>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {uniqueParentsList.map((parent, idx) => {
              const isActive = activeParentIndex === idx;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 3 }}
                  onClick={() => setActiveParentIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-500/15 border-emerald-500/35 glow-green"
                      : "bg-white/5 border-white/5 hover:border-zinc-500/25"
                  }`}
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-zinc-100">
                      {language === "en" ? parent.parentName : parent.parentAmharicName}
                    </h5>
                    <p className="text-[10px] text-zinc-400">
                      {language === "en" ? "Guardian of" : "አሳዳጊ ለ"} <span className="text-emerald-400 font-semibold">{language === "en" ? parent.studentName : parent.studentAmharicName}</span>
                    </p>
                    <p className="text-[9px] text-zinc-500">{parent.parentPhone}</p>
                  </div>

                  {parent.outstandingFees > 0 ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      Fee: {parent.outstandingFees} ETB
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                      {language === "en" ? "Cleared" : "የተከፈለ"}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Communication Console and telemetry details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5">

            {/* Guardian focus header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white">
                  {language === "en" ? activeParent.parentName : activeParent.parentAmharicName}
                </h3>
                <p className="text-xs text-zinc-400">
                  {language === "en" ? `Primary Contact: ${activeParent.parentPhone}` : `ዋና ስልክ ቁጥር፡ ${activeParent.parentPhone}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={activeParent.avatar}
                  alt={activeParent.studentName}
                  className="w-10 h-10 rounded-xl object-cover border border-emerald-500"
                />
                <div className="text-xs">
                  <span className="text-zinc-500 block text-[9px] uppercase">{language === "en" ? "Linked Student" : "የተያያዘ ተማሪ"}</span>
                  <span className="font-bold text-zinc-200">
                    {language === "en" ? activeParent.studentName : activeParent.studentAmharicName}
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Telemetry Overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
                  {language === "en" ? "Academic Telemetry" : "የትምህርት ደረጃTelemetry"}
                </span>
                <p className="font-extrabold text-white text-sm">GPA: {activeParent.gpa.toFixed(2)}</p>
                <p className="text-[9px] text-zinc-500">{activeParent.studentGrade}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
                  {language === "en" ? "Finance Standing" : "የፋይናንስ ሁኔታ"}
                </span>
                <p className={`font-extrabold text-sm ${activeParent.outstandingFees > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                  {activeParent.outstandingFees} ETB
                </p>
                <p className="text-[9px] text-zinc-500">
                  {activeParent.outstandingFees > 0 ? (language === "en" ? "Action required" : "ክፍያ ይጠበቃል") : (language === "en" ? "Account in excellent standing" : "ሙሉ በሙሉ የተከፈለ")}
                </p>
              </div>
            </div>

            {/* Direct Instant SMS Form */}
            <form onSubmit={handleSendMessage} className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  {language === "en" ? "Send Instant Secure Message" : "ቀጥተኛ የኤስኤምኤስ መልዕክት መላኪያ"}
                </label>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                  SMS GATEWAY
                </span>
              </div>

              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={
                  language === "en"
                    ? `Message ${activeParent.parentName} about performance or fees...`
                    : `ለ ${activeParent.parentAmharicName} ስለ ትምህርት ቤት ወይም ክፍያ መልዕክት ይጻፉ...`
                }
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-emerald-500/60 rounded-2xl p-4 text-xs h-24 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all text-zinc-200 leading-relaxed"
              />

              <div className="flex items-center justify-between">
                <p className="text-[9px] text-zinc-500 max-w-xs leading-normal">
                  {language === "en" ? "Your message will be sent instantly to the registered Ethiopian phone number via Cloud-Gate SMS." : "መልዕክትዎ በክላውድ-ጌት ኤስኤምኤስ በኩል ወዲያውኑ ወደ ተመዘገበው የኢትዮጵያ ስልክ ቁጥር ይላካል።"}
                </p>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300"
                >
                  <span>{language === "en" ? "Send SMS" : "ኤስኤምኤስ ላክ"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Mock feed of previous communications */}
            <div className="space-y-3.5 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {language === "en" ? "Previous Communications Log" : "የቀደሙ መልዕክቶች መዝገብ"}
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between">
                  <div>
                    <span className="font-bold text-emerald-400 block">{language === "en" ? "SaaS Auto-Alert" : "ስርዓት አውቶማቲክ ማሳወቂያ"}</span>
                    <p className="text-zinc-300 mt-1">
                      {language === "en"
                        ? `Monthly grade cards published for ${activeParent.studentName}.`
                        : `ለ ${activeParent.studentAmharicName} የወርሃዊ ውጤት ካርድ ወጥቷል።`}
                    </p>
                  </div>
                  <span className="text-[9px] text-zinc-500 whitespace-nowrap">2 days ago</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
