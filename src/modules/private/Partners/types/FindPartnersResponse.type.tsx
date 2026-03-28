import { PageInfoProps } from "@sr/common/types";
import { PartnerEdgeProps } from "./PartnerEdgeProps.type";

export type FindPartnersResponse = {
  totalCount: number;
  pageInfo: PageInfoProps;
  edges: PartnerEdgeProps[];
};
