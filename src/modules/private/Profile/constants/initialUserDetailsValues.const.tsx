import { ProfileDetails } from "@sr/modules/common/types";
import { formatIdentity, formatZipCode } from "@sr/utils";
import { DrawerFormUserProps } from "../types";

export const initialUserDetailsValues = (
  data?: ProfileDetails
): DrawerFormUserProps => {
  return {
    details: {
      code: data?.code ? formatIdentity(data?.code) : "",
      identity: data?.identity || "",
      registration: data?.registration || "",
      internalNumber: data?.internalNumber || "",
      name: data?.name || "",
      gender: data?.gender || "",
      birthDate: data?.birthDate || "",
    },
    address: {
      zipCode: data?.address?.zipCode
        ? formatZipCode(data.address.zipCode)
        : "",
      address: data?.address?.address || "",
      number: data?.address?.number || "",
      complement: data?.address?.complement || "",
      district: data?.address?.district || "",
      city: data?.address?.city || "",
      state: data?.address?.state || "",
    },
    contact: {
      // Se seu dado vier como array, pegue o primeiro, se for objeto, use direto
      type: data?.contact?.type || "",
      description: data?.contact?.description || "",
      email: data?.contact?.email || "",
      phone: data?.contact?.phone || "",
      status: data?.contact?.status || "",
    },
  };
};
