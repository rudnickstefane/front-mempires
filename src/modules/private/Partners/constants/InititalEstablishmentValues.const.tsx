import { getStateAbbreviation } from "@sr/common/utils";
import { formatZipCode } from "@sr/utils";
import { DrawerFormEstablishmentProps, EstablishmentProps } from "../types";

export const initialEstablishmentValues = (
  data?: EstablishmentProps,
): DrawerFormEstablishmentProps => {
  return {
    brandCode: data?.brandCode || "",
    partnerCode: data?.partnerCode || "",
    establishmentCode: data?.establishmentCode || "",
    company: {
      id: data?.company?.id ? Number(data.company.id) : -1,
      code: data?.company?.code || "",
      businessName: data?.company?.businessName || "",
      fantasyName: data?.company?.fantasyName || "",
      stateRegistration: data?.company?.stateRegistration || "",
    },
    address: {
      id: data?.address?.id ? Number(data.address.id) : -1,
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
    details: {
      abbreviation: data?.details?.abbreviation || "",
      status: data?.details?.status || "",
      effectiveStart: data?.details?.effectiveStart || "",
      effectiveEnd: data?.details?.effectiveEnd || "",
      ecommerce: data?.details?.ecommerce || false,
    },
    contacts: data?.contacts || [],
    _tempType: "",
    _tempDescription: "",
    _tempPhone: "",
    _tempEmail: "",
  };
};
