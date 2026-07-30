"use client";

import React from "react";
import { useApp } from "@/lib/AppContext";
import { mockStudents } from "@/lib/mockData";
import { X, QrCode, Download, ShieldAlert, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

interface DigitalIdModalProps {
  isOpen: boolean;
  studentId: string;
  onClose: () => void;
}

export const DigitalIdModal: React.FC<DigitalIdModalProps> = ({ isOpen, studentId, onClose }) => {
  const { language } = useApp();

  if (!isOpen) return null;

  const student = mockStudents.find((s) => s.id === studentId) || mockStudents[0];

  const handleDownloadId = () => {
    alert(
      language === "en"
        ? `Encrypting digital handshake protocol for ${student.name}'s NFC credentials...`
        : `ለ ${student.amharicName} ዲጂታል መታወቂያ ደህንነቱ በተጠበቀ ሁኔታ እየተዘጋጀ ነው...`
    );
    setTimeout(() => {
      alert(
        language === "en"
          ? "High-fidelity wallet pass generated successfully! Ready for offline offline scans."
          : "ዲጂታል መታወቂያው በተሳካ ሁኔታ ተዘጋጅቷል! ለመቃኘት ዝግጁ ነው።"
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="w-full max-w-sm rounded-3xl glass-premium border border-emerald-500/20 p-6 space-y-6 shadow-2xl relative glow-green"
      >

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              {language === "en" ? "Student Digital ID" : "ዲጂታል መታወቂያ"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Apple-wallet-style ID Card Front */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-950 to-zinc-950 p-5 border border-emerald-500/30 text-white space-y-5 shadow-xl">
          {/* Background glowing rings */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

          {/* Top Brand Block */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-emerald-500 flex items-center justify-center font-black text-sm text-zinc-950">
                G
              </span>
              <div>
                <h4 className="text-[10px] font-bold tracking-tight">Green New Generation</h4>
                <p className="text-[8px] text-zinc-400">Addis Ababa, Ethiopia</p>
              </div>
            </div>

            <span className="text-[8px] uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              VERIFIED ID
            </span>
          </div>

          {/* Body Block */}
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500 glow-green"
            />
            <div className="space-y-1 text-xs">
              <h3 className="font-extrabold text-sm text-zinc-100">
                {language === "en" ? student.name : student.amharicName}
              </h3>
              <p className="text-[10px] text-zinc-400">ID: {student.id}</p>
              <p className="text-[10px] text-emerald-400 font-bold">{student.grade}</p>
            </div>
          </div>

          {/* QR code scanner area */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="text-[9px] text-zinc-400 space-y-1">
              <p className="font-bold text-zinc-300">SECURE NFC SCANNABLE</p>
              <p>Scan via Green OS terminal</p>
              <p className="text-emerald-400 font-medium">Valid: 2026 G.C.</p>
            </div>

            <div className="p-2 bg-white rounded-lg flex items-center justify-center">
              {/* Dynamic QR illustration representation */}
              <QrCode className="w-12 h-12 text-zinc-950" />
            </div>
          </div>

        </div>

        {/* Download action button */}
        <button
          onClick={handleDownloadId}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg glow-green transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{language === "en" ? "Save to Apple / Google Wallet" : "በሞባይል ዋሌት አስቀምጥ"}</span>
        </button>

      </motion.div>
    </div>
  );
};
