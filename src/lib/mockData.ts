// GREEN OS - Premium Mock Data for Green New Generation School

export interface Student {
  id: string;
  name: string;
  amharicName: string;
  avatar: string;
  grade: string;
  campus: string;
  age: number;
  gender: "Male" | "Female";
  greenPoints: number;
  attendanceRate: number;
  gpa: number;
  outstandingFees: number;
  phone: string;
  email: string;
  badges: string[];
  recentMood: "Happy" | "Okay" | "Need Support";
  parentName: string;
  parentAmharicName: string;
  parentPhone: string;
}

export interface Teacher {
  id: string;
  name: string;
  amharicName: string;
  role: string;
  amharicRole: string;
  subject: string;
  campus: string;
  experience: string;
  rating: number;
  avatar: string;
  category: "Pre School" | "KG" | "Primary" | "High School";
  phone: string;
}

export interface Activity {
  id: string;
  time: string;
  description: string;
  descriptionAmharic: string;
  type: "academic" | "financial" | "point" | "attendance" | "system";
  studentName?: string;
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  titleAmharic: string;
  excerpt: string;
  excerptAmharic: string;
  category: "General" | "Academic" | "Event";
  important: boolean;
}

export interface GreenPointRule {
  id: string;
  action: string;
  actionAmharic: string;
  points: number;
  category: "Attendance" | "Behavior" | "Reading" | "Helping" | "Environmental";
}

export interface Event {
  id: string;
  date: string;
  title: string;
  titleAmharic: string;
  time: string;
  location: string;
}

