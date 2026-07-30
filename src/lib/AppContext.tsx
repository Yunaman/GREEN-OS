"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  mockStudents as initialStudents,
  mockTeachers as initialTeachers,
  mockAnnouncements as initialAnnouncements,
  upcomingEvents as initialEvents,
  Student,
  Teacher,
  Announcement,
  Event
} from "@/lib/mockData";

type Language = "en" | "am";
type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;

  // Mutable memory database state
  students: Student[];
  updateStudent: (studentId: string, updatedData: Partial<Student>) => void;
  teachers: Teacher[];
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  events: Event[];

  // Notification operations
  notifications: { id: string; text: string; textAmh: string; read: boolean; time: string }[];
  markNotificationsAsRead: () => void;
  addNotification: (text: string, textAmh: string) => void;
  deleteNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [currentTab, setCurrentTab] = useState<string>("Dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Mutable reactive states
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      text: "New registration guidelines synchronized for academic year 2019 E.C.",
      textAmh: "ለ2019 የትምህርት ዘመን ምዝገባ አዳዲስ መመሪያዎች ወጥተዋል።",
      read: false,
      time: "2m ago"
    },
    {
      id: "2",
      text: "Samuel Alemu received +40 Green Points for ecological landscaping.",
      textAmh: "ሳሙኤል አለሙ ለአካባቢ ጥበቃ ተሳትፎ +40 ግሪን ነጥብ አግኝቷል።",
      read: false,
      time: "1h ago"
    },
    {
      id: "3",
      text: "Tuition updates verified for Tulu Dimtu campus.",
      textAmh: "በትሉ ዲምቱ ካምፓስ የክፍያ መረጃዎች ተረጋግጠዋል።",
      read: true,
      time: "1d ago"
    }
  ]);

  // Load selected language on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("green-os-lang") as Language;
      if (storedLang === "en" || storedLang === "am") {
        setLanguageState(storedLang);
      }
      const storedTheme = localStorage.getItem("green-os-theme") as Theme;
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("green-os-lang", lang);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("green-os-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const updateStudent = (studentId: string, updatedData: Partial<Student>) => {
    setStudents((prevStudents) =>
      prevStudents.map((s) => {
        if (s.id === studentId) {
          return { ...s, ...updatedData };
        }
        return s;
      })
    );
  };

  const addAnnouncement = (newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (text: string, textAmh: string) => {
    setNotifications((prev) => [
      {
        id: Date.now().toString(),
        text,
        textAmh,
        read: false,
        time: "Just now"
      },
      ...prev
    ]);
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        currentTab,
        setCurrentTab,
        searchQuery,
        setSearchQuery,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        students,
        updateStudent,
        teachers,
        announcements,
        addAnnouncement,
        events,
        notifications,
        markNotificationsAsRead,
        addNotification,
        deleteNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
