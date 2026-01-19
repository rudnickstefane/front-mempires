import { listGender } from "@sr/common/constants";

export const formatGender = (genderValue: string): string => {
  const gender = listGender.find((item) => item.value === genderValue);

  return gender?.label || genderValue;
};
