"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t, mockStudents } from "@/lib/mockData";
import {
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  FileText,
  Sparkles,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FinanceView: React.FC = () => {
  const { language, addNotification } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("GNG-2026-002");
  const [amountInput, setAmountInput] = useState<string>("4500");

  const filterOutstandingStudents = mockStudents.filter((s) => s.outstandingFees > 0);
  const activeStudent = mockStudents.find((s) => s.id === selectedStudentId) || mockStudents[0];

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amountInput);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    addNotification(
      `Payment of ${parsedAmount.toLocaleString()} ETB processed for ${activeStudent.name}.`,
      `ለ ${activeStudent.amharicName} የ ${parsedAmount.toLocaleString()} ብር ክፍያ በተሳካ ሁኔታ ተከናውኗል።`
    );

    alert(
      language === "en"
        ? `Receipt generated! Payment of ${parsedAmount.toLocaleString()} ETB credited to ${activeStudent.name}'s account.`
        : `ደረሰኝ ተዘጋጅቷል! የ ${parsedAmount.toLocaleString()} ብር ክፍያ ለ ${activeStudent.amharicName} ገቢ ተደርጓል።`
    );

    setAmountInput("");
  };

  return (
    <div className="space-y-6">

      {/* Finance general stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              {language === "en" ? "Revenue Collected (ETB)" : "የተሰበሰበ ገቢ (ብር)"}
            </span>
            <h4 className="text-2xl font-extrabold text-white">4,120,500 ብር</h4>
            <p className="text-[10px] text-zinc-400">92% {language === "en" ? "of target" : "ከታቀደው ውስጥ"}</p>
          </div>
          <ArrowUpRight className="w-10 h-10 text-emerald-400" />
        </div>

        <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">
              {language === "en" ? "Arrears / Outstanding (ETB)" : "ያልተከፈለ ቀሪ ሂሳብ (ብር)"}
            </span>
            <h4 className="text-2xl font-extrabold text-rose-400">14,900 ብር</h4>
            <p className="text-[10px] text-zinc-400">-42% {language === "en" ? "reduction from last month" : "ከባለፈው ወር የቀነሰ"}</p>
          </div>
          <ArrowDownRight className="w-10 h-10 text-rose-400" />
        </div>

        <div className="p-5 rounded-3xl glass border border-white/10 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              {language === "en" ? "Online Transaction Rate" : "የመስመር ላይ ክፍያ መጠን"}
            </span>
            <h4 className="text-2xl font-extrabold text-zinc-100">88.5%</h4>
            <p className="text-[10px] text-zinc-400">{language === "en" ? "Through Telebirr / CBE" : "በቴሌብር እና በኢትዮጵያ ንግድ ባንክ በኩል"}</p>
          </div>
          <CreditCard className="w-10 h-10 text-emerald-400" />
        </div>

      </div>

      {/* Main split layout for Finance ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Outstanding Fee list */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">
            {language === "en" ? "Outstanding Tuition Receivables" : "ያልተከፈለ ቀሪ የትምህርት ክፍያ"}
          </h4>

          <div className="space-y-2.5">
            {filterOutstandingStudents.map((student) => {
              const isSelected = selectedStudentId === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => {
                    setSelectedStudentId(student.id);
                    setAmountInput(student.outstandingFees.toString());
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "bg-rose-500/10 border-rose-500/35 glow-green"
                      : "bg-white/5 border-white/5 hover:border-zinc-500/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover border border-rose-500/20"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-zinc-100">
                        {language === "en" ? student.name : student.amharicName}
                      </h5>
                      <p className="text-[10px] text-zinc-500">{student.id} • {student.grade}</p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-rose-400">
                    {student.outstandingFees.toLocaleString()} ETB
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Bill Pay & Receipt simulator */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  {language === "en" ? "CBE / Telebirr Transaction Terminal" : "የኢትዮጵያ ንግድ ባንክ / ቴሌብር ክፍያ ማስተናገጃ"}
                </h3>
                <p className="text-[10px] text-zinc-500 mt-1">
                  {language === "en" ? "Select student to credit payment instant." : "ገቢ ክፍያዎችን ለማረጋገጥ ተማሪ ይምረጡ።"}
                </p>
              </div>

              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded font-bold uppercase tracking-widest">
                GREEN PAY v1.2
              </span>
            </div>

            {/* active state selection details */}
            <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeStudent.avatar}
                  alt={activeStudent.name}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-800"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-zinc-200">
                    {language === "en" ? activeStudent.name : activeStudent.amharicName}
                  </h4>
                  <p className="text-[10px] text-zinc-500">{activeStudent.id} • {activeStudent.grade}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-rose-400 font-bold block">{language === "en" ? "Outstanding" : "ያልተከፈለ"}</span>
                <span className="text-sm font-black text-rose-400">
                  {activeStudent.outstandingFees.toLocaleString()} ETB
                </span>
              </div>
            </div>

            {/* Simulated terminal form */}
            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  {language === "en" ? "Amount to Pay (ETB)" : "የመክፈያ መጠን (ብር)"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-xs text-zinc-500 font-bold">ETB / ብር</span>
                  <input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="Enter payment amount"
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-20 pr-4 py-2.5 text-xs focus:outline-none font-bold text-zinc-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <button
                  type="button"
                  onClick={() => alert("Telebirr checkout launched...")}
                  className="p-3.5 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/20 font-bold text-center transition-all duration-200 cursor-pointer"
                >
                  {language === "en" ? "Pay via Telebirr" : "በቴሌብር ይክፈሉ"}
                </button>
                <button
                  type="button"
                  onClick={() => alert("CBE Birr checkout launched...")}
                  className="p-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/20 font-bold text-center transition-all duration-200 cursor-pointer"
                >
                  {language === "en" ? "CBE Birr Transfer" : "በባንክ ማስተላለፊያ"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{language === "en" ? "Record Payment & Issue Receipt" : "ክፍያውን ይመዝግቡ እና ደረሰኝ ይስጡ"}</span>
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
