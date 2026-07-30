"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Navigation, Sidebar } from "@/components/Navigation";
import { DashboardView } from "@/components/DashboardView";
import { StudentsView } from "@/components/StudentsView";
import { TeachersView } from "@/components/TeachersView";
import { ParentsView } from "@/components/ParentsView";
import { AttendanceView } from "@/components/AttendanceView";
import { ClassesView } from "@/components/ClassesView";
import { FinanceView } from "@/components/FinanceView";
import { ReportsView } from "@/components/ReportsView";
import { SettingsView } from "@/components/SettingsView";
import { CommandCenter } from "@/components/CommandCenter";

// Modal elements
import { GreenPointsModal } from "@/components/GreenPointsModal";
import { MoodCheckModal } from "@/components/MoodCheckModal";
import { BirthdayModal } from "@/components/BirthdayModal";
import { DigitalIdModal } from "@/components/DigitalIdModal";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, ShieldAlert, Cpu } from "lucide-react";
import { t } from "@/lib/mockData";

export default function Home() {
  const { currentTab, setCurrentTab, language } = useApp();

  // Modal active states
  const [isGreenPointsOpen, setIsGreenPointsOpen] = useState(false);
  const [isMoodCheckOpen, setIsMoodCheckOpen] = useState(false);
  const [isBirthdayOpen, setIsBirthdayOpen] = useState(false);
  const [birthdayStudent, setBirthdayStudent] = useState("Abel Bekele");
  const [isDigitalIdOpen, setIsDigitalIdOpen] = useState(false);
  const [activeDigitalIdStudent, setActiveDigitalIdStudent] = useState("GNG-2026-001");

  // Custom trigger handlers
  const handleTriggerBirthday = (name: string) => {
    setBirthdayStudent(name);
    setIsBirthdayOpen(true);
  };

  const handleOpenDigitalId = (studentId: string) => {
    setActiveDigitalIdStudent(studentId);
    setIsDigitalIdOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">

      {/* Top Header Navigation */}
      <Navigation />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Floating Sidebar */}
        <Sidebar />

        {/* Dynamic Responsive Workspace */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 relative">

          {/* Quick command switcher tabs (Visible on Tablet/Mobile instead of Sidebar) */}
          <div className="lg:hidden overflow-x-auto pb-2 flex items-center gap-1 border-b border-white/10">
            {[
              "Dashboard",
              "Students",
              "Teachers",
              "Parents",
              "Attendance",
              "Classes",
              "Finance",
              "Reports",
              "Settings"
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentTab === tab
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-white/5 text-zinc-400"
                }`}
              >
                {t(tab, language)}
              </button>
            ))}
          </div>

          {/* Quick toggle to launch Principal Command Center */}
          <div className="flex items-center justify-between flex-wrap gap-4 bg-zinc-950/40 p-5 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 animate-pulse">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">
                  {language === "en" ? "Principal Command Console" : "የዳይሬክተሩ ዋና የቁጥጥር ፓነል"}
                </h2>
                <p className="text-[10px] text-zinc-500">
                  {language === "en" ? "Overview of active campuses, school health indices, and system diagnostics." : "የካምፓሶች ሁኔታ፣ የተማሪዎች ስነ-ምግባር ምዘና እና የስርዓት እንቅስቃሴ መቆጣጠሪያ።"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab("Command Center")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === "Command Center"
                  ? "bg-emerald-500 text-white shadow-md glow-green"
                  : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/15"
              }`}
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>{language === "en" ? "Launch Command Hub" : "ዋናውን የቁጥጥር ማዕከል ክፈት"}</span>
            </button>
          </div>

          {/* Tab Views Content with elegant page slide animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="outline-none"
            >
              {currentTab === "Dashboard" && (
                <DashboardView
                  onTriggerBirthday={handleTriggerBirthday}
                  onOpenGreenPointsModal={() => setIsGreenPointsOpen(true)}
                  onOpenMoodCheckModal={() => setIsMoodCheckOpen(true)}
                />
              )}

              {currentTab === "Students" && (
                <StudentsView
                  onOpenDigitalId={handleOpenDigitalId}
                />
              )}

              {currentTab === "Teachers" && <TeachersView />}

              {currentTab === "Parents" && <ParentsView />}

              {currentTab === "Attendance" && <AttendanceView />}

              {currentTab === "Classes" && <ClassesView />}

              {currentTab === "Finance" && <FinanceView />}

              {currentTab === "Reports" && <ReportsView />}

              {currentTab === "Settings" && <SettingsView />}

              {currentTab === "Command Center" && <CommandCenter />}
            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      {/* Floating Interactive Overlays / Special WOW Modals */}
      <AnimatePresence>
        {isGreenPointsOpen && (
          <GreenPointsModal
            isOpen={isGreenPointsOpen}
            onClose={() => setIsGreenPointsOpen(false)}
          />
        )}

        {isMoodCheckOpen && (
          <MoodCheckModal
            isOpen={isMoodCheckOpen}
            onClose={() => setIsMoodCheckOpen(false)}
          />
        )}

        {isBirthdayOpen && (
          <BirthdayModal
            isOpen={isBirthdayOpen}
            studentName={birthdayStudent}
            onClose={() => setIsBirthdayOpen(false)}
          />
        )}

        {isDigitalIdOpen && (
          <DigitalIdModal
            isOpen={isDigitalIdOpen}
            studentId={activeDigitalIdStudent}
            onClose={() => setIsDigitalIdOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
