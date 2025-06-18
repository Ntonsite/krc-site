
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'sw';

type Translations = {
  [key: string]: {
    en: string;
    sw: string;
  };
};

// Add all translations here
const translations: Translations = {
  // Navigation
  home: { en: 'Home', sw: 'Nyumbani' },
  about: { en: 'About Us', sw: 'Kuhusu Sisi' },
  events: { en: 'Events', sw: 'Matukio' },
  sermons: { en: 'Sermons', sw: 'Mahubiri' },
  ministries: { en: 'Ministries', sw: 'Wizara' },
  contact: { en: 'Contact', sw: 'Wasiliana Nasi' },
  
  // Hero Section
  welcome: { en: 'Welcome to', sw: 'Karibu' },
  churchName: { en: 'Kinondoni Revival Church', sw: 'Kanisa la Uamsho la Kinondoni' },
  tagline: { en: 'Tanzania Assemblies of God', sw: 'Tanzania Assemblies of God' },
  joinUs: { en: 'Join Us This Sunday', sw: 'Jiunge Nasi Jumapili Hii' },
  learnMore: { en: 'Learn More', sw: 'Jifunze Zaidi' },
  
  // Service Times
  serviceTimes: { en: 'Service Times', sw: 'Nyakati za Ibada' },
  sundayService: { en: 'Sunday Service', sw: 'Ibada ya Jumapili' },
  firstService: { en: '1st Service', sw: 'Ibada ya Kwanza' },
  secondService: { en: '2nd Service', sw: 'Ibada ya Pili' },
  
  // Footer
  address: { en: 'Address', sw: 'Anwani' },
  phone: { en: 'Phone', sw: 'Simu' },
  email: { en: 'Email', sw: 'Barua pepe' },
  followUs: { en: 'Follow Us', sw: 'Tufuate' },
  copyright: { en: 'All Rights Reserved', sw: 'Haki Zote Zimehifadhiwa' },
  quickLinks: { en: 'Quick Links', sw: 'Viungo vya Haraka' },
  
  // About Page - NEW TRANSLATIONS ADDED
  ourVision: { en: 'Our Vision', sw: 'Maono Yetu' },
  ourMission: { en: 'Our Mission', sw: 'Misheni Yetu' },
  ourValues: { en: 'Our Values', sw: 'Maadili Yetu' },
  ourHistory: { en: 'Our History', sw: 'Historia Yetu' },
  
  // Contact Page
  getInTouch: { en: 'Get In Touch', sw: 'Wasiliana Nasi' },
  sendMessage: { en: 'Send Message', sw: 'Tuma Ujumbe' },
  yourName: { en: 'Your Name', sw: 'Jina Lako' },
  yourEmail: { en: 'Your Email', sw: 'Barua Pepe Yako' },
  subject: { en: 'Subject', sw: 'Somo' },
  message: { en: 'Message', sw: 'Ujumbe' },
  submit: { en: 'Submit', sw: 'Wasilisha' },
  
  // Common sections
  upcomingEvents: { en: 'Upcoming Events', sw: 'Matukio Yajayo' },
  viewAllEvents: { en: 'View All Events', sw: 'Ona Matukio Yote' },
  contactUs: { en: 'Contact Us', sw: 'Wasiliana Nasi' },
  
  // Leaders section
  ourLeaders: { en: 'Our Leaders', sw: 'Viongozi Wetu' },
  meetOurTeam: { en: 'Meet Our Team', sw: 'Kutana na Timu Yetu' },
  churchCalendar: { en: 'Church Calendar', sw: 'Kalenda ya Kanisa' },
  noUpcomingEvents: { en: 'No upcoming events at this time.', sw: 'Hakuna matukio yajayo kwa sasa.' },
  calendarDescription: { en: 'For a complete view of our church activities and events, please view our full calendar or contact the church office.', sw: 'Kwa mwongozo kamili wa shughuli na matukio ya kanisa letu, tafadhali angalia kalenda yetu kamili au wasiliana na ofisi ya kanisa.' },
  aboutChurchDescription: { en: 'Kinondoni Revival Church is a vibrant community of believers dedicated to spreading the Gospel of Jesus Christ. As part of the Tanzania Assemblies of God, we strive to create an environment where people can encounter God and grow spiritually.', sw: 'Kanisa la Uamsho la Kinondoni ni jumuiya hai ya waumini waliojitolea kueneza Injili ya Yesu Kristo. Kama sehemu ya Tanzania Assemblies of God, tunajitahidi kuunda mazingira ambapo watu wanaweza kukutana na Mungu na kukua kiroho.' },
  aboutChurchDescription2: { en: 'Our church focuses on authentic worship, biblical teaching, community service, and missions both locally and globally. We believe in the power of prayer and the importance of fellowship among believers.', sw: 'Kanisa letu linazingatia ibada ya kweli, mafundisho ya Kibiblia, huduma ya kijamii, na misheni za ndani na nje ya nchi. Tunaamini nguvu ya maombi na umuhimu wa ushirika miongoni mwa waumini.' },
  joinUsDescription: { en: 'We\'d love to welcome you to our church family. Join us for our Sunday services and experience God\'s presence.', sw: 'Tungependa kukukaribisha kwenye familia yetu ya kanisa. Jiunge nasi katika ibada zetu za Jumapili na uhisi uwepo wa Mungu.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
