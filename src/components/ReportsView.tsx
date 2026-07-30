"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents } from "@/lib/mockData";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  TrendingUp,
  Sparkles,
  CalendarDays,
  Users,
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

export const ReportsView: React.FC = () => {
  const { language } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("GNG-2026-001");

  const activeStudent = mockStudents.find((s) => s.id === selectedStudentId) || mockStudents[0];

  const handleSimulateDownload = (format: string) => {
    alert(
      language === "en"
        ? `Generating high-fidelity ${format} report card for ${activeStudent.name}...`
        : `ለ ${activeStudent.amharicName} የ ${format} ውጤት ሪፖርት እየተዘጋጀ ነው...`
    );
    setTimeout(() => {
      alert(
        language === "en"
          ? `${format} report successfully compiled & saved to downloads folder!`
          : `የ ${format} ሪፖርት በተሳካ ሁኔታ ተዘጋጅቶ በኮምፒውተርዎ ላይ ተቀምጧል!`
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">

      {/* Dynamic metric overview blocks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-1">
          <span className="text-[10px] text-emerald-500 font-bold block uppercase tracking-wider">
            {language === "en" ? "Median GPA" : "አማካኝ ውጤት"}
          </span>
          <h4 className="text-xl font-extrabold text-white">3.75</h4>
          <span className="text-[9px] text-zinc-500">Addis Ababa Tier-1 level</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-1">
          <span className="text-[10px] text-emerald-500 font-bold block uppercase tracking-wider">
            {language === "en" ? "Quality Education Rating" : "የትምህርት ጥራት ምዘና"}
          </span>
          <h4 className="text-xl font-extrabold text-white">98.4%</h4>
          <span className="text-[9px] text-zinc-500">Based on regional evaluations</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-1">
          <span className="text-[10px] text-emerald-500 font-bold block uppercase tracking-wider">
            {language === "en" ? "Science Olympiad Winners" : "የሳይንስ ውድድር አሸናፊዎች"}
          </span>
          <h4 className="text-xl font-extrabold text-white">12 Students</h4>
          <span className="text-[9px] text-zinc-500">Arbaminch and Addis Ababa</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-1">
          <span className="text-[10px] text-emerald-500 font-bold block uppercase tracking-wider">
            {language === "en" ? "Graduates Enrolled" : "የተማሪዎች ዝውውር"}
          </span>
          <h4 className="text-xl font-extrabold text-white">100%</h4>
          <span className="text-[9px] text-zinc-500">Into state-level premium colleges</span>
        </div>

      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left column: Student list for report generation */}
        <div className="lg:col-span-5 space-y-3.5">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">
            {language === "en" ? "Choose Student for Performance Report" : "የሪፖርት ካርድ ለማውጣት ተማሪ ይምረጡ"}
          </h4>

          <div className="space-y-2">
            {mockStudents.map((student) => {
              const isSelected = selectedStudentId === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/35 glow-green"
                      : "bg-white/5 border-white/5 hover:border-zinc-500/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-xl object-cover border border-zinc-800"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-zinc-100">
                        {language === "en" ? student.name : student.amharicName}
                      </h5>
                      <p className="text-[10px] text-zinc-500">{student.id} • {student.grade}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-400">
                    GPA: {student.gpa.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Printable report card and charts */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  {language === "en" ? "Interactive Report Card Console" : "ተንቀሳቃሽ የተማሪ ውጤት ካርድ"}
                </h3>
                <p className="text-[10px] text-zinc-500">
                  {language === "en" ? "Review academic progress, grades, and counselor commentary." : "የአካዳሚክ እድገትን፣ ውጤቶችን እና የአማካሪ አስተያየቶችን ይመልከቱ።"}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSimulateDownload("PDF")}
                  className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                  title="Download as PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSimulateDownload("Excel Sheet")}
                  className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                  title="Export to Excel"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated premium card printout preview */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-4">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">
                    {language === "en" ? "Green New Generation School" : "ግሪን ኒው ጀነሬሽን ትምህርት ቤት"}
                  </h4>
                  <p className="text-[9px] text-zinc-500">Addis Ababa, Ethiopia • Tulu Dimtu Campus</p>
                </div>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                  2018 E.C. Mid Semester Card
                </span>
              </div>

              {/* Student basic spec */}
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-300">
                <div>
                  <span className="text-[9px] text-zinc-500 block">STUDENT NAME / ተማሪ</span>
                  <span className="font-bold">
                    {language === "en" ? activeStudent.name : activeStudent.amharicName}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block">GRADE / ክፍል</span>
                  <span className="font-bold">{activeStudent.grade}</span>
                </div>
              </div>

              {/* Simulated subject-by-subject grades (No tables - pure list grids) */}
              <div className="space-y-2 pt-2">
                <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">
                  {language === "en" ? "Academic Course Breakdown" : "የትምህርት ውጤት ዝርዝር"}
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                    <span className="font-semibold text-zinc-200">Advanced Mathematics</span>
                    <span className="font-bold text-emerald-400">98% (A+)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                    <span className="font-semibold text-zinc-200">Biology & Genetics</span>
                    <span className="font-bold text-emerald-400">92% (A)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                    <span className="font-semibold text-zinc-200">Amharic Literature</span>
                    <span className="font-bold text-emerald-400">95% (A)</span>
                  </div>
                </div>
              </div>

              {/* Counselor signature simulation */}
              <div className="pt-3 border-t border-white/5 flex justify-between items-end text-xs text-zinc-400">
                <div>
                  <span className="text-[9px] text-zinc-500 block">SYSTEM STATUS / ሁኔታ</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Certified Passed
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[8px] text-zinc-500 block italic">Digitally verified by Green OS</span>
                  <span className="font-bold text-zinc-300">Dr. Yetneberk Kassa</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
