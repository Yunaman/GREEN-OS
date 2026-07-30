"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/lib/AppContext";
import { t } from "@/lib/mockData";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarDays,
  School,
  Wallet,
  BarChart3,
  Settings,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Trash2,
  CheckCheck
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
    markNotificationsAsRead,
    deleteNotification,
    setCurrentTab,
    students,
    teachers
  } = useApp();

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle clicking outside of search to blur dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter students and teachers for working global search dropdown results
  const filteredStudents = searchQuery.trim()
    ? students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredTeachers = searchQuery.trim()
    ? teachers.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchResultClick = (tab: string) => {
    setCurrentTab(tab);
    setSearchQuery("");
    setSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-6 flex items-center justify-between transition-all duration-300">

      {/* Brand & Logo Section */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 shadow-md">
          <span className="text-white font-extrabold text-base tracking-tighter">G</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
            {t("Green OS", language)}
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-full tracking-widest uppercase">PRO</span>
          </h1>
        </div>
      </div>

      {/* Global Auto-filtering Search - Linear & Stripe style */}
      <div ref={searchRef} className="hidden md:flex flex-col relative max-w-sm w-full mx-6">
        <div className={`flex items-center gap-2 bg-zinc-900 border rounded-lg px-3 py-1.5 transition-all ${
          searchFocused ? "border-emerald-500/60 ring-2 ring-emerald-500/10" : "border-zinc-800"
        }`}>
          <Search className="w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder={language === "en" ? "Search students, faculty... (Ctrl+K)" : "ተማሪዎችን፣ መምህራንን ፈልግ..."}
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Live Filter Autocomplete dropdown results */}
        <AnimatePresence>
          {searchFocused && searchQuery.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute top-11 left-0 right-0 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-50 text-xs max-h-64 overflow-y-auto"
            >
              <div className="p-2 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                {language === "en" ? "Search Results" : "የፍለጋ ውጤቶች"}
              </div>

              {filteredStudents.length === 0 && filteredTeachers.length === 0 && (
                <div className="p-3 text-zinc-400 text-center italic">
                  {language === "en" ? "No matches found" : "ምንም አልተገኘም"}
                </div>
              )}

              {filteredStudents.map(student => (
                <div
                  key={student.id}
                  onClick={() => handleSearchResultClick("Students")}
                  className="p-2 hover:bg-white/5 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold text-zinc-200">{language === "en" ? student.name : student.amharicName}</span>
                  <span className="text-[10px] text-zinc-500">{student.grade} • {language === "en" ? "Student" : "ተማሪ"}</span>
                </div>
              ))}

              {filteredTeachers.map(teacher => (
                <div
                  key={teacher.id}
                  onClick={() => handleSearchResultClick("Teachers")}
                  className="p-2 hover:bg-white/5 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold text-zinc-200">{language === "en" ? teacher.name : teacher.amharicName}</span>
                  <span className="text-[10px] text-zinc-500">{teacher.subject} • {language === "en" ? "Teacher" : "መምህር"}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side Options */}
      <div className="flex items-center gap-3">

        {/* Language switch with beautiful Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangDropdown(!showLangDropdown);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === "en" ? "EN" : "አማ"}</span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>

          <AnimatePresence>
            {showLangDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-1.5 w-32 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-1.5 z-50 text-xs"
              >
                <button
                  onClick={() => { setLanguage("en"); setShowLangDropdown(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-all ${
                    language === "en" ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage("am"); setShowLangDropdown(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-all ${
                    language === "am" ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  አማርኛ (Amharic)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme mode */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-emerald-400 transition-all"
        >
          {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>

        {/* Notifications list with fully functioning delete & read actions */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowLangDropdown(false);
              setShowProfile(false);
            }}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-emerald-400 relative transition-all"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-1.5 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-4 z-50 text-xs"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                  <span className="font-bold text-zinc-200">
                    {language === "en" ? "System Logs" : "ማሳወቂያዎች"}
                  </span>
                  <button
                    onClick={markNotificationsAsRead}
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" />
                    {language === "en" ? "Mark all read" : "ሁሉንም አንብብ"}
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-zinc-500 italic">
                      {language === "en" ? "No logs currently" : "ምንም ማሳወቂያ የለም"}
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border transition-all flex items-start gap-2 ${
                          n.read ? "bg-zinc-950/40 border-zinc-900 text-zinc-500" : "bg-emerald-950/20 border-emerald-900/40 text-zinc-200"
                        }`}
                      >
                        <div className="flex-1">
                          <p className="leading-relaxed font-medium">
                            {language === "en" ? n.text : n.textAmh}
                          </p>
                          <span className="text-[9px] text-zinc-600 block mt-1">{n.time}</span>
                        </div>
                        <button
                          onClick={() => deleteNotification(n.id)}
                          className="text-zinc-600 hover:text-rose-400 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Action Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setShowLangDropdown(false);
            }}
            className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
              alt="Principal avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-4 z-50 text-xs"
              >
                <div className="flex flex-col items-center text-center pb-3 border-b border-zinc-800 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                    alt="Principal Avatar"
                    className="w-12 h-12 rounded-full object-cover border border-zinc-800 mb-2"
                  />
                  <h4 className="font-bold text-zinc-200">Dr. Yetneberk Kassa</h4>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">
                    {language === "en" ? "PRINCIPAL & SYSTEM ADMIN" : "ርዕሰ መምህርት"}
                  </span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => { setCurrentTab("Settings"); setShowProfile(false); }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{language === "en" ? "System Preferences" : "ስርዓት ቅንብሮች"}</span>
                  </button>
                  <button
                    onClick={() => alert("Securing terminal exit...")}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{language === "en" ? "Lock Session" : "ክፍለ-ጊዜውን ዝጋ"}</span>
                  </button>
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
  const { currentTab, setCurrentTab, language, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();

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
    <aside className={`bg-zinc-950 border-r border-zinc-900/80 p-4 hidden lg:flex flex-col gap-6 h-[calc(100vh-56px)] transition-all duration-300 relative ${
      isSidebarCollapsed ? "w-16" : "w-56"
    }`}>

      {/* Toggle button */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute -right-3 top-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-1 rounded-full text-zinc-400 hover:text-white transition-all cursor-pointer z-50"
      >
        {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Menu Navigation items */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setCurrentTab(item.name)}
              title={isSidebarCollapsed ? t(item.name, language) : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                isActive
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-emerald-500"}`} />
              {!isSidebarCollapsed && (
                <span className="truncate">{t(item.name, language)}</span>
              )}
              {isActive && !isSidebarCollapsed && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute right-2.5 w-1 h-1 rounded-full bg-white"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Brand Stamp */}
      {!isSidebarCollapsed && (
        <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-900 text-center">
          <p className="text-[10px] text-zinc-500">Green OS v2.2</p>
        </div>
      )}
    </aside>
  );
};