export const mockStudents: Student[] = [
  {
    id: "GNG-2026-001",
    name: "Abel Bekele",
    amharicName: "አቤል በቀለ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    grade: "Grade 11-A",
    campus: "Tulu Dimtu Campus",
    age: 17,
    gender: "Male",
    greenPoints: 240,
    attendanceRate: 98.2,
    gpa: 3.92,
    outstandingFees: 0,
    phone: "+251 911 234 567",
    email: "abel.bekele@greennewgeneration.com",
    badges: ["🌱 Eco Warrior", "📚 Reading Master", "🌟 Model Citizen"],
    recentMood: "Happy",
    parentName: "Bekele Megersa",
    parentAmharicName: "በቀለ መገርሳ",
    parentPhone: "+251 911 888 777"
  },
  {
    id: "GNG-2026-002",
    name: "Hanna Tesfaye",
    amharicName: "ሃና ተስፋዬ",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    grade: "Grade 10-B",
    campus: "Tulu Dimtu Campus",
    age: 16,
    gender: "Female",
    greenPoints: 185,
    attendanceRate: 95.5,
    gpa: 3.84,
    outstandingFees: 4500,
    phone: "+251 912 345 678",
    email: "hanna.tesfaye@greennewgeneration.com",
    badges: ["🌱 Eco Warrior", "🤝 Helping Hand"],
    recentMood: "Happy",
    parentName: "Tesfaye Wolde",
    parentAmharicName: "ተስፋዬ ወልዴ",
    parentPhone: "+251 912 999 888"
  },
  {
    id: "GNG-2026-003",
    name: "Samuel Alemu",
    amharicName: "ሳሙኤል አለሙ",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    grade: "Grade 12-A",
    campus: "Tulu Dimtu Campus",
    age: 18,
    gender: "Male",
    greenPoints: 310,
    attendanceRate: 99.4,
    gpa: 4.00,
    outstandingFees: 0,
    phone: "+251 913 456 789",
    email: "samuel.alemu@greennewgeneration.com",
    badges: ["🌱 Eco Warrior", "📚 Reading Master", "🧠 Math Wizard", "🥇 Top Achiever"],
    recentMood: "Happy",
    parentName: "Alemu Kebede",
    parentAmharicName: "አለሙ ከበደ",
    parentPhone: "+251 913 777 666"
  },
  {
    id: "GNG-2026-004",
    name: "Liya Girma",
    amharicName: "ሊያ ግርማ",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    grade: "Grade 9-C",
    campus: "Tulu Dimtu Campus",
    age: 15,
    gender: "Female",
    greenPoints: 120,
    attendanceRate: 88.0,
    gpa: 3.12,
    outstandingFees: 7200,
    phone: "+251 914 567 890",
    email: "liya.girma@greennewgeneration.com",
    badges: ["🤝 Helping Hand"],
    recentMood: "Need Support",
    parentName: "Girma Tadesse",
    parentAmharicName: "ግርማ ታደሰ",
    parentPhone: "+251 914 666 555"
  },
  {
    id: "GNG-2026-005",
    name: "Mekdes Tadesse",
    amharicName: "መቅደስ ታደሰ",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    grade: "Grade 11-B",
    campus: "Tulu Dimtu Campus",
    age: 17,
    gender: "Female",
    greenPoints: 215,
    attendanceRate: 96.0,
    gpa: 3.65,
    outstandingFees: 0,
    phone: "+251 915 678 901",
    email: "mekdes.tadesse@greennewgeneration.com",
    badges: ["🌱 Eco Warrior", "🎨 Creative Mind"],
    recentMood: "Okay",
    parentName: "Tadesse Bekele",
    parentAmharicName: "ታደሰ በቀለ",
    parentPhone: "+251 915 555 444"
  },
  {
    id: "GNG-2026-006",
    name: "Dawit Yohannes",
    amharicName: "ዳዊት ዮሐንስ",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    grade: "Grade 12-B",
    campus: "Tulu Dimtu Campus",
    age: 18,
    gender: "Male",
    greenPoints: 95,
    attendanceRate: 91.2,
    gpa: 2.95,
    outstandingFees: 3200,
    phone: "+251 916 789 012",
    email: "dawit.yohannes@greennewgeneration.com",
    badges: ["🏀 Athletic Star"],
    recentMood: "Okay",
    parentName: "Yohannes Hailu",
    parentAmharicName: "ዮሐንስ ኃይሉ",
    parentPhone: "+251 916 444 333"
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: "GNG-T-001",
    name: "Ketema Assefa",
    amharicName: "ከተማ አሰፋ",
    role: "Senior Mathematics Teacher",
    amharicRole: "ከፍተኛ የሂሳብ መምህር",
    subject: "Advanced Calculus & Algebra",
    campus: "Tulu Dimtu Campus",
    experience: "14 Years",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    category: "High School",
    phone: "+251 974 217 172"
  },
  {
    id: "GNG-T-002",
    name: "Tsige Abera",
    amharicName: "ፅጌ አበራ",
    role: "KG Lead Instructor",
    amharicRole: "የኬጂ ዋና አስተማሪ",
    subject: "Early Childhood Development",
    campus: "Tulu Dimtu Campus",
    experience: "8 Years",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    category: "KG",
    phone: "+251 974 217 173"
  },
  {
    id: "GNG-T-003",
    name: "Yared Tolosa",
    amharicName: "ያሬድ ቶሎሳ",
    role: "Biology & Environmental Science Specialist",
    amharicRole: "የባዮሎጂ እና የአካባቢ ሳይንስ ባለሙያ",
    subject: "Environmental Ecology",
    campus: "Tulu Dimtu Campus",
    experience: "11 Years",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    category: "High School",
    phone: "+251 974 217 174"
  },
  {
    id: "GNG-T-004",
    name: "Aster Kassa",
    amharicName: "አስቴር ካሳ",
    role: "Pre School Play-Based Educator",
    amharicRole: "የቅድመ መደበኛ መጫወቻ ትምህርት መምህርት",
    subject: "Creative Expression",
    campus: "Tulu Dimtu Campus",
    experience: "6 Years",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    category: "Pre School",
    phone: "+251 974 217 175"
  }
];

