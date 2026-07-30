"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents } from "@/lib/mockData";
import {
  CalendarDays,
  Check,
  X as CloseIcon,
  AlertCircle,
  Activity,
  Flame,
  RefreshCw,
  Sparkles,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

export const AttendanceView: React.FC = () => {
  const { language, addNotification } = useApp();
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, "Present" | "Absent" | "Late">>(() => {
    const initial: Record<string, "Present" | "Absent" | "Late"> = {};
    mockStudents.forEach((student) => {
      initial[student.id] = "Present";
    });
    return initial;
  });

  const toggleStatus = (studentId: string, status: "Present" | "Absent" | "Late") => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    addNotification(
      "Daily Attendance metrics synchronized with Green-Cloud servers.",
      "የዕለቱ የተማሪዎች ተሳትፎ መረጃ ከግሪን-ክላውድ ጋር ተመሳስሏል።"
    );
    alert(language === "en" ? "Attendance roster submitted!" : "ተሳትፎ በተሳካ ሁኔታ ተመዝግቧል!");
  };

  return (
    <div className="space-y-6">

      {/* Attendance Header with custom statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              {language === "en" ? "Daily Attendance Yield" : "የእለት ተሳትፎ ምጣኔ"}
            </span>
            <h4 className="text-2xl font-extrabold text-white">96.8%</h4>
            <p className="text-[10px] text-zinc-400">
              {language === "en" ? "Goal is >95.0% daily" : "የቀን ግቡ ከ95% በላይ መሆን ነው"}
            </p>
          </div>
          <CalendarDays className="w-10 h-10 text-emerald-400" />
        </div>

        <div className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
              {language === "en" ? "Consecutive Perfect Weeks" : "ፍጹም ሳምንታት"}
            </span>
            <h4 className="text-2xl font-extrabold text-zinc-100">4 Weeks</h4>
            <p className="text-[10px] text-zinc-400">
              {language === "en" ? "Tulu Dimtu Campus is leading" : "በትሉ ዲምቱ ካምፓስ መሪነት"}
            </p>
          </div>
          <Flame className="w-10 h-10 text-amber-500 animate-pulse" />
        </div>

        <div className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              {language === "en" ? "Active Roster Size" : "የተማሪዎች ቁጥር"}
            </span>
            <h4 className="text-2xl font-extrabold text-zinc-100">{mockStudents.length} Students</h4>
            <p className="text-[10px] text-zinc-400">
              {language === "en" ? "Roll-call check enabled" : "ተሳትፎ መቆጣጠሪያው ገባሪ ነው"}
            </p>
          </div>
          <Activity className="w-10 h-10 text-emerald-500" />
        </div>
      </div>

      {/* Grid: Live Interactive Roll-Call Deck (No ugly tables) */}
      <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
              {language === "en" ? "Live Roll-Call Console" : "ተንቀሳቃሽ የተሳትፎ መዝገብ"}
            </h3>
            <p className="text-[10px] text-zinc-500">
              {language === "en" ? "Toggle status below. Real-time parent notification triggers on absent flags." : "ከተማሪዎቹ ስም በታች ያለውን ሁኔታ ይቀይሩ። በክፍል ያልተገኙ ተማሪዎች ወላጆቻቸው ወዲያውኑ መልዕክት ይደርሳቸዋል።"}
            </p>
          </div>

          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300"
          >
            <Check className="w-4 h-4" />
            <span>{language === "en" ? "Commit Attendance" : "ተሳትፎን መዝግብ"}</span>
          </button>
        </div>

        {/* Attendance card grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStudents.map((student) => {
            const currentStatus = attendanceRecords[student.id];
            return (
              <div
                key={student.id}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  currentStatus === "Present" ? "bg-emerald-500/5 border-emerald-500/20" :
                  currentStatus === "Absent" ? "bg-rose-500/5 border-rose-500/25" :
                  "bg-amber-500/5 border-amber-500/25"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover border border-zinc-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-200">
                        {language === "en" ? student.name : student.amharicName}
                      </h4>
                      <p className="text-[9px] text-zinc-500">{student.id} • {student.grade}</p>
                    </div>
                  </div>

                  {/* Tiny Status Indicator Badge */}
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    currentStatus === "Present" ? "bg-emerald-500/20 text-emerald-400" :
                    currentStatus === "Absent" ? "bg-rose-500/20 text-rose-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {currentStatus}
                  </span>
                </div>

                {/* Interactive State Toggle Buttons */}
                <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-1.5 text-[10px]">
                  <button
                    onClick={() => toggleStatus(student.id, "Present")}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      currentStatus === "Present"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-white/5 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {language === "en" ? "Present" : "ተገኝቷል"}
                  </button>
                  <button
                    onClick={() => toggleStatus(student.id, "Absent")}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      currentStatus === "Absent"
                        ? "bg-rose-500 text-white shadow-sm"
                        : "bg-white/5 text-zinc-500 hover:text-rose-400"
                    }`}
                  >
                    {language === "en" ? "Absent" : "አልመጣም"}
                  </button>
                  <button
                    onClick={() => toggleStatus(student.id, "Late")}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      currentStatus === "Late"
                        ? "bg-amber-500 text-zinc-950 shadow-sm"
                        : "bg-white/5 text-zinc-500 hover:text-amber-400"
                    }`}
                  >
                    {language === "en" ? "Late" : "ዘግይቷል"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
