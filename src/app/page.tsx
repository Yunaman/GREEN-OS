"use client";

import React, { useState, useEffect } from "react";
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

// Modal overlays
import { GreenPointsModal } from "@/components/GreenPointsModal";
import { MoodCheckModal } from "@/components/MoodCheckModal";
import { BirthdayModal } from "@/components/BirthdayModal";
import { DigitalIdModal } from "@/components/DigitalIdModal";

import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity, Info, Command, X } from "lucide-react";
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
  const [showShortcutOverlay, setShowShortcutOverlay] = useState(false);

  // Trigger handlers
  const handleTriggerBirthday = (name: string) => {
    setBirthdayStudent(name);
    setIsBirthdayOpen(true);
  };

  const handleOpenDigitalId = (studentId: string) => {
    setActiveDigitalIdStudent(studentId);
    setIsDigitalIdOpen(true);
  };

  // Keyboard Shortcuts Listener (Ctrl+K to focus search / Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowShortcutOverlay((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsGreenPointsOpen(false);
        setIsMoodCheckOpen(false);
        setIsBirthdayOpen(false);
        setIsDigitalIdOpen(false);
        setShowShortcutOverlay(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">

      {/* Top Header Navigation */}
      <Navigation />

      {/* Main split grid */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Collapsible Sidebar */}
        <Sidebar />

        {/* Dynamic Workspace Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative">

          {/* Mobile Tab Quick switcher (Visible only on Mobile) */}
          <div className="lg:hidden overflow-x-auto pb-2 flex items-center gap-1 border-b border-zinc-900">
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
                    : "bg-zinc-900 text-zinc-400"
                }`}
              >
                {t(tab, language)}
              </button>
            ))}
          </div>

          {/* Low-profile Command center quick trigger - Handcrafted styling */}
          <div className="flex items-center justify-between flex-wrap gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-900">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-emerald-500" />
              <div>
                <h2 className="text-xs font-bold text-zinc-200">
                  {language === "en" ? "Principal Command Center Console" : "የዳይሬክተሩ ዋና መቆጣጠሪያ ማዕከል"}
                </h2>
                <p className="text-[10px] text-zinc-500">
                  {language === "en" ? "Real-time state telemetry, diagnostic monitors, and synchronised campus streams." : "የካምፓሶች ሁኔታ፣ የተማሪዎች ስነ-ምግባር ምዘና እና የስርዓት መቆጣጠሪያ።"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab("Command Center")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === "Command Center"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                  : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>{language === "en" ? "Launch Command Console" : "ዋናውን መቆጣጠሪያ ማዕከል ክፈት"}</span>
            </button>
          </div>

          {/* Tab Views Content with fast transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
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

      {/* Keyboard Shortcuts Dialog Overlay (Ctrl+K Guide) */}
      <AnimatePresence>
        {showShortcutOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4 shadow-2xl text-xs text-zinc-300"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Command className="w-4 h-4 text-emerald-400" />
                  Keyboard Shortcuts Guide
                </span>
                <button onClick={() => setShowShortcutOverlay(false)} className="text-zinc-500 hover:text-zinc-300">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1">
                  <span>Open search / Focus filter</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 font-bold">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between py-1">
                  <span>Close dialogs / Cancel action</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 font-bold">Esc</kbd>
                </div>
                <div className="flex justify-between py-1">
                  <span>Toggle light/dark layout theme</span>
                  <span className="text-[10px] text-zinc-500">Top-right switcher</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Special Wow Modals */}
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