export const mockActivities: Activity[] = [
  {
    id: "act-001",
    time: "Today, 10:15 AM",
    description: "Abel Bekele received the 🌱 Eco Warrior badge for tree planting.",
    descriptionAmharic: "አቤል በቀለ ዛፍ በመትከል የ 🌱 Eco Warrior ባጅ ተሸልሟል።",
    type: "point",
    studentName: "Abel Bekele"
  },
  {
    id: "act-002",
    time: "Today, 09:30 AM",
    description: "Samuel Alemu marked present. 99.4% overall Attendance maintained.",
    descriptionAmharic: "ሳሙኤል አለሙ መገኘቱ ተመዝግቧል። 99.4% አጠቃላይ ተሳትፎ ተጠብቋል።",
    type: "attendance",
    studentName: "Samuel Alemu"
  },
  {
    id: "act-003",
    time: "Yesterday, 04:00 PM",
    description: "Hanna Tesfaye registered 18% improvement in Math quiz mock.",
    descriptionAmharic: "ሃና ተስፋዬ በሂሳብ ፈተና የ 18% መሻሻል አስመዝግባለች።",
    type: "academic",
    studentName: "Hanna Tesfaye"
  },
  {
    id: "act-004",
    time: "Yesterday, 11:00 AM",
    description: "Tuition payment of 12,500 ETB verified for Samuel Alemu.",
    descriptionAmharic: "ለሳሙኤል አለሙ የ 12,500 ብር የትምህርት ክፍያ ተረጋግጧል።",
    type: "financial",
    studentName: "Samuel Alemu"
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-001",
    date: "06 July 2026",
    title: "Registration Dates for the 2019 E.C. Academic Year",
    titleAmharic: "ለ2019 ዓ.ም የትምህርት ዘመን የምዝገባ ቀናትን በተመለከተ",
    excerpt: "Official registration for both existing and new students starts on August 1st, 2026.",
    excerptAmharic: "ለነባር እና አዲስ ተማሪዎች ይፋዊ ምዝገባ ከነሐሴ 1 ቀን 2026 ጀምሮ ይጀምራል።",
    category: "Academic",
    important: true
  },
  {
    id: "ann-002",
    date: "20 April 2026",
    title: "Final Mid-Exam Timetable & Guidelines",
    titleAmharic: "የመጨረሻ አጋማሽ ፈተና የጊዜ ሰሌዳ እና መመሪያዎች",
    excerpt: "The Mid-exams schedules are now published. Students must carry their Digital Student ID.",
    excerptAmharic: "የአጋማሽ ፈተናዎች መርሃ ግብር ወጥቷል። ተማሪዎች ዲጂታል መታወቂያቸውን መያዝ አለባቸው።",
    category: "General",
    important: false
  },
  {
    id: "ann-003",
    date: "18 February 2025",
    title: "Green New Generation School Launches NEW GREEN OS Portal!",
    titleAmharic: "ግሪን ኒው ጀነሬሽን ትምህርት ቤት አዲስ ግሪን ኦኤስ ፖርታል ጀመረ!",
    excerpt: "We have fully digitized student insights, timelines, and rewards utilizing modern tech.",
    excerptAmharic: "ዘመናዊ ቴክኖሎጂን በመጠቀም የተማሪዎችን እድገት፣ የጊዜ መስመር እና ሽልማቶችን ሙሉ በሙሉ ዲጂታል አድርገናል።",
    category: "General",
    important: true
  }
];

export const greenPointRules: GreenPointRule[] = [
  { id: "gpr-1", action: "Perfect Weekly Attendance", actionAmharic: "ለሳምንቱ ሙሉ መገኘት", points: 20, category: "Attendance" },
  { id: "gpr-2", action: "Environmental Tree Planting Project", actionAmharic: "የዛፍ ተከላ እና አካባቢ ጥበቃ ተሳትፎ", points: 50, category: "Environmental" },
  { id: "gpr-3", action: "Exceptional Peer Mentoring / Helping", actionAmharic: "ለጓደኞች እገዛ እና ድጋፍ ማድረግ", points: 30, category: "Helping" },
  { id: "gpr-4", action: "Read 5 Library Books in a Month", actionAmharic: "በወር ውስጥ 5 የቤተ-መጻሕፍት መጻሕፍትን ማንበብ", points: 40, category: "Reading" },
  { id: "gpr-5", action: "Excellent Classroom Decorum & Behavior", actionAmharic: "በጣም ጥሩ የክፍል ስነ-ምግባር እና ባህሪ", points: 15, category: "Behavior" }
];

