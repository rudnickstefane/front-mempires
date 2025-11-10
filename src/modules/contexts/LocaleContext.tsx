import { Locale } from '@sr/lang';
import { createContext } from 'react';

export type LocaleContextType = {
  lang: Locale;
  key: number;
  changeLocale: (locale: Locale) => void;
  isPortuguese: boolean;
  isEnglish: boolean;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);
