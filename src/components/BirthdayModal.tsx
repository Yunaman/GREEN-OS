"use client";

import React, { useEffect } from "react";
import { useApp } from "@/lib/AppContext";
import { X, Gift, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface BirthdayModalProps {
  isOpen: boolean;
  studentName: string;
  onClose: () => void;
}

export const BirthdayModal: React.FC<BirthdayModalProps> = ({ isOpen, studentName, onClose }) => {
  const { language } = useApp();

  useEffect(() => {
    if (isOpen) {
      // Trigger floating confetti cascades
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#10b981", "#fbbf24", "#34d399"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#10b981", "#fbbf24", "#34d399"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 3 }}
        className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-amber-500 via-emerald-600 to-green-950 p-6 space-y-5 shadow-2xl relative text-center overflow-hidden border-2 border-yellow-400"
      >
        {/* Floating circles decor */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300/10 rounded-full blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-center pt-4">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-zinc-950 shadow-lg"
          >
            <Gift className="w-8 h-8" />
          </motion.div>
        </div>

        <div className="space-y-2 relative z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-950/40 px-3 py-1 rounded-full text-yellow-300 inline-block">
            🎂 {language === "en" ? "Happy Birthday Celebration" : "መልካም ልደት ለአንተ ይሁን"}
          </span>
          <h3 className="text-xl md:text-2xl font-black tracking-tight drop-shadow">
            {studentName}
          </h3>
          <p className="text-xs text-emerald-100 px-4 leading-relaxed">
            {language === "en"
              ? "We wish you wonderful achievements, health, and endless points of success this academic year!"
              : "በዚህ የትምህርት ዘመን አስደሳች ውጤቶችን፣ ጤናን እና ማለቂያ የሌለው የስኬት ነጥቦችን እንመኝልዎታለን!"}
          </p>
        </div>

        <div className="pt-3 flex justify-center">
          <button
            onClick={() => {
              confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            }}
            className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black text-xs flex items-center gap-1.5 shadow-lg hover:scale-103 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === "en" ? "More Confetti Spark!" : "ተጨማሪ ኮንፈቲ አብራ"}</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
