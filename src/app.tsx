import { Messages } from "@sr/lang";
import { SnackbarProvider } from "notistack";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

import { Dialog } from "./common/components/ConfirmDialog";
import { Drawer } from "./common/components/Drawer/Drawer";
import { SnackbarConfigurator } from "./common/iu/components/notifications";
import { SnackbarContent } from "./common/ui/Alert";
import { useLocale } from "./modules/common/hooks/useLocale";
import { LocaleProvider } from "./modules/common/providers/LocaleProvider";
import AppRoutes from "./modules/routes";

const AppContent = () => {
  const { lang, key } = useLocale();

  return (
    <IntlProvider
      key={key}
      locale={lang}
      messages={Messages[lang]}
      defaultLocale="pt-BR"
    >
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        Components={{
          success: SnackbarContent,
          error: SnackbarContent,
          info: SnackbarContent,
          warning: SnackbarContent,
        }}
      >
        <SnackbarConfigurator />
        <BrowserRouter>
          <Drawer />
          <Dialog />
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </IntlProvider>
  );
};

export default function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}
