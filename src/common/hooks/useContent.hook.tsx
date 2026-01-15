import { useTranslateHook } from "@sr/common/hooks";

export const useContentHook = () => {
  const t = useTranslateHook();

  return {
    personal: {
      title: t("personal.title"),
      name: t("name"),
      birthDate: t("birthDate"),
      code: t("personal.code"),
      identity: t("identity"),
      gender: t("profile.gender"),
    },
    address: {
      title: t("address.title"),
      address: t("address"),
      number: t("number"),
      complement: t("complement"),
      zipCode: t("zipCode"),
      district: t("district"),
      city: t("city"),
      state: t("state"),
    },
    contact: {
      title: t("contact"),
      description: t("description"),
      phone: t("phone"),
      email: t("mail"),
    },
    profile: {
      title: t("profile.title"),
      subtitle: t("profile.subtitle"),
      code: t("profile.code"),
    },
    actions: {
      title: t("actions.title"),
      subtitle: t("actions.subtitle"),
      code: t("actions.code"),
    },
  };
};