export const upcomingEvents: Event[] = [
  {
    id: "evt-1",
    date: "March 15, 2026",
    title: "Science & Ecology Fair 2026",
    titleAmharic: "የሳይንስ እና የስነ-ምህዳር አውደ-ርዕይ 2026",
    time: "09:00 AM - 04:00 PM",
    location: "Main Campus Exhibition Hall"
  },
  {
    id: "evt-2",
    date: "April 02, 2026",
    title: "Green Tree Planting Festival",
    titleAmharic: "አረንጓዴ የዛፍ ተከላ ፌስቲቫል",
    time: "08:30 AM - 12:30 PM",
    location: "Tulu Dimtu Campus Forest Zone"
  },
  {
    id: "evt-3",
    date: "May 10, 2026",
    title: "Parent-Teacher Consultations",
    titleAmharic: "የወላጅ-መምህራን ምክክር ቀን",
    time: "01:30 PM - 05:30 PM",
    location: "KG, Primary & High School wings"
  }
];

export const mockStudentTimelines: Record<string, { year: string; title: string; desc: string; descAmh: string; badge?: string }[]> = {
  "GNG-2026-001": [
    { year: "Sept 2025", title: "Enrolled in Grade 11-A", desc: "Started the academic year with focused tracks in STEM and Environmental Science.", descAmh: "በሳይንስ እና የአካባቢ ጥናት የትምህርት ዘርፍ ትምህርቱን ጀመረ።" },
    { year: "Nov 2025", title: "Won Regional Spelling Bee", desc: "Secured 1st place in regional high school tournament.", descAmh: "በክልል ደረጃ የፊደል መጻፍ ውድድር አንደኛ ወጥቷል።", badge: "🏆 Champion" },
    { year: "Jan 2026", title: "Math Semester Grade A+", desc: "Scored 98% in final examinations under Mr. Ketema Assefa.", descAmh: "በአቶ ከተማ አሰፋ መሪነት በፈተና 98% በማግኘት ኤ+ አስመዝግቧል።" },
    { year: "Feb 2026", title: "Planted 10 Indigenous Saplings", desc: "Organized the school ecological garden campaign.", descAmh: "በትምህርት ቤቱ የአትክልት ስፍራ የዛፍ ተከላ ዘመቻን መርቷል።", badge: "🌱 Green Leader" }
  ],
  "GNG-2026-002": [
    { year: "Sept 2025", title: "Entered High School Grade 10-B", desc: "Joined high school tier at Tulu Dimtu campus.", descAmh: "በትሉ ዲምቱ ግቢ የሁለተኛ ደረጃ ትምህርቱን ጀመረች።" },
    { year: "Dec 2025", title: "Community Service Honor", desc: "Volunteered 20 hours assisting primary school students with reading.", descAmh: "ለአንደኛ ደረጃ ተማሪዎች ንባብ በማገዝ 20 ሰአታት በነጻ አገልግላለች።", badge: "🤝 Community Star" },
    { year: "Feb 2026", title: "Outstanding Art Showcase", desc: "Designed the green transition school banner.", descAmh: "በትምህርት ቤቱ ልዩ የአርት ባነር ስራ ላይ ተሳትፋለች።" }
  ],
  "GNG-2026-003": [
    { year: "Sept 2025", title: "Entered Grade 12-A", desc: "Initiated graduating senior year on a high note.", descAmh: "የመመረቂያ አመት የክፍል ደረጃን በከፍተኛ ውጤት ጀምሯል።" },
    { year: "Oct 2025", title: "National Olympiad nominee", desc: "Represented Green New Generation at state level physics challenges.", descAmh: "በአገር አቀፍ የፊዚክስ ኦሊምፒያድ ተሳታፊ ሆኗል።", badge: "🧠 Olympiad Card" },
    { year: "Jan 2026", title: "Perfect GPA 4.0", desc: "Aced all analytical courses in midterm exams.", descAmh: "በሁሉም የሴሚስተር ኮርሶች ፍጹም 4.0 ውጤት አስመዝግቧል።" }
  ]
};

