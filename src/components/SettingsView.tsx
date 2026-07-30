"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t } from "@/lib/mockData";
import {
  Settings,
  ShieldCheck,
  BellRing,
  UserSquare2,
  CloudLightning,
  Sparkles,
  Check,
  Eye,
  Volume2
} from "lucide-react";
import { motion } from "framer-motion";

export const SettingsView: React.FC = () => {
  const { language, theme, toggleTheme, setLanguage } = useApp();
  const [notifySms, setNotifySms] = useState(true);
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [auditLogs, setAuditLogs] = useState(true);

  const handleSaveSettings = () => {
    alert(
      language === "en"
        ? "GREEN OS security configuration updated!"
        : "የግሪን ኦኤስ ደህንነት እና ቅንብሮች በተሳካ ሁኔታ ተሻሽለዋል!"
    );
  };

  return (
    <div className="space-y-6">

      {/* Intro section */}
      <div className="p-5 rounded-3xl bg-zinc-900/40 border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
            <Settings className="w-5 h-5 text-emerald-500" />
            {t("Settings", language)}
          </h3>
          <p className="text-[10px] text-zinc-500">
            {language === "en" ? "Configure school defaults, cloud integrations, SMS schedules, and localizations." : "የትምህርት ቤቱን መሠረታዊ አማራጮች፣ የደመና አገልግሎቶችን፣ እና የአካባቢ ቅንብሮችን ያስተካክሉ።"}
          </p>
        </div>
      </div>

      {/* Settings Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Box 1: Core System & Language Preference */}
        <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5 border-b border-white/10 pb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {language === "en" ? "General Localization Preferences" : "አጠቃላይ የአካባቢ ምርጫዎች"}
          </h4>

          <div className="space-y-4 text-xs">
            {/* Theme Toggle option */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div>
                <span className="font-bold text-zinc-200 block">{language === "en" ? "Active Dark Theme" : "የጨለማ ገጽታን አግብር"}</span>
                <span className="text-[10px] text-zinc-500">Enable high-end glassmorphism</span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-[10px] uppercase shadow-sm glow-green transition-all"
              >
                {theme === "dark" ? "Enabled / ገባሪ" : "Disabled / ጠፍቷል"}
              </button>
            </div>

            {/* Language explicit options */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div>
                <span className="font-bold text-zinc-200 block">{language === "en" ? "Primary Interface Language" : "ዋናው የመገናኛ ቋንቋ"}</span>
                <span className="text-[10px] text-zinc-500">Default fallback for translated indices</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold ${
                    language === "en" ? "bg-emerald-500 text-white" : "bg-zinc-850 text-zinc-400"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("am")}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold ${
                    language === "am" ? "bg-emerald-500 text-white" : "bg-zinc-850 text-zinc-400"
                  }`}
                >
                  አማ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Telemetry Alerts & Secure SMS */}
        <div className="p-6 rounded-3xl glass-premium border border-emerald-500/20 shadow-xl space-y-5">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5 border-b border-white/10 pb-2">
            <BellRing className="w-4 h-4 text-emerald-400" />
            {language === "en" ? "Secure Telemetry Alerts & API" : "የደህንነት እና የኤስኤምኤስ ቅንብሮች"}
          </h4>

          <div className="space-y-4 text-xs">
            {/* SMS Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <span className="font-bold text-zinc-200 block">{language === "en" ? "Instant SMS to Guardians" : "ወዲያውኑ ለወላጆች ኤስኤምኤስ መላኪያ"}</span>
                <span className="text-[10px] text-zinc-500">Dispatched on absent flags</span>
              </div>
              <input
                type="checkbox"
                checked={notifySms}
                onChange={() => setNotifySms(!notifySms)}
                className="w-4 h-4 accent-emerald-500"
              />
            </div>

            {/* In-app notification Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <span className="font-bold text-zinc-200 block">{language === "en" ? "In-App Float Banner Alerts" : "በትምህርት ቤቱ መተግበሪያ ላይ ማሳወቂያ ማሳያ"}</span>
                <span className="text-[10px] text-zinc-500">Real-time action item notifications</span>
              </div>
              <input
                type="checkbox"
                checked={notifyInApp}
                onChange={() => setNotifyInApp(!notifyInApp)}
                className="w-4 h-4 accent-emerald-500"
              />
            </div>

            {/* Audit log Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div>
                <span className="font-bold text-zinc-200 block">{language === "en" ? "Encrypt Audit Event History" : "የእንቅስቃሴዎች መዝገብ ደህንነት ማጠናከሪያ"}</span>
                <span className="text-[10px] text-zinc-500">Strict cryptographical logs</span>
              </div>
              <input
                type="checkbox"
                checked={auditLogs}
                onChange={() => setAuditLogs(!auditLogs)}
                className="w-4 h-4 accent-emerald-500"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Save button block */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-green hover:bg-emerald-400 transition-all duration-300 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{language === "en" ? "Commit & Apply All Changes" : "ለውጦችን በሙሉ አስቀምጥ"}</span>
        </button>
      </div>

    </div>
  );
};
