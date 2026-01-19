import { listUF } from "../constants";

export const getStateAbbreviation = (stateName: string): string => {
  if (!stateName) return "";

  const state = listUF.brasil.find(
    (s) =>
      s.label.toLowerCase() === stateName.trim().toLowerCase() ||
      s.value.toLowerCase() === stateName.trim().toLowerCase(),
  );

  return state ? state.value : stateName;
};
