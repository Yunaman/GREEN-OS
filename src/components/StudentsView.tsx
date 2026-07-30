"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudentTimelines, Student } from "@/lib/mockData";
import {
  Search,
  Sparkles,
  Activity,
  GraduationCap,
  QrCode,
  Lightbulb,
  Award,
  X,
  UserCheck,
  CheckCircle,
  FileText,
  Heart,
  Save,
  ShieldCheck,
  MapPin,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StudentsViewProps {
  onOpenDigitalId: (studentId: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ onOpenDigitalId }) => {
  const { language, students, updateStudent } = useApp();

  // Selected state
  const [selectedStudentId, setSelectedStudentId] = useState<string>("GNG-2026-001");

  // Advanced filters state
  const [localSearch, setLocalSearch] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<string>("All");
  const [genderFilter, setGenderFilter] = useState<string>("All");
  const [campusFilter, setCampusFilter] = useState<string>("All");

  // Auto-save form indicator state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // List of unique grades and campuses
  const uniqueGrades = ["All", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const uniqueCampuses = ["All", "Tulu Dimtu Campus"];

  // Filter students based on all 4 search/filter matrices
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      student.amharicName.includes(localSearch) ||
      student.id.toLowerCase().includes(localSearch.toLowerCase());

    const matchesGrade = gradeFilter === "All" || student.grade.includes(gradeFilter);
    const matchesGender = genderFilter === "All" || student.gender === genderFilter;
    const matchesCampus = campusFilter === "All" || student.campus === campusFilter;

    return matchesSearch && matchesGrade && matchesGender && matchesCampus;
  });

  const studentTimeline = mockStudentTimelines[selectedStudent.id] || [];

  // Edit fields handlers (Mutable Local State Sync with Auto-Save simulation)
  const handleFieldChange = (field: keyof Student, value: string) => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate standard debounced automatic server saving
    setTimeout(() => {
      updateStudent(selectedStudent.id, { [field]: value });
      setIsSaving(false);
      setSaveSuccess(true);

      // Auto-clear success check mark
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 800);
  };

  // Generate automated AI insights matching selection
  const getAIInsight = (student: Student) => {
    if (student.gpa >= 3.9) {
      return language === "en"
        ? `${student.name} is performing at an exceptional genius tier with a perfect GPA of ${student.gpa.toFixed(2)}. Highly recommend research pathways.`
        : `${student.name} በከፍተኛ ደረጃ በጥሩ ውጤት ${student.gpa.toFixed(2)} ነጥብ አስመዝግቧል። ተጨማሪ የምርምር መንገዶች ላይ እንዲሳተፍ ይመከራል።`;
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

      {/* Search & Advanced Multi-Filters (Apple & Linear design style) */}
      <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-900/80 flex flex-wrap items-center justify-between gap-4">

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder={language === "en" ? "Filter list by name or ID..." : "በስም ወይም መለያ ያጣሩ..."}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />
        </div>

        {/* Filters Select boxes */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* Grade filter */}
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-500">{language === "en" ? "Grade:" : "ክፍል:"}</span>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-zinc-300 font-bold"
            >
              {uniqueGrades.map(g => (
                <option key={g} value={g} className="bg-zinc-900 text-zinc-300">{g === "All" ? (language === "en" ? "All" : "ሁሉም") : g}</option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-500">{language === "en" ? "Gender:" : "ጾታ:"}</span>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-zinc-300 font-bold"
            >
              <option value="All" className="bg-zinc-900 text-zinc-300">{language === "en" ? "All" : "ሁሉም"}</option>
              <option value="Male" className="bg-zinc-900 text-zinc-300">{language === "en" ? "Male" : "ወንድ"}</option>
              <option value="Female" className="bg-zinc-900 text-zinc-300">{language === "en" ? "Female" : "ሴት"}</option>
            </select>
          </div>

          {/* Campus Filter */}
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-500">{language === "en" ? "Campus:" : "ግቢ:"}</span>
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-zinc-300 font-bold"
            >
              {uniqueCampuses.map(c => (
                <option key={c} value={c} className="bg-zinc-900 text-zinc-300">{c === "All" ? (language === "en" ? "All" : "ሁሉም") : "Tulu Dimtu"}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* The Three-Panel Handcrafted layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] overflow-hidden items-stretch">

        {/* PANEL 1: Left Directory list (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 h-full overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              {language === "en" ? "Active Roster" : "የተማሪዎች ዝርዝር"} ({filteredStudents.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredStudents.map((student) => {
              const isSelected = student.id === selectedStudentId;
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "bg-zinc-900 border-zinc-800 shadow-lg"
                      : "bg-transparent border-transparent hover:bg-zinc-950/40"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-xl object-cover border border-zinc-800"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-zinc-200 truncate">
                        {language === "en" ? student.name : student.amharicName}
                      </h4>
                      <p className="text-[10px] text-zinc-500 truncate">{student.id} • {student.grade}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-emerald-400">
                    {student.gpa.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 2: Middle Master Profile with fully editable inputs & validation (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 flex flex-col h-full overflow-y-auto space-y-6 relative">

          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-14 h-14 rounded-2xl object-cover border border-zinc-800"
              />
              <div>
                <h2 className="text-base font-black text-zinc-100">
                  {language === "en" ? selectedStudent.name : selectedStudent.amharicName}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-wider mt-1">
                  <MapPin className="w-3 h-3" />
                  {selectedStudent.campus}
                </span>
              </div>
            </div>

            {/* Auto save notification banner inside card */}
            <div className="flex flex-col items-end gap-1.5">
              <button
                onClick={() => onOpenDigitalId(selectedStudent.id)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
                title="Generate Student QR ID Card"
              >
                <QrCode className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isSaving && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] text-emerald-400 font-bold flex items-center gap-1"
                  >
                    <Save className="w-3 h-3 animate-spin" /> Auto-Saving...
                  </motion.span>
                )}
                {saveSuccess && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] text-emerald-400 font-bold flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3" /> Saved!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Form Editable Fields Matrix */}
          <div className="space-y-4 text-xs">

            {/* Core parameters input block */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] text-zinc-500 font-bold uppercase block">{language === "en" ? "English Name" : "የእንግሊዘኛ ስም"}</label>
                <input
                  type="text"
                  value={selectedStudent.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-2.5 font-bold focus:outline-none focus:border-emerald-500/50 text-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-zinc-500 font-bold uppercase block">{language === "en" ? "Amharic Name" : "የአማርኛ ስም"}</label>
                <input
                  type="text"
                  value={selectedStudent.amharicName}
                  onChange={(e) => handleFieldChange("amharicName", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-2.5 font-bold focus:outline-none focus:border-emerald-500/50 text-zinc-200"
                />
              </div>
            </div>

            {/* Parent contact information editing */}
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                {language === "en" ? "Parent / Guardian Contact" : "የወላጅ መረጃ"}
              </h4>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-500 block uppercase font-semibold">{language === "en" ? "Guardian Name" : "የወላጅ ስም"}</label>
                  <input
                    type="text"
                    value={selectedStudent.parentName}
                    onChange={(e) => handleFieldChange("parentName", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 font-bold focus:outline-none focus:border-emerald-500/40 text-zinc-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-500 block uppercase font-semibold">{language === "en" ? "Guardian Phone" : "የወላጅ ስልክ"}</label>
                  <input
                    type="text"
                    value={selectedStudent.parentPhone}
                    onChange={(e) => handleFieldChange("parentPhone", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 font-bold focus:outline-none focus:border-emerald-500/40 text-zinc-300"
                  />
                </div>
              </div>
            </div>

            {/* Medical alert and custom conditions log */}
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-900 pb-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                {language === "en" ? "Emergency & Medical Telemetry" : "የድንገተኛ አደጋ መረጃ"}
              </h4>

              <div className="space-y-1">
                <span className="text-[9px] text-zinc-500 block uppercase font-semibold">{language === "en" ? "Allergies / Special Conditions" : "ልዩ ህክምና ክትትል"}</span>
                <input
                  type="text"
                  placeholder="None reported"
                  defaultValue="No allergies reported. Up-to-date vaccine ledger."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-300 focus:outline-none font-bold"
                />
              </div>
            </div>

            {/* Verified Achievements badges listing block */}
            <div className="space-y-2">
              <span className="text-[9px] text-zinc-500 font-bold block uppercase">{language === "en" ? "Verified Badges" : "ባጆች"}</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.badges.map((badge, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-bold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* PANEL 3: Right Side Telemetry: AI Insights, Timeline & SVG Progress (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 flex flex-col h-full overflow-y-auto space-y-6">

          {/* Real-time AI Insights engine */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1.5">
              <Lightbulb className="w-4 h-4 animate-bounce" />
              <span>{language === "en" ? "AI PERFORMANCE INSIGHT" : "የሰው ሰራሽ አስተዋይ ትንታኔ"}</span>
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              &ldquo;{getAIInsight(selectedStudent)}&rdquo;
            </p>
          </div>

          {/* Core progress SVG charts gauges */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-center space-y-2">
              <span className="text-[9px] text-zinc-500 block uppercase font-bold">{language === "en" ? "Attendance" : "ተሳትፎ"}</span>
              <div className="relative inline-flex items-center justify-center">
                {/* Simulated circle SVG gauge */}
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-zinc-800" strokeWidth="4" fill="transparent" />
                  <circle cx="28" cy="28" r="24" className="stroke-emerald-500" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset={150 - (150 * selectedStudent.attendanceRate) / 100} />
                </svg>
                <span className="absolute text-[10px] font-black text-zinc-200">{selectedStudent.attendanceRate}%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-center space-y-2">
              <span className="text-[9px] text-zinc-500 block uppercase font-bold">{language === "en" ? "GPA yield" : "ውጤት"}</span>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-zinc-800" strokeWidth="4" fill="transparent" />
                  <circle cx="28" cy="28" r="24" className="stroke-yellow-500" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset={150 - (150 * selectedStudent.gpa) / 4.0} />
                </svg>
                <span className="absolute text-[10px] font-black text-zinc-200">{selectedStudent.gpa.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Student vertical milestones timeline */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              {t("Student Timeline", language)}
            </h4>

            <div className="relative pl-5 space-y-4 border-l border-zinc-900">
              {studentTimeline.map((item, index) => (
                <div key={index} className="relative text-xs">
                  {/* Glowing Node */}
                  <span className="absolute -left-[24.5px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-zinc-500 font-bold block">{item.year}</span>
                    <h5 className="font-bold text-zinc-200">{item.title}</h5>
                    <p className="text-[10px] text-zinc-400 leading-normal">
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
  );
};
