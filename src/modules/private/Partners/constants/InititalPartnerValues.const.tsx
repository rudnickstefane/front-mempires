import { EntityEnum, SegmentEnum } from "@sr/common/enums";
import { getStateAbbreviation } from "@sr/common/utils";
import { formatZipCode } from "@sr/utils";
import { DrawerFormPartnerProps, PartnerProps } from "../types";

export const initialPartnerValues = (
  data?: PartnerProps,
): DrawerFormPartnerProps => {
  return {
    partnerCode: data?.partnerCode || "",
    segment: data?.segment ? SegmentEnum[data?.segment] : undefined,
    entity: data?.entity ? EntityEnum[data?.entity] : undefined,
    fee: data?.fee !== undefined ? Number(data.fee).toFixed(2) : "",
    rewardsRate:
      data?.rewardsRate !== undefined
        ? Number(data.rewardsRate).toFixed(2)
        : "",
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
