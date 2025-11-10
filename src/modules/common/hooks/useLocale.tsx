import { LocaleContext, LocaleContextType } from '@sr/modules/contexts/LocaleContext';
import { useContext } from 'react';

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a <LocaleProvider>');
  }
  return context;
};