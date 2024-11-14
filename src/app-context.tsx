import { i18n } from 'i18next';
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

type Language = 'fi' | 'en';
type Theme = 'light' | 'dark';

interface AppContextProps {
  i18n: i18n | undefined;
  t: (value: string) => string;
  setLanguage: (language: Language) => void;
  oppositeLanguage: Language;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation('common');
  const [oppositeLanguage, setOppositeLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const currentLanguage = localStorage.getItem('language') || navigator.language;
    if (currentLanguage.includes('fi')) {
      i18n.changeLanguage('fi');
      setOppositeLanguage('en');
      localStorage.setItem('language', 'fi');
    } else {
      i18n.changeLanguage('en');
      setOppositeLanguage('fi');
      localStorage.setItem('language', 'en');
    }

    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, [i18n]);

  const setLanguage = useCallback(
    (language: Language) => {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
      setOppositeLanguage(language === 'en' ? 'fi' : 'en');
    },
    [i18n]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ i18n, t, setLanguage, oppositeLanguage, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppContextProvider');
  return context;
};
