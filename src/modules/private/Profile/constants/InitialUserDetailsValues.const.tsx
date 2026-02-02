import { getStateAbbreviation } from "@sr/common/utils";
import { ProfileDetails } from "@sr/modules/common/types";
import {
  formatDocument,
  formatIdentity,
  formatPhoneNumber,
  formatZipCode,
} from "@sr/utils";
import { DrawerFormUserProps } from "../types";

export const initialUserDetailsValues = (
  data?: ProfileDetails,
): DrawerFormUserProps => {
  return {
    details: {
      code: data?.code ? formatIdentity(data?.code) : "",
      identity: data?.identity ? formatDocument(data?.identity) : "",
      registration: data?.registration || "",
      internalNumber: data?.internalNumber || "",
      name: data?.name || "",
      gender: data?.gender || "",
      birthDate: data?.birthDate || "",
    },
    address: {
      id: data?.address?.id || -1,
      zipCode: data?.address?.zipCode
        ? formatZipCode(data.address.zipCode)
        : "",
      address: data?.address?.address || "",
      number: data?.address?.number || "",
      complement: data?.address?.complement || "",
      district: data?.address?.district || "",
      city: data?.address?.city || "",
      state: getStateAbbreviation(data?.address?.state || ""),
    },
    contact: {
      id: data?.contact?.id || -1,
      type: data?.contact?.type || "",
      description: data?.contact?.description || "",
      email: data?.contact?.email || "",
      phone: data?.contact?.phone
        ? formatPhoneNumber(data?.contact?.phone)
        : "",
      validationEmail: data?.contact?.status || "",
    },
  };
};
