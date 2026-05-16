import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isBangla, setIsBangla] = useState(false);

  // Persistence (optional but good)
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'bn') {
      setIsBangla(true);
    }
  }, []);

  const toggleLanguage = (val) => {
    setIsBangla(val);
    localStorage.setItem('language', val ? 'bn' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ isBangla, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
