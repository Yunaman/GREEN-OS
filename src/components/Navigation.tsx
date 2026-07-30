"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { t } from "@/lib/mockData";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Users,
  GraduationCap,
  UserSquare2,
  CalendarDays,
  School,
  Wallet,
  BarChart3,
  Settings,
  HeartHandshake
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navigation: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationsAsRead
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/10 px-4 py-3 md:px-8 flex items-center justify-between transition-all duration-300">
      {/* Brand & Logo Section */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg glow-green animate-pulse">
          <span className="text-white font-black text-xl tracking-tighter">G</span>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-emerald-950" />
          </div>
        </div>
        <div>
          <h1 className="text-sm md:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 dark:from-emerald-300 dark:via-green-400 dark:to-emerald-200 tracking-tight">
            {t("Green OS", language)}
          </h1>
          <p className="text-[10px] text-zinc-500 dark:text-emerald-500/80 font-medium tracking-widest uppercase hidden sm:block">
            {t("Growing Future Leaders Through Smart Education", language)}
          </p>
        </div>
      </div>

      {/* Global Search Bar - Stripe/Apple-like */}
      <div className="hidden md:flex items-center gap-2 max-w-md w-full mx-8 relative">
        <div className="absolute left-3.5 text-zinc-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder={t("Search school...", language)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all duration-200"
        />
      </div>

      {/* Right Side Options */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Language Switcher Button */}
        <button
          onClick={() => setLanguage(language === "en" ? "am" : "en")}
          className="relative px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-emerald-500/10 hover:text-emerald-500 border border-zinc-200 dark:border-zinc-700/50 flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-200"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-500 animate-spin-slow" />
          <span className="min-w-[45px] text-center">
            {language === "en" ? "አማርኛ" : "English"}
          </span>
        </button>

        {/* Dark/Light Mode Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all duration-200"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-emerald-600" />
          ) : (
            <Sun className="w-4 h-4 text-emerald-400" />
          )}
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
              markNotificationsAsRead();
            }}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 hover:bg-emerald-500/10 hover:text-emerald-500 relative transition-all duration-200"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {/* Interactive Notifications Panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl glass border border-emerald-500/20 shadow-2xl p-4 z-50 text-xs glow-green"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                  <span className="font-bold text-sm text-emerald-500">
                    {t("Notifications", language)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] text-emerald-400 font-semibold">
                    {notifications.length} total
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-xl transition-all ${
                        n.read ? "bg-white/5 text-zinc-400" : "bg-emerald-500/10 text-zinc-100 border border-emerald-500/20"
                      }`}
                    >
                      <p className="font-medium">{language === "en" ? n.text : n.textAmh}</p>
                      <span className="text-[9px] text-zinc-500 mt-1 block text-right">{n.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
              alt="Principal Avatar"
              className="w-7 h-7 rounded-full object-cover border border-emerald-400"
            />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hidden md:inline">
              Dr. Yetneberk
            </span>
          </button>

          {/* Interactive Profile Modal */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-72 rounded-2xl glass-premium border border-emerald-500/20 shadow-2xl p-4 z-50 text-xs glow-green"
              >
                <div className="flex flex-col items-center text-center p-2 border-b border-white/10 pb-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                    alt="Principal Avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 mb-2 glow-green"
                  />
                  <h4 className="font-bold text-sm text-zinc-100">
                    Dr. Yetneberk Kassa
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                    {language === "en" ? "Principal & UX Director" : "ርዕሰ መምህርት እና የሥርዓት ዳይሬክተር"}
                  </p>
                  <p className="text-[9px] text-zinc-500 mt-1">
                    {t("Established in Addis Ababa & Arbaminch", language)}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between py-1 px-2 hover:bg-emerald-500/10 rounded-lg text-zinc-300 cursor-pointer">
                    <span>{language === "en" ? "My Campus" : "የእኔ ካምፓስ"}</span>
                    <span className="text-emerald-400 font-semibold">Tulu Dimtu</span>
                  </div>
                  <div className="flex justify-between py-1 px-2 hover:bg-emerald-500/10 rounded-lg text-zinc-300 cursor-pointer">
                    <span>{language === "en" ? "School ID" : "የትምህርት ቤት መለያ"}</span>
                    <span className="text-zinc-500">GNG-PR-01</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, language } = useApp();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Students", icon: Users },
    { name: "Teachers", icon: GraduationCap },
    { name: "Parents", icon: HeartHandshake },
    { name: "Attendance", icon: CalendarDays },
    { name: "Classes", icon: School },
    { name: "Finance", icon: Wallet },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings }
  ];

  return (
    <aside className="w-64 glass-premium border-r border-white/10 p-5 hidden lg:flex flex-col gap-6 h-[calc(100vh-65px)] overflow-y-auto">
      <div className="px-2">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          {language === "en" ? "GENERAL LEDGER" : "አጠቃላይ ማውጫ"}
        </span>
      </div>
      <nav className="flex-1 flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setCurrentTab(item.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative group ${
                isActive
                  ? "bg-emerald-500 text-white shadow-lg glow-green"
                  : "text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-400"
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-emerald-500"}`} />
              <span>{t(item.name, language)}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-yellow-300"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Decorative Brand Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-green-900/20 border border-emerald-500/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
        <h5 className="text-xs font-bold text-emerald-400 mb-1">GREEN OS v2.1</h5>
        <p className="text-[10px] text-zinc-500">
          {language === "en" ? "Secure cloud environment." : "ደህንነቱ የተጠበቀ የዳመና አካባቢ።"}
        </p>
      </div>
    </aside>
  );
};
