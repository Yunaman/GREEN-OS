"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  notifications: { id: string; text: string; textAmh: string; read: boolean; time: string }[];
  markNotificationsAsRead: () => void;
  addNotification: (text: string, textAmh: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [currentTab, setCurrentTab] = useState<string>("Dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      text: "New Registration scheduled for next week E.C. 2019!",
      textAmh: "ለሚቀጥለው ሳምንት የ2019 ዓ.ም አዲስ ምዝገባ ተይዟል!",
      read: false,
      time: "5m ago"
    },
    {
      id: "2",
      text: "Samuel Alemu received 40 Green Points for Environmental projects.",
      textAmh: "ሳሙኤል አለሙ ለአካባቢ ጥበቃ ፕሮጀክት 40 ግሪን ነጥብ አግኝቷል።",
      read: false,
      time: "1h ago"
    },
    {
      id: "3",
      text: "Tuition updates verified for KG & Primary Schools.",
      textAmh: "የኬጂ እና የአንደኛ ደረጃ ትምህርት ክፍያ መረጃዎች ተረጋግጠዋል።",
      read: true,
      time: "1d ago"
    }
  ]);

  useEffect(() => {
    // Synchronize HTML dark mode class
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
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
        notifications,
        markNotificationsAsRead,
        addNotification
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
