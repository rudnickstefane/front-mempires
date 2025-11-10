import { Messages } from '@sr/lang';
import { SnackbarProvider } from 'notistack';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { useLocale } from './modules/common/hooks/useLocale';
import { LocaleProvider } from './modules/common/providers/LocaleProvider';
import AppRoutes from './modules/routes';

const AppContent = () => {
  const { lang, key } = useLocale();

  return (
    <IntlProvider
      key={key}
      locale={lang}
      messages={Messages[lang]}
      defaultLocale="pt-BR"
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </IntlProvider>
  );
};

export default function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </SnackbarProvider>
  );
}
