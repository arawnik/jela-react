import { i18n } from 'i18next';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

type Language = 'fi' | 'en';

interface AppContextProps {
  i18n: i18n | undefined;
  t: (value: string) => string;
  setLanguage: (language: Language) => void;
  oppositeLanguage: Language;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation('common');
  const [oppositeLanguage, setOppositeLanguage] = useState<Language>('en');

  useEffect(() => {
    const currentLanguage = localStorage?.getItem('language') || navigator?.language;
    if (currentLanguage?.includes('fi')) {
      i18n.changeLanguage('fi');
      localStorage.setItem('language', 'fi');
      setOppositeLanguage('en');
      return;
    }
    i18n.changeLanguage('en');
    localStorage.setItem('language', 'en');
    setOppositeLanguage('fi');
  }, [i18n]);

  const setLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
      setOppositeLanguage(language == 'en' ? 'fi' : 'en');
    },
    [i18n]
  );

  return <AppContext.Provider value={{ i18n, t, setLanguage, oppositeLanguage }}>{children}</AppContext.Provider>;
};

// Custom hook for easier context usage
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};