// Amharic Translations Dictionary
export const amharicTranslations: Record<string, string> = {
  // Navigation & Side bar
  "Dashboard": "ዋና ገጽ",
  "Students": "ተማሪዎች",
  "Teachers": "መምህራን",
  "Parents": "ወላጆች",
  "Attendance": "ተሳትፎ",
  "Classes": "ክፍሎች",
  "Finance": "ፋይናንስ",
  "Reports": "ሪፖርቶች",
  "Settings": "ቅንብሮች",
  "Announcements": "ማስታወቂያዎች",
  "Search school...": "ትምህርት ቤት ይፈልጉ...",
  "Notifications": "ማሳወቂያዎች",
  "View Profile": "ፕሮፋይል ይመልከቱ",
  "Green OS": "ግሪን ኦኤስ",
  "Growing Future Leaders Through Smart Education": "የነገ መሪዎችን በብልህ ትምህርት ማሳደግ",

  // General & Stats
  "Total Students": "አጠቃላይ ተማሪዎች",
  "Active Teachers": "ንቁ መምህራን",
  "Today's Attendance": "የዛሬው ተሳትፎ",
  "Outstanding Fees": "ያልተከፈለ ክፍያ",
  "Academic Calendar": "የትምህርት ካላንደር",
  "Recent Activities": "የቅርብ ጊዜ እንቅስቃሴዎች",
  "Quick Actions": "ፈጣን ድርጊቶች",
  "Upcoming Events": "የሚመጡ ክስተቶች",
  "Addis Ababa, Ethiopia": "አዲስ አበባ፣ ኢትዮጵያ",
  "Sunny": "ፀሐያማ",
  "Weather": "የአየር ሁኔታ",
  "Today's Status": "የዛሬ ሁኔታ",
  "Active": "ገባሪ",

  // Specific WOW Sections
  "Student Timeline": "የተማሪ የጊዜ መስመር",
  "AI Student Insights": "የአርቴፊሻል ኢንተለጀንስ ተማሪዎች ግንዛቤ",
  "Principal Command Center": "የርዕሰ መምህር የቁጥጥር ማዕከል",
  "Green Points": "የግሪን ነጥቦች",
  "Mood Check": "የስሜት ምርመራ",
  "Birthday Celebration": "የልደት በዓል አከባበር",
  "Digital Student ID": "ዲጂታል የተማሪ መታወቂያ",
  "Wellness Score": "የጤና እና ደህንነት ውጤት",
  "Leaderboard": "ደረጃ ሰንጠረዥ",
  "Badges": "ባጆች",
  "Earn Points": "ነጥብ ያግኙ",
  "Select a Student": "ተማሪ ይምረጡ",

  // Actions / Forms
  "Create ID Card": "መታወቂያ ፍጠር",
  "Trigger Confetti": "ኮንፈቲ አብራ",
  "Send Notification": "ማሳወቂያ ላክ",
  "Filter by Grade": "በክፍል ደረጃ ያጣሩ",
  "Register Attendance": "ተሳትፎ ይመዝግቡ",
  "Generate Report": "ሪፖርት አውጣ",
  "School Logo": "የትምህርት ቤት አርማ",
  "Green New Generation School": "ግሪን ኒው ጀነሬሽን ትምህርት ቤት",
  "Established in Addis Ababa & Arbaminch": "በአዲስ አበባ እና አርባምንጭ የተመሰረተ"
};

export function t(key: string, lang: "en" | "am"): string {
  if (lang === "am") {
    return amharicTranslations[key] || key;
  }
  return key;
}
