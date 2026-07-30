"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t } from "@/lib/mockData";
import {
  School,
  Clock,
  MapPin,
  Users,
  ArrowUpRight,
  Play,
  Bookmark,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

interface ClassCategory {
  id: string;
  name: string;
  amharicName: string;
  campus: string;
  classCount: string;
  desc: string;
  descAmh: string;
  rooms: string[];
  schedule: { time: string; subject: string; teacher: string }[];
}

export const ClassesView: React.FC = () => {
  const { language } = useApp();
  const [selectedCatId, setSelectedCatId] = useState<string>("cat-high");

  const categories: ClassCategory[] = [
    {
      id: "cat-pre",
      name: "Pre School",
      amharicName: "የቅድመ መደበኛ ትምህርት ቤት",
      campus: "Tulu Dimtu (KG wing)",
      classCount: "6 Classes",
      desc: "Nurturing young minds through play-based learning, caring educators, and a foundation for lifelong curiosity.",
      descAmh: "በጨዋታ ላይ የተመሰረተ ትምህርት፣ ተንከባካቢ አስተማሪዎች እና ለዕድሜ ልክ የማወቅ ጉጉት መሠረት በመጣል።",
      rooms: ["Room KG-1A", "Room KG-1B", "Outdoor Playzone"],
      schedule: [
        { time: "08:30 AM - 09:30 AM", subject: "Creative Expression & Arts", teacher: "Aster Kassa" },
        { time: "09:30 AM - 10:30 AM", subject: "Early Phonetics & Speech", teacher: "Aster Kassa" }
      ]
    },
    {
      id: "cat-kg",
      name: "KG School",
      amharicName: "ኬጂ ትምህርት ቤት",
      campus: "Tulu Dimtu (KG wing)",
      classCount: "14 Classes",
      desc: "Fostering joy and growth through play, creativity, and caring educators. A vibrant start to lifelong learning adventures.",
      descAmh: "በጨዋታ፣ በፈጠራ እና በተንከባካቢ አስተማሪዎች አማካኝነት ደስታን እና እድገትን ማሳደግ።",
      rooms: ["Room KG-2A", "Room KG-2B", "Library Corner"],
      schedule: [
        { time: "09:00 AM - 10:15 AM", subject: "Phonics & Alphabetic Science", teacher: "Tsige Abera" },
        { time: "10:30 AM - 11:45 AM", subject: "Number Play & Concepts", teacher: "Tsige Abera" }
      ]
    },
    {
      id: "cat-primary",
      name: "Primary School",
      amharicName: "የመጀመሪያ ደረጃ ትምህርት ቤት",
      campus: "Tulu Dimtu (Main block)",
      classCount: "12 Classes",
      desc: "Igniting a passion for learning with interactive education, supportive teachers, and lasting friendships.",
      descAmh: "በይነተገናኝ ትምህርት፣ ደጋፊ መምህራን እና ዘላቂ ወዳጅነት ጋር ለመማር ከፍተኛ ፍላጎትን ማቀጣጠል።",
      rooms: ["Room P-3A", "Room P-4B", "Science Lab A"],
      schedule: [
        { time: "08:30 AM - 09:45 AM", subject: "Social Studies & Ethics", teacher: "Yared Tolosa" },
        { time: "10:00 AM - 11:30 AM", subject: "Introductory Biology", teacher: "Yared Tolosa" }
      ]
    },
    {
      id: "cat-high",
      name: "High School",
      amharicName: "የሁለተኛ ደረጃ ትምህርት ቤት",
      campus: "Tulu Dimtu (Senior wing)",
      classCount: "8 Classes",
      desc: "Guiding students to academic excellence, critical thinking, and future success with experienced educators.",
      descAmh: "ከተሞክሮ መምህራን ጋር ተማሪዎችን ለአካዳሚክ የላቀ ውጤት፣ ሂሳዊ አስተሳሰብ እና የወደፊት ስኬት መምራት።",
      rooms: ["Room S-11A", "Room S-12B", "Advanced Chemistry Lab"],
      schedule: [
        { time: "08:30 AM - 09:50 AM", subject: "Advanced Physics & Mechanics", teacher: "Ketema Assefa" },
        { time: "10:05 AM - 11:30 AM", subject: "Analytical Calculus", teacher: "Ketema Assefa" }
      ]
    }
  ];

  const activeCat = categories.find((c) => c.id === selectedCatId) || categories[0];

  return (
    <div className="space-y-6">

      {/* Top Banner and Category Quick switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/40 p-5 rounded-3xl border border-white/10">
        <div>
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
            <School className="w-5 h-5 text-emerald-500" />
            {language === "en" ? "School Tiers & Classrooms" : "የትምህርት ደረጃዎች እና ክፍሎች"}
          </h3>
          <p className="text-[10px] text-zinc-500">
            {language === "en" ? "Interactive class schedule matrix, academic tiers, and campus allocations." : "የክፍል የጊዜ ሰሌዳ ማትሪክስ፣ የትምህርት ደረጃዎች እና የክፍል መገኛ ቦታዎች።"}
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCatId(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCatId === c.id
                  ? "bg-emerald-500 text-white shadow-md glow-green"
                  : "bg-white/5 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {language === "en" ? c.name : c.amharicName}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Category Specs Card */}
        <div className="lg:col-span-5">
          <motion.div
            key={activeCat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                {activeCat.classCount}
              </span>
              <span className="text-[10px] text-zinc-500 font-bold">{activeCat.campus}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">
                {language === "en" ? activeCat.name : activeCat.amharicName}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{language === "en" ? activeCat.desc : activeCat.descAmh}&rdquo;
              </p>
            </div>

            {/* Room allocations list */}
            <div className="space-y-2 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {language === "en" ? "Assigned Laboratories & Rooms" : "ላቦራቶሪዎች እና የመማሪያ ክፍሎች"}
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeCat.rooms.map((room, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {room}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats on enrollment */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-white/5">
                <span className="text-[9px] text-zinc-500 block">ENROLLMENT RATE</span>
                <p className="font-bold text-white mt-0.5">100% {language === "en" ? "Capacity" : "የተሞላ"}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-white/5">
                <span className="text-[9px] text-zinc-500 block">SYLLABUS STATUS</span>
                <p className="font-bold text-emerald-400 mt-0.5">On Schedule</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: High-fidelity interactive daily schedule list */}
        <div className="lg:col-span-7 space-y-4">
          <div className="px-1 flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {language === "en" ? "Intelligent Daily Schedule Grid" : "የእለት የጊዜ ሰሌዳ ማትሪክስ"}
            </h4>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              MEGABIT 2026
            </span>
          </div>

          <div className="space-y-3">
            {activeCat.schedule.map((sch, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/25 transition-all duration-300 flex items-center justify-between flex-wrap gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-extrabold text-zinc-200">
                      {sch.subject}
                    </h5>
                    <p className="text-[10px] text-emerald-400 font-semibold">{sch.teacher}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-zinc-400 block bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-white/5">
                    {sch.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>{language === "en" ? "Need a custom schedule adjustment?" : "የጊዜ ሰሌዳ ለውጥ ይፈልጋሉ?"}</span>
            <button
              className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              onClick={() => alert("Syllabus reschedule ticket forwarded directly to Academic Registrar.")}
            >
              <span>{language === "en" ? "Contact Registrar" : "ሬጅስትራርን ያነጋግሩ"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
