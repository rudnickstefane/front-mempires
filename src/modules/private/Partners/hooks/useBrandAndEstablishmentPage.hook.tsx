import { useState } from "react";
import { BrandAndEstablishmentViewType } from "../types";

export const useBrandAndEstablishmentPageHook = () => {
  const [currentView, setCurrentView] =
    useState<BrandAndEstablishmentViewType>("BRANDS");

  return {
    currentView,
    setCurrentView,
  };
};
