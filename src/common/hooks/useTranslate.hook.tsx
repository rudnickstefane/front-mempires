import { useIntl } from "react-intl";

export const useTranslateHook = () => {
  const { formatMessage } = useIntl();

  return (id: string): string => {
    return formatMessage({ id });
  };
};
