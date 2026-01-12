import React, { createContext, useState, useContext } from 'react';

// 1. กำหนดคำแปล (Dictionary)
// อยากแก้คำไหน หรือเพิ่มคำไหน มาแก้ที่นี่ได้เลยครับ
const translations = {
  en: {
    // Tab Bar
    tab_home: "Home",
    tab_ar: "AR",
    tab_profile: "Profile",
    
    // Home Screen
    app_name: "Wheel AR",
    search_placeholder: "Search model...",
    filter: "Filter",
    all_category: "All",

    // Auth & Profile
    welcome: "Welcome Back",
    signin_subtitle: "Sign in to continue",
    guest_user: "Guest User",
    signin_register: "Sign In / Register",
    logout: "Log Out",
    exit_visitor: "Exit Visitor Mode",
    
    // Profile Menu
    menu_account: "Account",
    menu_favorites: "Favorites",
    menu_change_password: "Change Password",
    menu_preferences: "Preferences",
    menu_dark_mode: "Dark Mode",
    menu_language: "Language",
    menu_ar_pref: "AR Preferences",
    
    // Language Screen
    select_language: "Select Language",
    lang_thai: "Thai",
    lang_english: "English",
  },
  th: {
    // Tab Bar
    tab_home: "หน้าแรก",
    tab_ar: "AR",
    tab_profile: "โปรไฟล์",

    // Home Screen
    app_name: "Wheel AR",
    search_placeholder: "ค้นหารุ่นล้อแม็ก...",
    filter: "ตัวกรอง",
    all_category: "ทั้งหมด",

    // Auth & Profile
    welcome: "ยินดีต้อนรับ",
    signin_subtitle: "เข้าสู่ระบบเพื่อใช้งานต่อ",
    guest_user: "ผู้เยี่ยมชม",
    signin_register: "เข้าสู่ระบบ / สมัครสมาชิก",
    logout: "ออกจากระบบ",
    exit_visitor: "ออกจากโหมดผู้เยี่ยมชม",

    // Profile Menu
    menu_account: "บัญชีผู้ใช้",
    menu_favorites: "รายการโปรด",
    menu_change_password: "เปลี่ยนรหัสผ่าน",
    menu_preferences: "การตั้งค่าทั่วไป",
    menu_dark_mode: "โหมดมืด",
    menu_language: "ภาษา",
    menu_ar_pref: "ตั้งค่า AR",

    // Language Screen
    select_language: "เลือกภาษา",
    lang_thai: "ภาษาไทย",
    lang_english: "ภาษาอังกฤษ",
  }
};

// 2. สร้าง Context
const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // ค่าเริ่มต้นเป็นภาษาอังกฤษ ('en')
  const [language, setLanguage] = useState<'en' | 'th'>('en');

  // ฟังก์ชันสลับภาษา
  const changeLanguage = (lang: 'en' | 'th') => {
    setLanguage(lang);
  };

  // ดึงคำแปลตามภาษาปัจจุบัน
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);