"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents, mockStudentTimelines } from "@/lib/mockData";
import {
  Search,
  Contact,
  Sparkles,
  Activity,
  GraduationCap,
  Coins,
  Calendar,
  User,
  QrCode,
  ArrowUpRight,
  Lightbulb,
  Award,
  X,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StudentsViewProps {
  onOpenDigitalId: (studentId: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ onOpenDigitalId }) => {
  const { language, searchQuery, setSearchQuery } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("GNG-2026-001");
  const [gradeFilter, setGradeFilter] = useState<string>("All");

  const selectedStudent = mockStudents.find((s) => s.id === selectedStudentId) || mockStudents[0];

  // Filter students based on search and grade filters
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.amharicName.includes(searchQuery) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = gradeFilter === "All" || student.grade.includes(gradeFilter);

    return matchesSearch && matchesGrade;
  });

  const studentTimeline = mockStudentTimelines[selectedStudent.id] || [];

  // Automated premium AI Insights generator based on student metrics
  const getAIInsight = (student: typeof selectedStudent) => {
    if (student.gpa >= 3.9) {
      return language === "en"
        ? `${student.name} is performing at an exceptional genius tier with a perfect GPA of ${student.gpa.toFixed(2)}. Recommend advanced national competition streams.`
        : `${student.name} በከፍተኛ ደረጃ በጥሩ ውጤት ${student.gpa.toFixed(2)} ነጥብ አስመዝግቧል። ብሔራዊ ውድድሮች ላይ እንዲሳተፍ ይመከራል።`;
    } else if (student.attendanceRate < 90) {
      return language === "en"
        ? `${student.name}'s attendance has slipped to ${student.attendanceRate}%. Direct counselor interaction is advised to address wellness hurdles.`
        : `${student.name} የክፍል ተሳትፎው ወደ ${student.attendanceRate}% ቀንሷል። ድጋፍ ለማድረግ አማካሪ እንዲያነጋግረው ይመከራል።`;
    } else {
      return language === "en"
        ? `${student.name} is showing consistent steady progress. Outstanding behavior points scored (+${student.greenPoints} Green Points). Keep it up!`
        : `${student.name} ወጥ የሆነ ጥሩ እድገት እያሳየ ይገኛል። በጣም ጥሩ የስነ-ምግባር ነጥቦች (+${student.greenPoints} ግሪን ነጥቦች) አግኝቷል። ቀጥልበት!`;
    }
  };

  return (
    <div className="space-y-6">

      {/* Search & Quick Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-3xl border border-white/10">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t("Filter by Grade", language) + " / Name..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["All", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((filter) => (
            <button
              key={filter}
              onClick={() => setGradeFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                gradeFilter === filter
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-white/5 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {filter === "All" ? (language === "en" ? "All Grades" : "ሁሉም ክፍሎች") : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Student Deck & Interactive Analytics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Elegant Cards Deck (No ugly tables) */}
        <div className="lg:col-span-7 space-y-3.5">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">
            {t("Students", language)} ({filteredStudents.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredStudents.map((student) => {
              const isSelected = student.id === selectedStudentId;
              return (
                <motion.div
                  key={student.id}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`p-4 rounded-3xl cursor-pointer border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-emerald-500/40 glow-green"
                      : "bg-white/5 border-white/5 hover:border-zinc-500/20"
                  }`}
                >
                  {/* Subtle selection ring indicator */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/15 rounded-full blur-xl" />
                  )}

                  <div className="flex items-start gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-colors"
                    />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                        {language === "en" ? student.name : student.amharicName}
                        <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                          {student.grade}
                        </span>
                      </h4>
                      <p className="text-[10px] text-zinc-400">{student.id}</p>
                      <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                        🌱 {student.greenPoints} {t("Green Points", language)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Activity className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Att: {student.attendanceRate}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <GraduationCap className="w-3.5 h-3.5 text-yellow-500" />
                      <span>GPA: {student.gpa.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive AI Analytics, Digital ID Trigger, Timeline Panel */}
        <div className="lg:col-span-5 space-y-6">

          {/* Selected Student Profile Summary */}
          <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-4">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 glow-green"
                />
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {language === "en" ? selectedStudent.name : selectedStudent.amharicName}
                  </h3>
                  <p className="text-xs text-zinc-400">{selectedStudent.id} • {selectedStudent.grade}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    {selectedStudent.campus}
                  </span>
                </div>
              </div>

              {/* Digital QR ID Trigger Button */}
              <button
                onClick={() => onOpenDigitalId(selectedStudent.id)}
                className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-transparent transition-all duration-300"
                title="Generate Digital ID Card"
              >
                <QrCode className="w-5 h-5 animate-pulse" />
              </button>
            </div>

            {/* AI Student Insights Card Component */}
            <motion.div
              key={selectedStudent.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-zinc-950/60 border border-emerald-500/15 relative overflow-hidden group"
            >
              <div className="absolute -top-1 -left-1 w-8 h-8 bg-gradient-to-br from-emerald-500/30 to-yellow-500/10 rounded-full blur-md" />
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-400">
                <Lightbulb className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>AI STUDENT INSIGHT</span>
                <span className="ml-auto text-[8px] uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded">
                  GREEN ENGINE
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{getAIInsight(selectedStudent)}&rdquo;
              </p>
            </motion.div>

            {/* General metrics info */}
            <div className="grid grid-cols-2 gap-3.5 text-xs pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">{language === "en" ? "Parent Link" : "የወላጅ ስም"}</span>
                <p className="font-bold text-zinc-300">
                  {language === "en" ? selectedStudent.parentName : selectedStudent.parentAmharicName}
                </p>
                <span className="text-[10px] text-zinc-500">{selectedStudent.parentPhone}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">{language === "en" ? "Recent Wellness" : "የቅርብ ጊዜ ስሜት"}</span>
                <p className="font-bold text-zinc-300 flex items-center gap-1.5">
                  {selectedStudent.recentMood === "Happy" && "😊 Happy"}
                  {selectedStudent.recentMood === "Okay" && "😐 Okay"}
                  {selectedStudent.recentMood === "Need Support" && "😔 Support"}
                </p>
                <span className="text-[10px] text-zinc-500">Self reported</span>
              </div>
            </div>

            {/* Student Timeline Segment */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/10 pb-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                {t("Student Timeline", language)}
              </h4>

              <div className="relative pl-6 space-y-5 border-l-2 border-emerald-500/20">
                {studentTimeline.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Floating Node */}
                    <span className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-emerald-900 border-2 border-emerald-400 flex items-center justify-center text-white">
                      <Award className="w-2.5 h-2.5 text-emerald-400" />
                    </span>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {item.year}
                      </span>
                      <h5 className="text-xs font-bold text-zinc-200">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {language === "en" ? item.desc : item.descAmh}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
