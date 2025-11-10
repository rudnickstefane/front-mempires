import { Locale } from '@sr/lang';
import { LocaleContext } from '@sr/modules/contexts/LocaleContext';
import React, { useEffect, useState } from 'react';

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Locale>(
    () => (localStorage.getItem('user-locale') as Locale) || 'pt-BR'
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    localStorage.setItem('user-locale', lang);
    setKey(prev => prev + 1);
  }, [lang]);

  const changeLocale = (locale: Locale) => setLang(locale);

  return (
    <LocaleContext.Provider
      value={{
        lang,
        changeLocale,
        key,
        isPortuguese: lang === 'pt-BR',
        isEnglish: lang === 'en-US',
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};